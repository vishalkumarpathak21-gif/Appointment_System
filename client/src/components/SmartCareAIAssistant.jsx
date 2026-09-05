import React, { useState } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  Send, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Calendar, 
  Star, 
  MapPin, 
  IndianRupee, 
  Building2, 
  ArrowRight, 
  HelpCircle,
  Clock,
  HeartPulse,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';

const QUICK_PROMPTS = [
  "I have fever, cough and sore throat",
  "I have acne, skin irritation and red patches",
  "Severe knee pain and stiffness in joint",
  "Toothache, sensitivity and swollen gums",
  "Persistent headache, migraine and dizziness",
  "My 4-year-old child has mild fever and cold"
];

export default function SmartCareAIAssistant({ onBookDoctor, onFindSpecialists }) {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null); // 'guidance' | 'recommendation'
  const [guidanceResult, setGuidanceResult] = useState(null);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [error, setError] = useState('');

  const handleGetGuidance = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please enter your symptoms to get AI Health Guidance.');
      return;
    }

    setError('');
    setLoading(true);
    setActiveFeature('guidance');
    setGuidanceResult(null);

    try {
      const data = await api.getAiHealthGuidance(symptoms.trim());
      setGuidanceResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate AI health guidance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendDoctors = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please enter your symptoms to find recommended doctors.');
      return;
    }

    setError('');
    setLoading(true);
    setActiveFeature('recommendation');
    setRecommendationResult(null);

    try {
      const data = await api.getAiDoctorRecommendation(symptoms.trim());
      setRecommendationResult(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch doctor recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSymptoms('');
    setGuidanceResult(null);
    setRecommendationResult(null);
    setError('');
    setActiveFeature(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 border-2 border-teal-500/40 shadow-2xl text-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                SmartCare AI Assistant
              </h2>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Natural-language symptom guidance & intelligent doctor recommendation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>General Guidance Only</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-300">
          Describe your symptoms or what doctor you are looking for:
        </label>
        
        <div className="relative">
          <textarea
            rows="3"
            value={symptoms}
            onChange={(e) => {
              setSymptoms(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. 'I have fever, cough and sore throat for the past 2 days' or 'I have acne and skin irritation'..."
            className="w-full p-4 text-xs sm:text-sm bg-slate-800/90 border border-slate-700 rounded-2xl text-white placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium resize-none shadow-inner"
          />

          {symptoms && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs bg-slate-700/60 hover:bg-slate-700 px-2 py-1 rounded-lg cursor-pointer transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Example Prompt Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Try asking about common symptoms:</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSymptoms(prompt);
                  if (error) setError('');
                }}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-teal-900/40 text-slate-300 hover:text-teal-200 border border-slate-700/80 hover:border-teal-500/40 transition-all cursor-pointer text-left"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dual Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          disabled={loading || !symptoms.trim()}
          onClick={handleGetGuidance}
          className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
        >
          {loading && activeFeature === 'guidance' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Symptoms...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>✨ Ask AI Health Guidance</span>
            </>
          )}
        </button>

        <button
          type="button"
          disabled={loading || !symptoms.trim()}
          onClick={handleRecommendDoctors}
          className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
        >
          {loading && activeFeature === 'recommendation' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Matching Verified Doctors...</span>
            </>
          ) : (
            <>
              <Stethoscope className="w-4 h-4 text-cyan-200" />
              <span>👨‍⚕️ Find Recommended Doctors</span>
            </>
          )}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton Indicator */}
      {loading && (
        <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 text-center space-y-3 animate-in fade-in">
          <Loader2 className="w-8 h-8 mx-auto text-teal-400 animate-spin" />
          <p className="text-xs font-bold text-slate-300">
            {activeFeature === 'guidance' 
              ? 'SmartCare AI is generating personalized general health guidance...' 
              : 'SmartCare AI is predicting specialization & matching approved doctors in MongoDB...'}
          </p>
          <p className="text-[11px] text-slate-500">
            Applying clinical safety filters and medical specialization mapping
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 1 OUTPUT: AI HEALTH GUIDANCE                                      */}
      {/* ========================================================================= */}
      {guidanceResult && !loading && (
        <div className="p-6 rounded-2xl bg-slate-800/90 border border-teal-500/50 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>AI Health Guidance</span>
              </span>
            </div>
            
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
              Recommended: {guidanceResult.specialization}
            </span>
          </div>

          {/* Emergency Alert if applicable */}
          {guidanceResult.isEmergency && (
            <div className="p-3.5 rounded-xl bg-rose-950 border border-rose-700 text-rose-200 text-xs font-bold flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Urgent Safety Alert:</strong> The symptoms described may require emergency evaluation. Please seek immediate hospital casualty / emergency care.
              </span>
            </div>
          )}

          {/* Guidance Content */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              General Health Guidance:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
              {guidanceResult.guidance}
            </p>
          </div>

          {/* Mandatory Medical Disclaimer */}
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-start gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Medical Disclaimer:</strong> {guidanceResult.safetyNote || 'This information is for general guidance only and is not a medical diagnosis.'}
            </span>
          </div>

          {/* Action to find doctors */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Need to see a specialist for a physical evaluation?
            </span>
            <button
              type="button"
              onClick={() => {
                if (onFindSpecialists) onFindSpecialists(guidanceResult.specialtyKey);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Find {guidanceResult.specialization} Doctors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 2 OUTPUT: AI DOCTOR RECOMMENDATION & MONGODB DOCTOR LIST           */}
      {/* ========================================================================= */}
      {recommendationResult && !loading && (
        <div className="p-6 rounded-2xl bg-slate-800/90 border border-cyan-500/50 space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-extrabold text-white">
                AI Specialist Recommendation & Matching Doctors
              </span>
            </div>
            
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Specialist: {recommendationResult.recommendation.specialization}
            </span>
          </div>

          {/* Reason from AI */}
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">Clinical Rationale</span>
            <p className="leading-relaxed">{recommendationResult.recommendation.reason}</p>
          </div>

          {/* Mandatory Medical Disclaimer */}
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-start gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Medical Disclaimer:</strong> {recommendationResult.recommendation.safetyNote}
            </span>
          </div>

          {/* Doctors List from MongoDB */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Approved & Verified {recommendationResult.recommendation.specialization}s ({recommendationResult.doctors.length} Found)</span>
              </h4>

              <button
                type="button"
                onClick={() => {
                  if (onFindSpecialists) onFindSpecialists(recommendationResult.recommendation.specialtyKey);
                }}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View all on Directory</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {recommendationResult.doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendationResult.doctors.map(doc => (
                  <div
                    key={doc._id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={doc.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-white text-sm truncate">{doc.name}</h5>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40 shrink-0">
                            ★ {doc.rating || '4.9'}
                          </span>
                        </div>
                        <p className="text-xs text-teal-400 font-semibold">{doc.specialtyName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{doc.hospital}</p>
                        <p className="text-[11px] text-emerald-400 font-bold mt-0.5">₹{doc.fee} / consultation</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onBookDoctor) onBookDoctor(doc);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-center text-xs text-slate-400">
                No approved specialists currently listed for this specialty. You can consult our General Physicians.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
