$historyPath = "$env:APPDATA\Code\User\History"
if (Test-Path $historyPath) {
    Get-ChildItem -Path $historyPath -Recurse -File | Select-String -Pattern "export const AdminDashboard: React.FC" -List | Select-Object Path, Line | Select-Object -First 10
} else {
    Write-Host "No history found at $historyPath"
}
