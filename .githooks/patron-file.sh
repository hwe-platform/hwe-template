# Patrón compartido por los hooks de `.githooks/` y por la guarda de la CI
# (`.github/scripts/comprobar-sin-file.sh`). Se carga con `.`, no se ejecuta.
#
# Mientras se itera con un core-ui local (`file:../hwe-core/packages/core-ui` o
# `link:`), ese enlace solo vale en esta máquina: un clon limpio o un deploy no
# instalan. Por eso no puede llegar a un commit, a un push ni a la CI.
PATRON_FILE='(file|link):.*(core-ui|hwe-core)'
FICHEROS_FILE='package.json pnpm-lock.yaml'
