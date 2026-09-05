import React, { useState } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Calendar, 
  ArrowRight, 
  HelpCircle,
  AlertTriangle,
  HeartPulse,
  Activity,
  UserCheck,
  Zap
} from 'lucide-react';
import { api } from '../services/api';

const HOME_QUICK_PROMPTS = [
  "I have fever, cough and sore throat",
  "I have acne, skin rashes and itchy spots",
  "Severe knee pain and stiffness in joints",
  "Toothache, sensitivity and gum pain",
  "Persistent headache and migraine",
  "Chest discomfort and rapid heartbeat"
];

export default function HomeAIAssistant({ onBookDoctor, onSelectSpecialty }) {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null); // 'guidance' | 'recommendation'
  const [guidanceResult, setGuidanceResult] = useState(null);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [error, setError] = useState('');

  const handleGetGuidance = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please describe your symptoms to receive AI Health Guidance.');
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
      setError('Please describe your symptoms to find recommended specialists.');
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
    <section id="ai-assistant" className="py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI-POWERED HEALTHCARE TRIAGE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            SmartCare <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">AI Assistant</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unsure which doctor you should consult? Describe your symptoms in plain language, and our AI will provide instant general health guidance and match you with verified medical specialists.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant AI Symptom Analysis</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NMC Verified Doctors</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>General Guidance Only</span>
            </span>
          </div>
        </div>

        {/* Unified AI Interactive Card */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-teal-500/30 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Input Header & Prompt Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-teal-400" />
                <span>Describe your health symptoms:</span>
              </label>

              {symptoms && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                rows="3"
                value={symptoms}
                onChange={(e) => {
                  setSymptoms(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. 'I have had fever, sore throat and dry cough for the last 2 days' or 'I have severe acne breakout on face'..."
                className="w-full p-4 text-xs sm:text-sm bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium resize-none shadow-inner"
              />
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
                <span>Quick symptom examples:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {HOME_QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSymptoms(prompt);
                      if (error) setError('');
                    }}
                    className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-teal-900/40 text-slate-300 hover:text-teal-200 border border-slate-700 hover:border-teal-500/40 transition-all cursor-pointer text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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
                  <span>✨ Get AI Health Guidance</span>
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
                  <span>Matching Approved Doctors...</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4 text-cyan-200" />
                  <span>👨‍⚕️ Find Recommended Specialists</span>
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

          {/* Loading Indicator */}
          {loading && (
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3 animate-in fade-in">
              <Loader2 className="w-8 h-8 mx-auto text-teal-400 animate-spin" />
              <p className="text-xs font-bold text-slate-300">
                {activeFeature === 'guidance'
                  ? 'SmartCare AI is reviewing your symptoms to generate clinical guidance...'
                  : 'SmartCare AI is determining medical specialization & querying verified doctors...'}
              </p>
              <p className="text-[11px] text-slate-500">
                Filtering for licensed doctors verified by State Medical Councils
              </p>
            </div>
          )}

          {/* ========================================================================= */}
          {/* FEATURE 1: AI HEALTH GUIDANCE RESULT CARD                                 */}
          {/* ========================================================================= */}
          {guidanceResult && !loading && (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-teal-500/50 space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-extrabold text-white">AI Health Assessment</span>
                </div>
                
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Recommended Specialist: {guidanceResult.specialization}
                </span>
              </div>

              {/* Emergency Warning */}
              {guidanceResult.isEmergency && (
                <div className="p-3.5 rounded-xl bg-rose-950 border border-rose-700 text-rose-200 text-xs font-bold flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Emergency Warning:</strong> The symptoms described may require urgent medical care. Please visit the nearest emergency room immediately.
                  </span>
                </div>
              )}

              {/* Clinical Guidance Text */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  General Clinical Observations:
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {guidanceResult.guidance}
                </p>
              </div>

              {/* Mandatory Medical Safety Disclaimer */}
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-start gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Medical Disclaimer:</strong> {guidanceResult.safetyNote || 'This information is for general guidance only and is not a medical diagnosis.'}
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Ready to consult an approved {guidanceResult.specialization}?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectSpecialty) onSelectSpecialty(guidanceResult.specialtyKey);
                    const el = document.getElementById('doctors');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Browse {guidanceResult.specialization}s</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* FEATURE 2: AI DOCTOR RECOMMENDATION & MATCHED DOCTOR CARDS                */}
          {/* ========================================================================= */}
          {recommendationResult && !loading && (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/50 space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-extrabold text-white">Recommended Specialist & Verified Doctors</span>
                </div>
                
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {recommendationResult.recommendation.specialization}
                </span>
              </div>

              {/* AI Clinical Reason */}
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">AI Specialization Match</span>
                <p className="leading-relaxed">{recommendationResult.recommendation.reason}</p>
              </div>

              {/* Mandatory Medical Disclaimer */}
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-start gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Medical Disclaimer:</strong> {recommendationResult.recommendation.safetyNote}
                </span>
              </div>

              {/* Matched Verified Doctors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified {recommendationResult.recommendation.specialization} Specialists ({recommendationResult.doctors.length} Found)</span>
                  </h4>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectSpecialty) onSelectSpecialty(recommendationResult.recommendation.specialtyKey);
                      const el = document.getElementById('doctors');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all on Home Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {recommendationResult.doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendationResult.doctors.map(doc => (
                      <div
                        key={doc._id}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3"
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
                            <p className="text-[11px] text-emerald-400 font-bold mt-0.5">₹{doc.fee} / consult</p>
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
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                    No approved specialists listed in this category yet. You can consult our general physicians.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
