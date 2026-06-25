import { useState } from 'react';
import { Search, MapPin, Store, Navigation, CheckCircle2, AlertTriangle, ArrowRight, Home as HomeIcon, ShoppingCart, User } from 'lucide-react';
import { Shop } from '../types';
import { MAP_MOLYKO_PREVIEW, USER_AVATAR } from '../data';

interface CustomerHomeProps {
  shops: Shop[];
  onSelectShop: (shopId: string) => void;
  onNavigateToCart: () => void;
  cartCount: number;
}

export default function CustomerHome({
  shops,
  onSelectShop,
  onNavigateToCart,
  cartCount
}: CustomerHomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');

  const categories = ['All Items', 'Beverages', 'Food', 'Toiletries', 'Household'];

  // Filter shops based on search query or category
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Items' || 
                            shop.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()) ||
                            // or if search is "beverages" and matches category tags
                            (selectedCategory === 'Food' && shop.tags.some(t => t === 'Grocery' || t === 'Snacks'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Store className="text-emerald-600" size={24} />
            <h1 className="text-xl font-bold text-emerald-600">BueaMart</h1>
          </div>
          <button className="hover:bg-neutral-100 transition-all p-1 rounded-full focus:outline-none">
            <img
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 flex flex-col gap-5">
        {/* Search Bar */}
        <section className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors h-12 shadow-sm"
              placeholder="Search for products in Buea..."
            />
          </div>
        </section>

        {/* Categories Chips Slider */}
        <section className="w-full overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-2 w-max pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full rounded-2xl overflow-hidden shadow-sm border border-neutral-200 bg-white relative h-48">
          <img
            className="w-full h-full object-cover"
            alt="Molyko, Buea map layout"
            src={MAP_MOLYKO_PREVIEW}
          />
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-1.5">
            <MapPin className="text-emerald-600" size={14} />
            <span className="text-xs font-bold text-neutral-700">Molyko, Buea</span>
          </div>
        </section>

        {/* Results List */}
        <section className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-lg font-bold text-neutral-900">Nearby Shops</h2>
            <button className="text-emerald-600 text-xs font-bold hover:underline">View All</button>
          </div>

          {filteredShops.length === 0 ? (
            <div className="text-center py-8 bg-white border border-neutral-200 rounded-2xl">
              <Store className="mx-auto text-neutral-300 mb-2" size={40} />
              <p className="text-sm font-semibold text-neutral-500">No stores match your search</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All Items'); }} className="text-xs font-bold text-emerald-600 hover:underline mt-2">Clear filters</button>
            </div>
          ) : (
            filteredShops.map((shop) => (
              <article
                key={shop.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 flex items-center justify-center shrink-0">
                      {shop.logoUrl ? (
                        <img src={shop.logoUrl} alt={shop.name} className="w-full h-full object-cover" />
                      ) : (
                        <Store className="text-neutral-500" size={24} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-950 leading-tight flex items-center gap-1.5">
                        {shop.name}
                        {shop.verified && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded-full border border-emerald-200 font-extrabold uppercase">Verified</span>
                        )}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-neutral-400" /> {shop.distance}
                      </p>
                    </div>
                  </div>
                  <button className="text-emerald-600 hover:bg-neutral-50 p-2 rounded-full transition-colors focus:ring-2 focus:ring-emerald-600">
                    <Navigation size={18} />
                  </button>
                </div>

                {/* Stock indications shown for primary items */}
                {shop.id === 'molyko-supermarket' && (
                  <div className="mt-1 pt-3 border-t border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-400 mb-2">Searched Items Stock:</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center bg-neutral-50 px-2.5 py-2 rounded-xl border border-neutral-200 shadow-sm">
                        <span className="text-xs font-medium text-neutral-700">Milo (400g)</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <CheckCircle2 size={10} /> In Stock
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-neutral-50 px-2.5 py-2 rounded-xl border border-neutral-200 shadow-sm">
                        <span className="text-xs font-medium text-neutral-700">Nescafé (50g)</span>
                        <span className="bg-red-100 text-red-800 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <AlertTriangle size={10} /> Almost Out
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {shop.id === 'clerks-provision-store' && (
                  <div className="mt-1 pt-3 border-t border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-400 mb-2">Searched Items Stock:</p>
                    <div className="flex justify-between items-center bg-neutral-50 px-2.5 py-2 rounded-xl border border-neutral-200 shadow-sm">
                      <span className="text-xs font-medium text-neutral-700">Milo (400g)</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                        <CheckCircle2 size={10} /> In Stock
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-1 w-full">
                  <button
                    onClick={() => onSelectShop(shop.id)}
                    className="w-full bg-neutral-100 text-neutral-800 py-2.5 rounded-xl text-xs font-bold hover:bg-neutral-200 hover:text-neutral-900 transition-all flex items-center justify-center gap-1 cursor-pointer border border-neutral-200"
                  >
                    <span>View Shop Inventory</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white z-50 border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2">
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <HomeIcon size={20} className="fill-emerald-600/10" />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <Search size={20} />
          <span className="text-[10px] font-bold mt-1">Search</span>
        </button>
        <button
          onClick={onNavigateToCart}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 relative transition-all"
        >
          <ShoppingCart size={20} />
          <span className="text-[10px] font-bold mt-1">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-3 bg-orange-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
        <button className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <User size={20} />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
