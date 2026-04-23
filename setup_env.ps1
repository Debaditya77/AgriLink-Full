New-Item -ItemType Directory -Force -Path backend
New-Item -ItemType Directory -Force -Path static
Move-Item -Path *.html -Destination static\ -ErrorAction SilentlyContinue
if (Test-Path static\code.html) {
    Rename-Item -Path static\code.html -NewName dashboard.html
}
python -m venv venv
