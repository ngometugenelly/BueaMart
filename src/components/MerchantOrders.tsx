import { useState } from 'react';
import { Menu, ReceiptText, Layers, TrendingUp, Wallet, Settings, Clock, Check, X, ShieldAlert, ShoppingBag, Store, User } from 'lucide-react';
import { Order } from '../types';
import { USER_AVATAR } from '../data';

interface MerchantOrdersProps {
  orders: Order[];
  onConfirmOrder: (orderId: string) => void;
  onDeclineOrder: (orderId: string) => void;
  onNavigateToCatalogue: () => void;
  onNavigateToRegister: () => void;
}

export default function MerchantOrders({
  orders,
  onConfirmOrder,
  onDeclineOrder,
  onNavigateToCatalogue,
  onNavigateToRegister
}: MerchantOrdersProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending');

  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const activeOrders = orders.filter(o => ['Confirmed', 'Collected'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'Delivered');

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen flex flex-col md:flex-row font-sans text-left">
      {/* Side Navigation Drawer (Hidden on mobile) */}
      <aside className="hidden md:flex flex-col py-6 bg-white border-r border-neutral-200 h-screen w-72 shrink-0 sticky top-0">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 overflow-hidden shrink-0">
            <Store className="text-emerald-600" size={24} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-neutral-950 truncate leading-none mb-1">Molyko Supermarket</h2>
            <p className="text-[10px] text-neutral-400 font-bold leading-none mb-1">Shop ID: 88291</p>
            <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">Verified Merchant</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <button className="flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white font-bold rounded-xl w-full text-left transition-colors cursor-pointer shadow-sm">
            <ReceiptText size={18} />
            <span className="text-xs font-bold">Orders</span>
          </button>
          <button
            onClick={onNavigateToCatalogue}
            className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 font-bold rounded-xl w-full text-left transition-colors cursor-pointer"
          >
            <Layers size={18} />
            <span className="text-xs font-bold">Catalogue</span>
          </button>
          <button
            onClick={onNavigateToRegister}
            className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 font-bold rounded-xl w-full text-left transition-colors cursor-pointer"
          >
            <Store size={18} />
            <span className="text-xs font-bold">Register Shop</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-100 font-bold rounded-xl w-full text-left transition-colors">
            <TrendingUp size={18} />
            <span className="text-xs font-bold">Inventory</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-100 font-bold rounded-xl w-full text-left transition-colors">
            <Wallet size={18} />
            <span className="text-xs font-bold">Wallet</span>
          </button>
        </nav>

        <div className="px-4 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-100 font-bold rounded-xl w-full text-left transition-colors">
            <Settings size={18} />
            <span className="text-xs font-bold">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen pb-24 md:pb-8">
        {/* Mobile Top App Bar */}
        <header className="md:hidden flex justify-between items-center w-full px-4 h-14 bg-white border-b border-neutral-200 sticky top-0 z-45">
          <button className="p-2 text-neutral-600 rounded-full hover:bg-neutral-50">
            <Menu size={20} />
          </button>
          <h1 className="text-base font-extrabold text-emerald-600">Merchant Queue</h1>
          <button className="p-1 rounded-full border border-neutral-200 overflow-hidden shrink-0">
            <img alt="Shop Owner avatar" className="w-8 h-8 rounded-full object-cover" src={USER_AVATAR} />
          </button>
        </header>

        {/* Page Header & Tabs */}
        <div className="bg-white px-4 pt-5 pb-1 border-b border-neutral-200 sticky top-14 md:top-0 z-30 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">Order Queue</h2>
              <p className="text-xs font-medium text-neutral-400 mt-0.5">Manage incoming client requests</p>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-extrabold text-neutral-600 uppercase tracking-wide">Live Connection</span>
            </div>
          </div>

          {/* Queue Tabs */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-1 py-3 border-b-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'pending'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Pending ({pendingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-1 py-3 border-b-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'active'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Active ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-1 py-3 border-b-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Completed ({completedOrders.length})
            </button>
          </div>
        </div>

        {/* List of Orders (Bento Cards) */}
        <div className="p-4 flex-1 space-y-4 max-w-2xl w-full mx-auto">
          {activeTab === 'pending' && (
            pendingOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <Clock className="mx-auto text-neutral-300 mb-2" size={36} />
                <p className="text-xs font-bold text-neutral-400">No pending orders at the moment</p>
                <p className="text-[10px] text-neutral-400 max-w-xs mx-auto mt-1">New customer orders placed in Molyko Supermarket will instantly appear here.</p>
              </div>
            ) : (
              pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 flex flex-col gap-3.5 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-extrabold text-sm border border-emerald-200 shrink-0">
                        {order.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 leading-tight">{order.customerName}</h3>
                        <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">Order #{order.id} &bull; {order.date}</p>
                      </div>
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-inner">
                      Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-neutral-50 px-4 py-3.5 rounded-xl border border-neutral-200">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Items ({order.items.reduce((a, b) => a + b.quantity, 0)})</p>
                      <p className="text-xs font-semibold text-neutral-700 truncate mt-0.5">
                        {order.items.map(item => item.product.name).join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Total Revenue</p>
                      <p className="text-sm font-extrabold text-emerald-600 mt-0.5">{order.total.toLocaleString()} XAF</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1">
                    <button
                      onClick={() => onDeclineOrder(order.id)}
                      className="flex-1 min-h-[44px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-200"
                    >
                      <X size={14} /> Decline
                    </button>
                    <button
                      onClick={() => onConfirmOrder(order.id)}
                      className="flex-1 min-h-[44px] bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Check size={14} /> Confirm Order
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'active' && (
            activeOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <ReceiptText className="mx-auto text-neutral-300 mb-2" size={36} />
                <p className="text-xs font-bold text-neutral-400">No active orders right now</p>
                <p className="text-[10px] text-neutral-400 max-w-xs mx-auto mt-1">Confirm pending orders to begin processing and dispatching.</p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 flex flex-col gap-3.5 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-extrabold text-sm border border-emerald-200 shrink-0">
                        {order.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 leading-tight">{order.customerName}</h3>
                        <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">Order #{order.id} &bull; {order.date}</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {order.status === 'Collected' ? 'En Route' : 'Preparing'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-neutral-50 px-4 py-3.5 rounded-xl border border-neutral-200 text-left">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Method</p>
                      <p className="text-xs font-bold text-neutral-700 mt-0.5">{order.type} &bull; {order.paymentMethod}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Amount Due</p>
                      <p className="text-sm font-extrabold text-emerald-600 mt-0.5">{order.total.toLocaleString()} XAF</p>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 leading-normal">
                    📍 <strong>Address</strong>: {order.deliveryAddress}
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'completed' && (
            completedOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <Check className="mx-auto text-emerald-300 mb-2 border border-emerald-200 rounded-full p-1" size={36} />
                <p className="text-xs font-bold text-neutral-400">No completed orders yet</p>
                <p className="text-[10px] text-neutral-400 max-w-xs mx-auto mt-1">Delivered orders will be archived in this section.</p>
              </div>
            ) : (
              completedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 flex flex-col gap-3.5 opacity-90"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-extrabold text-sm border border-emerald-200 shrink-0">
                        {order.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 leading-tight">{order.customerName}</h3>
                        <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">Order #{order.id} &bull; Completed</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Completed
                    </span>
                  </div>

                  <div className="flex justify-between bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-200 text-xs">
                    <span className="font-medium text-neutral-500">Total Settled Revenue:</span>
                    <span className="font-extrabold text-emerald-600">{order.total.toLocaleString()} XAF</span>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2 z-45">
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <ReceiptText size={20} className="fill-emerald-600/10" />
          <span className="text-[10px] font-bold mt-1">Orders</span>
        </button>
        <button
          onClick={onNavigateToCatalogue}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all"
        >
          <Layers size={20} />
          <span className="text-[10px] font-bold mt-1">Catalogue</span>
        </button>
        <button
          onClick={onNavigateToRegister}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all"
        >
          <Store size={20} />
          <span className="text-[10px] font-bold mt-1">Register Shop</span>
        </button>
      </nav>
    </div>
  );
}
