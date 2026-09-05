import React from 'react';
import { 
  Search, 
  CalendarCheck2, 
  Video, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Lock, 
  HeartHandshake,
  QrCode
} from 'lucide-react';

export default function HowItWorks({ onGetStarted }) {
  const steps = [
    {
      number: "01",
      title: "Select Indian Specialist",
      desc: "Search by symptoms, specialty, or top hospitals in Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, and Pune.",
      icon: Search,
      color: "from-teal-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Pick Preferred Time Slot",
      desc: "Choose morning, afternoon, or evening OPD slots. Real-time availability with zero clinic waiting queues.",
      icon: CalendarCheck2,
      color: "from-cyan-500 to-blue-500"
    },
    {
      number: "03",
      title: "Consult & Get Digital Rx",
      desc: "Join secure video consult or visit hospital. Get official NMC-signed e-prescription on WhatsApp & ABHA app.",
      icon: Video,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "100% NMC & State Council Verified",
      desc: "All doctors verified with National Medical Commission credentials."
    },
    {
      icon: QrCode,
      title: "ABHA Health Locker Integration",
      desc: "Ayushman Bharat Digital Mission (ABDM) compliant digital health records."
    },
    {
      icon: Clock,
      title: "Zero Waiting Room Queue",
      desc: "Guaranteed 15-minute on-time OPD consultation at NABH hospitals."
    },
    {
      icon: FileCheck,
      title: "WhatsApp & SMS Digital Rx",
      desc: "Instant digital prescription accepted at Apollo, MedPlus & 1mg pharmacies."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step-by-Step Guide */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-100">
            <Zap className="w-3.5 h-3.5 text-teal-600" />
            Fast 3-Step Healthcare Booking
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How <span className="text-teal-600">DocPulse India</span> Works
          </h2>
          <p className="text-slate-600 text-base">
            Skip long hospital lines. Book top specialists in under 60 seconds with 3 simple steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-20">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-teal-500/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center text-xs font-bold text-teal-600 group-hover:text-teal-700">
                  <span>Fast & automated</span>
                  <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us Feature Pillars */}
        <div id="why-us" className="pt-6">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Trusted Across India 🇮🇳</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Healthcare Designed For <span className="text-teal-400">Indian Families</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We bring India's top medical minds from AIIMS, Apollo, Fortis & Manipal to your fingertips with zero platform convenience fees.
                </p>
                <button
                  onClick={onGetStarted}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Find Doctors Near Me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white/5 hover:bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-colors space-y-2"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-white">{feat.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
