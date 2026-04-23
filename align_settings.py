import os

with open('code.html', 'r', encoding='utf-8') as f:
    code_content = f.read()

with open('settings.html', 'r', encoding='utf-8') as f:
    settings_content = f.read()

# Extract settings inner main content
start_settings = settings_content.find('<!-- Settings Content: Bento Grid -->')
end_settings = settings_content.find('</main>')
if start_settings != -1 and end_settings != -1:
    settings_main_inner = settings_content[start_settings:end_settings]
else:
    print("Could not find settings inner content bounds")
    exit(1)

# Extract code.html wrapper
start_main_tag = '<main class="pt-24 pb-28 lg:pb-8 pl-0 lg:pl-64 min-h-screen px-4 md:px-margin">'
start_code_main = code_content.find(start_main_tag) + len(start_main_tag)
end_code_main = code_content.find('</main>', start_code_main)

if start_code_main != -1 and end_code_main != -1:
    code_top = code_content[:start_code_main]
    code_bottom = code_content[end_code_main:]
else:
    print("Could not find code.html main content bounds")
    exit(1)

new_settings_content = code_top + '\n' + settings_main_inner + '\n' + code_bottom

# Now update active states in new_settings_content
# Desktop: Move active classes from Dashboard to Settings
new_settings_content = new_settings_content.replace(
    '<a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-stone-200/50 dark:bg-stone-800/50 text-[#4A6741] dark:text-stone-50 font-bold border-r-4 border-[#4A6741] transition-all duration-300 ease-in-out font-manrope text-sm" href="code.html">',
    '<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all duration-300 ease-in-out font-manrope text-sm" href="code.html">'
)
new_settings_content = new_settings_content.replace(
    '<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1;">dashboard</span>',
    '<span class="material-symbols-outlined">dashboard</span>'
)

new_settings_content = new_settings_content.replace(
    '<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all duration-300 ease-in-out font-manrope text-sm" href="settings.html">',
    '<a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-stone-200/50 dark:bg-stone-800/50 text-[#4A6741] dark:text-stone-50 font-bold border-r-4 border-[#4A6741] transition-all duration-300 ease-in-out font-manrope text-sm" href="settings.html">'
)
new_settings_content = new_settings_content.replace(
    '<span class="material-symbols-outlined">settings</span>',
    '<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1;">settings</span>'
)

# Mobile: Update active class from Home to none
new_settings_content = new_settings_content.replace(
    '<a class="flex flex-col items-center justify-center bg-[#4A6741] text-white rounded-xl px-6 py-2 shadow-inner Active: scale-90 transition-transform duration-150 group" href="code.html">',
    '<a class="flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 px-4 py-2 hover:text-[#4A6741] dark:hover:text-[#6a8d5e] transition-colors group" href="code.html">'
)
new_settings_content = new_settings_content.replace(
    '<span class="material-symbols-outlined mb-1" style="font-variation-settings: \'FILL\' 1;">home</span>',
    '<span class="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">home</span>'
)

# Replace document title
new_settings_content = new_settings_content.replace('<title>AgriLink - Command Dashboard</title>', '<title>AgriLink - Settings</title>')

with open('settings.html', 'w', encoding='utf-8') as f:
    f.write(new_settings_content)

print("Settings aligned successfully")
