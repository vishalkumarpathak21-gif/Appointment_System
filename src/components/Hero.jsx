import React from 'react';
import { 
  Search, 
  MapPin, 
  Video, 
  Building2, 
  Calendar, 
  Star, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { SPECIALTIES } from '../data/doctorsData';

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedMode,
  setSelectedMode,
  onSearchSubmit,
  onQuickBook,
  onOpenSignUp
}) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-teal-50/60 via-slate-50 to-white">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-200/40 via-cyan-200/30 to-blue-200/20 blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200/30 blur-2xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content & Search */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Pill Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs sm:text-sm font-bold shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-ping"></span>
                <Sparkles className="w-4 h-4 text-teal-700" />
                <span>India's Trusted Doctor Appointment & Telehealth Platform 🇮🇳</span>
              </div>

              {onOpenSignUp && (
                <button
                  type="button"
                  onClick={onOpenSignUp}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-teal-400" />
                  <span>Free Patient Sign Up</span>
                </button>
              )}
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Consult Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Specialist Doctors</span> Across India
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Book in-clinic visits & online video consultations with verified doctors from <strong>AIIMS, Apollo, Fortis, Max & Manipal</strong> hospitals.
              </p>
            </div>

            {/* Interactive Search Box */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/70 border border-slate-200/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Doctor name / keyword search */}
                <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-xl px-3.5 py-2.5 border border-slate-200/60">
                  <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Doctor name, hospital, symptom..."
                    aria-label="Doctor name or symptom search"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none font-medium"
                  />
                </div>

                {/* Specialty dropdown */}
                <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-xl px-3.5 py-2.5 border border-slate-200/60">
                  <Building2 className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    aria-label="Filter doctors by department or specialty"
                    className="w-full bg-transparent text-sm text-slate-800 outline-none font-medium cursor-pointer"
                  >
                    <option value="all">All Specialties</option>
                    {SPECIALTIES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mode Selector */}
                <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-xl px-3.5 py-2.5 border border-slate-200/60">
                  <Video className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    aria-label="Filter doctors by consultation mode"
                    className="w-full bg-transparent text-sm text-slate-800 outline-none font-medium cursor-pointer"
                  >
                    <option value="all">All Modes (Clinic & Video)</option>
                    <option value="In-Clinic">In-Clinic Visit Only</option>
                    <option value="Video Consultation">Video Call (Online)</option>
                  </select>
                </div>

              </div>

              {/* Submit & Quick stats */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    NMC Verified
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Instant e-Prescription
                  </span>
                  <span className="hidden sm:flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    ABHA Integrated
                  </span>
                </div>

                <button
                  onClick={onSearchSubmit}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Specialists</span>
                </button>
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-200/60">
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-slate-900">500+</div>
                <div className="text-xs text-slate-500 font-medium">Verified Indian Doctors</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-slate-900">50K+</div>
                <div className="text-xs text-slate-500 font-medium">Patients Consulted</div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-2xl font-black text-slate-900">
                  <span>4.96</span>
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-xs text-slate-500 font-medium">Patient Satisfaction</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-teal-600">₹0 Fee</div>
                <div className="text-xs text-slate-500 font-medium">Free Slot Booking</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Interactive Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Visual Container */}
            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                alt="Dr. Rajesh Sharma Cardiologist"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Bottom Card Inside Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                      AIIMS
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Dr. Rajesh Sharma</h4>
                      <p className="text-xs text-teal-700 font-semibold">Cardiologist • Apollo Hospital Delhi</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onQuickBook('doc-1')}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Book ₹1000
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Live Badge 1: Next Slot Available */}
            <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <p className="text-xs font-bold text-slate-900">Next Slot Available</p>
                </div>
                <p className="text-xs text-slate-500 font-medium">Today at 03:30 PM (Video Call)</p>
              </div>
            </div>

            {/* Floating Live Badge 2: Verified Rating & Testimonial */}
            <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-black text-slate-900">4.96 / 5.0</span>
                  <span className="text-[11px] text-slate-400 font-medium">(4.2k+ reviews)</span>
                </div>
                <p className="text-xs text-emerald-600 font-bold">★ Verified Indian Patients</p>
              </div>
            </div>

            {/* Floating Live Badge 3: Teleconsultation / Digital Rx */}
            <div className="absolute -bottom-4 -left-2 sm:-left-6 bg-slate-900 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">Online Video Consultation</p>
                <p className="text-[10px] text-slate-400">Digital Rx on WhatsApp / SMS</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
