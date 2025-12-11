# Cleanup script: remove root duplicate files moved into backend/ and frontend/
# Run this from the repository root in PowerShell: `.	ools\cleanup-remove-root-duplicates.ps1`

Write-Host "Running cleanup to remove duplicate root files..."

$files = @(
  'server.js',
  'db.js',
  'dbSetup.js',
  'setup-db.js',
  'routes\search.js',
  'scripts\seed.js',
  'package.json',
  'package-lock.json',
  'frontend-server.js',
  'frontend.html',
  'README-ORIGINAL.md'
)

$repoRoot = Get-Location

foreach ($f in $files) {
  $path = Join-Path $repoRoot $f
  if (Test-Path $path) {
    try {
      Remove-Item $path -Force -ErrorAction Stop
      Write-Host "Deleted: $f"
    } catch {
      Write-Warning "Failed to delete $f: $_"
    }
  } else {
    Write-Host "Not found (skipping): $f"
  }

  # If file is tracked by Git, remove it from index
  $gitCheck = git ls-files --error-unmatch $f 2>$null
  if ($LASTEXITCODE -eq 0) {
    git rm --cached --ignore-unmatch $f | Out-Null
    Write-Host "Staged removal from git index: $f"
  }
}

Write-Host "If files were tracked by git, run the following to commit the removals:\n  git commit -m 'Remove root duplicate files after reorganization'\n  git push origin HEAD"

Write-Host "Cleanup script finished. Verify repository state and run tests or start the backend as needed."
