import { useState } from 'react';
import { ArrowLeft, Minus, Plus, MapPin, Truck, Store, ArrowRight, Home, Search, ShoppingCart, User } from 'lucide-react';
import { CartItem } from '../types';

interface CustomerCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onCheckout: (details: {
    type: 'Delivery' | 'Pickup';
    address: string;
    instructions: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
  }) => void;
  onBack: () => void;
}

export default function CustomerCart({
  cartItems,
  onUpdateQuantity,
  onCheckout,
  onBack
}: CustomerCartProps) {
  const [deliveryType, setDeliveryType] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [address, setAddress] = useState('Near Checkpoint, Molyko');
  const [instructions, setInstructions] = useState('');

  // Computations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryType === 'Delivery' ? (subtotal > 0 ? 500 : 0) : 0;
  const total = subtotal + deliveryFee;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleProceed = () => {
    if (cartItems.length === 0) return;
    onCheckout({
      type: deliveryType,
      address: deliveryType === 'Delivery' ? address : 'In-store Pickup',
      instructions,
      subtotal,
      deliveryFee,
      total
    });
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="text-neutral-600 hover:bg-neutral-100 p-2 -ml-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-emerald-600">Your Cart</h1>
          <div className="text-xs text-neutral-500 font-bold">{totalItems} Items</div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 shadow-sm mt-4">
            <ShoppingCart className="mx-auto text-neutral-300 mb-4" size={56} />
            <h2 className="text-lg font-bold text-neutral-700">Your Cart is Empty</h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xs mx-auto">Add items from supermarkets in Buea to see them here.</p>
            <button
              onClick={onBack}
              className="mt-6 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-neutral-100 relative overflow-hidden"
                >
                  <div className="w-20 h-20 bg-neutral-50 border border-neutral-150 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
                    {item.product.status === 'Limited' && (
                      <div className="absolute top-1 right-1 bg-amber-500 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md z-10">
                        Limited
                      </div>
                    )}
                    <img
                      alt={item.product.name}
                      className="w-full h-full object-cover p-1"
                      src={item.product.image}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-neutral-400">{item.product.category}</p>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-sm font-bold text-emerald-600">
                        {(item.product.price * item.quantity).toLocaleString()} XAF
                      </span>
                      <div className="flex items-center bg-neutral-100 border border-neutral-200 rounded-lg h-8 shadow-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-emerald-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-neutral-500 hover:text-emerald-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery vs Pickup Toggle */}
            <div className="bg-white rounded-2xl p-1 flex shadow-sm border border-neutral-200">
              <button
                onClick={() => setDeliveryType('Delivery')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  deliveryType === 'Delivery'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <Truck size={14} />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => setDeliveryType('Pickup')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  deliveryType === 'Pickup'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <Store size={14} />
                <span>Pickup</span>
              </button>
            </div>

            {/* Delivery Address Input */}
            {deliveryType === 'Delivery' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700">
                  Delivery Address (Molyko Area)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-neutral-400">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-neutral-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl py-3 pl-10 pr-4 text-xs text-neutral-800 placeholder-neutral-400 transition-all outline-none h-12 shadow-sm"
                    placeholder="e.g., Near Checkpoint, Molyko"
                  />
                </div>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-white border border-neutral-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl p-3 text-xs text-neutral-800 placeholder-neutral-400 transition-all outline-none resize-none h-20 mt-2 shadow-sm"
                  placeholder="Any specific instructions for the rider? (Optional)"
                />
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 space-y-3">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">Order Summary</h3>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Subtotal ({totalItems} items)</span>
                <span>{subtotal.toLocaleString()} XAF</span>
              </div>
              {deliveryType === 'Delivery' && (
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Estimated Delivery Fee</span>
                  <span>{deliveryFee.toLocaleString()} XAF</span>
                </div>
              )}
              <div className="h-px w-full bg-neutral-100 my-1"></div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-bold text-neutral-900">Total</span>
                <span className="text-base font-extrabold text-emerald-600">
                  {total.toLocaleString()} XAF
                </span>
              </div>
            </div>

            {/* Spacer for sticky footer */}
            <div className="h-16"></div>
          </>
        )}
      </main>

      {/* Sticky Checkout Action Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-3 border-t border-neutral-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
          <button
            onClick={handleProceed}
            className="w-full h-12 bg-orange-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-orange-600 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <span>Proceed to Payment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white z-50 border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2">
        <button onClick={onBack} className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <Home size={20} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <Search size={20} />
          <span className="text-[10px] font-bold mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1 relative">
          <ShoppingCart size={20} className="fill-emerald-600/10" />
          <span className="text-[10px] font-bold mt-1">Cart</span>
          {totalItems > 0 && (
            <span className="absolute top-1 right-2 bg-orange-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {totalItems}
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
