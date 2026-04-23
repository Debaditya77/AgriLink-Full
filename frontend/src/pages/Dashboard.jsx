export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Command Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Welcome back. Here's your farm's status overview.</p>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap auto-rows-min">
        {/* Large Card: Live Crop Prices */}
        <div className="bento-card rounded-xl p-container-padding md:col-span-8 md:row-span-2 flex flex-col min-h-[360px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">monitoring</span>
                Live Crop Prices
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Regional averages (Last 30 Days)</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-bold text-label-bold border border-outline-variant/50">Wheat</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-bold text-label-bold border border-primary/20">Soybeans</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full h-full flex items-end">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-full h-full border-b border-l border-on-surface-variant/20 grid grid-cols-5 grid-rows-4">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="border-t border-r border-on-surface-variant/20"></div>
                ))}
              </div>
            </div>
            <svg className="w-full h-48 drop-shadow-sm z-10" preserveAspectRatio="none" viewBox="0 0 100 50">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--tw-colors-primary)" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="var(--tw-colors-primary)" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,10 Q10,15 20,12 T40,25 T60,35 T80,42 T100,45 L100,50 L0,50 Z" fill="url(#chartGradient)"></path>
              <path d="M0,10 Q10,15 20,12 T40,25 T60,35 T80,42 T100,45" fill="none" stroke="var(--tw-colors-primary)" strokeLinecap="round" strokeWidth="2"></path>
              <circle cx="80" cy="42" fill="var(--tw-colors-error)" r="2"></circle>
              <circle cx="100" cy="45" fill="var(--tw-colors-error)" r="2"></circle>
            </svg>
            <div className="absolute top-4 right-0 bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-error text-sm">trending_down</span>
              <span className="font-label-bold text-label-bold text-on-surface">-4.2%</span>
            </div>
          </div>
        </div>

        {/* Small Card 1: Local Weather Alert */}
        <div className="bento-card rounded-xl p-container-padding md:col-span-4 flex flex-col justify-between border-l-4 border-l-error">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>thunderstorm</span>
              </div>
              <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-sm">Local Weather Alert</h3>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface font-semibold">Severe Squall Warning</p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-snug">High winds and heavy precipitation expected starting 18:00. Secure loose equipment in Sector 4.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center">
            <span className="font-label-sm text-label-sm text-error font-medium">Action Required</span>
            <button className="font-label-bold text-label-bold text-primary hover:text-primary-fixed-variant transition-colors">View Details</button>
          </div>
        </div>

        {/* Small Card 2: Cold Storage Availability */}
        <div className="bento-card rounded-xl p-container-padding md:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary">ac_unit</span>
              <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-sm">Cold Storage</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-headline-xl text-headline-xl text-on-surface">85<span className="text-xl">%</span></span>
              <span className="font-body-md text-body-md text-on-surface-variant pb-1">Capacity</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              <span>Unit A (Apples)</span>
              <span>Critical Level</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-2.5 overflow-hidden">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-3">Estimated full capacity in 48 hrs based on current harvest rate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
