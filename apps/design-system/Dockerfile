FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
COPY packages/ui/package.json packages/ui/
COPY apps/design-system/package.json apps/design-system/

RUN npm ci --ignore-scripts

COPY packages/ui/ packages/ui/
COPY apps/design-system/ apps/design-system/
# `src/sections.tsx` los importa con `?raw`: entran al bundle, así que son
# parte del build y no sólo documentación del repo.
COPY DESIGN.md components.md ./

# La CSP de /login fija por hash su único script inline. Si alguien tocó el
# script sin actualizar nginx.conf, el navegador lo bloquearía en silencio:
# mejor que falle acá.
RUN node apps/design-system/scripts/login-csp-hash.mjs

RUN npm run build -w @felix/design-system-site

FROM nginx:1.27-alpine

COPY apps/design-system/nginx/nginx.conf /etc/nginx/nginx.conf
COPY apps/design-system/nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=builder /app/apps/design-system/dist /usr/share/nginx/html

# La config ES el gate. Si no parsea, que falle el build y no el pod en
# producción. Y la página de login tiene que existir, o /login es un 404.
RUN nginx -t && test -f /usr/share/nginx/html/login/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
