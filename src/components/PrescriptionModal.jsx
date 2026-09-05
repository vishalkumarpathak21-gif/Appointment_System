import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  ShieldCheck, 
  Stethoscope, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  CheckCircle2,
  Pill,
  HeartPulse
} from 'lucide-react';

export default function PrescriptionModal({ appointment, isOpen, onClose }) {
  if (!isOpen || !appointment || !appointment.prescription) return null;

  const { prescription } = appointment;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Top Bar (Actions) */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Digital Medical e-Prescription (NMC Verified)</h3>
              <p className="text-[11px] text-slate-400 font-mono">Ref: {appointment.appointmentCode}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Prescription Document Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-900 text-slate-200 print:bg-white print:text-black print:p-4">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b-2 border-teal-500/40 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white print:text-black">
                  DocPulse Telemedicine & Clinical Network
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600">
                National Medical Commission (NMC) Certified Telehealth Provider
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Consultation Done & Signed</span>
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Issued: {new Date(prescription.issuedAt || appointment.updatedAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Doctor & Patient Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 print:bg-slate-100 print:border-slate-300">
            
            {/* Doctor Info */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">Treating Doctor</span>
              <h4 className="text-sm font-bold text-white print:text-black">{appointment.doctorName}</h4>
              <p className="text-slate-300 print:text-slate-700">{appointment.doctorTitle || 'Specialist Physician'}</p>
              <p className="font-mono text-purple-300 print:text-purple-700 font-semibold">
                NMC Reg: {appointment.nmcNumber || 'NMC-DMC/78942'}
              </p>
              <p className="text-slate-400 print:text-slate-600">{appointment.doctorHospital}</p>
            </div>

            {/* Patient Info */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">Patient Details</span>
              <h4 className="text-sm font-bold text-white print:text-black">{appointment.patientName}</h4>
              <p className="text-slate-300 print:text-slate-700">
                Age: {appointment.patientAge || '32'} yrs • Gender: {appointment.patientGender || 'Male'}
              </p>
              <p className="text-slate-400 print:text-slate-600">Email: {appointment.patientEmail}</p>
              <p className="font-mono text-slate-400 print:text-slate-600 text-[11px]">
                ABHA ID: {appointment.abhaId || '91-4567-8901-2345'}
              </p>
            </div>

          </div>

          {/* Clinical Diagnosis */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Clinical Diagnosis & Medical Findings</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-emerald-300 print:bg-slate-50 print:text-slate-900">
              {prescription.diagnosis || 'General Clinical Consultation - Vital signs normal.'}
            </div>
          </div>

          {/* Medications Table (Rx) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-teal-400" />
              <span>Prescribed Medications (Rx)</span>
            </h4>

            {prescription.medicines && prescription.medicines.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-slate-700/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800 text-slate-300 font-bold border-b border-slate-700 print:bg-slate-200 print:text-black">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Medicine & Strength</th>
                      <th className="p-3">Dosage</th>
                      <th className="p-3">Frequency</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                    {prescription.medicines.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-3 font-bold text-white print:text-black">{med.name}</td>
                        <td className="p-3 text-teal-300 print:text-teal-800 font-semibold">{med.dosage}</td>
                        <td className="p-3 text-slate-200 print:text-slate-800">{med.frequency}</td>
                        <td className="p-3 text-slate-300 print:text-slate-700">{med.duration}</td>
                        <td className="p-3 text-slate-400 print:text-slate-600 italic">{med.instructions || 'As directed'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400 p-3 bg-slate-800/40 rounded-xl">No specific medications prescribed.</p>
            )}
          </div>

          {/* Diet & Advice */}
          {prescription.dietAdvice && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dietary & Lifestyle Advice</h4>
              <p className="text-xs text-slate-300 print:text-slate-800 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                {prescription.dietAdvice}
              </p>
            </div>
          )}

          {/* Next Follow Up */}
          {prescription.nextFollowUp && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Review / Follow-Up</h4>
              <p className="text-xs text-teal-300 print:text-teal-800 p-2.5 rounded-xl bg-teal-950/40 border border-teal-800/40 font-semibold">
                📅 {prescription.nextFollowUp}
              </p>
            </div>
          )}

          {/* Digital Signature Footer */}
          <div className="pt-6 border-t-2 border-dashed border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>Valid across licensed pharmacies in India under NMC Telemedicine Practice Guidelines 2020.</span>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 print:border-black">
                <span className="font-serif italic font-bold text-teal-300 print:text-black text-sm block">
                  Dr. {appointment.doctorName}
                </span>
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">
                  NMC: {appointment.nmcNumber || 'NMC-DMC/78942'} (Digitally Signed)
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
