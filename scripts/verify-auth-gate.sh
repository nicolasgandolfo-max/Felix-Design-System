#!/usr/bin/env bash
# Verifica el gate de plaza.felixpago.com contra la imagen REAL del portal.
#
# Levanta la imagen de apps/design-system/Dockerfile y, en la misma red del
# contenedor, un stub que imita a oauth2-proxy en :4180 (202 con cookie de
# prueba, 401 sin ella, 403 en un callback "denegado"). Después pide cada tipo
# de ruta con y sin sesión y comprueba código, redirect y cabeceras.
#
# Necesita Docker. Corre desde la raíz del repo:
#   scripts/verify-auth-gate.sh
#
# No sustituye la prueba con Google real (dominios, cookies firmadas): prueba
# que nginx no sirve NADA protegido sin el 202 del sidecar, que sí sirve lo
# público, y que las cabeceras de seguridad llegan. Es el "deny por defecto".
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE=plaza-gate-test
NGINX=plaza-gate-nginx
STUB=plaza-gate-stub
PORT=18080
BASE="http://127.0.0.1:${PORT}"
COOKIE="plaza_test_session=ok"

cleanup() { docker rm -f "$NGINX" "$STUB" >/dev/null 2>&1 || true; }
trap cleanup EXIT
cleanup

echo "▸ build de la imagen (incluye nginx -t y el check del hash CSP)"
docker build -q -f apps/design-system/Dockerfile -t "$IMAGE" . >/dev/null

echo "▸ nginx en :${PORT}, stub de oauth2-proxy en la red del contenedor"
docker run -d --name "$NGINX" -p "127.0.0.1:${PORT}:80" "$IMAGE" >/dev/null
docker run -d --name "$STUB" --network "container:${NGINX}" python:3-alpine python3 -c '
from http.server import BaseHTTPRequestHandler, HTTPServer
class H(BaseHTTPRequestHandler):
    def do_GET(self):
        p = self.path
        if p.startswith("/ping"):
            self.send_response(200); self.end_headers(); return
        if p.startswith("/oauth2/auth"):
            ok = "plaza_test_session=ok" in (self.headers.get("Cookie") or "")
            self.send_response(202 if ok else 401); self.end_headers(); return
        if p.startswith("/oauth2/callback"):
            if "deny=1" in p:
                self.send_response(403); self.end_headers(); self.wfile.write(b"Invalid Account"); return
            self.send_response(302); self.send_header("Location", "/"); self.end_headers(); return
        if p.startswith("/oauth2/start"):
            self.send_response(302); self.send_header("Location", "https://accounts.google.com/o/oauth2/auth?stub=1"); self.end_headers(); return
        self.send_response(404); self.end_headers()
    do_HEAD = do_GET
    def log_message(self, *a): pass
HTTPServer(("0.0.0.0", 4180), H).serve_forever()
' >/dev/null

diagnose() {
  echo
  echo "── logs de nginx ──"; docker logs "$NGINX" 2>&1 | tail -30 || true
  echo "── logs del stub ──"; docker logs "$STUB" 2>&1 | tail -30 || true
}

# Readiness A TRAVÉS del gate: `/` con la cookie de prueba tiene que dar 200.
# Sondear sólo /healthz no alcanza — nginx responde al instante pero el stub
# en :4180 tarda unos cientos de ms en escuchar, y el primer request real
# caería en 502.
ready=""
for _ in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w '%{http_code}' -b "$COOKIE" "${BASE}/" || true)
  [[ "$code" == "200" ]] && { ready=1; break; }
  sleep 0.5
done
if [[ -z "$ready" ]]; then
  echo "✘ el portal no respondió 200 en / con sesión tras 30 s (último código: '${code:-<sin respuesta>}')"
  diagnose
  exit 1
fi

FAILS=0
pass() { printf '  ✔ %s\n' "$1"; }
fail() { printf '  ✘ %s\n      %s\n' "$1" "$2"; FAILS=$((FAILS + 1)); }

