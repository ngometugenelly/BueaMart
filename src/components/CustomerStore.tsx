import { useState } from 'react';
import { ArrowLeft, Search, MessageSquare, Plus, ShoppingCart, User, Home, Store } from 'lucide-react';
import { Shop, Product } from '../types';

interface CustomerStoreProps {
  shop: Shop;
  products: Product[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onNavigateToCart: () => void;
  cartCount: number;
}

export default function CustomerStore({
  shop,
  products,
  onBack,
  onAddToCart,
  onNavigateToCart,
  cartCount
}: CustomerStoreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');

  const shopProducts = products.filter(p => p.shopId === shop.id);
  const categories = ['All Items', ...Array.from(new Set(shopProducts.map(p => p.category)))];

  const filteredProducts = shopProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Items' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadgeColor = (status: Product['status']) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-600 text-white';
      case 'Limited':
        return 'bg-orange-500 text-white';
      case 'Almost Out':
      case 'Out':
        return 'bg-red-600 text-white';
      default:
        return 'bg-neutral-500 text-white';
    }
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-24">
      {/* TopAppBar Mobile */}
      <header className="flex justify-between items-center w-full px-4 h-14 bg-white border-b border-neutral-200 sticky top-0 z-40">
        <button
          onClick={onBack}
          className="text-neutral-600 hover:bg-neutral-100 p-2 -ml-2 rounded-full transition-colors focus:outline-none"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-emerald-600">BueaMart</h1>
        <button
          onClick={onNavigateToCart}
          className="relative text-neutral-600 hover:bg-neutral-100 p-2 rounded-full transition-colors"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-orange-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto">
        {/* Shop Profile Header */}
        <section className="bg-white rounded-b-2xl shadow-sm border-b border-neutral-200 overflow-hidden">
          <div className="relative h-48 md:h-56 bg-neutral-100">
            {shop.image ? (
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                <Store size={48} className="text-emerald-200" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="px-4 py-4 relative -mt-10 bg-white rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-1 flex items-center gap-1.5 flex-wrap">
                  {shop.name}
                  {shop.verified && (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded-full border border-emerald-200 font-extrabold uppercase shrink-0">Verified</span>
                  )}
                </h2>
                <div className="flex items-center gap-1 text-xs text-neutral-500 mb-2">
                  <MapPinIcon className="text-neutral-400" />
                  <span>{shop.address}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/237600000000?text=Hello%20${encodeURIComponent(shop.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all text-xs font-bold"
              >
                <MessageSquare size={14} />
                <span>Contact</span>
              </a>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {shop.tags.map(tag => (
                <span key={tag} className="bg-neutral-50 text-neutral-600 px-3 py-1 rounded-full text-xs font-medium border border-neutral-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Category Filter Sticky Area */}
        <div className="px-4 bg-neutral-50 sticky top-14 z-30 pt-4 pb-3">
          {/* Search Bar inside Store */}
          <div className="relative w-full mb-3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 border border-neutral-200 placeholder:text-neutral-400 shadow-sm"
              placeholder={`Search ${shop.name}...`}
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <section className="px-4 pb-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">No items available in this category</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All Items'); }} className="text-xs font-bold text-emerald-600 hover:underline mt-2">View all items</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col h-full relative group hover:shadow-md transition-shadow"
                >
                  {/* Stock status badge */}
                  <div className={`absolute top-2 right-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase ${getStatusBadgeColor(product.status)}`}>
                    {product.status}
                  </div>

                  {/* Image Container */}
                  <div className="relative pt-[100%] bg-neutral-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover p-3.5"
                    />
                  </div>

                  {/* Info details */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 mb-1 leading-normal">
                      {product.name}
                    </h3>
                    <div className="text-neutral-400 text-[10px] mb-2">{product.category}</div>
                    <div className="mt-auto flex justify-between items-end">
                      <span className="text-sm font-bold text-emerald-600">
                        {product.price.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                    title="Add to cart"
                  >
                    <Plus size={18} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white z-50 border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2">
        <button onClick={onBack} className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <Home size={20} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <Search size={20} className="fill-emerald-600/10" />
          <span className="text-[10px] font-bold mt-1">Search</span>
        </button>
        <button
          onClick={onNavigateToCart}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 relative transition-all"
        >
          <ShoppingCart size={20} />
          <span className="text-[10px] font-bold mt-1">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-2 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white">
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

// Simple MapPin SVG mock or lucide fallback since the design uses material icons
function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
