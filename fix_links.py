from html.parser import HTMLParser
import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

mapping = {
    'dashboard': 'code.html',
    'inventory_2': 'inventory.html',
    'photo_camera': 'scanner.html',
    'handshake': 'marketplace.html',
    'home': 'code.html',
    'mic': 'inventory.html',
    'center_focus_weak': 'scanner.html',
    'storefront': 'marketplace.html',
    'settings': 'settings.html'
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # A simple search and replace approach based on exact material symbols strings
    # The structure is usually <a href="#">\n<span class="material-symbols-outlined...">ICON_NAME</span>
    # We can split the content and replace href="#" if the subsequent icon matches
    
    parts = content.split('href="#"')
    new_content = parts[0]
    
    for i in range(1, len(parts)):
        # Look ahead in parts[i] to find the first material-symbols-outlined text
        chunk = parts[i][:200] # look at the next 200 chars
        
        replacement_href = '#'
        for icon, link in mapping.items():
            # Check if this icon is the first text inside the material-symbols-outlined span
            if f'>{icon}<' in chunk or f'{icon}\n' in chunk:
                replacement_href = link
                break
        
        new_content += f'href="{replacement_href}"' + parts[i]

    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Done with robust replace")
