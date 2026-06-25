import { ShoppingBag, Store, Bike, ChevronRight, HelpCircle } from 'lucide-react';
import { Perspective } from '../types';

interface PerspectiveSwitcherProps {
  currentPerspective: Perspective;
  setPerspective: (p: Perspective) => void;
  onReset: () => void;
}

export default function PerspectiveSwitcher({
  currentPerspective,
  setPerspective,
  onReset
}: PerspectiveSwitcherProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end font-sans">
      <div className="bg-white/95 backdrop-blur-md shadow-lg border border-neutral-200 rounded-2xl p-3 flex flex-col gap-2 max-w-xs transition-all duration-300">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-1 px-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Role Switcher</span>
          <button 
            onClick={onReset}
            className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full font-semibold transition-colors"
            title="Reset simulation to default state"
          >
            Reset App
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setPerspective('customer')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentPerspective === 'customer'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            <ShoppingBag size={18} className="mb-1" />
            <span className="text-[10px] font-bold">Customer</span>
          </button>

          <button
            onClick={() => setPerspective('merchant')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentPerspective === 'merchant'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            <Store size={18} className="mb-1" />
            <span className="text-[10px] font-bold">Merchant</span>
          </button>

          <button
            onClick={() => setPerspective('rider')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentPerspective === 'rider'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            <Bike size={18} className="mb-1" />
            <span className="text-[10px] font-bold">Rider</span>
          </button>
        </div>

        <div className="text-[10px] text-neutral-500 bg-neutral-50 p-1.5 rounded-lg border border-neutral-100 mt-1 leading-normal">
          {currentPerspective === 'customer' && (
            <p>🛒 <strong>Customer Flow</strong>: Browse nearby supermarkets, add products to cart, proceed to checkout, make payment, and track the live order.</p>
          )}
          {currentPerspective === 'merchant' && (
            <p>🏪 <strong>Merchant Flow</strong>: Accept/decline incoming orders in Molyko Supermarket, update stock status of catalog items, or register a new shop.</p>
          )}
          {currentPerspective === 'rider' && (
            <p>🚴 <strong>Rider Flow</strong>: Toggle online status, view delivery map routes, accept local jobs, and update active order delivery milestones.</p>
          )}
        </div>
      </div>
    </div>
  );
}
