import { useState } from 'react';
import { ToggleLeft, Navigation, Store, MapPin, Clock, ArrowRight, Bell, Calendar, User, Search, ShoppingCart, Home } from 'lucide-react';
import { Order } from '../types';
import { MAP_ROUTE_JOB1, MAP_ROUTE_JOB2 } from '../data';

interface RiderJobsProps {
  orders: Order[];
  onAcceptJob: (orderId: string) => void;
  onNavigateToHistory: () => void;
}

export default function RiderJobs({
  orders,
  onAcceptJob,
  onNavigateToHistory
}: RiderJobsProps) {
  const [isOnline, setIsOnline] = useState(true);

  // Eligible jobs are confirmed orders that do not have any delivery rider yet (order status = Confirmed)
  const confirmedJobs = orders.filter(o => o.status === 'Confirmed');

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-24 text-left">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-4 h-14 bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Navigation className="text-emerald-600 rotate-45" size={20} />
          <h1 className="text-base font-extrabold text-emerald-600">BueaMart Deliveries</h1>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
          <User size={16} className="text-neutral-500" />
        </div>
      </header>

      <main className="px-4 py-4 flex flex-col gap-5 max-w-md mx-auto">
        {/* Online/Offline Toggle Header */}
        <div className="flex flex-col">
          <h2 className="text-lg font-extrabold text-neutral-900 tracking-tight">Available Jobs</h2>
          <p className="text-xs text-neutral-400 font-semibold mt-0.5">Molyko, Buea Zone</p>
        </div>

        {/* Online/Offline Toggle Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300'}`}></div>
            <span className="text-sm font-bold text-neutral-800">
              {isOnline ? 'Agent Online' : 'Agent Offline'}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Job List */}
        {!isOnline ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <Clock className="mx-auto text-neutral-300 mb-2" size={36} />
            <h3 className="text-sm font-bold text-neutral-700">You are Offline</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-[200px] mx-auto">Toggle online state above to receive incoming delivery requests.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Newly Created Interactive Jobs */}
            {confirmedJobs.map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-extrabold text-neutral-900">
                        {job.deliveryFee.toLocaleString()} XAF
                      </h3>
                      <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-100 py-1 px-2.5 rounded-full inline-flex w-fit uppercase tracking-wider shadow-inner mt-1">
                        Active Order Request
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400 bg-neutral-50 border border-neutral-150 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                      <Clock size={12} />
                      <span>New job</span>
                    </div>
                  </div>

                  <div className="relative w-full h-32 bg-neutral-100 rounded-xl overflow-hidden mt-1 border border-neutral-150">
                    <img className="w-full h-full object-cover" alt="Delivery route preview" src={MAP_ROUTE_JOB1} />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent"></div>
                    <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-neutral-150">
                      <Navigation size={10} className="text-emerald-600 rotate-45" />
                      <span className="text-[9px] font-extrabold text-neutral-700 uppercase tracking-wide">1.5 km</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-2">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center mt-1">
                        <Store className="text-emerald-600" size={16} />
                        <div className="w-[1.5px] h-4 bg-neutral-200 my-1"></div>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Pickup</span>
                        <span className="text-xs font-bold text-neutral-800">{job.shopName}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <MapPin className="text-orange-500" size={16} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Delivery</span>
                        <span className="text-xs font-bold text-neutral-800">{job.deliveryAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-neutral-100 bg-neutral-50/50">
                  <button
                    onClick={() => onAcceptJob(job.id)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    <span>Accept Job</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}

            {/* Static Job Card 1 (From screenshot) */}
            <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200">
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-extrabold text-neutral-900">1,200 XAF</h3>
                    <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-100 py-1 px-2.5 rounded-full inline-flex w-fit uppercase tracking-wider shadow-inner mt-1">
                      Standard Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-400 bg-neutral-50 border border-neutral-150 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                    <Clock size={12} />
                    <span>5m ago</span>
                  </div>
                </div>

                <div className="relative w-full h-32 bg-neutral-100 rounded-xl overflow-hidden mt-1 border border-neutral-150">
                  <img className="w-full h-full object-cover" alt="Delivery route standard" src={MAP_ROUTE_JOB1} />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-neutral-150">
                    <Navigation size={10} className="text-emerald-600 rotate-45" />
                    <span className="text-[9px] font-extrabold text-neutral-700 uppercase tracking-wide">2.4 km</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <Store className="text-emerald-600" size={16} />
                      <div className="w-[1.5px] h-4 bg-neutral-200 my-1"></div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Pickup</span>
                      <span className="text-xs font-bold text-neutral-800">Molyko Supermarket</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <MapPin className="text-orange-500" size={16} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Delivery</span>
                      <span className="text-xs font-bold text-neutral-800">Biaka Neighborhood, Block C</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-neutral-100 bg-neutral-50/50">
                <button
                  onClick={() => alert("Simulation Tip: Accept the live order from Molyko Supermarket to experience the full interactive tracking simulation!")}
                  className="w-full bg-neutral-100 text-neutral-400 border border-neutral-200 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed uppercase tracking-wider"
                >
                  <span>Sample Job Only</span>
                </button>
              </div>
            </article>

            {/* Static Job Card 2 */}
            <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200">
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-extrabold text-neutral-900">800 XAF</h3>
                    <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-100 py-1 px-2.5 rounded-full inline-flex w-fit uppercase tracking-wider shadow-inner mt-1">
                      Express
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-400 bg-neutral-50 border border-neutral-150 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                    <Clock size={12} />
                    <span>12m ago</span>
                  </div>
                </div>

                <div className="relative w-full h-32 bg-neutral-100 rounded-xl overflow-hidden mt-1 border border-neutral-150">
                  <img className="w-full h-full object-cover" alt="Delivery route express" src={MAP_ROUTE_JOB2} />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-neutral-150">
                    <Navigation size={10} className="text-emerald-600 rotate-45" />
                    <span className="text-[9px] font-extrabold text-neutral-700 uppercase tracking-wide">1.1 km</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <Store className="text-emerald-600" size={16} />
                      <div className="w-[1.5px] h-4 bg-neutral-200 my-1"></div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Pickup</span>
                      <span className="text-xs font-bold text-neutral-800">Buea Central Market</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <MapPin className="text-orange-500" size={16} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Delivery</span>
                      <span className="text-xs font-bold text-neutral-800">UB Junction Student Hostels</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-neutral-100 bg-neutral-50/50">
                <button
                  onClick={() => alert("Simulation Tip: Accept the live order from Molyko Supermarket to experience the full interactive tracking simulation!")}
                  className="w-full bg-neutral-100 text-neutral-400 border border-neutral-200 font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed uppercase tracking-wider"
                >
                  <span>Sample Job Only</span>
                </button>
              </div>
            </article>

            {confirmedJobs.length === 0 && (
              <div className="text-center py-6 bg-emerald-50 border border-dashed border-emerald-200 rounded-2xl p-4 mt-2">
                <p className="text-xs font-bold text-emerald-700">Waiting for local orders...</p>
                <p className="text-[10px] text-emerald-600 mt-1">Place an order as a <strong>Customer</strong> first, confirm it as a <strong>Merchant</strong>, and it will immediately show up here as an active delivery job!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Rider Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2 z-45">
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <Bell size={20} className="fill-emerald-600/10" />
          <span className="text-[10px] font-bold mt-1">Alerts</span>
        </button>
        <button className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all">
          <Navigation size={20} className="rotate-45" />
          <span className="text-[10px] font-bold mt-1">Active</span>
        </button>
        <button
          onClick={onNavigateToHistory}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all"
        >
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
