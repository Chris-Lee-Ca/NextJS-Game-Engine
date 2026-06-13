#!/usr/bin/env bash
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 1.5.0
#
# What it does:
#   1. Bumps game-engine/package.json to the given version
#   2. Rebuilds the .tgz artifact (make all)
#   3. Moves the .tgz to demo-game/ and removes the old one
#   4. Updates demo-game's game-engine dependency reference
#   5. Prepends a CHANGELOG entry (game-engine commits since last tag only)
#   6. Commits all release files and creates a git tag
#
# Prerequisites: all feature work must be committed before running this script.

set -euo pipefail

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Error: version argument required."
  echo "Usage: ./scripts/release.sh <version>"
  echo "Example: ./scripts/release.sh 1.5.0"
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

echo "→ Bumping game-engine version to $VERSION..."
cd "$REPO_ROOT/game-engine"
npm version "$VERSION" --no-git-tag-version --silent

echo "→ Building and packing game-engine..."
make all

echo "→ Moving artifact to demo-game/..."
mv "$REPO_ROOT/game-engine/game-engine-${VERSION}.tgz" "$REPO_ROOT/demo-game/"

# Remove old .tgz files from disk (anything that isn't the new one)
find "$REPO_ROOT/demo-game" -maxdepth 1 -name "game-engine-*.tgz" \
  ! -name "game-engine-${VERSION}.tgz" -delete

echo "→ Updating demo-game dependency reference..."
cd "$REPO_ROOT/demo-game"
npm pkg set "dependencies.game-engine=file:game-engine-${VERSION}.tgz" --silent

echo "→ Generating CHANGELOG entry..."
cd "$REPO_ROOT"

CHANGELOG_DATE=$(date +%Y-%m-%d)

if [[ -n "$LAST_TAG" ]]; then
  RAW_COMMITS=$(git log "${LAST_TAG}..HEAD" --oneline -- game-engine/ 2>/dev/null || echo "")
else
  RAW_COMMITS=$(git log --oneline -- game-engine/ 2>/dev/null || echo "")
fi

if [[ -n "$RAW_COMMITS" ]]; then
  COMMITS=$(echo "$RAW_COMMITS" | sed 's/^[0-9a-f]* /- /')
else
  COMMITS="- Maintenance release"
fi

# Build the new section as a temp file (avoids shell quoting issues with awk -v)
NEW_ENTRY_FILE=$(mktemp)
printf "## [%s] - %s\n### Changed\n%s\n\n" "$VERSION" "$CHANGELOG_DATE" "$COMMITS" > "$NEW_ENTRY_FILE"

if [[ -f "$REPO_ROOT/game-engine/CHANGELOG.md" ]]; then
  # Insert before the first versioned ## [x.y.z] section
  awk -v entry_file="$NEW_ENTRY_FILE" '
    /^## \[[0-9]/ && !done {
      while ((getline line < entry_file) > 0) print line
      done=1
    }
    { print }
  ' "$REPO_ROOT/game-engine/CHANGELOG.md" > "$REPO_ROOT/CHANGELOG.tmp"
  mv "$REPO_ROOT/CHANGELOG.tmp" "$REPO_ROOT/game-engine/CHANGELOG.md"
else
  printf "# Changelog\n\nAll notable changes to the **game-engine** library are documented here.\nDemo-game changes are not included.\n\n## [Unreleased]\n\n" > "$REPO_ROOT/game-engine/CHANGELOG.md"
  cat "$NEW_ENTRY_FILE" >> "$REPO_ROOT/game-engine/CHANGELOG.md"
fi
rm -f "$NEW_ENTRY_FILE"

echo "→ Staging release files..."
cd "$REPO_ROOT"
git add game-engine/package.json
git add demo-game/package.json
git add "demo-game/game-engine-${VERSION}.tgz"
git add game-engine/CHANGELOG.md

# Stage removal of old .tgz files that are still tracked by git
OLD_TRACKED=$(git ls-files "demo-game/game-engine-*.tgz" | grep -v "game-engine-${VERSION}.tgz" || true)
if [[ -n "$OLD_TRACKED" ]]; then
  git rm --cached $OLD_TRACKED
fi

echo "→ Creating release commit and tag..."
git commit -m "chore: release game-engine v${VERSION}"
git tag "${VERSION}"

echo ""
echo "✓ Released game-engine v${VERSION} — git tag ${VERSION} created."
echo "  Run 'cd demo-game && npm install' to pick up the new package."
