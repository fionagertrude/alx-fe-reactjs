#!/bin/bash

echo "=== Verifying all required files exist ==="
echo ""

required_files=(
  "package.json"
  "index.html"
  "vite.config.js"
  "src/App.jsx"
  "src/main.jsx"
  "src/index.css"
  "src/components/Header.jsx"
  "src/components/UserProfile.jsx"
  "src/components/MainContent.jsx"
  "src/components/Footer.jsx"
)

all_exist=true
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "✗ $file is MISSING!"
    all_exist=false
  fi
done

echo ""
if [ "$all_exist" = true ]; then
  echo "✅ All files exist!"
else
  echo "❌ Some files are missing!"
fi

echo ""
echo "=== Checking for inline styles ==="
echo ""

components=("Header.jsx" "UserProfile.jsx" "MainContent.jsx" "Footer.jsx")
for component in "${components[@]}"; do
  echo "Checking $component:"
  if grep -q "style=" "src/components/$component"; then
    style_count=$(grep -o "style=" "src/components/$component" | wc -l)
    echo "  ✓ Contains inline styling ($style_count style attributes)"
  else
    echo "  ✗ NO inline styling found!"
  fi
done

echo ""
echo "=== Specific checks ==="
echo "UserProfile has 'blue': $(grep -q "blue" src/components/UserProfile.jsx && echo "✓" || echo "✗")"
echo "Header has 'navy': $(grep -q "navy" src/components/Header.jsx && echo "✓" || echo "✗")"
echo "Header has 'white': $(grep -q "white" src/components/Header.jsx && echo "✓" || echo "✗")"
echo "Header has 'center': $(grep -q "center" src/components/Header.jsx && echo "✓" || echo "✗")"
