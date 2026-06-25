import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, MapPin, Plus, Minus, CheckCircle, ReceiptText, Layers, Store } from 'lucide-react';
import { MAP_MOLYKO_PREVIEW } from '../data';
import { Shop } from '../types';

interface MerchantRegisterProps {
  onRegisterSuccess: (newShop: Shop) => void;
  onNavigateToOrders: () => void;
  onNavigateToCatalogue: () => void;
}

export default function MerchantRegister({
  onRegisterSuccess,
  onNavigateToOrders,
  onNavigateToCatalogue
}: MerchantRegisterProps) {
  const [shopName, setShopName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [openingTime, setOpeningTime] = useState('07:00 AM');
  const [closingTime, setOpeningTimeEnd] = useState('09:00 PM');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const neighborhoods = ['Molyko', 'Great Soppo', 'Buea Town', 'Muea', 'Bomaka', 'Mile 17'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim()) {
      setError('Please enter a shop name');
      return;
    }
    if (!neighborhood) {
      setError('Please select a neighborhood');
      return;
    }
    if (!whatsapp || whatsapp.length < 8) {
      setError('Please enter a valid 9-digit WhatsApp number');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);

      const newShop: Shop = {
        id: shopName.toLowerCase().replace(/\s+/g, '-'),
        name: shopName,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGDzvpM4FsBVxrwauq7b7q4BXjMYrZSOyaMla66h6bcJPGTiE9Jb-dznHjZUD-8fDphaOIGA7BDa6x4MzFU6qx_QpYb5miMJZT4iL5BlaRn7ZrvRFhdkAjsdeEr5WhI2nFDAbacMu8KmJSlpqWg6F3Rj7Ce4aKgedFiN7qWXcT5OX3NRZWi1TukHsB8xqeUU2VF5wdp9gSYOZ2Kc0uMHPQA44O4Jy4r2uRg539TwPd3_Jm0j0MnDpcM6sOMKbzhFxuSQz0RDjgj-Uv', // fallback banner
        distance: '1.5km away',
        verified: true,
        neighborhood,
        address: `Near ${neighborhood} Junction, Buea`,
        tags: ['Grocery', 'Beverages', 'Household']
      };

      setTimeout(() => {
        onRegisterSuccess(newShop);
        setIsSuccess(false);
        setShopName('');
        setNeighborhood('');
        setWhatsApp('');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-24 text-left">
      {/* TopAppBar */}
      <header className="bg-white shadow-sm flex justify-between items-center w-full px-4 h-14 sticky top-0 z-40">
        <button
          onClick={onNavigateToOrders}
          className="text-neutral-600 p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-extrabold text-emerald-600">Register Shop</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
        <div className="text-center mb-1">
          <h2 className="text-xl font-bold text-neutral-900 mb-1">Join BueaMart</h2>
          <p className="text-xs text-neutral-500">Set up your store and reach the entire Buea community.</p>
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-xl text-center font-semibold">
            {error}
          </div>
        )}

        {isSuccess ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 flex flex-col items-center justify-center text-center gap-4 py-16 animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="stroke-[3]" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Shop Registered Successfully!</h3>
            <p className="text-xs text-neutral-500 max-w-[250px] leading-relaxed">
              Your storefront is now verified and active! Redirecting to the merchant order dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white rounded-2xl p-4 shadow-sm border border-neutral-200">
            {/* Cover Photo Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Shop Cover Photo</label>
              <div className="relative w-full h-40 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors overflow-hidden group">
                <UploadCloud size={32} className="text-neutral-400 mb-2 group-hover:text-emerald-600 transition-colors" />
                <span className="text-xs font-bold text-neutral-500 group-hover:text-emerald-600 transition-colors">Tap to upload cover</span>
              </div>
            </div>

            {/* Shop Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="shopName">Shop Name</label>
              <input
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors h-[48px]"
                placeholder="e.g. Molyko Supermarket"
                type="text"
              />
            </div>

            {/* Neighborhood Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="neighborhood">Neighborhood</label>
              <select
                id="neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="appearance-none w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors h-[48px]"
              >
                <option value="">Select neighborhood</option>
                {neighborhoods.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* WhatsApp Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="whatsapp">WhatsApp Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-neutral-200 bg-neutral-100 text-neutral-500 text-xs font-bold h-[48px]">
                  +237
                </span>
                <input
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsApp(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className="flex-1 bg-neutral-50 border border-neutral-200 rounded-r-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors h-[48px]"
                  placeholder="6XX XXX XXX"
                  type="tel"
                />
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Opening Hours</label>
              <div className="flex gap-2 items-center">
                <select
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:outline-none h-[48px]"
                >
                  <option value="06:00 AM">06:00 AM</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="08:00 AM">08:00 AM</option>
                </select>
                <span className="text-neutral-400 text-xs font-bold shrink-0 px-1">to</span>
                <select
                  value={closingTime}
                  onChange={(e) => setOpeningTimeEnd(e.target.value)}
                  className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-800 focus:outline-none h-[48px]"
                >
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                </select>
              </div>
            </div>

            {/* Map Picker Placeholder */}
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Shop Location (GPS)</label>
                <button
                  type="button"
                  className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <MapPin size={12} /> Use Current
                </button>
              </div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                <img className="w-full h-full object-cover opacity-80" alt="Buea Location picker map" src={MAP_MOLYKO_PREVIEW} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-red-600 text-white p-2.5 rounded-full shadow-lg transform -translate-y-1/2 border-2 border-white">
                    <MapPin size={18} className="fill-white/10" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1.5">
                  <button className="bg-white p-1.5 rounded-lg shadow-sm text-neutral-700 hover:bg-neutral-100 border border-neutral-200" type="button">
                    <Plus size={14} />
                  </button>
                  <button className="bg-white p-1.5 rounded-lg shadow-sm text-neutral-700 hover:bg-neutral-100 border border-neutral-200" type="button">
                    <Minus size={14} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-neutral-400 text-center mt-1">Drag map to position pin exactly on your shop.</p>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white h-[48px] rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
              type="submit"
            >
              <span>{loading ? 'Registering Shop...' : 'Register Shop'}</span>
            </button>
          </form>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2 z-45">
        <button
          onClick={onNavigateToOrders}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all"
        >
          <ReceiptText size={20} />
          <span className="text-[10px] font-bold mt-1">Orders</span>
        </button>
        <button
          onClick={onNavigateToCatalogue}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all"
        >
          <Layers size={20} />
          <span className="text-[10px] font-bold mt-1">Catalogue</span>
        </button>
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <Store size={20} className="fill-emerald-600/10" />
          <span className="text-[10px] font-bold mt-1">Register Shop</span>
        </button>
      </nav>
    </div>
  );
}
