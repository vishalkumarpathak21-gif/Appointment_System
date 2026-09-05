import React from 'react';
import { Star, Quote, ShieldCheck, Heart, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/doctorsData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3.5 py-1 rounded-full border border-teal-200">
            <ThumbsUp className="w-3.5 h-3.5" />
            Real Patient Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by <span className="text-teal-600">50,000+ Happy Patients</span>
          </h2>
          <p className="text-slate-600 text-base">
            Read verified reviews and feedback from real patients who found the right specialist and care on DocPulse.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-200 opacity-60" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-teal-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{item.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" title="Verified Patient" />
                    </h4>
                    <p className="text-xs text-slate-400">{item.city}</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                  {(item.specialtyTreated || item.role || 'Specialist').split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hospital Partners / Network Banner */}
        <div className="mt-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900">Are you a qualified medical practitioner?</h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Join 1,200+ specialist doctors growing their clinic consultations and telehealth reach with DocPulse.
            </p>
          </div>
          <button
            onClick={() => alert("Practitioner registration portal opening soon! Please contact partners@docpulse.health for onboarding.")}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors shrink-0 cursor-pointer"
          >
            Apply as Doctor
          </button>
        </div>

      </div>
    </section>
  );
}
