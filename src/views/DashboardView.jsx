import React from 'react';
import {
  Users,
  Clock,
  ShieldCheck,
  Crown,
  DollarSign,
  Heart,
  ArrowUpRight,
  ChevronRight,
  CheckCircle,
  FileText,
  Building2,
  ExternalLink,
} from 'lucide-react';

export const DashboardView = ({
  profiles,
  transactions,
  branches,
  onVerifyProfile,
  onViewProfile,
  onViewReceipt,
  onNavigateTab,
}) => {
  const pendingProfiles = profiles.filter(p => !p.isVerified);
  const verifiedProfiles = profiles.filter(p => p.isVerified);
  const premiumProfiles = profiles.filter(p => p.membershipTier !== 'free');

  const totalMarriages = branches.reduce((acc, b) => acc + b.successfulMarriages, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner (Matches Mobile "Get Premium Plan" Style) */}
      <div className="relative bg-[#6D53F5] rounded-3xl p-6 md:p-8 text-white overflow-hidden shadow-lg shadow-[#6D53F5]/25 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Background Ambient Circles */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none"></div>
        <div className="absolute right-20 -bottom-16 w-52 h-52 rounded-full bg-white/5 pointer-events-none"></div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3">
            <Crown className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Master Administration Workspace</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Tamil Nadu Matrimony Operations Hub
          </h2>
          <p className="text-xs md:text-sm text-white/80 mt-1.5 leading-relaxed">
            Manage 2,450+ verified bride & groom varan listings, automate 256-bit Aadhaar verification, and oversee 5 regional hub operations.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('profiles')}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#6D53F5] text-xs font-bold shadow-md hover:bg-[#FAF9FF] active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Review Pending ({pendingProfiles.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab('branches')}
            className="px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-xs transition-all flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>5 Regional Hubs</span>
          </button>
        </div>
      </div>

      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Profiles */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-[#6D53F5] transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#F0EEFE] flex items-center justify-center text-[#6D53F5] mb-2.5">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-[#18181D]">2,450</div>
          <div className="text-xs font-semibold text-slate-600">Total Varan</div>
          <div className="text-[10px] font-bold text-[#6D53F5] mt-1">+12% this week</div>
        </div>

        {/* Pending Verification */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-amber-400 transition-all">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-2.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{pendingProfiles.length}</div>
          <div className="text-xs font-semibold text-slate-600">Pending KYC</div>
          <div className="text-[10px] font-bold text-amber-600 mt-1">Action Required</div>
        </div>

        {/* Verified Profiles */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-emerald-400 transition-all">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{verifiedProfiles.length}</div>
          <div className="text-xs font-semibold text-slate-600">Verified Trust</div>
          <div className="text-[10px] font-bold text-emerald-600 mt-1">98% Trust Score</div>
        </div>

        {/* Active Premium */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-purple-400 transition-all">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2.5">
            <Crown className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-purple-600">420</div>
          <div className="text-xs font-semibold text-slate-600">VIP Members</div>
          <div className="text-[10px] font-bold text-purple-600 mt-1">Gold & Yearly</div>
        </div>

        {/* Revenue */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-blue-400 transition-all">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-2.5">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-blue-600">$34.8k</div>
          <div className="text-xs font-semibold text-slate-600">Gross MTD</div>
          <div className="text-[10px] font-bold text-blue-600 mt-1">₹ 28.5 Lakhs</div>
        </div>

        {/* Successful Marriages */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-pink-400 transition-all">
          <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 mb-2.5">
            <Heart className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-pink-600">{totalMarriages}</div>
          <div className="text-xs font-semibold text-slate-600">Marriages</div>
          <div className="text-[10px] font-bold text-pink-600 mt-1">Solemnized</div>
        </div>
      </div>

      {/* Main Grid: Pending Approval Queue & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 Columns): Priority Verification Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#18181D]">
                Aadhaar & KYC Verification Queue
              </h3>
              <p className="text-xs text-slate-500">
                Newly registered candidate profiles awaiting government ID confirmation
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('profiles')}
              className="text-xs font-bold text-[#6D53F5] hover:underline flex items-center gap-1"
            >
              <span>View All ({pendingProfiles.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingProfiles.slice(0, 3).map(profile => (
              <div
                key={profile.id}
                className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#18181D]">{profile.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold">
                        KYC PENDING
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {profile.gender === 'bride' ? 'Bride (பெண்)' : 'Groom (ஆண்)'} • {profile.age} Yrs • {profile.caste}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      📍 {profile.currentCity} • {profile.education} • {profile.occupation}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onViewProfile(profile)}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#18181D] text-xs font-bold transition-colors"
                  >
                    View Varan
                  </button>
                  <button
                    onClick={() => onVerifyProfile(profile.id)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#6D53F5] hover:bg-[#583BD9] text-white text-xs font-bold shadow-md shadow-[#6D53F5]/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve Aadhaar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (1 Column): Recent Subscriptions & Payment Transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#18181D]">Recent Payments</h3>
              <p className="text-xs text-slate-500">Live subscription conversions</p>
            </div>
            <button
              onClick={() => onNavigateTab('subscriptions')}
              className="text-xs font-bold text-[#6D53F5] hover:underline flex items-center gap-1"
            >
              <span>Ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs divide-y divide-[#F0F0F5]">
            {transactions.slice(0, 4).map(txn => (
              <div key={txn.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#18181D]">{txn.userName}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>{txn.planName}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{txn.paymentMode}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{txn.id}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-extrabold text-[#18181D]">{txn.total}</div>
                  <button
                    onClick={() => onViewReceipt(txn)}
                    className="text-[10px] font-bold text-[#6D53F5] hover:underline flex items-center gap-1 mt-1 justify-end"
                  >
                    <FileText className="w-3 h-3" />
                    <span>E-Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Hub Statistics Card */}
          <div className="bg-gradient-to-br from-[#FAF9FF] to-[#F0EEFE] border border-[#E9E4FC] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#6D53F5]">TN Regional Network</span>
              <span className="text-xs font-bold text-slate-600">5 Hubs</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Chennai Central</span>
                <span className="font-bold text-slate-900">840 profiles (68 wed)</span>
              </div>
              <div className="flex justify-between">
                <span>Madurai Meenakshi</span>
                <span className="font-bold text-slate-900">520 profiles (44 wed)</span>
              </div>
              <div className="flex justify-between">
                <span>Coimbatore Kongu</span>
                <span className="font-bold text-slate-900">460 profiles (39 wed)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

