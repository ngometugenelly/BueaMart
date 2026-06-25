import { useState } from 'react';
import { ArrowLeft, User, Store, ShoppingBag, MapPin, Truck, CheckCircle2, Award, Calendar, Bell, Navigation } from 'lucide-react';
import { Order } from '../types';
import { MAP_ROUTE_PREVIEW } from '../data';

interface RiderTrackingProps {
  order: Order | null;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onBackToJobs: () => void;
}

export default function RiderTracking({
  order,
  onUpdateStatus,
  onBackToJobs
}: RiderTrackingProps) {
  const [successMsg, setSuccessState] = useState('');

  if (!order) {
    return (
      <div className="bg-neutral-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-center">
        <Truck size={48} className="text-neutral-300 mb-4 animate-bounce" />
        <h3 className="text-base font-bold text-neutral-800">No active delivery job assigned</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs">Accept a job from the Available Jobs board to view active tracking.</p>
        <button
          onClick={onBackToJobs}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700 transition-colors shadow-sm"
        >
          View Jobs Board
        </button>
      </div>
    );
  }

  const getStatusLabelAndColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return { label: 'Status: Pending Confirmation', color: 'bg-orange-500 text-white' };
      case 'Confirmed':
        return { label: 'Status: Awaiting Collection', color: 'bg-emerald-600 text-white' };
      case 'Collected':
        return { label: 'Status: En Route to Client', color: 'bg-orange-500 text-white animate-pulse' };
      case 'Delivered':
        return { label: 'Status: Delivered Successfully', color: 'bg-emerald-600 text-white' };
      default:
        return { label: 'Status: Processing', color: 'bg-neutral-500 text-white' };
    }
  };

  const statusStyle = getStatusLabelAndColor(order.status);

  const handleMarkCollected = () => {
    onUpdateStatus(order.id, 'Collected');
    setSuccessState('Order successfully marked as COLLECTED. You are now EN ROUTE!');
    setTimeout(() => setSuccessState(''), 4000);
  };

  const handleMarkDelivered = () => {
    onUpdateStatus(order.id, 'Delivered');
    setSuccessState('Order successfully marked as DELIVERED! Nice work, rider!');
    setTimeout(() => {
      setSuccessState('');
      onBackToJobs();
    }, 3000);
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-24 antialiased text-left">
      {/* TopAppBar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 flex justify-between items-center w-full px-4 h-14">
        <button
          onClick={onBackToJobs}
          className="text-emerald-600 hover:bg-neutral-100 p-2 rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-neutral-900 truncate">Delivery Order #{order.id}</h1>
        <div className="w-10"></div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Map Header Section */}
        <section className="relative w-full h-64 bg-neutral-100 overflow-hidden border-b border-neutral-200 shadow-inner">
          <img
            alt="Delivery map route tracker"
            className="w-full h-full object-cover"
            src={MAP_ROUTE_PREVIEW}
          />
          {/* Floating Status Bar */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-max">
            <div className={`${statusStyle.color} px-6 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/20 transition-all duration-300`}>
              <Truck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{statusStyle.label}</span>
            </div>
          </div>
        </section>

        {/* Action toast */}
        {successMsg && (
          <div className="mx-4 mt-6 bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs font-bold shadow-sm text-center animate-in fade-in slide-in-from-top-4">
            {successMsg}
          </div>
        )}

        {/* Details Canvas */}
        <section className="px-4 pt-8 pb-6 space-y-5">
          {/* Bento Grid: Entities */}
          <div className="grid grid-cols-2 gap-3">
            {/* Customer Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-1.5 text-left">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <User size={16} />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500">Customer</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 truncate">{order.customerName}</div>
              <div className="text-[10px] text-neutral-400 font-semibold">{order.phone}</div>
            </div>

            {/* Shop Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-1.5 text-left">
              <div className="flex items-center gap-1.5 text-orange-500">
                <Store size={16} />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500">Pickup From</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 truncate">{order.shopName}</div>
              <div className="text-[10px] text-neutral-400 font-semibold">Molyko Supermarket</div>
            </div>
          </div>

          {/* Delivery Details info */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 text-left space-y-1.5">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500">Client Address</div>
            <div className="text-xs font-bold text-neutral-800">{order.deliveryAddress}</div>
            {order.instructions && (
              <p className="text-[10px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 italic mt-1.5">
                &ldquo;{order.instructions}&rdquo;
              </p>
            )}
          </div>

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

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-3">
            <button
              onClick={handleMarkCollected}
              disabled={order.status !== 'Confirmed'}
              className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                order.status === 'Confirmed'
                  ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:scale-[0.98]'
                  : 'border-neutral-200 text-neutral-300 bg-neutral-100/50 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>Mark as Collected</span>
            </button>

            <button
              onClick={handleMarkDelivered}
              disabled={order.status !== 'Collected'}
              className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                order.status === 'Collected'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-[0.98]'
                  : 'bg-neutral-150 text-neutral-400 cursor-not-allowed border border-neutral-200'
              }`}
            >
              <Award size={16} />
              <span>Mark as Delivered</span>
            </button>
          </div>
        </section>
      </main>

      {/* Rider Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2 z-45">
        <button
          onClick={onBackToJobs}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all animate-none"
        >
          <Bell size={20} />
          <span className="text-[10px] font-bold mt-1">Alerts</span>
        </button>
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <Navigation size={20} className="fill-emerald-600/10 rotate-45 animate-pulse" />
          <span className="text-[10px] font-bold mt-1">Active</span>
        </button>
        <button className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <Calendar size={20} />
          <span className="text-[10px] font-bold mt-1">History</span>
        </button>
        <button className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <User size={20} />
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
