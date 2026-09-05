import React from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Clock, 
  Building2, 
  GraduationCap, 
  Languages, 
  Award, 
  Calendar, 
  Video, 
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  LogIn
} from 'lucide-react';

export default function DoctorDetailsModal({ doctor, isOpen, onClose, onBookDoctor, currentUser }) {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white flex items-start justify-between shrink-0 relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  {doctor.specialtyName}
                </span>
                <span className="text-[10px] font-mono bg-slate-800 text-purple-300 px-2 py-0.5 rounded border border-slate-700">
                  {doctor.nmcNumber || 'NMC Verified'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{doctor.name}</h3>
              <p className="text-xs text-teal-200 font-medium">{doctor.title}</p>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{doctor.hospital} • {doctor.location}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <span className="text-xs font-bold text-slate-400 block uppercase">Experience</span>
              <span className="text-base sm:text-lg font-black text-slate-800">{doctor.experience}+ Years</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <span className="text-xs font-bold text-slate-400 block uppercase">Rating</span>
              <div className="flex items-center justify-center gap-1 text-base sm:text-lg font-black text-slate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{doctor.rating}</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <span className="text-xs font-bold text-slate-400 block uppercase">Consultations</span>
              <span className="text-base sm:text-lg font-black text-teal-600">{doctor.reviewsCount || 450}+</span>
            </div>
          </div>

          {/* Clinical Bio */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              About Doctor & Clinical Specialization
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.about || `${doctor.name} is a renowned specialist with over ${doctor.experience} years of clinical excellence in India, providing compassionate patient care.`}
            </p>
          </div>

          {/* Education & Qualifications */}
          {doctor.education && doctor.education.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                Education & Medical Alma Mater
              </h4>
              <ul className="space-y-1.5">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages & Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Languages className="w-4 h-4 text-teal-600" />
                <span>Languages Spoken</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{doctor.languages?.join(', ') || 'English, Hindi'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Hospital / Clinic Center</span>
              </div>
              <p className="text-sm font-bold text-slate-800 truncate">{doctor.hospital}</p>
            </div>
          </div>

        </div>

        {/* Footer with Instant Book CTA */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Consultation Fee</span>
            <div className="text-lg font-black text-slate-900">
              {doctor.currency || '₹'}{doctor.fee} <span className="text-xs font-normal text-slate-500">/ session</span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookDoctor(doctor);
            }}
            className={`px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              currentUser
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-teal-500/25'
                : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {currentUser ? (
              <>
                <Calendar className="w-4 h-4" />
                <span>Book Slot (₹{doctor.fee})</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-teal-400" />
                <span>Sign In to Book</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
