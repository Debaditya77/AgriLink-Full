import os

static_dir = 'static'
html_files = [f for f in os.listdir(static_dir) if f.endswith('.html')]

for file in html_files:
    filepath = os.path.join(static_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace code.html with dashboard.html
    new_content = content.replace('code.html', 'dashboard.html')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Links updated to dashboard.html")
