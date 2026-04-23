import os
import re

html_files = ['inventory.html', 'scanner.html', 'marketplace.html', 'settings.html']

with open('code.html', 'r', encoding='utf-8') as f:
    code_content = f.read()

# We want to use code.html as the ultimate wrapper.
start_code_main = code_content.find('<main ')
end_code_main = code_content.find('</main>') + len('</main>')

code_top = code_content[:start_code_main]
code_bottom = code_content[end_code_main:]

active_class_desktop = 'bg-stone-200/50 dark:bg-stone-800/50 text-[#4A6741] dark:text-stone-50 font-bold border-r-4 border-[#4A6741]'
inactive_class_desktop = 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'

active_class_mobile = 'bg-[#4A6741] text-white rounded-xl px-6 py-2 shadow-inner Active: scale-90 transition-transform duration-150'
inactive_class_mobile = 'text-stone-500 dark:text-stone-400 px-4 py-2 hover:text-[#4A6741] dark:hover:text-[#6a8d5e] transition-colors'

mapping = {
    'code.html': 'Dashboard',
    'inventory.html': 'Inventory',
    'scanner.html': 'Scanner',
    'marketplace.html': 'Marketplace',
    'settings.html': 'Settings'
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    main_start_idx = file_content.find('<main ')
    if main_start_idx == -1:
        main_start_idx = file_content.find('<main>')
        
    main_end_idx = file_content.find('</main>')
    
    if main_start_idx == -1 or main_end_idx == -1:
        print(f"Skipping {file}: Could not find <main> tags")
        continue
        
    # Extract from <main ... to </main>
    # For settings.html, we need to extract from <main ... to </main>, but we ALSO need to remove its inner header
    # wait, earlier we saw settings.html had an inner header that we bypassed by using <!-- Settings Content: Bento Grid -->
    # Since we are keeping <main>, let's just do a manual replace for settings.html's inner header.
    inner_content = file_content[main_start_idx:main_end_idx + len('</main>')]
    if file == 'settings.html':
        bento_start = inner_content.find('<!-- Settings Content: Bento Grid -->')
        if bento_start != -1:
            main_tag_end = inner_content.find('>') + 1
            inner_content = inner_content[:main_tag_end] + '\n' + inner_content[bento_start:]

    # Now create the new content using code.html wrapper
    new_content = code_top + inner_content + code_bottom
    
    # We need to swap the active state from 'code.html' (Dashboard) to the target file.
    # First, make Dashboard inactive.
    new_content = new_content.replace(active_class_desktop, inactive_class_desktop, 1) # only first occurrence (Dashboard)
    new_content = new_content.replace('style="font-variation-settings: \'FILL\' 1;">dashboard', '>dashboard')
    
    new_content = new_content.replace(active_class_mobile, inactive_class_mobile, 1) # first occurrence (Home)
    new_content = new_content.replace('style="font-variation-settings: \'FILL\' 1;">home', 'group-hover:scale-110 transition-transform">home')

    # Then, make target file active.
    # It requires a regex or careful replacement because we don't know exactly how the target anchor looks.
    # But since new_content is cloned from code.html, the target anchor currently has `inactive_class_desktop` and `href="file"`
    
    # Desktop
    desktop_pattern = f'<a class="flex items-center gap-3 px-4 py-3 rounded-lg {inactive_class_desktop} transition-all duration-300 ease-in-out font-manrope text-sm" href="{file}">'
    desktop_replacement = f'<a class="flex items-center gap-3 px-4 py-3 rounded-lg {active_class_desktop} transition-all duration-300 ease-in-out font-manrope text-sm" href="{file}">'
    new_content = new_content.replace(desktop_pattern, desktop_replacement)
    
    # Mobile
    mobile_pattern = f'<a class="flex flex-col items-center justify-center {inactive_class_mobile} group" href="{file}">'
    mobile_replacement = f'<a class="flex flex-col items-center justify-center {active_class_mobile} group" href="{file}">'
    new_content = new_content.replace(mobile_pattern, mobile_replacement)
    
    # Fill icon
    icon_map = {'inventory.html': 'inventory_2', 'scanner.html': 'photo_camera', 'marketplace.html': 'handshake', 'settings.html': 'settings'}
    if file in icon_map:
        icon = icon_map[file]
        new_content = new_content.replace(f'>{icon}</span>', f' style="font-variation-settings: \'FILL\' 1;">{icon}</span>', 1)
        # Mobile fill
        m_icon_map = {'inventory.html': 'mic', 'scanner.html': 'center_focus_weak', 'marketplace.html': 'storefront'}
        if file in m_icon_map:
            m_icon = m_icon_map[file]
            new_content = new_content.replace(f'group-hover:scale-110 transition-transform">{m_icon}</span>', f'style="font-variation-settings: \'FILL\' 1;">{m_icon}</span>', 1)

    # Title
    new_content = new_content.replace('<title>AgriLink - Command Dashboard</title>', f'<title>AgriLink - {mapping[file]}</title>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("All files perfectly aligned with code.html wrapper!")
