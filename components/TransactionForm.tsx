'use client'
import { useState } from 'react';
import { Shield, Zap, TrendingUp, FileText, Upload, Link2 } from 'lucide-react';
import { UploadSection } from './UploadSection';

type MainTabType = 'details' | 'upload' | 'link';

export function TransactionForm() {
  const [activeTab, setActiveTab] = useState<MainTabType>('details');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock payment link
    const mockLink = `https://tasleem.app/pay/${Math.random().toString(36).substring(7)}`;
    setGeneratedLink(mockLink);
    setActiveTab('link');
  };

  const handleDeliver = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Delivering product...');
    alert('Product delivered successfully!');
  };

  const mainTabs = [
    { id: 'details' as MainTabType, label: 'Product Details', icon: FileText },
    { id: 'upload' as MainTabType, label: 'Upload Files', icon: Upload },
    { id: 'link' as MainTabType, label: 'Payment Link', icon: Link2 },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-[#fafafa] mb-2">Create New Secure Transaction</h1>
        <p className="text-[#dedede] opacity-60">Complete the form below and get a link for your digital product</p>
      </div>

      <div className="bg-[#000] border border-[#dedede] rounded-lg overflow-hidden">
        {/* Main Tab Navigation */}
        <div className="flex border-b border-[#dedede]">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#000] text-[#fafafa] bg-[#000] bg-opacity-5'
                    : 'border-transparent text-[#dedede] opacity-60 hover:opacity-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Product Details Tab */}
          {activeTab === 'details' && (
            <form onSubmit={handleGenerateLink} className="space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-[#fafafa] mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#000] border border-[#dedede] rounded-md text-[#fafafa] placeholder-[#dedede] placeholder-opacity-40 focus:outline-none focus:border-[#fafafa] transition-colors"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Price Input */}
              <div>
                <label htmlFor="price" className="block text-[#fafafa] mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#dedede]">$</span>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#000] border border-[#dedede] rounded-md text-[#fafafa] placeholder-[#dedede] placeholder-opacity-40 focus:outline-none focus:border-[#fafafa] transition-colors"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <label htmlFor="description" className="block text-[#fafafa] mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-[#000] border border-[#dedede] rounded-md text-[#fafafa] placeholder-[#dedede] placeholder-opacity-40 focus:outline-none focus:border-[#fafafa] transition-colors resize-none"
                  placeholder="Describe your product..."
                  required
                />
              </div>

              {/* Deadline Input */}
              <div>
                <label htmlFor="deadline" className="block text-[#fafafa] mb-2">
                  Deadline
                </label>
                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#000] border border-[#dedede] rounded-md text-[#fafafa] placeholder-[#dedede] placeholder-opacity-40 focus:outline-none focus:border-[#fafafa] transition-colors"
                />
              </div>

              {/* Generate Link Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-[#fafafa] text-[#000] rounded-md hover:bg-[#dedede] transition-colors flex items-center justify-center gap-2"
                >
                  Generate Payment Link
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* Upload Files Tab */}
          {activeTab === 'upload' && (
            <form onSubmit={handleDeliver} className="space-y-6">
              <div className="space-y-6">
                <UploadSection
                  title="Preview Images"
                  type="images"
                />

                <UploadSection
                  title="Preview Video"
                  type="video"
                />

                <UploadSection
                  title="Source Code (Secure)"
                  type="secure"
                />
              </div>

              {/* Deliver Button */}
              <div className="pt-4">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className="flex-1 px-6 py-3.5 bg-[#000] text-[#fafafa] border border-[#dedede] rounded-md hover:bg-[#dedede] hover:bg-opacity-10 transition-colors flex items-center justify-center gap-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3.5 bg-[#fafafa] text-[#000] rounded-md hover:bg-[#dedede] transition-colors flex items-center justify-center gap-2"
                  >
                    Deliver the Product
                    <span>→</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Payment Link Tab */}
          {activeTab === 'link' && (
            <div className="space-y-6">
              {generatedLink ? (
                <>
                  <div>
                    <label className="block text-[#fafafa] mb-2">
                      Payment Link Generated
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={generatedLink}
                        readOnly
                        className="flex-1 px-4 py-2.5 bg-[#000] border border-[#dedede] rounded-md text-[#fafafa] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedLink);
                          alert('Link copied to clipboard!');
                        }}
                        className="px-6 py-2.5 bg-[#fafafa] text-[#000] rounded-md hover:bg-[#dedede] transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#fafafa] bg-opacity-5 border border-[#dedede] border-opacity-30 rounded-md p-6">
                    <h3 className="text-[#fafafa] mb-2">Next Steps</h3>
                    <ul className="text-[#dedede] space-y-2 list-disc list-inside">
                      <li>Share this link with your customer</li>
                      <li>Upload your product files in the "Upload Files" tab</li>
                      <li>Files will be delivered automatically after payment</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Link2 className="w-12 h-12 text-[#dedede] opacity-40 mx-auto mb-4" />
                  <p className="text-[#dedede] opacity-60">No payment link generated yet</p>
                  <p className="text-[#dedede] opacity-40 mt-2">Fill in the product details and click "Generate Payment Link"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-[#000] border border-[#dedede] rounded-lg p-4 text-center">
          <Shield className="w-5 h-5 text-[#fafafa] mx-auto mb-2" />
          <p className="text-[#fafafa]">End-to-end encrypted</p>
        </div>
        <div className="bg-[#000] border border-[#dedede] rounded-lg p-4 text-center">
          <Zap className="w-5 h-5 text-[#fafafa] mx-auto mb-2" />
          <p className="text-[#fafafa]">Instant delivery</p>
        </div>
        <div className="bg-[#000] border border-[#dedede] rounded-lg p-4 text-center">
          <TrendingUp className="w-5 h-5 text-[#fafafa] mx-auto mb-2" />
          <p className="text-[#fafafa]">Track sales</p>
        </div>
      </div>
    </div>
  );
}