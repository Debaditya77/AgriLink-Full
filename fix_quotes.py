import os

files = ['inventory.html', 'scanner.html', 'marketplace.html', 'settings.html']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix broken mobile home icon class
        content = content.replace('class="material-symbols-outlined mb-1" group-hover:scale-110 transition-transform"', 'class="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform"')
        
        # Fix broken active icon style
        content = content.replace('class="material-symbols-outlined mb-1 style="', 'class="material-symbols-outlined mb-1" style="')

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print("Quotes fixed!")
