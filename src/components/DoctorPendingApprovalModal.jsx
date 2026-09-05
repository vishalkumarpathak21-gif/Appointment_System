import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Building2, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  MapPin, 
  Award, 
  FileCheck2, 
  X,
  User
} from 'lucide-react';

export default function DoctorPendingApprovalModal({ isOpen, onClose, doctorData, onProceedToHome }) {
  if (!isOpen || !doctorData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/15 text-amber-200 flex items-center justify-center mx-auto mb-3 shadow-inner border border-white/20">
            <Clock className="w-9 h-9 animate-pulse text-amber-300" />
          </div>

          <h3 className="font-black text-xl text-white">
            Application Submitted for Verification
          </h3>
          <p className="text-xs text-amber-100 mt-1 max-w-sm mx-auto">
            NMC Credentials & Medical Registration Review Desk
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Main Informative Notice Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Administrator Verification Required</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              <strong>Your Doctor Portal access will be granted once your medical credentials, NMC registration number, and clinic details are verified by the Administrator.</strong>
            </p>
            <p className="text-[11px] text-slate-500">
              You can now browse the platform and view your submitted profile information. Patient consultations and the Doctor Consultation Portal will be unlocked immediately upon approval.
            </p>
          </div>

          {/* Submitted Doctor Profile Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Application Status</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Pending Admin Approval</span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Doctor Name</span>
              <span className="font-bold text-slate-900">{doctorData.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Specialization</span>
              <span className="font-bold text-teal-700 capitalize">{doctorData.specialty?.replace('_', ' ')}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">NMC Registration No.</span>
              <span className="font-mono font-bold text-slate-800">{doctorData.nmcNumber}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Qualification</span>
              <span className="font-medium text-slate-800">{doctorData.qualification || 'MBBS, MD'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Clinic / Hospital</span>
              <span className="font-medium text-slate-800">{doctorData.hospital || 'Apollo Hospitals / Clinic'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Consultation Fee</span>
              <span className="font-bold text-emerald-700">₹{doctorData.fee}</span>
            </div>
          </div>

          {/* Action Button: Redirect to Home Page */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onProceedToHome}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950 hover:from-slate-800 hover:to-teal-900 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <span>Go to Home Page (View Profile Info)</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
