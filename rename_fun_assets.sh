#!/usr/bin/env bash
set -euo pipefail

DIR="assets/fun"

# Use: ./rename_fun_assets.sh --dry-run  (só mostra o que faria)
DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

cd "$DIR"

shopt -s nullglob

for f in *; do
  [[ -f "$f" ]] || continue

  # Mantém a extensão; normaliza o nome base
  ext=""
  base="$f"
  if [[ "$f" == *.* ]]; then
    ext=".${f##*.}"
    base="${f%.*}"
  fi

  # 1) trim (remove espaços no começo/fim)
  # 2) troca espaços por _
  # 3) tudo minúsculo
  new_base="$(printf '%s' "$base" \
    | sed -E 's/^[[:space:]]+|[[:space:]]+$//g; s/[[:space:]]+/_/g' \
    | tr '[:upper:]' '[:lower:]')"

  new_name="${new_base}${ext}"
  [[ "$new_name" == "$f" ]] && continue

  # Se já existe, cria sufixo _2, _3, ...
  if [[ -e "$new_name" ]]; then
    i=2
    while [[ -e "${new_base}_${i}${ext}" ]]; do
      ((i++))
    done
    new_name="${new_base}_${i}${ext}"
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    printf 'DRY-RUN: %q -> %q\n' "$f" "$new_name"
  else
    mv -n -- "$f" "$new_name"
    printf 'RENAMED: %q -> %q\n' "$f" "$new_name"
  fi
done