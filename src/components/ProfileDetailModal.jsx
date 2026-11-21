import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const FALLBACK_BRIDE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
const FALLBACK_GROOM =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

export const ProfileDetailModal = ({
  profile,
  onClose,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    setActivePhotoIndex(0);
  }, [profile?.id]);

  if (!profile) return null;

  const photos =
    Array.isArray(profile.photos) && profile.photos.length > 0
      ? profile.photos.filter(Boolean)
      : [profile.gender === 'bride' ? FALLBACK_BRIDE : FALLBACK_GROOM];

  const currentPhoto = photos[activePhotoIndex] || photos[0];
  const hobbies =
    Array.isArray(profile.hobbies) && profile.hobbies.length > 0
      ? profile.hobbies
      : [];

  const status =
    profile.status || (profile.isVerified ? 'approved' : 'pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header with Hero Photo */}
        <div className="relative h-60 sm:h-72 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={currentPhoto}
            alt={profile.name}
            onError={(e) => {
              e.currentTarget.src =
                profile.gender === 'bride' ? FALLBACK_BRIDE : FALLBACK_GROOM;
            }}
            className="w-full h-full object-contain bg-slate-950"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#6D53F5] text-white text-xs font-bold shadow-md font-mono">
              {profile.matrimonyId}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                status === 'approved'
                  ? 'bg-emerald-500 text-white'
                  : status === 'rejected'
                  ? 'bg-rose-500 text-white'
                  : status === 'suspended'
                  ? 'bg-slate-600 text-white'
                  : 'bg-amber-500 text-white'
              }`}
            >
              {status}
            </span>
          </div>

          {/* Candidate Name & Title over Hero Image */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black">
                  {profile.name}, {profile.age}
                </h3>
                {profile.isVerified && (
                  <span className="w-5 h-5 bg-[#FACC15] text-slate-900 rounded-full flex items-center justify-center text-xs font-black">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                {profile.religion || 'Hindu'} • {profile.caste}{' '}
                {profile.subCaste ? `(${profile.subCaste})` : ''} •{' '}
                {profile.currentCity}
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wide">
              {profile.membershipTier || 'gold'} Member
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Uploaded Photos Thumbnail Gallery */}
          {photos.length > 1 && (
            <div>
              <h4 className="font-bold text-sm text-[#18181D] mb-2">
                Uploaded Photos ({photos.length})
              </h4>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {photos.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-[#6D53F5] scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Identity Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF9FF] p-4 rounded-2xl border border-[#F0EEFE]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#6D53F5] shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Phone Number</div>
                <div className="text-xs font-bold text-[#18181D]">{profile.phone || 'Not provided'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#6D53F5] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 font-semibold">Email Address</div>
                <div className="text-xs font-bold text-[#18181D] truncate">{profile.email || 'Not provided'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6D53F5] shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Location</div>
                <div className="text-xs font-bold text-[#18181D]">
                  {profile.currentCity}
                  {profile.state ? `, ${profile.state}` : ''}
                </div>
              </div>
            </div>
          </div>

          {/* About Bio */}
          <div>
            <h4 className="font-bold text-sm text-[#18181D] mb-1.5">
              Description & Biography
            </h4>
            <p className="text-slate-600 leading-relaxed bg-[#F8F9FD] p-4 rounded-2xl border border-[#F0F0F5]">
              {profile.about || profile.aboutMe || 'No description provided.'}
            </p>
          </div>

          {/* Key Personal Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#F0F0F5] text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Gender / Profile For</div>
              <div className="text-xs font-extrabold text-[#18181D] mt-0.5 capitalize">
                {profile.gender} ({profile.createdFor || 'self'})
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">DOB / Age</div>
              <div className="text-xs font-extrabold text-[#18181D] mt-0.5">
                {profile.dateOfBirth || '—'} ({profile.age} Yrs)
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Height</div>
              <div className="text-xs font-extrabold text-[#18181D] mt-0.5">
                {profile.height || profile.heightFeet || 'Not specified'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Marital Status</div>
              <div className="text-xs font-extrabold text-[#18181D] mt-0.5 capitalize">
                {(profile.maritalStatus || 'never_married').replace(/_/g, ' ')}
              </div>
            </div>
          </div>

          {/* Interests Pills */}
          {hobbies.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-[#18181D] mb-2">
                Interests & Hobbies
              </h4>
              <div className="flex flex-wrap gap-2 font-bold text-[11px]">
                {hobbies.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Horoscope Porutham Info */}
          <div>
            <h4 className="font-bold text-sm text-[#18181D] mb-2">
              Horoscope & Astrological Details
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-slate-700">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Rasi</span>
                <strong className="text-xs text-[#6D53F5]">
                  {profile.horoscope?.rasi || profile.rasi || 'Not specified'}
                </strong>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Nakshatram / Star</span>
                <strong className="text-xs">
                  {profile.horoscope?.nakshatram || profile.star || 'Not specified'}
                </strong>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Gothram</span>
                <strong className="text-xs">
                  {profile.horoscope?.gothram || profile.gothram || 'Not specified'}
                </strong>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Dosham</span>
                <strong className="text-xs text-emerald-600">
                  {profile.horoscope?.dosham || profile.dosham || 'No Dosham'}
                </strong>
              </div>
            </div>
          </div>

          {/* Family & Career Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#F0F0F5] rounded-2xl space-y-1">
              <h5 className="font-bold text-[#18181D] text-xs">Family Background</h5>
              <div className="text-slate-600">
                Father Occupation: {profile.family?.fatherOccupation || profile.fatherOccupation || 'Not specified'}
              </div>
              <div className="text-slate-600">
                Mother Occupation: {profile.family?.motherOccupation || profile.motherOccupation || 'Not specified'}
              </div>
              <div className="text-slate-600">
                Siblings: {profile.family?.siblings || profile.siblings || 'Not specified'}
              </div>
              <div className="text-slate-600">
                Family Type / Status: {profile.family?.familyType || profile.familyType || 'Nuclear'} •{' '}
                {profile.family?.familyStatus || profile.familyStatus || 'Middle class'}
              </div>
              <div className="text-slate-600">
                Native Place: {profile.nativeDistrict || profile.nativePlace || 'Not specified'}
              </div>
            </div>

            <div className="p-4 bg-white border border-[#F0F0F5] rounded-2xl space-y-1">
              <h5 className="font-bold text-[#18181D] text-xs">Education & Career</h5>
              <div className="text-slate-600">
                Education: {profile.education || 'Not specified'}
              </div>
              {profile.college && (
                <div className="text-slate-600">College: {profile.college}</div>
              )}
              <div className="text-slate-600">
                Occupation: {profile.occupation || profile.profession || 'Not specified'}
              </div>
              {(profile.employer || profile.company) && (
                <div className="text-slate-600">
                  Company: {profile.employer || profile.company} ({profile.employedIn || 'Private'})
                </div>
              )}
              <div className="text-slate-600 font-semibold text-[#6D53F5]">
                Annual Income: {profile.annualIncome || 'Not specified'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Controls: Delete, Suspend, Reject, Approve */}
        <div className="p-4 border-t border-[#F0F0F5] bg-white flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelete(profile.id)}
              className="px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            {status !== 'suspended' && (
              <button
                onClick={() => onSuspend(profile.id)}
                className="px-3.5 py-2.5 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                <span>Suspend</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>

            {status !== 'rejected' && (
              <button
                onClick={() => {
                  onReject(profile.id);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            )}

            {status !== 'approved' && (
              <button
                onClick={() => {
                  onApprove(profile.id);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve ✓</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
