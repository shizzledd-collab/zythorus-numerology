#!/bin/bash

# Numerology App Fix Script
# This script automatically fixes:
# 1. Removes all localStorage code
# 2. Fixes syntax error at line 4710
# 3. Makes app ready for Vercel deployment

echo "🔧 Fixing Numerology App..."
echo ""

# Check if App.jsx exists
if [ ! -f "App.jsx" ]; then
    echo "❌ Error: App.jsx not found in current directory"
    echo "Please run this script from the directory containing App.jsx"
    exit 1
fi

# Backup original file
echo "📦 Creating backup: App.jsx.backup"
cp App.jsx App.jsx.backup

# Apply the patch
if [ -f "fix-numerology-app.patch" ]; then
    echo "✨ Applying patch..."
    patch -p0 < fix-numerology-app.patch
    
    if [ $? -eq 0 ]; then
        echo "✅ Patch applied successfully!"
        echo ""
        echo "Fixed issues:"
        echo "  ✓ Removed localStorage initialization"
        echo "  ✓ Removed localStorage useEffect hooks"
        echo "  ✓ Fixed syntax error at line 4710"
        echo "  ✓ Added collapsedSections state"
        echo ""
        echo "📤 Ready to upload to GitHub and deploy to Vercel!"
        echo ""
        echo "Original file backed up as: App.jsx.backup"
    else
        echo "❌ Patch failed to apply"
        echo "Restoring backup..."
        mv App.jsx.backup App.jsx
        exit 1
    fi
else
    echo "❌ Patch file not found: fix-numerology-app.patch"
    echo "Please make sure both files are in the same directory"
    exit 1
fi
