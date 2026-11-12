import React from 'react';
import {
  Building2,
  Users,
  Heart,
  Phone,
  MapPin,
  TrendingUp,
  Award,
  ChevronRight,
  Briefcase,
} from 'lucide-react';

export const BranchesView = ({ branches }) => {
  const totalProfiles = branches.reduce((acc, b) => acc + b.activeProfiles, 0);
  const totalMarriages = branches.reduce((acc, b) => acc + b.successfulMarriages, 0);
  const totalAgents = branches.reduce((acc, b) => acc + b.activeAgents, 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-[#18181D] tracking-tight">
          Tamil Nadu Regional Bureaus & Field Operations
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          5 regional headquarters overseeing local community matching, field agents & verification desks
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#F0F0F5] rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F0EEFE] text-[#6D53F5] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Active Regional Hubs</div>
            <div className="text-2xl font-extrabold text-[#18181D]">5 Centers</div>
            <div className="text-[11px] font-bold text-[#6D53F5]">100% TN Coverage</div>
          </div>
        </div>

        <div className="bg-white border border-[#F0F0F5] rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Solemnized Marriages</div>
            <div className="text-2xl font-extrabold text-emerald-600">{totalMarriages} Pairs</div>
            <div className="text-[11px] font-bold text-emerald-600">Verified Kalyanam</div>
          </div>
        </div>

        <div className="bg-white border border-[#F0F0F5] rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Licensed Field Agents</div>
            <div className="text-2xl font-extrabold text-amber-600">{totalAgents} Agents</div>
            <div className="text-[11px] font-bold text-amber-600">20% Payout Conversion</div>
          </div>
        </div>
      </div>

      {/* Branches Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {branches.map(b => (
          <div
            key={b.id}
            className="bg-white border border-[#F0F0F5] hover:border-[#6D53F5] rounded-3xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF9FF] text-[#6D53F5] border border-[#F0EEFE] text-[10px] font-extrabold">
                    {b.region}
                  </span>
                  <h3 className="text-base font-bold text-[#18181D] mt-1.5">{b.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                  <span>★</span>
                  <span>{b.rating}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#6D53F5] shrink-0 mt-0.5" />
                  <span className="leading-snug">{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#6D53F5] shrink-0" />
                  <span>Head Manager: <strong className="text-slate-800">{b.manager}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6D53F5] shrink-0" />
                  <span className="font-mono">{b.phone}</span>
                </div>
              </div>

              {/* Statistics Row */}
              <div className="mt-5 grid grid-cols-2 gap-2 bg-[#F8F9FD] p-3 rounded-2xl text-center">
                <div>
                  <div className="text-sm font-extrabold text-[#6D53F5]">{b.activeProfiles}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Active Profiles</div>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-emerald-600">{b.successfulMarriages}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Weddings Done</div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#F0F0F5] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                {b.activeAgents} Registered Agents
              </span>
              <button
                onClick={() => alert(`Contacting ${b.name} Manager (${b.manager}): ${b.phone}`)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#6D53F5] hover:text-white text-xs font-bold text-slate-700 transition-colors"
              >
                Contact Hub
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

