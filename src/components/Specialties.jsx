import React from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Brain, 
  Baby, 
  Activity, 
  Smile, 
  Eye, 
  Stethoscope, 
  SmilePlus,
  ArrowRight,
  Check
} from 'lucide-react';
import { SPECIALTIES } from '../data/doctorsData';

const iconMap = {
  HeartPulse: HeartPulse,
  Sparkles: Sparkles,
  Brain: Brain,
  Baby: Baby,
  Activity: Activity,
  Smile: Smile,
  Eye: Eye,
  Stethoscope: Stethoscope,
  SmilePlus: SmilePlus
};

export default function Specialties({ selectedSpecialty, setSelectedSpecialty, onSpecialtySelect }) {
  return (
    <section id="specialties" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              <Stethoscope className="w-3.5 h-3.5" />
              Specialized Medical Departments
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Browse Doctors by <span className="text-teal-600">Specialty</span>
            </h2>
            <p className="text-slate-600 text-base">
              Find experienced healthcare specialists for every diagnosis. Select a department to explore certified physicians and upcoming appointment slots.
            </p>
          </div>

          {selectedSpecialty !== 'all' && (
            <button
              onClick={() => setSelectedSpecialty('all')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 self-start md:self-auto transition-colors"
            >
              <span>Show All Specialties</span>
              <span className="text-xs bg-slate-300 text-slate-800 rounded-full px-1.5 py-0.5">✕</span>
            </button>
          )}
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Stethoscope;
            const isSelected = selectedSpecialty === dept.id;

            return (
              <div
                key={dept.id}
                onClick={() => onSpecialtySelect(dept.id)}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-gradient-to-b from-teal-50/90 to-cyan-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-lg shadow-teal-500/10' 
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-200/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                      : 'bg-slate-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white group-hover:scale-105'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-100/80 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all border border-slate-200/40 group-hover:border-teal-200">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors flex items-center justify-between">
                  <span>{dept.name}</span>
                  {isSelected && <Check className="w-5 h-5 text-teal-600" />}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {dept.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 group-hover:text-teal-700 group-hover:translate-x-1 transition-all">
                  <span>Consult Specialists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
