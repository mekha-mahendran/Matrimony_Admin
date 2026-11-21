import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  MapPin,
  Briefcase,
  GraduationCap,
  RefreshCw,
  Phone,
  Mail,
  AlertCircle,
  Eye,
} from 'lucide-react';

const FALLBACK_BRIDE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
const FALLBACK_GROOM =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

export const ProfilesView = ({
  profiles = [],
  isLoading = false,
  apiError = null,
  searchQuery = '',
  onApproveProfile,
  onRejectProfile,
  onSuspendProfile,
  onDeleteProfile,
  onViewProfile,
  onRefresh,
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const getProfileStatus = (p) => {
    if (p.status === 'rejected') return 'rejected';
    if (p.status === 'suspended') return 'suspended';
    if (p.status === 'approved' || p.status === 'active' || p.isVerified) return 'approved';
    return 'pending';
  };

  // Filter logic
  const filteredProfiles = profiles.filter((p) => {
    const status = getProfileStatus(p);

    // Tab filter
    if (activeTab === 'pending' && status !== 'pending') return false;
    if (activeTab === 'approved' && status !== 'approved') return false;
    if (activeTab === 'rejected' && status !== 'rejected') return false;
    if (activeTab === 'suspended' && status !== 'suspended') return false;
    if (activeTab === 'premium' && (p.membershipTier || 'free') === 'free') return false;

    // Gender filter
    if (genderFilter !== 'all' && p.gender !== genderFilter) return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.matrimonyId || '').toLowerCase().includes(q) ||
      (p.currentCity || '').toLowerCase().includes(q) ||
      (p.caste || '').toLowerCase().includes(q) ||
      (p.occupation || '').toLowerCase().includes(q) ||
      (p.phone || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  });

  const pendingCount = profiles.filter((p) => getProfileStatus(p) === 'pending').length;
  const approvedCount = profiles.filter((p) => getProfileStatus(p) === 'approved').length;
  const rejectedCount = profiles.filter((p) => getProfileStatus(p) === 'rejected').length;
  const suspendedCount = profiles.filter((p) => getProfileStatus(p) === 'suspended').length;

  const getStatusBadge = (p) => {
    const status = getProfileStatus(p);
    if (status === 'approved') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
          APPROVED
        </span>
      );
    }
    if (status === 'rejected') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-rose-50 text-rose-700 border border-rose-200">
          REJECTED
        </span>
      );
    }
    if (status === 'suspended') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-slate-200 text-slate-700 border border-slate-300">
          SUSPENDED
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200">
        PENDING
      </span>
    );
  };

  const getPrimaryPhoto = (p) => {
    if (Array.isArray(p.photos) && p.photos.length > 0 && p.photos[0]) {
      return p.photos[0];
    }
    return p.gender === 'bride' ? FALLBACK_BRIDE : FALLBACK_GROOM;
  };

  return (
    <div className="space-y-6">
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#18181D] tracking-tight">
            Profile Verification & Moderation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live profiles from AWS DynamoDB & S3 — Approve, Reject, Suspend, or Delete member listings
          </p>
        </div>

        {/* Refresh & View Mode Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#FAF9FF] text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#6D53F5] ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Syncing...' : 'Refresh DB'}</span>
          </button>

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

      {/* API Error Banner if Backend is Unreachable */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-red-700 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <div>
              <span className="font-bold">Database Connection Error: </span>
              <span>{apiError}. Ensure the backend server is running on port 5000.</span>
            </div>
          </div>
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filter Tabs & Quick Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#F0F0F5] pb-4">
        {/* Main Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scroll pb-1">
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
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'approved'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            Approved ({approvedCount})
          </button>

          <button
            onClick={() => setActiveTab('rejected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'rejected'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            Rejected ({rejectedCount})
          </button>

          <button
            onClick={() => setActiveTab('suspended')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'suspended'
                ? 'bg-[#6D53F5] text-white shadow-md shadow-[#6D53F5]/25'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:bg-[#FAF9FF]'
            }`}
          >
            Suspended ({suspendedCount})
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

      {/* Loading State */}
      {isLoading && profiles.length === 0 ? (
        <div className="py-20 text-center text-slate-500 text-sm font-semibold">
          Loading real profiles from AWS DynamoDB...
        </div>
      ) : viewMode === 'cards' ? (
        /* Profiles Content: Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredProfiles.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 font-medium bg-white rounded-3xl border border-[#F0F0F5]">
              No matching profiles found in database for the selected filter.
            </div>
          ) : (
            filteredProfiles.map((p) => {
              const status = getProfileStatus(p);
              const photoUrl = getPrimaryPhoto(p);
              const extraPhotosCount = Array.isArray(p.photos) && p.photos.length > 1 ? p.photos.length - 1 : 0;

              return (
                <div
                  key={p.id}
                  className="bg-white border border-[#F0F0F5] hover:border-[#6D53F5] rounded-3xl p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header Row with Avatar & Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="relative cursor-pointer"
                          onClick={() => onViewProfile(p)}
                        >
                          <img
                            src={photoUrl}
                            alt={p.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                p.gender === 'bride' ? FALLBACK_BRIDE : FALLBACK_GROOM;
                            }}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#6D53F5]/20 bg-slate-100"
                          />
                          {extraPhotosCount > 0 && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[9px] font-bold">
                              +{extraPhotosCount}
                            </span>
                          )}
                          {status === 'approved' ? (
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                              ✓
                            </span>
                          ) : status === 'rejected' || status === 'suspended' ? (
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                              ✕
                            </span>
                          ) : (
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                              !
                            </span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-[#18181D] line-clamp-1">
                              {p.name}
                            </h3>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-[#6D53F5]">
                            {p.matrimonyId}
                          </span>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {p.age} Yrs • {p.gender === 'bride' ? 'Bride (பெண்)' : 'Groom (ஆண்)'}
                            {p.height ? ` • ${p.height}` : ''}
                          </div>
                        </div>
                      </div>

                      {/* Status Pill */}
                      {getStatusBadge(p)}
                    </div>

                    {/* Profile Key Info */}
                    <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-[#F8F9FD] p-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#6D53F5] shrink-0" />
                        <span className="truncate">
                          {p.currentCity || 'Chennai'}
                          {p.nativeDistrict ? ` (Native: ${p.nativeDistrict})` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-[#6D53F5] shrink-0" />
                        <span className="truncate">
                          {p.education || 'Not specified'}
                          {p.college ? ` • ${p.college}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-[#6D53F5] shrink-0" />
                        <span className="truncate">
                          {p.occupation || 'Not specified'}
                          {p.annualIncome ? ` • ${p.annualIncome}` : ''}
                        </span>
                      </div>
                      {(p.phone || p.email) && (
                        <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 border-t border-slate-200/60">
                          {p.phone && (
                            <span className="flex items-center gap-1 truncate">
                              <Phone className="w-3 h-3 text-[#6D53F5]" />
                              {p.phone}
                            </span>
                          )}
                          {p.email && (
                            <span className="flex items-center gap-1 truncate">
                              <Mail className="w-3 h-3 text-[#6D53F5]" />
                              {p.email}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Community & Horoscope Pill */}
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-[#6D53F5]">
                        {p.religion || 'Hindu'} • {p.caste || 'General'}
                        {p.subCaste ? ` (${p.subCaste})` : ''}
                      </span>
                      {p.horoscope?.rasi && p.horoscope.rasi !== 'Not specified' && (
                        <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700">
                          Rasi: {p.horoscope.rasi}
                        </span>
                      )}
                    </div>

                    {/* Verification Document Info */}
                    <div className="mt-3 text-[11px] text-slate-500 font-medium flex items-center justify-between border-t border-slate-100 pt-2">
                      <span className="text-slate-400">Moderation:</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[180px]">
                        {p.verificationDocType}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Buttons: View, Approve, Reject, Suspend, Delete */}
                  <div className="mt-4 pt-3 border-t border-[#F0F0F5] space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewProfile(p)}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#18181D] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      {status !== 'approved' && (
                        <button
                          onClick={() => onApproveProfile(p.id)}
                          className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {status !== 'rejected' && (
                        <button
                          onClick={() => onRejectProfile(p.id)}
                          className="flex-1 py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {status !== 'suspended' && (
                        <button
                          onClick={() => onSuspendProfile(p.id)}
                          className="flex-1 py-1.5 px-2.5 rounded-xl border border-orange-200 bg-orange-50/60 hover:bg-orange-100 text-orange-700 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Suspend</span>
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteProfile(p.id)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-100 text-red-600 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
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
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Community & Location</th>
                  <th className="px-6 py-4">Education & Career</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F5]">
                {filteredProfiles.map((p) => {
                  const status = getProfileStatus(p);
                  const photoUrl = getPrimaryPhoto(p);

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF9FF] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={photoUrl}
                            alt={p.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                p.gender === 'bride' ? FALLBACK_BRIDE : FALLBACK_GROOM;
                            }}
                            className="w-11 h-11 rounded-xl object-cover bg-slate-100"
                          />
                          <div>
                            <div className="font-bold text-[#18181D]">{p.name}</div>
                            <div className="text-[10px] text-[#6D53F5] font-mono font-bold">
                              {p.matrimonyId}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {p.age} Yrs • {p.gender}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{p.phone || '—'}</div>
                        <div className="text-slate-500 text-[11px]">{p.email || '—'}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">
                          {p.religion || 'Hindu'} • {p.caste}
                        </div>
                        <div className="text-slate-500">{p.currentCity}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{p.occupation}</div>
                        <div className="text-slate-500">
                          {p.education} {p.annualIncome ? `• ${p.annualIncome}` : ''}
                        </div>
                      </td>

                      <td className="px-6 py-4">{getStatusBadge(p)}</td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <button
                            onClick={() => onViewProfile(p)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#18181D] font-bold cursor-pointer"
                          >
                            View
                          </button>
                          {status !== 'approved' && (
                            <button
                              onClick={() => onApproveProfile(p.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {status !== 'rejected' && (
                            <button
                              onClick={() => onRejectProfile(p.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                          {status !== 'suspended' && (
                            <button
                              onClick={() => onSuspendProfile(p.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold cursor-pointer"
                            >
                              Suspend
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteProfile(p.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
