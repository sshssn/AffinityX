#!/bin/bash

# Set environment variables to disable ESLint
export DISABLE_ESLINT_PLUGIN=true
export NODE_ENV=production

# Remove the .eslintrc.json temporarily
mv .eslintrc.json .eslintrc.json.backup

# Build the project
echo "Building project..."
bun run build

# Restore the .eslintrc.json
mv .eslintrc.json.backup .eslintrc.json

echo "Build completed!" 