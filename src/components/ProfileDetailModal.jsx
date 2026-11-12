import React from 'react';
import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Crown,
  Heart,
  CheckCircle,
  Ban,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const ProfileDetailModal = ({ profile, onClose, onVerify, onSuspend }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header with Close Button */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
          <img
            src={profile.photos[0]}
            alt={profile.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#6D53F5] text-white text-xs font-bold shadow-md">
              90% Match
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              12.6 km away
            </span>
          </div>

          {/* Candidate Name & Title over Hero Image */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black">{profile.name}, {profile.age}</h3>
                {profile.isVerified && (
                  <span className="w-5 h-5 bg-[#FACC15] text-slate-900 rounded-full flex items-center justify-center text-xs font-black">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                {profile.caste} ({profile.subCaste}) • {profile.currentCity}
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wide">
              {profile.membershipTier} Member
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* About Bio */}
          <div>
            <h4 className="font-bold text-sm text-[#18181D] mb-1.5">Description & Biography</h4>
            <p className="text-slate-600 leading-relaxed bg-[#F8F9FD] p-4 rounded-2xl border border-[#F0F0F5]">
              {profile.about}
            </p>
          </div>

          {/* Interests Pills */}
          <div>
            <h4 className="font-bold text-sm text-[#18181D] mb-2">Interests & Hobbies</h4>
            <div className="flex flex-wrap gap-2 font-bold text-[11px]">
              {['🎮 Gaming', '🎵 Music', '📚 Book', '🗣️ Language', '📷 Photography'].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3-Column Key Info Grid */}
          <div className="grid grid-cols-3 gap-3 bg-[#FAF9FF] p-4 rounded-2xl border border-[#F0EEFE] text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Age</div>
              <div className="text-sm font-extrabold text-[#18181D] mt-0.5">{profile.age} Years</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Height</div>
              <div className="text-sm font-extrabold text-[#18181D] mt-0.5">175 cm</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Speaks</div>
              <div className="text-sm font-extrabold text-[#18181D] mt-0.5">Tamil, English</div>
            </div>
          </div>

          {/* Horoscope Porutham Info */}
          <div>
            <h4 className="font-bold text-sm text-[#18181D] mb-2">Horoscope & Astrological Details</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-slate-700">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Rasi</span>
                <strong className="text-xs text-[#6D53F5]">{profile.horoscope.rasi}</strong>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Nakshatram</span>
                <strong className="text-xs">{profile.horoscope.nakshatram}</strong>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Lagnam</span>
                <strong className="text-xs">{profile.horoscope.lagnam}</strong>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Dosham</span>
                <strong className="text-xs text-emerald-600">
                  {profile.horoscope.chevvaiDosham ? 'Chevvai Dosham' : 'No Dosham'}
                </strong>
              </div>
            </div>
          </div>

          {/* Family & Career Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#F0F0F5] rounded-2xl space-y-1">
              <h5 className="font-bold text-[#18181D] text-xs">Family Background</h5>
              <div className="text-slate-600">Father: {profile.family.fatherName} ({profile.family.fatherOccupation})</div>
              <div className="text-slate-600">Mother: {profile.family.motherName} ({profile.family.motherOccupation})</div>
              <div className="text-slate-600">Status: {profile.family.familyStatus}</div>
            </div>

            <div className="p-4 bg-white border border-[#F0F0F5] rounded-2xl space-y-1">
              <h5 className="font-bold text-[#18181D] text-xs">Education & Career</h5>
              <div className="text-slate-600">Degree: {profile.education}</div>
              <div className="text-slate-600">Role: {profile.occupation} ({profile.employer})</div>
              <div className="text-slate-600 font-semibold text-[#6D53F5]">Annual Income: {profile.annualIncome}</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="p-4 border-t border-[#F0F0F5] bg-white flex items-center justify-between gap-3">
          <button
            onClick={() => onSuspend(profile.id)}
            className="px-4 py-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold transition-colors"
          >
            Suspend Profile
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Close
            </button>
            {!profile.isVerified && (
              <button
                onClick={() => {
                  onVerify(profile.id);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#6D53F5] hover:bg-[#583BD9] text-white text-xs font-bold shadow-md shadow-[#6D53F5]/30 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve Aadhaar ✓</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