# check <desc> <esperado: código[ location-substr]> <path> [cookie]
check() {
  local desc=$1 want=$2 path=$3 cookie=${4:-}
  local hdr; hdr=$(curl -s -o /dev/null -D - ${cookie:+-b "$cookie"} "${BASE}${path}")
  local code; code=$(printf '%s' "$hdr" | head -1 | awk '{print $2}')
  local loc;  loc=$(printf '%s' "$hdr" | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')
  local wcode=${want%% *} wloc=""; [[ "$want" == *" "* ]] && wloc=${want#* }
  if [[ "$code" == "$wcode" && ( -z "$wloc" || "$loc" == *"$wloc"* ) ]]; then
    pass "$desc"
  else
    fail "$desc" "esperaba $want, obtuve $code ${loc:+→ $loc}"
  fi
}
header() {
  local desc=$1 path=$2 name=$3 want=$4 cookie=${5:-}
  local v; v=$(curl -s -o /dev/null -D - ${cookie:+-b "$cookie"} "${BASE}${path}" \
    | awk -v n="$name" 'tolower($1)==tolower(n)":"{ $1=""; print substr($0,2) }' | tr -d '\r')
  if [[ "$v" == *"$want"* ]]; then pass "$desc"; else fail "$desc" "$name: '${v:-<ausente>}' no contiene '$want'"; fi
}

# `|| true`: con pipefail, un grep sin match abortaría el script en silencio.
ASSET=$(curl -s -b "$COOKIE" "${BASE}/" | grep -o '/assets/index-[^"]*\.js' | head -1 || true)
if [[ -z "$ASSET" ]]; then
  echo "✘ no encontré el bundle en index.html"
  diagnose
  exit 1
fi

echo
echo "SIN SESIÓN — nada protegido se sirve, todo va a /login con la ruta original"
check "/ → /login?rd=/"                          "302 /login?rd=/"                 "/"
check "ruta del SPA → /login con rd"             "302 /login?rd=/patrones/menu"    "/patrones/menu"
check "index.html directo → /login"              "302 /login"                      "/index.html"
check "bundle JS (embebe DESIGN.md) → /login"    "302 /login"                      "$ASSET"
check "asset inexistente: gate ANTES del 404"    "302 /login"                      "/assets/nope.js"
check "fuente .otf con licencia → /login"        "302 /login"                      "/fonts/Plain/x.otf"
check "ilustración → /login"                     "302 /login"                      "/illustrations/x.svg"
check "/login/index.html directo → /login"       "302 /login"                      "/login/index.html"
check "/oauth2/auth es interno → 404"            "404"                             "/oauth2/auth"

echo
echo "SIN SESIÓN — lo público, y sólo eso"
check "/login → 200"                             "200"                             "/login"
check "/favicon.svg → 200"                       "200"                             "/favicon.svg"
check "/robots.txt → 200"                        "200"                             "/robots.txt"
check "/healthz → 200"                           "200"                             "/healthz"
check "/oauth2/start pasa al proxy"              "302 accounts.google.com"         "/oauth2/start?rd=%2F"
check "/oauth2/sign_in → /login (una sola puerta)" "302 /login?rd=%2Fx"            "/oauth2/sign_in?rd=%2Fx"
check "callback denegado → /login?error=denied"  "302 /login?error=denied"         "/oauth2/callback?deny=1"

echo
echo "CON SESIÓN — todo lo protegido se sirve"
check "/ → 200"                                  "200"                             "/"                 "$COOKIE"
check "ruta del SPA → 200 (fallback)"            "200"                             "/patrones/menu"    "$COOKIE"
check "bundle → 200"                             "200"                             "$ASSET"            "$COOKIE"
check "asset inexistente → 404 real"             "404"                             "/assets/nope.js"   "$COOKIE"
check "/login sigue accesible"                   "200"                             "/login"            "$COOKIE"

echo
echo "CABECERAS"
header "CSP por hash en /login"                  "/login"  "Content-Security-Policy" "script-src 'sha256-"
header "CSP: default-src 'none' en /login"       "/login"  "Content-Security-Policy" "default-src 'none'"
header "/login no se cachea"                     "/login"  "Cache-Control"           "no-store"
header "X-Frame-Options DENY en /"               "/"       "X-Frame-Options"         "DENY"              "$COOKIE"
header "nosniff en /"                            "/"       "X-Content-Type-Options"  "nosniff"           "$COOKIE"
header "HSTS en /"                               "/"       "Strict-Transport-Security" "max-age=31536000" "$COOKIE"
header "noindex en /"                            "/"       "X-Robots-Tag"            "noindex"           "$COOKIE"
header "noindex también en el redirect a /login" "/"       "X-Robots-Tag"            "noindex"
header "bundle: caché privado"                   "$ASSET"  "Cache-Control"           "private"           "$COOKIE"
header "index: no-store"                         "/"       "Cache-Control"           "no-store"          "$COOKIE"
header "sin versión de nginx"                    "/login"  "Server"                  "nginx"
SERVER=$(curl -s -o /dev/null -D - "${BASE}/login" | awk 'tolower($1)=="server:"{print $2}' | tr -d '\r')
[[ "$SERVER" == "nginx" ]] && pass "Server: exactamente 'nginx'" || fail "Server: exactamente 'nginx'" "es '$SERVER'"

echo
if [[ $FAILS -eq 0 ]]; then
  echo "✅ gate verificado: 0 fallas"
else
  echo "❌ $FAILS falla(s)"
  diagnose
  exit 1
fi
