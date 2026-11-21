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
  XCircle,
  FileText,
} from 'lucide-react';

const FALLBACK_BRIDE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
const FALLBACK_GROOM =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

export const DashboardView = ({
  profiles = [],
  transactions = [],
  onVerifyProfile,
  onRejectProfile,
  onViewProfile,
  onViewReceipt,
  onNavigateTab,
}) => {
  const pendingProfiles = profiles.filter(
    (p) => p.status === 'pending' || (!p.isVerified && p.status !== 'rejected' && p.status !== 'suspended')
  );
  const verifiedProfiles = profiles.filter(
    (p) => p.status === 'approved' || p.status === 'active' || p.isVerified
  );
  const premiumProfiles = profiles.filter((p) => (p.membershipTier || 'free') !== 'free');

  const totalMarriages = 191;

  return (
    <div className="space-y-6">
      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Profiles */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-[#6D53F5] transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#F0EEFE] flex items-center justify-center text-[#6D53F5] mb-2.5">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-[#18181D]">{profiles.length}</div>
          <div className="text-xs font-semibold text-slate-600">Total Varan</div>
          <div className="text-[10px] font-bold text-[#6D53F5] mt-1">Live in DynamoDB</div>
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
          <div className="text-xs font-semibold text-slate-600">Approved Profiles</div>
          <div className="text-[10px] font-bold text-emerald-600 mt-1">Verified Trust</div>
        </div>

        {/* Active Premium */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:border-purple-400 transition-all">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2.5">
            <Crown className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-purple-600">{premiumProfiles.length}</div>
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
                Real registered candidate profiles awaiting moderation
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('profiles')}
              className="text-xs font-bold text-[#6D53F5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({profiles.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {(pendingProfiles.length > 0 ? pendingProfiles : profiles).slice(0, 4).map((profile) => {
              const photoUrl =
                Array.isArray(profile.photos) && profile.photos[0]
                  ? profile.photos[0]
                  : profile.gender === 'bride'
                  ? FALLBACK_BRIDE
                  : FALLBACK_GROOM;

              return (
                <div
                  key={profile.id}
                  className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={photoUrl}
                      alt={profile.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          profile.gender === 'bride' ? FALLBACK_BRIDE : FALLBACK_GROOM;
                      }}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-100 bg-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#18181D]">{profile.name}</h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            profile.isVerified
                              ? 'bg-emerald-50 text-emerald-700'
                              : profile.status === 'rejected'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {profile.status || (profile.isVerified ? 'APPROVED' : 'PENDING')}
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
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#18181D] text-xs font-bold transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    {!profile.isVerified && (
                      <button
                        onClick={() => onVerifyProfile(profile.id)}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                    {profile.status !== 'rejected' && onRejectProfile && (
                      <button
                        onClick={() => onRejectProfile(profile.id)}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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
              className="text-xs font-bold text-[#6D53F5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4 shadow-xs divide-y divide-[#F0F0F5]">
            {transactions.slice(0, 4).map((txn) => (
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
                    className="text-[10px] font-bold text-[#6D53F5] hover:underline flex items-center gap-1 mt-1 justify-end cursor-pointer"
                  >
                    <FileText className="w-3 h-3" />
                    <span>E-Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
