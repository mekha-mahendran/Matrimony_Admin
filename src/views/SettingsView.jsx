import React, { useState } from 'react';
import {
  Shield,
  Sliders,
  Database,
  Bell,
  Lock,
  Save,
  CheckCircle,
} from 'lucide-react';

export const SettingsView = () => {
  const [autoApprove, setAutoApprove] = useState(false);
  const [kycStrict, setKycStrict] = useState(true);
  const [allowGuestBrowse, setAllowGuestBrowse] = useState(true);
  const [commissionRate, setCommissionRate] = useState('20');
  const [supportPhone, setSupportPhone] = useState('1800-MANA-MAALAI');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-extrabold text-[#18181D] tracking-tight">
          Admin Portal Settings & Operations Engine
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure security protocols, agent commission payouts, and verification rules
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>System configuration updated successfully across all 5 regional servers!</span>
        </div>
      )}

      {/* KYC & Trust Settings */}
      <div className="bg-white border border-[#F0F0F5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-[#F0EEFE] text-[#6D53F5] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#18181D]">KYC & Verification Engine</h3>
            <p className="text-[11px] text-slate-500">Government UIDAI Aadhaar verification guidelines</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF9FF] cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-800">Strict Aadhaar Verification Mandate</div>
              <div className="text-[11px] text-slate-500">Only award trust badge when matching official UIDAI e-sign records</div>
            </div>
            <input
              type="checkbox"
              checked={kycStrict}
              onChange={e => setKycStrict(e.target.checked)}
              className="w-4 h-4 accent-[#6D53F5]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF9FF] cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-800">Guest Profile Browsing</div>
              <div className="text-[11px] text-slate-500">Allow unregistered mobile guests to explore blurred cards</div>
            </div>
            <input
              type="checkbox"
              checked={allowGuestBrowse}
              onChange={e => setAllowGuestBrowse(e.target.checked)}
              className="w-4 h-4 accent-[#6D53F5]"
            />
          </label>
        </div>
      </div>

      {/* Referral & Operations Settings */}
      <div className="bg-white border border-[#F0F0F5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#18181D]">Agent Commissions & Support</h3>
            <p className="text-[11px] text-slate-500">Branch payout margins & customer helpline</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Field Agent Commission Payout (%)
            </label>
            <input
              type="text"
              value={commissionRate}
              onChange={e => setCommissionRate(e.target.value)}
              className="w-full h-11 px-3.5 text-xs font-bold border border-slate-200 rounded-xl focus:border-[#6D53F5] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              24/7 Support Hotline
            </label>
            <input
              type="text"
              value={supportPhone}
              onChange={e => setSupportPhone(e.target.value)}
              className="w-full h-11 px-3.5 text-xs font-bold border border-slate-200 rounded-xl focus:border-[#6D53F5] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-full bg-[#6D53F5] hover:bg-[#583BD9] text-white text-xs font-bold shadow-md shadow-[#6D53F5]/30 active:scale-95 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

