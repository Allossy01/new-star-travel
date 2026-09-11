$msg = if ($args[0]) { $args[0] } else { "update" }
git add .
git commit -m $msg
git push
Write-Host "Deployed! Vercel will update in ~30 seconds." -ForegroundColor Green
