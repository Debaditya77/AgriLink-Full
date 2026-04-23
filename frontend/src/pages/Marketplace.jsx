import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Marketplace() {
  const { currentUser } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'mine'
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    offer_type: 'SELL',
    crop_name: '',
    price: '',
    unit: 'kg',
    requirement_quantity: ''
  });

  const fetchOffers = () => {
    setLoading(true);
    fetch('/api/marketplace')
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch marketplace offers', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        buyer_name: currentUser?.displayName || 'Anonymous Farmer',
        offer_type: formData.offer_type,
        price: parseFloat(formData.price),
        unit: formData.unit,
        crop_name: formData.crop_name,
        requirement_quantity: parseFloat(formData.requirement_quantity),
        distance_km: Math.floor(Math.random() * 50) + 1, // Simulated distance
        is_premium: false
      };

      await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setShowForm(false);
      setFormData({ offer_type: 'SELL', crop_name: '', price: '', unit: 'kg', requirement_quantity: '' });
      fetchOffers();
    } catch (err) {
      console.error('Failed to create offer', err);
    }
  };

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(o => o.buyer_name === (currentUser?.displayName || 'Anonymous Farmer'));

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-bento-gap">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
        <div>
          <h2 className="font-headline-lg text-on-surface tracking-tight">Marketplace</h2>
          <p className="font-body-md text-outline mt-1">Connect with local buyers and sellers.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-primary text-white font-label-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-fixed-variant transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Listing
        </button>
      </div>

      <div className="flex border-b border-outline-variant mb-4">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 font-label-bold transition-colors ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          All Listings
        </button>
        <button 
          onClick={() => setActiveTab('mine')}
          className={`px-6 py-3 font-label-bold transition-colors ${activeTab === 'mine' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          My Listings
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 flex flex-col items-center justify-center text-outline">
          <span className="material-symbols-outlined animate-spin text-4xl mb-4">sync</span>
          Loading marketplace offers...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-bento-gap">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">storefront</span>
              <p className="font-body-md text-on-surface-variant">No offers found.</p>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-0 overflow-hidden flex flex-col md:flex-row relative group hover:border-primary-container transition-colors duration-300">
                <div className={`w-full md:w-1.5 h-1.5 md:h-auto absolute top-0 left-0 md:bottom-0 ${offer.offer_type === 'BUY' ? 'bg-error' : 'bg-primary-container'}`}></div>
                <div className="p-container-padding flex-1 flex flex-col md:flex-row items-start md:items-center gap-6 z-10 bg-surface-container-lowest/90 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-headline-md border border-outline-variant ${offer.is_premium ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-variant'}`}>
                      {offer.buyer_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface leading-tight">{offer.buyer_name}</h3>
                      <div className="flex items-center gap-1 text-outline mt-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        <span className="font-label-sm">{offer.distance_km} km away</span>
                        {offer.is_premium && (
                          <>
                            <span className="mx-1">•</span>
                            <span className="font-label-sm text-secondary">Premium User</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                  <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0">
                    <span className={`font-label-sm uppercase tracking-wider mb-1 px-2 py-0.5 rounded-md ${offer.offer_type === 'BUY' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'}`}>
                      {offer.offer_type === 'BUY' ? 'Wants to Buy' : 'Selling'}
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-headline-lg text-on-surface leading-none">${offer.price.toFixed(2)}</span>
                      <span className="font-body-md text-on-surface-variant">/ {offer.unit}</span>
                    </div>
                    <span className="font-label-bold text-on-surface-variant mt-1">{offer.crop_name}</span>
                    <span className="font-label-sm text-outline">Qty: {offer.requirement_quantity.toLocaleString()} {offer.unit}</span>
                  </div>
                </div>
                {offer.buyer_name !== currentUser?.displayName && (
                  <div className="bg-surface-container-high md:w-32 flex flex-row md:flex-col items-center justify-center p-4 gap-2 cursor-pointer hover:bg-primary hover:text-white transition-colors group-hover:bg-surface-variant">
                    <span className="material-symbols-outlined text-3xl text-outline group-hover:text-white md:-rotate-0 rotate-90 transition-transform">chat</span>
                    <span className="font-label-bold text-outline group-hover:text-white md:hidden block">Contact</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-headline-md text-on-surface">Create Listing</h3>
              <button onClick={() => setShowForm(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateOffer} className="p-6 space-y-4">
              <div>
                <label className="block font-label-bold text-on-surface-variant mb-1">Listing Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="offer_type" value="SELL" checked={formData.offer_type === 'SELL'} onChange={(e) => setFormData({...formData, offer_type: e.target.value})} className="text-primary focus:ring-primary" />
                    <span className="font-body-md">I want to Sell</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="offer_type" value="BUY" checked={formData.offer_type === 'BUY'} onChange={(e) => setFormData({...formData, offer_type: e.target.value})} className="text-primary focus:ring-primary" />
                    <span className="font-body-md">I want to Buy</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-label-bold text-on-surface-variant mb-1">Crop Name</label>
                <input required type="text" value={formData.crop_name} onChange={(e) => setFormData({...formData, crop_name: e.target.value})} className="w-full bg-surface-variant border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" placeholder="e.g. Organic Tomatoes" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-bold text-on-surface-variant mb-1">Quantity</label>
                  <input required type="number" min="0" step="0.1" value={formData.requirement_quantity} onChange={(e) => setFormData({...formData, requirement_quantity: e.target.value})} className="w-full bg-surface-variant border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" placeholder="e.g. 500" />
                </div>
                <div>
                  <label className="block font-label-bold text-on-surface-variant mb-1">Unit</label>
                  <select value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full bg-surface-variant border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary">
                    <option value="kg">kg</option>
                    <option value="tons">tons</option>
                    <option value="lbs">lbs</option>
                    <option value="units">units</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-label-bold text-on-surface-variant mb-1">Price per {formData.unit}</label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-on-surface-variant">$</span>
                  <input required type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-surface-variant border border-outline-variant rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:border-primary" placeholder="0.00" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 font-label-bold text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors border border-outline-variant">Cancel</button>
                <button type="submit" className="flex-1 py-3 font-label-bold text-white bg-primary hover:bg-primary-fixed-variant rounded-xl transition-colors shadow-sm">Post Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
