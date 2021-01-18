#!/bin/bash

# This script is used to minify the Javascript files
# It uses https://www.npmjs.com/package/uglify-js
#
# < use bash, because sh won't work >
#
# --------------------------------------------------------------------
#  Copyright 2016-2017 Abdelkrime ARIES
# --------------------------------------------------------------------
# Licensed under the Apache License, Version 2.0 (the "License");
# may not use this file except in compliance with the License. You may
# obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#---------------------------------------------------------------------

shopt -s extglob

# Deleting the dist folder
rm -r dist
mkdir dist

# copy the main files to dist
for s in src/*.js; do
  cp $s dist/
  echo "copying $s"
done

# copy the languages implementations to dist
for s in src/*/*.js; do
  cp $s dist/
  echo "copying $s"
  # minify --output "dist/{{filename}}.min.{{ext}}" $s
done

# Minify all js files in dist folder
MIN="$PWD/node_modules/uglify-es/bin/uglifyjs"
(
  cd dist
  for s in *.js; do
    ext="${s##*.}"
    file="${s%.*}"
    echo "minifying $s"
    $MIN $s -o $file.min.$ext -c -m
    rm $s
  done
)
