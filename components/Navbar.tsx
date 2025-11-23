'use client'
import { useState } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#000] border-b border-[#dedede] z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-[#fafafa] tracking-tight">Tasleem</span>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-[#fafafa] flex items-center justify-center">
              <User className="w-4 h-4 text-[#000]" />
            </div>
            <ChevronDown className="w-4 h-4 text-[#dedede]" />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#000] border border-[#dedede] rounded-lg shadow-lg overflow-hidden">
              <button className="w-full px-4 py-3 text-left text-[#fafafa] hover:bg-[#dedede] hover:bg-opacity-10 transition-colors flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full px-4 py-3 text-left text-[#fafafa] hover:bg-[#dedede] hover:bg-opacity-10 transition-colors flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <div className="border-t border-[#dedede]" />
              <button className="w-full px-4 py-3 text-left text-[#fafafa] hover:bg-[#dedede] hover:bg-opacity-10 transition-colors flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
