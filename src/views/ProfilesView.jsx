import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Crown,
  Eye,
  Ban,
  Download,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const ProfilesView = ({
  profiles,
  searchQuery,
  onVerifyProfile,
  onSuspendProfile,
  onViewProfile,
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [genderFilter, setGenderFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // Filter logic
  const filteredProfiles = profiles.filter(p => {
    // Tab filter
    if (activeTab === 'pending' && p.isVerified) return false;
    if (activeTab === 'verified' && !p.isVerified) return false;
    if (activeTab === 'premium' && p.membershipTier === 'free') return false;
    if (activeTab === 'suspended' && p.status !== 'suspended') return false;

    // Gender filter
    if (genderFilter !== 'all' && p.gender !== genderFilter) return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.matrimonyId.toLowerCase().includes(q) ||
      p.currentCity.toLowerCase().includes(q) ||
      p.caste.toLowerCase().includes(q) ||
      p.occupation.toLowerCase().includes(q)
    );
  });

  const pendingCount = profiles.filter(p => !p.isVerified).length;
  const verifiedCount = profiles.filter(p => p.isVerified).length;
  const premiumCount = profiles.filter(p => p.membershipTier !== 'free').length;

  return (
    <div className="space-y-6">
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#18181D] tracking-tight">
            Profile Verification & Moderation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Authenticate candidate IDs, approve Aadhaar badges, and supervise Tamil Matrimony listings
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards' ? 'bg-white text-[#6D53F5] shadow-xs' : 'text-slate-500'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-[#6D53F5] shadow-xs' : 'text-slate-500'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quick Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#F0F0F5] pb-4">
        {/* Main Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scroll pb-1">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'pending'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            Pending Review ({pendingCount})
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            All Members ({profiles.length})
          </button>

          <button
            onClick={() => setActiveTab('verified')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'verified'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            Verified Trust ({verifiedCount})
          </button>

          <button
            onClick={() => setActiveTab('premium')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'premium'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            VIP Gold ({premiumCount})
          </button>
        </div>

        {/* Gender Filter Buttons */}
        <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] p-1 rounded-xl">
          <button
            onClick={() => setGenderFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              genderFilter === 'all' ? 'bg-[#FAF9FF] text-[#6D53F5]' : 'text-slate-500'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setGenderFilter('bride')}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              genderFilter === 'bride' ? 'bg-[#FAF9FF] text-[#6D53F5]' : 'text-slate-500'
            }`}
          >
            Brides (பெண்)
          </button>
          <button
            onClick={() => setGenderFilter('groom')}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              genderFilter === 'groom' ? 'bg-[#FAF9FF] text-[#6D53F5]' : 'text-slate-500'
            }`}
          >
            Grooms (ஆண்)
          </button>
        </div>
      </div>

      {/* Profiles Content: Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredProfiles.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 font-medium">
              No matching profiles found for current filter criteria.
            </div>
          ) : (
            filteredProfiles.map(p => (
              <div
                key={p.id}
                className="bg-white border border-[#F0F0F5] hover:border-[#6D53F5] rounded-3xl p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Row with Avatar & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={p.photos[0]}
                          alt={p.name}
                          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#6D53F5]/20"
                        />
                        {p.isVerified ? (
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                            ✓
                          </span>
                        ) : (
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                            !
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-[#18181D]">{p.name}</h3>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#6D53F5]">
                          {p.matrimonyId}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {p.age} Yrs • {p.gender === 'bride' ? 'Bride' : 'Groom'}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        p.isVerified
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.isVerified ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>

                  {/* Profile Key Info */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-[#F8F9FD] p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#6D53F5]" />
                      <span>{p.currentCity} (Native: {p.nativeDistrict})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[#6D53F5]" />
                      <span className="truncate">{p.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#6D53F5]" />
                      <span className="truncate">{p.occupation} • {p.annualIncome}</span>
                    </div>
                  </div>

                  {/* Community & Horoscope Pill */}
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-[#6D53F5]">
                      {p.caste} ({p.subCaste})
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700">
                      Rasi: {p.horoscope.rasi}
                    </span>
                  </div>

                  {/* Verification Document Info */}
                  <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-slate-400">KYC Status:</span>
                    <span className="font-semibold text-slate-700">{p.verificationDocType}</span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-4 pt-3 border-t border-[#F0F0F5] flex items-center gap-2">
                  <button
                    onClick={() => onViewProfile(p)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#18181D] text-xs font-bold transition-all text-center"
                  >
                    View Varan
                  </button>

                  {!p.isVerified && (
                    <button
                      onClick={() => onVerifyProfile(p.id)}
                      className="flex-1 py-2 rounded-xl bg-[#6D53F5] hover:bg-[#583BD9] text-white text-xs font-bold shadow-md shadow-[#6D53F5]/30 active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  <button
                    onClick={() => onSuspendProfile(p.id)}
                    title="Suspend Profile"
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-[#F0F0F5] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9FF] border-b border-[#F0F0F5] text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Community & Location</th>
                  <th className="px-6 py-4">Education & Career</th>
                  <th className="px-6 py-4">KYC / Aadhaar</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F5]">
                {filteredProfiles.map(p => (
                  <tr key={p.id} className="hover:bg-[#FAF9FF] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.photos[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-[#18181D]">{p.name}</div>
                          <div className="text-[10px] text-[#6D53F5] font-mono">{p.matrimonyId}</div>
                          <div className="text-[10px] text-slate-400">{p.age} Yrs • {p.gender}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{p.caste}</div>
                      <div className="text-slate-500">{p.currentCity}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{p.occupation}</div>
                      <div className="text-slate-500">{p.annualIncome}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.isVerified
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {p.isVerified ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#6D53F5] font-extrabold text-[10px] uppercase">
                        {p.membershipTier}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => onViewProfile(p)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#18181D] font-bold"
                      >
                        View
                      </button>
                      {!p.isVerified && (
                        <button
                          onClick={() => onVerifyProfile(p.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#6D53F5] hover:bg-[#583BD9] text-white font-bold"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

