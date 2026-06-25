import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle2, ShieldCheck, Smartphone, X } from 'lucide-react';

interface CustomerCheckoutProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCompleteCheckout: (paymentMethod: 'MoMo' | 'Orange' | 'Cash') => void;
  onBack: () => void;
}

export default function CustomerCheckout({
  subtotal,
  deliveryFee,
  total,
  onCompleteCheckout,
  onBack
}: CustomerCheckoutProps) {
  const [overlayState, setOverlayState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [provider, setProvider] = useState<'mtn' | 'orange' | null>(null);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (overlayState === 'processing') {
      // Simulate prompt delay
      timer1 = setTimeout(() => {
        setOverlayState('success');
      }, 3500);
    } else if (overlayState === 'success') {
      // Auto complete after showing success screen
      timer2 = setTimeout(() => {
        handleFinishCheckout();
      }, 2500);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [overlayState]);

  const handlePay = (selectedProvider: 'mtn' | 'orange') => {
    setProvider(selectedProvider);
    setOverlayState('processing');
  };

  const handleCashOnDelivery = () => {
    onCompleteCheckout('Cash');
  };

  const handleCancel = () => {
    setOverlayState('idle');
    setProvider(null);
  };

  const handleFinishCheckout = () => {
    onCompleteCheckout(provider === 'mtn' ? 'MoMo' : 'Orange');
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 font-sans min-h-screen pb-12 flex flex-col items-center">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-4 h-14 bg-white border-b border-neutral-200 sticky top-0 z-40 max-w-md">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="text-neutral-600 hover:bg-neutral-100 p-2 -ml-2 rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-emerald-600">Checkout</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Content Canvas */}
      <main className="w-full max-w-md flex-1 flex flex-col px-4 py-4 gap-5">
        {/* Order Summary */}
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-4 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Order Summary</h2>
          <div className="flex justify-between items-end border-b border-neutral-100 pb-2.5">
            <span className="text-sm font-medium text-neutral-600">Subtotal</span>
            <span className="text-sm font-bold text-neutral-800">{subtotal.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between items-end border-b border-neutral-100 pb-2.5">
            <span className="text-sm font-medium text-neutral-600">Delivery Fee</span>
            <span className="text-sm font-bold text-neutral-800">{deliveryFee.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-base font-bold text-neutral-900">Total:</span>
            <span className="text-lg font-extrabold text-emerald-600">{total.toLocaleString()} XAF</span>
          </div>
        </section>

        {/* Payment Options */}
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-extrabold text-neutral-900">Select Payment Method</h2>
          <div className="flex flex-col gap-3">
            {/* MTN Mobile Money Button */}
            <button
              onClick={() => handlePay('mtn')}
              className="bg-[#ffcc00] hover:bg-[#ebd52a] text-black rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform w-full min-h-[64px] border border-[#ebd52a] cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm border border-neutral-100">
                  <span className="font-extrabold text-[10px] tracking-tighter text-neutral-900 leading-none text-center">MTN MoMo</span>
                </div>
                <div>
                  <span className="text-sm font-extrabold block">MTN Mobile Money</span>
                  <span className="text-[10px] text-neutral-800 font-medium">Safe & secure mobile payment</span>
                </div>
              </div>
              <ChevronRight size={20} />
            </button>

            {/* Orange Money Button */}
            <button
              onClick={() => handlePay('orange')}
              className="bg-[#ff6600] hover:bg-[#eb5e00] text-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform w-full min-h-[64px] cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm">
                  <span className="font-extrabold text-[10px] tracking-tighter text-[#ff6600] leading-none text-center">Orange</span>
                </div>
                <div>
                  <span className="text-sm font-extrabold block">Orange Money</span>
                  <span className="text-[10px] text-orange-100 font-medium font-sans">Instant payment via Orange portfolio</span>
                </div>
              </div>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="h-px w-full bg-neutral-200 my-2"></div>

          {/* Cash on Delivery Option */}
          <button
            onClick={handleCashOnDelivery}
            className="bg-white hover:bg-neutral-50 border border-neutral-200 text-emerald-600 rounded-2xl p-4 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform w-full min-h-[48px] font-bold text-sm cursor-pointer"
          >
            <ShieldCheck size={18} />
            <span>Pay Cash on Delivery</span>
          </button>
        </section>
      </main>

      {/* Processing Overlay */}
      {overlayState !== 'idle' && (
        <div className="fixed inset-0 bg-neutral-950/80 z-[100] flex items-center justify-center px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm flex flex-col items-center text-center gap-4 transition-all duration-300 transform scale-100 animate-in fade-in zoom-in">
            {overlayState === 'processing' ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center relative p-1.5 ${
                    provider === 'mtn' ? 'bg-[#ffcc00]' : 'bg-[#ff6600]'
                  }`}
                >
                  {/* Custom loader spinner */}
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {provider === 'mtn' ? 'Connecting to MTN MoMo...' : 'Connecting to Orange Money...'}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-[250px]">
                  Please check your phone. A prompt has been sent to confirm the payment of{' '}
                  <strong className="text-neutral-900 font-bold">{total.toLocaleString()} XAF</strong>.
                </p>
                <div className="w-full bg-neutral-50 rounded-xl p-3 border border-neutral-200 flex items-center justify-center gap-1.5 mt-1">
                  <Smartphone className="text-neutral-400 animate-bounce" size={16} />
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Waiting for PIN entry...</span>
                </div>

                <button
                  onClick={handleCancel}
                  className="mt-2 text-red-600 font-bold text-xs py-2 px-4 hover:bg-red-50 rounded-full transition-colors w-full border border-red-200 cursor-pointer"
                >
                  Cancel Payment
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} className="stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Payment Authorized</h3>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-[240px]">
                  Your account has been debited. Order is being sent to <strong className="text-neutral-900 font-bold">Molyko Supermarket</strong>.
                </p>
                <div className="w-24 h-1 bg-emerald-200 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-emerald-600 w-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
