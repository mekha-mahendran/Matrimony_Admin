import React from 'react';
import { Menu, Search, Bell, Shield, Download, Plus, Globe } from 'lucide-react';

export const Header = ({ onOpenSidebar, searchQuery, setSearchQuery, onNewProfileClick }) => {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#F0F0F5] z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition-transform"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, ID (#MM-TN-2101), caste, city..."
            className="w-full h-10 pl-10 pr-4 text-xs font-medium bg-[#F8F9FD] border border-[#E5E7EB] rounded-xl focus:border-[#6D53F5] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-[#18181D]"
          />
        </div>
      </div>

      {/* Right: Quick Stats & Actions */}
      <div className="flex items-center gap-2.5">
        {/* Verification Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF9FF] border border-[#F0EEFE]">
          <Shield className="w-3.5 h-3.5 text-[#6D53F5]" />
          <span className="text-xs font-bold text-[#6D53F5]">Aadhaar Trust Desk</span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => alert('All KYC document queues are currently synchronized with UIDAI.')}
          className="relative p-2.5 rounded-xl border border-[#F0F0F5] hover:bg-[#FAF9FF] text-slate-600 hover:text-[#6D53F5] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6D53F5] ring-2 ring-white"></span>
        </button>

        {/* Add Profile Quick Action */}
        <button
          onClick={onNewProfileClick}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6D53F5] text-white text-xs font-bold shadow-md shadow-[#6D53F5]/30 hover:bg-[#583BD9] active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>
    </header>
  );
};

