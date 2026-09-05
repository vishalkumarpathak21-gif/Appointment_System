import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  CalendarDays,
  Plus,
  FileText,
  Download,
  RotateCcw,
  Receipt,
  Search
} from 'lucide-react';

export default function MyAppointmentsDrawer({ 
  isOpen, 
  onClose, 
  appointments = [], 
  onCancelAppointment,
  onBookNewAppointment 
}) {
  const [drawerTab, setDrawerTab] = useState('all'); // 'all' | 'upcoming' | 'completed'

  if (!isOpen) return null;

  const filtered = appointments.filter(apt => {
    if (drawerTab === 'upcoming') return apt.status === 'Confirmed' || apt.status === 'In-Progress';
    if (drawerTab === 'completed') return apt.status === 'Completed';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-teal-950 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">My Appointment History</h3>
                <p className="text-xs text-teal-200">
                  {appointments.length} Total Consultation Records
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-1.5 shrink-0 text-xs">
            <button
              onClick={() => setDrawerTab('all')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                drawerTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records ({appointments.length})
            </button>
            <button
              onClick={() => setDrawerTab('upcoming')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                drawerTab === 'upcoming'
                  ? 'bg-white text-teal-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming ({appointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length})
            </button>
            <button
              onClick={() => setDrawerTab('completed')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                drawerTab === 'completed'
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed ({appointments.filter(a => a.status === 'Completed').length})
            </button>
          </div>

          {/* List of Appointments */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3.5 bg-slate-50">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item._id || item.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 hover:border-teal-300 transition-colors"
                >
                  {/* Doctor Info Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.doctorImage || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'}
                        alt={item.doctorName}
                        className="w-12 h-12 rounded-xl object-cover border border-teal-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{item.doctorName}</h4>
                        <p className="text-xs text-teal-600 font-semibold">{item.doctorSpecialty}</p>
                        <span className="text-[10px] font-mono text-slate-400">Ref: {item.appointmentCode || item.id}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-cyan-50 text-cyan-700 border border-cyan-200'
                    }`}>
                      ● {item.status || 'Confirmed'}
                    </span>
                  </div>

                  {/* Date & Time details */}
                  <div className="bg-slate-50 rounded-xl p-2.5 grid grid-cols-2 gap-2 text-xs border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-semibold">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-semibold">{item.timeSlot}</span>
                    </div>
                  </div>

                  {/* Diagnosis snippet if available */}
                  {item.prescription?.diagnosis && (
                    <div className="bg-teal-50/60 p-2.5 rounded-xl border border-teal-100 text-xs">
                      <span className="font-bold text-teal-900">Diagnosis: </span>
                      <span className="text-teal-800">{item.prescription.diagnosis}</span>
                    </div>
                  )}

                  {/* Mode & Action details */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-emerald-600">
                      ₹{item.fee} ({item.paymentMethod || 'UPI'})
                    </span>

                    <div className="flex items-center gap-2">
                      {item.prescription?.diagnosis && (
                        <button
                          onClick={() => alert(`📄 Downloading NMC Signed e-Prescription PDF for ${item.appointmentCode}...`)}
                          className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>e-Rx</span>
                        </button>
                      )}

                      {item.status === 'Confirmed' && (
                        <button
                          onClick={() => onCancelAppointment(item._id || item.id)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                  <Calendar className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-800">No appointments found</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  You don't have any appointments in this view. Book your first appointment with an Indian medical specialist.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBookNewAppointment();
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  Book Specialist Doctor
                </button>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-4 bg-white border-t border-slate-200">
            <button
              onClick={() => {
                onClose();
                onBookNewAppointment();
              }}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Book Another Specialist Consultation</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
