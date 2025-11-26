'use client'
import { useState } from 'react';
import { CheckCircle, Download, ChevronDown, User, FileText, CreditCard, CheckSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const transaction = {
    title: 'Premium UI Kit - Complete Design System',
    price: 149.00,
    description: 'A comprehensive UI kit with 200+ components, templates, and design tokens. Includes React components, Figma files, and full documentation.',
    deadline: '2025-12-31',
    previewImages: [
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
      'https://images.unsplash.com/photo-1618005198920-f0cb6201c115?w=400',
      'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=400'
    ],
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4'
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-black">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 border-b border-[#dedede] bg-black z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-14">
              <div className="tracking-tight text-white">Tasleem</div>
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-[#dedede] rounded-md shadow-lg">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-[#1a1a1a]">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-[#1a1a1a]">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-[#1a1a1a]">Logout</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20 pb-12 px-6">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-3xl mb-2">Payment Successful</h1>
            <p className="text-[#8a8a8a]">
              Your transaction has been completed successfully
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-[#0a0a0a] border border-[#dedede] rounded-lg p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-[#8a8a8a] text-sm">
                  Thank you for your purchase. Your files are ready for download.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-black border border-[#dedede] rounded-md p-4 flex items-center justify-between hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm">Source Code</div>
                      <div className="text-xs text-[#8a8a8a]">premium-ui-kit.zip (45 MB)</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-black rounded-md text-sm hover:bg-[#f0f0f0] transition-colors">
                    Download
                  </button>
                </div>

                <div className="bg-black border border-[#dedede] rounded-md p-4 flex items-center justify-between hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm">Documentation</div>
                      <div className="text-xs text-[#8a8a8a]">documentation.pdf (2.3 MB)</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-black rounded-md text-sm hover:bg-[#f0f0f0] transition-colors">
                    Download
                  </button>
                </div>

                <div className="bg-black border border-[#dedede] rounded-md p-4 flex items-center justify-between hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm">Figma Files</div>
                      <div className="text-xs text-[#8a8a8a]">design-system.fig (12 MB)</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-black rounded-md text-sm hover:bg-[#f0f0f0] transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 border-b border-[#dedede] bg-black z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            <div className="tracking-tight">Tasleem</div>
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-[#dedede] rounded-md shadow-lg">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-[#1a1a1a]">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-[#1a1a1a]">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-[#1a1a1a]">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl mb-2">Complete Your Payment</h1>
          <p className="text-[#fafafa]">
            Review your purchase and complete the payment securely
          </p>
        </div>

        {/* Tabs & Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a0a0a] border border-[#dedede] rounded-lg overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-[#dedede] grid grid-cols-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex items-center justify-center gap-2 py-4 text-sm transition-colors ${
                  activeTab === 'details'
                    ? 'border-b-2 border-white text-white'
                    : 'text-[#8a8a8a] hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Product Details</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center justify-center gap-2 py-4 text-sm border-l border-r border-[#dedede] transition-colors ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-white text-white'
                    : 'text-[#fafafa] hover:text-white'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex items-center justify-center gap-2 py-4 text-sm transition-colors ${
                  activeTab === 'payment'
                    ? 'border-b-2 border-white text-white'
                    : 'text-[#8a8a8a] hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Payment</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Product Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">Title</label>
                    <div className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md">
                      {transaction.title}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Price</label>
                    <div className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md">
                      $ {transaction.price.toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Description</label>
                    <div className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md min-h-[100px]">
                      {transaction.description}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Access Until</label>
                    <div className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md">
                      {new Date(transaction.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('preview')}
                    className="w-full py-3 bg-white text-black rounded-md hover:bg-[#f0f0f0] transition-colors"
                  >
                    Continue to Preview
                  </button>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-3">Preview Images</label>
                    <div className="grid grid-cols-2 gap-3">
                      {transaction.previewImages.map((img, index) => (
                        <div key={index} className="aspect-video rounded-md overflow-hidden border border-[#dedede]">
                          <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-3">Preview Video</label>
                    <div className="aspect-video rounded-md overflow-hidden border border-[#dedede]">
                      <video controls className="w-full h-full bg-black">
                        <source src={transaction.previewVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  <div className="bg-black border border-[#dedede] rounded-md p-4">
                    <p className="text-sm text-[#fafafa]">
                      <strong className="text-white">Note:</strong> Source code and full files will be delivered immediately after payment.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('payment')}
                    className="w-full py-3 bg-white text-black rounded-md hover:bg-[#f0f0f0] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-md border transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-white bg-black text-white'
                            : 'border-[#dedede] text-[#8a8a8a] hover:border-white hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-sm">Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-md border transition-colors ${
                          paymentMethod === 'paypal'
                            ? 'border-white bg-black text-white'
                            : 'border-[#dedede] text-[#8a8a8a] hover:border-white hover:text-white'
                        }`}
                      >
                        <span className="text-sm">PayPal</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'card' ? (
                    <>
                      <div>
                        <label className="block text-sm mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Enter cardholder name"
                          required
                          className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md focus:outline-none focus:border-white transition-colors placeholder:text-[#4a4a4a]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-2">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md focus:outline-none focus:border-white transition-colors placeholder:text-[#4a4a4a]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md focus:outline-none focus:border-white transition-colors placeholder:text-[#4a4a4a]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">CVV</label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                            placeholder="123"
                            maxLength={3}
                            required
                            className="w-full px-4 py-3 bg-black border border-[#dedede] rounded-md focus:outline-none focus:border-white transition-colors placeholder:text-[#4a4a4a]"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-black border border-[#dedede] rounded-md">
                      <p className="text-sm text-[#fafafa]">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-black border border-[#dedede] rounded-md p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8a8a8a]">Subtotal</span>
                      <span>${transaction.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8a8a8a]">Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-[#dedede] pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>${transaction.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 bg-white text-black rounded-md hover:bg-[#f0f0f0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${transaction.price.toFixed(2)}`}
                  </button>

                  <p className="text-xs text-[#fafafa] text-center">
                    Secured with 256-bit SSL encryption
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}