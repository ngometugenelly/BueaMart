import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { CAMEROON_FLAG } from '../data';

interface OnboardingProps {
  onLoginSuccess: (phone: string) => void;
}

export default function Onboarding({ onLoginSuccess }: OnboardingProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.length < 8) {
      setError('Please enter a valid 9-digit phone number (6XX XXX XXX)');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 4) {
      setError('Please enter a 4-digit verification code');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('+237 ' + phoneNumber);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-16 pb-8 max-w-md mx-auto w-full relative z-10 font-sans">
      {/* Header / Logo Area */}
      <header className="flex flex-col items-center mb-6 mt-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2 shadow-sm border-2 border-emerald-50">
          <ShoppingBag className="text-emerald-600 text-3xl" size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-600 tracking-tight">BueaMart</h1>
      </header>

      {/* Onboarding Form Area */}
      <section className="flex-1 flex flex-col justify-center w-full pb-12">
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="w-full">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-1 text-neutral-900">Welcome!</h2>
              <p className="text-sm text-neutral-500 max-w-[280px] mx-auto">
                Enter your phone number to receive a secure SMS verification code.
              </p>
            </div>

            {error && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            {/* Phone Number Input Group */}
            <div className="w-full mb-6">
              <label className="text-xs font-semibold text-neutral-500 mb-1 block ml-1" htmlFor="phone-input">
                Phone Number
              </label>
              <div className="flex items-center bg-white border border-neutral-300 rounded-xl focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 overflow-hidden transition-all shadow-sm">
                {/* Country Code / Flag Section */}
                <div className="flex items-center pl-4 pr-3 py-3.5 bg-neutral-50 border-r border-neutral-200">
                  <img
                    className="w-6 h-4 object-cover rounded-[2px] shadow-sm mr-2"
                    alt="Cameroon Flag"
                    src={CAMEROON_FLAG}
                  />
                  <span className="text-base text-neutral-900 font-bold">+237</span>
                </div>
                {/* Number Input */}
                <input
                  id="phone-input"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className="flex-1 bg-transparent border-none text-base px-4 py-3.5 text-neutral-800 placeholder:text-neutral-400 outline-none w-full"
                  placeholder="6XX XXX XXX"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white min-h-[48px] py-3 rounded-xl text-sm font-bold uppercase tracking-wider shadow-md hover:bg-emerald-700 transition-colors active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <span>{loading ? 'Sending SMS...' : 'Send OTP'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="w-full">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-1 text-neutral-900">Verification Code</h2>
              <p className="text-sm text-neutral-500 max-w-[280px] mx-auto">
                Enter the 4-digit code sent to <strong className="text-neutral-800">+237 {phoneNumber}</strong>.
              </p>
            </div>

            {error && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            {/* OTP Input Group */}
            <div className="w-full mb-6">
              <label className="text-xs font-semibold text-neutral-500 mb-1 block ml-1 text-center" htmlFor="otp-input">
                4-Digit OTP Code
              </label>
              <div className="flex justify-center gap-2">
                <input
                  id="otp-input"
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-32 bg-white border border-neutral-300 rounded-xl text-center text-2xl font-bold tracking-[8px] py-3 text-neutral-800 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none shadow-sm"
                  placeholder="••••"
                  disabled={loading}
                  autoFocus
                />
              </div>
              <p className="text-center text-[11px] text-neutral-400 mt-2">Hint: Enter any 4 numbers (e.g. 1234) to bypass</p>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white min-h-[48px] py-3 rounded-xl text-sm font-bold uppercase tracking-wider shadow-md hover:bg-emerald-700 transition-colors active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
              <CheckCircle size={18} />
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-sm text-emerald-600 font-bold mt-4 hover:underline"
            >
              Change Phone Number
            </button>
          </form>
        )}

        {/* Terms Context */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-500 leading-relaxed">
            By continuing, you agree to BueaMart's <br />
            <a className="text-emerald-600 hover:underline" href="#">Terms of Service</a> and <a className="text-emerald-600 hover:underline" href="#">Privacy Policy</a>.
          </p>
        </div>
      </section>

      {/* Background Subtle Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden" style={{ background: 'radial-gradient(circle at 50% -20%, #d1fae5 0%, transparent 60%)' }}></div>
    </div>
  );
}
