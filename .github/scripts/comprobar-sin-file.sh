#!/bin/sh
# Guarda de la CI: falla si package.json o pnpm-lock.yaml apuntan a un core-ui
# local (`file:` o `link:`). Reutiliza el patrón de los hooks de `.githooks/`.
cd "$(dirname "$0")/../.." || exit 1
. ./.githooks/patron-file.sh

fallo=0
for f in $FICHEROS_FILE; do
  [ -f "$f" ] || continue
  lineas=$(grep -nE "$PATRON_FILE" "$f")
  if [ -n "$lineas" ]; then
    echo "$lineas" | sed "s|^|$f:|"
    fallo=1
  fi
done

if [ "$fallo" -ne 0 ]; then
  echo "Las líneas de arriba apuntan a un core-ui local (file:/link:). Vuelve a la versión del registro." >&2
  exit 1
fi
echo "package.json y pnpm-lock.yaml no apuntan a un core-ui local."
