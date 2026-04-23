import { useState, useRef, useEffect } from 'react';

export default function TopAppBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-lg border-b border-white/20 dark:border-stone-800/50 shadow-sm flex justify-between items-center px-8 py-4">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger (Decorative for this scope) */}
        <button className="lg:hidden text-stone-800 dark:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors p-2 rounded-full scale-95 duration-200">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="text-2xl font-extrabold tracking-tight text-[#4A6741] dark:text-[#6a8d5e] font-headline-lg">
          AgriLink
        </div>
      </div>
      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className={`text-stone-800 dark:text-stone-100 transition-colors p-2 rounded-full scale-95 duration-200 relative ${showNotifications ? 'bg-stone-200/50 dark:bg-stone-800/50' : 'hover:bg-stone-200/50 dark:hover:bg-stone-800/50'}`}
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>

        {showNotifications && (
          <div className="absolute top-12 right-0 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-lg p-2 animate-fade-in">
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-stone-400 dark:text-stone-600 text-3xl mb-2">notifications_off</span>
              <p className="font-body-sm text-stone-500 dark:text-stone-400">No new notifications</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
