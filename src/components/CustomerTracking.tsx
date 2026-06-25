import { ArrowLeft, User, Store, ShoppingBag, MapPin, Truck, CheckCircle } from 'lucide-react';
import { Order } from '../types';
import { MAP_ROUTE_PREVIEW } from '../data';

interface CustomerTrackingProps {
  order: Order | null;
  onBackToHome: () => void;
}

export default function CustomerTracking({ order, onBackToHome }: CustomerTrackingProps) {
  if (!order) {
    return (
      <div className="bg-neutral-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-center">
        <ShoppingBag size={48} className="text-neutral-300 mb-4" />
        <h3 className="text-base font-bold text-neutral-800">No active tracking order found</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs">You can place a new order as a customer to start tracking.</p>
        <button
          onClick={onBackToHome}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const getStatusLabelAndColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return { label: 'Status: Pending Confirmation', color: 'bg-orange-500 text-white' };
      case 'Confirmed':
        return { label: 'Status: Confirmed & Preparing', color: 'bg-emerald-600 text-white' };
      case 'Collected':
        return { label: 'Status: En Route', color: 'bg-orange-500 text-white' };
      case 'Delivered':
        return { label: 'Status: Delivered', color: 'bg-emerald-600 text-white' };
      case 'Cancelled':
        return { label: 'Status: Cancelled', color: 'bg-red-600 text-white' };
      default:
        return { label: 'Status: Processing', color: 'bg-neutral-500 text-white' };
    }
  };

  const statusStyle = getStatusLabelAndColor(order.status);

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-16 antialiased">
      {/* TopAppBar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 flex justify-between items-center w-full px-4 h-14">
        <button
          onClick={onBackToHome}
          className="text-emerald-600 hover:bg-neutral-100 p-2 rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-neutral-900 truncate">Order #{order.id}</h1>
        <div className="w-10"></div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Map Header Section */}
        <section className="relative w-full h-64 bg-neutral-100 overflow-hidden border-b border-neutral-200 shadow-inner">
          <img
            alt="Delivery tracking route map"
            className="w-full h-full object-cover"
            src={MAP_ROUTE_PREVIEW}
          />
          {/* Floating Status Bar */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-max">
            <div className={`${statusStyle.color} px-6 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/20 transition-all duration-300`}>
              <Truck size={16} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{statusStyle.label}</span>
            </div>
          </div>
        </section>

        {/* Details Canvas */}
        <section className="px-4 pt-10 pb-6 space-y-6">
          {/* Bento Grid: Entities */}
          <div className="grid grid-cols-2 gap-3">
            {/* Customer Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-1.5 text-left">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <User size={16} />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500">Customer</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 truncate">{order.customerName}</div>
              <div className="text-[10px] text-neutral-400 font-medium truncate">{order.phone}</div>
            </div>

            {/* Shop Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-1.5 text-left">
              <div className="flex items-center gap-1.5 text-orange-500">
                <Store size={16} />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500">Pickup From</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 truncate">{order.shopName}</div>
              <div className="text-[10px] text-neutral-400 font-medium truncate">Molyko, Buea</div>
            </div>
          </div>

          {/* Delivery Details info if applicable */}
          {order.type === 'Delivery' && (
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 text-left space-y-1.5">
              <div className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500">Delivery Address</div>
              <div className="text-xs font-semibold text-neutral-800">{order.deliveryAddress}</div>
              {order.instructions && (
                <p className="text-[10px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 italic mt-2">
                  &ldquo;{order.instructions}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden text-left">
            <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex items-center gap-2">
              <ShoppingBag size={16} className="text-emerald-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Order Items</h2>
            </div>
            <ul className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <li key={item.product.id} className="px-4 py-3.5 flex justify-between items-center bg-white">
                  <span className="text-xs font-bold text-neutral-800 truncate pr-4">{item.product.name}</span>
                  <span className="bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0 shadow-sm border border-neutral-200">
                    x{item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline State Tracker (Simulation assist) */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm">
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-3 text-left">Real-Time Progression</h3>
            <div className="flex justify-between items-center relative">
              <div className="absolute left-2 right-2 h-0.5 bg-neutral-200 top-2.5 -z-10"></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  order.status !== 'Cancelled' ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>1</div>
                <span className="text-[9px] font-bold mt-1 text-neutral-500">Placed</span>
              </div>

              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  ['Confirmed', 'Collected', 'Delivered'].includes(order.status) ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>2</div>
                <span className="text-[9px] font-bold mt-1 text-neutral-500">Prepared</span>
              </div>

              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  ['Collected', 'Delivered'].includes(order.status) ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>3</div>
                <span className="text-[9px] font-bold mt-1 text-neutral-500">En Route</span>
              </div>

              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  order.status === 'Delivered' ? 'bg-emerald-600 text-white animate-bounce' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {order.status === 'Delivered' ? <CheckCircle size={12} /> : '4'}
                </div>
                <span className="text-[9px] font-bold mt-1 text-neutral-500">Delivered</span>
              </div>
            </div>
            
            <p className="text-[10px] text-neutral-400 mt-4 text-center leading-normal">
              💡 <em>Note</em>: Switch to the <strong>Merchant</strong> or <strong>Rider</strong> perspective from the floating panel to advance this order's status!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
