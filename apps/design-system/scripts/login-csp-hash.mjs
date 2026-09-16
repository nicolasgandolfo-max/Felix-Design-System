#!/usr/bin/env node
/**
 * Imprime el hash SHA-256 (formato CSP) del único <script> inline de la
 * página de login, y comprueba que coincida con el que nginx/nginx.conf manda
 * en su Content-Security-Policy para /login.
 *
 * El hash cubre el contenido exacto entre <script> y </script>, byte a byte:
 * un espacio o un salto de línea distinto lo invalida y el navegador bloquea
 * el script. Por eso el archivo está en .prettierignore.
 *
 *   node scripts/login-csp-hash.mjs          # imprime y verifica
 *   node scripts/login-csp-hash.mjs --write  # además actualiza nginx.conf
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const htmlPath = `${root}public/login/index.html`;
const nginxPath = `${root}nginx/nginx.conf`;

const html = readFileSync(htmlPath, "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if (scripts.length !== 1) {
  console.error(
    `Se esperaba exactamente un <script> inline en login/index.html, hay ${scripts.length}.`
  );
  process.exit(1);
}

const hash = createHash("sha256")
  .update(scripts[0][1], "utf8")
  .digest("base64");
const csp = `'sha256-${hash}'`;
console.log(csp);

const nginx = readFileSync(nginxPath, "utf8");
const inConf = nginx.match(/script-src 'sha256-([A-Za-z0-9+/=]+)'/);

if (process.argv.includes("--write")) {
  if (!inConf) {
    console.error("No encontré `script-src 'sha256-…'` en nginx.conf.");
    process.exit(1);
  }
  writeFileSync(nginxPath, nginx.replace(inConf[0], `script-src ${csp}`));
  console.log("nginx.conf actualizado.");
} else if (!inConf || inConf[1] !== hash) {
  console.error(
    `nginx.conf tiene ${inConf ? `'sha256-${inConf[1]}'` : "ningún hash"}; ` +
      "no coincide con el script. Corré con --write para actualizarlo."
  );
  process.exit(1);
} else {
  console.log("nginx.conf coincide.");
}
