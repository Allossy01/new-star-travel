while ($true) {
    Write-Host "$(Get-Date) - Starting watcher..." -ForegroundColor Cyan
    & "C:\Program Files\nodejs\node.exe" "C:\Users\elouf\new-star-travel\watcher.js"
    Write-Host "$(Get-Date) - Watcher stopped, restarting in 3s..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
}
