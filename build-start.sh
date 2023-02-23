#!/usr/bin/bash
# THIS SCRIPT BUILDS THE BACKEND SERVER
# THEN RUNS IT IN NETLIFY DEVELOPMENT MODE

echo STARTING: tsc
tsc
echo COMPLETED: Compiled TypeScript

echo STARTING: node minify.js build
node minify.js build
echo COMPLETED: Minified build

echo STARTING: netlify build
netlify build
echo COMPLETED: Built Netlify files

echo STARTING: netlify dev
netlify dev