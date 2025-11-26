'use client'
import { useState } from 'react';
import { Lock } from 'lucide-react';
import { TasleemLogo } from '@/components/TasleemLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    accountType: 'buyer' as 'buyer' | 'seller',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-between p-12 border-r border-white/10">
        <div className="flex items-center gap-3">
          <TasleemLogo />
          <span className="text-white tracking-wide">Tasleem</span>
        </div>
        
        <div className="max-w-lg">
          <blockquote className="space-y-4">
            <p className="text-white/90 leading-relaxed">
              "Secure freelancing starts with trust. Tasleem provides the foundation for professionals to connect, collaborate, and deliver with confidence."
            </p>
            <footer className="text-white/60">
              — Built for the modern workforce
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <TasleemLogo />
            <span className="text-white tracking-wide">Tasleem</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-white">Welcome to Tasleem</h1>
              <p className="text-white/60">
                {activeTab === 'signin' 
                  ? 'Sign in to your account to continue'
                  : 'Create a new account to get started'}
              </p>
            </div>

            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 pb-3 transition-colors ${
                  activeTab === 'signin'
                    ? 'border-b-2 border-white text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 pb-3 transition-colors ${
                  activeTab === 'signup'
                    ? 'border-b-2 border-white text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-white/80">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder:text-white/40"
                      placeholder="Enter your full name"
                      required={activeTab === 'signup'}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-white/80">
                      Account Type
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-black border border-white/10 rounded-lg cursor-pointer transition-all hover:border-white/30 has-[:checked]:border-white has-[:checked]:bg-white/5">
                        <input
                          type="radio"
                          name="accountType"
                          value="buyer"
                          checked={formData.accountType === 'buyer'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-white"
                        />
                        <span className="text-white">Buyer</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-black border border-white/10 rounded-lg cursor-pointer transition-all hover:border-white/30 has-[:checked]:border-white has-[:checked]:bg-white/5">
                        <input
                          type="radio"
                          name="accountType"
                          value="seller"
                          checked={formData.accountType === 'seller'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-white"
                        />
                        <span className="text-white">Seller</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'signin' && (
                <div className="space-y-3">
                  <label className="block text-white/80">
                    Account Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-black border border-white/10 rounded-lg cursor-pointer transition-all hover:border-white/30 has-[:checked]:border-white has-[:checked]:bg-white/5">
                      <input
                        type="radio"
                        name="accountType"
                        value="buyer"
                        checked={formData.accountType === 'buyer'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-white"
                      />
                      <span className="text-white">Buyer</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-black border border-white/10 rounded-lg cursor-pointer transition-all hover:border-white/30 has-[:checked]:border-white has-[:checked]:bg-white/5">
                      <input
                        type="radio"
                        name="accountType"
                        value="seller"
                        checked={formData.accountType === 'seller'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-white"
                      />
                      <span className="text-white">Seller</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder:text-white/40"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-white/80">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white placeholder:text-white/40"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {activeTab === 'signin' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Continue
              </button>
            </form>

            <div className="text-center">
              <span className="text-white/60">
                {activeTab === 'signin' 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
              </span>
              <button
                onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                className="text-white hover:underline"
              >
                {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}