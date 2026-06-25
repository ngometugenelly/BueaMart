import { useState } from 'react';
import { Layers, ReceiptText, ArrowLeft, CheckCircle, AlertTriangle, AlertCircle, X, PlusCircle, Store } from 'lucide-react';
import { Product } from '../types';

interface MerchantCatalogueProps {
  products: Product[];
  onUpdateStockStatus: (productId: string, newStatus: Product['status']) => void;
  onNavigateToOrders: () => void;
  onNavigateToRegister: () => void;
}

export default function MerchantCatalogue({
  products,
  onUpdateStockStatus,
  onNavigateToOrders,
  onNavigateToRegister
}: MerchantCatalogueProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSheet, setShowSheet] = useState(false);

  // Filter only Molyko Supermarket products for catalogue showcase
  const molykoProducts = products.filter(p => p.shopId === 'molyko-supermarket');

  const openUpdateSheet = (product: Product) => {
    setSelectedProduct(product);
    setShowSheet(true);
  };

  const handleStatusChange = (status: Product['status']) => {
    if (selectedProduct) {
      onUpdateStockStatus(selectedProduct.id, status);
      setShowSheet(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 text-left">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-margin-mobile h-14 bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateToOrders}
            className="text-emerald-600 hover:bg-neutral-100 transition-colors active:scale-95 p-2 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-emerald-600">Manage Catalogue</h1>
        </div>
        <div className="w-8"></div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto space-y-6">
        {/* Stats Row Bento Style */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 flex flex-col justify-center items-start shadow-sm border border-neutral-200">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">7-Day Searches</span>
            <span className="text-2xl font-extrabold text-emerald-600">245</span>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col justify-center items-start shadow-sm border border-neutral-200">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Pending Orders</span>
            <span className="text-2xl font-extrabold text-orange-500">3</span>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {molykoProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-neutral-100"
            >
              <img
                className="w-16 h-16 object-cover rounded-xl bg-neutral-50 border border-neutral-100 shrink-0"
                alt={product.name}
                src={product.image}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-neutral-800 truncate mb-1">
                  {product.name}
                </h3>
                <p className="text-sm font-extrabold text-emerald-600">{product.price.toLocaleString()} XAF</p>
              </div>

              {/* Action Stock Level badge Button */}
              {product.status === 'In Stock' && (
                <button
                  onClick={() => openUpdateSheet(product)}
                  className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-xl text-[10px] font-extrabold flex flex-col items-center justify-center min-w-[76px] active:scale-95 transition-transform"
                >
                  <span className="mb-0.5 leading-none">FULL</span>
                  <CheckCircle size={14} />
                </button>
              )}

              {product.status === 'Limited' && (
                <button
                  onClick={() => openUpdateSheet(product)}
                  className="bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl text-[10px] font-extrabold flex flex-col items-center justify-center min-w-[76px] active:scale-95 transition-transform"
                >
                  <span className="mb-0.5 leading-none">LIMITED</span>
                  <AlertTriangle size={14} />
                </button>
              )}

              {(product.status === 'Almost Out' || product.status === 'Out') && (
                <button
                  onClick={() => openUpdateSheet(product)}
                  className="bg-red-100 text-red-800 border border-red-200 px-3 py-2 rounded-xl text-[10px] font-extrabold flex flex-col items-center justify-center min-w-[76px] active:scale-95 transition-transform"
                >
                  <span className="mb-0.5 leading-none">OUT</span>
                  <AlertCircle size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Overlay & Bottom Sheet */}
      {showSheet && selectedProduct && (
        <>
          <div
            onClick={() => setShowSheet(false)}
            className="fixed inset-0 bg-neutral-950/40 z-[100] transition-opacity duration-300"
          ></div>
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-xl z-[101] transform transition-transform duration-300 translate-y-0 pb-12 max-w-md md:mx-auto">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-neutral-200 rounded-full"></div>
            </div>
            
            <div className="px-4 pb-4 pt-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-neutral-900">Update Stock Status</h3>
                <button
                  onClick={() => setShowSheet(false)}
                  className="text-neutral-400 p-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Selected Product info card */}
              <div className="flex items-center gap-3 mb-5 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <img
                  className="w-12 h-12 object-cover rounded-lg bg-white border border-neutral-200"
                  alt={selectedProduct.name}
                  src={selectedProduct.image}
                />
                <span className="text-sm font-bold text-neutral-800">{selectedProduct.name}</span>
              </div>

              {/* Status Action list */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleStatusChange('In Stock')}
                  className={`w-full h-14 rounded-xl flex items-center justify-start px-5 gap-3 border text-left cursor-pointer transition-all ${
                    selectedProduct.status === 'In Stock'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.01]'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                  }`}
                >
                  <CheckCircle size={18} className="shrink-0" />
                  <span className="text-sm font-bold">In Stock</span>
                </button>

                <button
                  onClick={() => handleStatusChange('Limited')}
                  className={`w-full h-14 rounded-xl flex items-center justify-start px-5 gap-3 border text-left cursor-pointer transition-all ${
                    selectedProduct.status === 'Limited'
                      ? 'bg-amber-500 text-neutral-900 border-amber-500 shadow-md scale-[1.01]'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200'
                  }`}
                >
                  <AlertTriangle size={18} className="shrink-0" />
                  <span className="text-sm font-bold">Limited</span>
                </button>

                <button
                  onClick={() => handleStatusChange('Almost Out')}
                  className={`w-full h-14 rounded-xl flex items-center justify-start px-5 gap-3 border text-left cursor-pointer transition-all ${
                    selectedProduct.status === 'Almost Out' || selectedProduct.status === 'Out'
                      ? 'bg-red-600 text-white border-red-600 shadow-md scale-[1.01]'
                      : 'bg-red-50 text-red-800 hover:bg-red-100 border-red-200'
                  }`}
                >
                  <AlertCircle size={18} className="shrink-0" />
                  <span className="text-sm font-bold">Almost Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-white border-t border-neutral-200 shadow-md max-w-md left-1/2 -translate-x-1/2 z-45">
        <button
          onClick={onNavigateToOrders}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-600 px-4 py-1 transition-all"
        >
          <ReceiptText size={20} />
          <span className="text-[10px] font-bold mt-1">Orders</span>
        </button>
        <button className="flex flex-col items-center justify-center text-emerald-600 px-4 py-1">
          <Layers size={20} className="fill-emerald-600/10" />
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
