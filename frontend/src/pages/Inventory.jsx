import { useState, useEffect, useRef } from 'react';

function CoPilotVoice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const toggleListen = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    // Set to true so it keeps listening until manually stopped
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("Listening...");
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      if (event.error !== 'no-speech') {
        setTranscript("Error: " + event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="w-full bg-primary rounded-2xl relative overflow-hidden mb-8 shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/20 via-primary to-[#1a2e15] pointer-events-none"></div>
      <div className="relative z-10 p-8 flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h2 className="font-headline-lg text-white tracking-tight">Co-Pilot</h2>
          <p className="font-body-md text-primary-fixed-dim/80">Speak your inventory updates naturally.</p>
        </div>

        <button 
          onClick={toggleListen}
          aria-label="Microphone toggle" 
          className="relative group cursor-pointer"
        >
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-[#4A6741] opacity-40 blur-xl scale-125 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-2 border-primary-fixed/30 scale-110 animate-ping" style={{ animationDuration: '2s' }}></div>
            </>
          )}
          <div className={`relative w-32 h-32 rounded-full bg-[#4A6741] flex items-center justify-center shadow-[0_0_40px_rgba(74,103,65,0.8)] ring-4 ring-[#4A6741]/50 border border-white/10 z-10 transition-transform ${isListening ? 'scale-95' : 'hover:scale-105 active:scale-95'}`}>
            <span className="material-symbols-outlined text-[56px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          </div>
        </button>

        {isListening && (
          <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <p className="font-body-lg text-white/90 text-center leading-relaxed">
              "{transcript}"
            </p>
            {transcript === "Listening..." && (
              <div className="flex justify-center gap-1.5 mt-4">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inventory')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch inventory', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-bento-gap">
      <CoPilotVoice />

      <div className="mb-4">
        <h2 className="font-headline-lg text-on-surface tracking-tight">Farm Inventory</h2>
        <p className="font-body-md text-outline mt-1">Real-time status of your silos and warehouses.</p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-outline">Loading inventory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
          {items.map((item) => (
            <div key={item.id} className="bento-card rounded-xl p-6 flex flex-col group relative overflow-hidden transition-all duration-300 hover:border-primary-container hover:shadow-md">
              <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${item.status === 'Good' ? 'bg-primary' : 'bg-error'}`}></div>
              
              <div className="flex justify-between items-start mb-4 z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-on-primary-container shadow-sm border border-outline-variant/30 ${item.status === 'Good' ? 'bg-primary-container' : 'bg-error-container text-error'}`}>
                    <span className="material-symbols-outlined text-[24px]">
                      {item.type === 'crop' ? 'grass' : item.type === 'fertilizer' ? 'science' : 'water_drop'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-on-surface leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-1 text-outline mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span className="font-label-sm">{item.location}</span>
                    </div>
                  </div>
                </div>
                <button className="text-outline hover:text-on-surface p-1 rounded-full hover:bg-surface-variant transition-colors z-20">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              <div className="mt-auto z-10 pt-4 border-t border-outline-variant/30 flex items-end justify-between">
                <div>
                  <span className="font-label-sm text-outline uppercase tracking-wider mb-1 block">Current Stock</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-xl text-on-surface tracking-tight leading-none">{item.quantity.toLocaleString()}</span>
                    <span className="font-body-md text-on-surface-variant font-medium">{item.unit}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${item.status === 'Good' ? 'bg-secondary-container/50 border-secondary-container text-on-secondary-container' : 'bg-error-container/50 border-error-container text-error'}`}>
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.status === 'Good' ? 'check_circle' : 'warning'}
                    </span>
                    <span className="font-label-bold text-xs">{item.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
