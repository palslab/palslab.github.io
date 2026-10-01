#!/usr/bin/env bash
# One-time publish of the Pal Lab site to https://palslab.github.io
# Run from the project folder on your Mac:   bash scripts/publish.sh
# Needs: GitHub CLI (brew install gh) logged in (gh auth login), and the free
# GitHub organization "palslab" already created by you.
set -euo pipefail
ORG=palslab
REPO="$ORG/$ORG.github.io"

command -v gh >/dev/null || { echo "Install the GitHub CLI first:  brew install gh"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Log in first:  gh auth login"; exit 1; }
gh api "orgs/$ORG" >/dev/null 2>&1 || { echo "Create the free organization '$ORG' on github.com first (avatar > Your organizations > New organization > Free)."; exit 1; }

echo "1/5 Safety checks…"
npm run build >/dev/null
npm run check:drafts
if git ls-files | grep -qE '^(source/|CLAUDE\.md|PLAYBOOK\.md|scripts/private-guards\.txt)|drafts/virtual'; then
  echo "STOP: a private file is tracked by git."; exit 1; fi
[ -z "$(git status --porcelain)" ] || { echo "STOP: uncommitted changes — commit or stash them first."; git status --short; exit 1; }

echo "2/5 Creating public repo $REPO (skipped if it exists)…"
gh repo view "$REPO" >/dev/null 2>&1 || gh repo create "$REPO" --public --description "Pal Lab — Computational Biology" --homepage "https://$ORG.github.io"
git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO.git"

echo "3/5 Pushing main…"
git push -u origin main

echo "4/5 Setting Pages source to GitHub Actions…"
gh api -X POST "repos/$REPO/pages" -f build_type=workflow >/dev/null 2>&1 \
  || gh api -X PUT "repos/$REPO/pages" -f build_type=workflow >/dev/null
sleep 5
gh workflow run "Deploy to GitHub Pages" -R "$REPO" >/dev/null 2>&1 || true   # in case the push-triggered run started before Pages was enabled
sleep 8

echo "5/5 Waiting for the deploy…"
RUN=$(gh run list -R "$REPO" --workflow "Deploy to GitHub Pages" --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" -R "$REPO" --exit-status
echo
echo "Live at: https://$ORG.github.io  (first deploy can take a minute or two to appear)"
