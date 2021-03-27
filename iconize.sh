#!/bin/bash

source_svg=$1
component_name=$2

[ "$source_svg" = "" ] || [ "$component_name" = "" ] && {
  echo "Usage: $0 path/to/source.svg ComponentName"
  exit 1
}

destination_tsx="src/app/icons/$component_name.tsx"

cp "$source_svg" "$destination_tsx"
npx --no-install svgo -i "$destination_tsx"
ex $destination_tsx <<EOF
1 insert
import { h } from 'preact';
export const $component_name = () =>
.
xit
EOF
