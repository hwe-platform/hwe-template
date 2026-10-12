# Patrón compartido por los hooks de `.githooks/` y por la guarda de la CI
# (`.github/scripts/comprobar-sin-file.sh`). Se carga con `.`, no se ejecuta.
#
# Mientras se itera con un core-ui local (`file:../hwe-core/packages/core-ui`,
# `link:` o `portal:`), ese enlace solo vale en esta máquina: un clon limpio o un
# deploy no instalan. Por eso no puede llegar a un commit, a un push ni a la CI.
#
# Casa con: un protocolo local (`file:`, `link:`, `portal:`) precedido de espacio,
# comillas, `@` o `(`, para no confundir `profile:` ni `detect-file:` (un paquete
# real del lockfile), una ruta relativa a `../hwe-core` y una ruta
# relativa que acabe en `core-ui` (la forma sin protocolo que aceptan npm y pnpm,
# y el `resolution: {directory: ...}` del lockfile).
PATRON_FILE='(^|[[:space:]"'"'"'@(])(file|link|portal):|\.\./hwe-core|\.\./[^"[:space:]]*core-ui'
# Donde pnpm puede apuntar una dependencia a una ruta local.
FICHEROS_FILE='package.json pnpm-lock.yaml pnpm-workspace.yaml .pnpmfile.cjs'
