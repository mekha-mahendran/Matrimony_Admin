import React from 'react';
import logoImg from '../assets/logo.png';
import {
  LayoutDashboard,
  ShieldCheck,
  CreditCard,
  Building2,
  HeartHandshake,
  Settings,
  X,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const Sidebar = ({ currentTab, onSelectTab, isOpen, onClose, pendingCount }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'profiles',
      label: 'Profile Moderation',
      icon: ShieldCheck,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'subscriptions',
      label: 'Payments & Receipts',
      icon: CreditCard,
      badge: 'PRO',
      badgeColor: 'bg-purple-100 text-[#6D53F5]',
    },
    {
      id: 'branches',
      label: 'Regional Branches',
      icon: Building2,
      badge: '5 TN Hubs',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'settings',
      label: 'Admin Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-[#F0F0F5] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header & Logo matching Mobile App */}
          <div className="px-6 py-6 border-b border-[#F0F0F5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F7F5FF] border border-[#EDE8FF] flex items-center justify-center shadow-xs overflow-hidden p-1.5">
                <img
                  src={logoImg}
                  alt="Manamaalai Matrimony Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-[#18181D] tracking-tight leading-none">
                  MANAMAALAI
                </h1>
                <span className="text-[10px] font-bold text-[#6D53F5] uppercase tracking-wider block mt-1">
                  Admin Control Portal
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Super Admin Status Pill */}
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-[#FAF9FF] border border-[#F0EEFE] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <div className="text-xs font-bold text-[#18181D]">Tamil Nadu Operations</div>
                <div className="text-[10px] text-slate-500">Live Production Server</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#6D53F5] text-white text-[9px] font-extrabold tracking-wide">
              SUPER
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 mt-6 space-y-1.5">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF9FF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6D53F5]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Account Box */}
        <div className="p-4 border-t border-[#F0F0F5]">
          <div className="p-3 rounded-2xl bg-white border border-[#F0F0F5] hover:border-[#6D53F5] flex items-center justify-between transition-all shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Admin"
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#6D53F5]/30"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#18181D]">Esther Howard</div>
                <div className="text-[10px] font-medium text-slate-500">Master Moderator</div>
              </div>
            </div>

            <button
              title="Logout"
              onClick={() => alert('Admin logged out successfully.')}
              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

