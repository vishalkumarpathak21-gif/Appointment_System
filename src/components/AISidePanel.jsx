import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Calendar, 
  RotateCcw, 
  Star, 
  Building2, 
  MapPin, 
  ArrowRight,
  Stethoscope,
  HeartPulse,
  PhoneCall,
  Minimize2,
  Maximize2,
  Info
} from 'lucide-react';
import { api } from '../services/api';

const QUICK_PROMPTS = [
  "I have fever, cough and sore throat",
  "Severe throbbing molar toothache",
  "Acne breakout and itchy red skin rashes",
  "Knee joint pain and stiffness when walking",
  "Persistent migraine headache and nausea",
  "My child has mild fever and runny nose"
];

export default function AISidePanel({ isOpen, onClose, onBookDoctor, onSelectSpecialty }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Namaste! I am your SmartCare AI Clinical Assistant. You can describe your symptoms in natural words, and I'll provide immediate medical guidance, red-flag risk analysis, and match you with verified specialists.",
      isGreeting: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'doctors'
  const [matchedDoctors, setMatchedDoctors] = useState([]);
  const [latestGuidance, setLatestGuidance] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (customPrompt) => {
    const query = (customPrompt || inputText).trim();
    if (!query || loading) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Fetch both AI Guidance and Recommended Doctors concurrently
      const [guidanceRes, recRes] = await Promise.all([
        api.getAiHealthGuidance(query).catch(err => ({ success: false, error: err.message })),
        api.getAiDoctorRecommendation(query).catch(err => ({ success: false, data: { doctors: [] } }))
      ]);

      const guidanceData = guidanceRes?.data || guidanceRes?.guidance ? (guidanceRes.data || guidanceRes) : null;
      const doctors = recRes?.data?.doctors || recRes?.doctors || [];

      const clinicalObservations = guidanceData?.guidance || guidanceData?.generalGuidance || guidanceData?.observations || 
        `These symptoms are commonly associated with medical conditions. Keep yourself adequately hydrated, get adequate rest, and monitor your symptoms. We recommend consulting a licensed specialist for a comprehensive clinical evaluation.`;

      const specialization = guidanceData?.specialization || guidanceData?.recommendedSpecialty || recRes?.data?.recommendation?.specialization || "General Physician";
      const specialtyKey = guidanceData?.specialtyKey || recRes?.data?.recommendation?.specialtyKey || "general_medicine";
      const isEmergency = Boolean(guidanceData?.isEmergency);
      const safetyNote = guidanceData?.safetyNote || "This information is for general guidance only and is not a medical diagnosis.";

      const structuredGuidance = {
        guidance: clinicalObservations,
        specialization,
        specialtyKey,
        isEmergency,
        safetyNote
      };

      setLatestGuidance(structuredGuidance);
      setMatchedDoctors(doctors);

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: clinicalObservations,
        guidance: structuredGuidance,
        doctors: doctors
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: 'error-' + Date.now(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "I encountered an issue analyzing your symptoms. Please try rephrasing or check your connection.",
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Chat cleared. What symptoms or medical queries would you like help with?",
        isGreeting: true
      }
    ]);
    setMatchedDoctors([]);
    setLatestGuidance(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Chatbot Panel */}
      <aside className="relative z-10 w-full sm:w-[500px] lg:w-[540px] h-full bg-slate-900/98 backdrop-blur-2xl border-l border-teal-500/30 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-850 to-teal-950/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/30 font-black">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">SmartCare AI Assistant</h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-400/30">
                  v2.0 Live
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>NMC Verified Clinical Triage Engine</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              title="Reset Chat"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close Panel"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="px-4 pt-3 pb-2 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Health Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Matched Specialists ({matchedDoctors.length})</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {activeTab === 'chat' ? (
            <>
              {/* Messages Flow */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5 animate-in fade-in duration-200`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 px-1 font-medium">
                    {msg.sender === 'user' ? (
                      <>
                        <span>You</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-teal-400" />
                        <span className="text-teal-300 font-bold">SmartCare AI</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[94%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-tr-xs shadow-md font-medium'
                        : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-xs shadow-lg space-y-4'
                    }`}
                  >
                    {/* Welcome Greeting or plain text */}
                    {msg.isGreeting ? (
                      <p className="whitespace-pre-line text-slate-200 font-normal">{msg.text}</p>
                    ) : null}

                    {/* AI Structured Clinical Card */}
                    {msg.guidance ? (
                      <div className="space-y-3.5">
                        
                        {/* Header with Specialty Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-700/80">
                          <div className="flex items-center gap-1.5 text-teal-300 font-extrabold text-xs">
                            <Sparkles className="w-4 h-4 text-teal-400" />
                            <span>Clinical Triage Assessment</span>
                          </div>
                          
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/40">
                            Specialist: {msg.guidance.specialization}
                          </span>
                        </div>

                        {/* Emergency Critical Warning */}
                        {msg.guidance.isEmergency && (
                          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/70 text-rose-200 text-xs flex items-start gap-2.5 shadow-sm">
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-rose-300 font-bold uppercase text-[10px] tracking-wider">
                                Urgent Medical Alert:
                              </strong>
                              <p className="mt-0.5 leading-normal">
                                The symptoms you described may require immediate medical attention. Please visit the nearest emergency room or hospital immediately.
                              </p>
                              <a
                                href="tel:108"
                                className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 px-2.5 py-1 rounded-md"
                              >
                                <PhoneCall className="w-3 h-3" />
                                <span>Emergency: Call 108</span>
                              </a>
                            </div>
                          </div>
                        )}

                        {/* General Clinical Observations */}
                        <div className="space-y-1.5">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                            <span>General Clinical Observations:</span>
                          </h4>
                          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-teal-500/30 text-slate-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-inner">
                            {msg.guidance.guidance || msg.text}
                          </div>
                        </div>

                        {/* Mandatory Medical Safety Disclaimer */}
                        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-[11px] flex items-start gap-2 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Medical Disclaimer:</strong> {msg.guidance.safetyNote || 'This information is for general guidance only and is not a medical diagnosis.'}
                          </span>
                        </div>

                        {/* Matched Doctors Preview Card */}
                        {msg.doctors && msg.doctors.length > 0 && (
                          <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                              <span>Recommended Top Specialists</span>
                              <button
                                onClick={() => setActiveTab('doctors')}
                                className="text-teal-400 hover:underline text-[11px]"
                              >
                                View All ({msg.doctors.length}) →
                              </button>
                            </div>

                            <div className="space-y-2">
                              {msg.doctors.slice(0, 2).map((doc) => (
                                <div
                                  key={doc._id || doc.id}
                                  className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between gap-3"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <img
                                      src={doc.image}
                                      alt={doc.name}
                                      className="w-9 h-9 rounded-full object-cover border border-teal-500/40 shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <p className="font-bold text-white text-xs truncate">{doc.name}</p>
                                      <p className="text-[10px] text-teal-300 truncate">{doc.hospital}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      onClose();
                                      if (onBookDoctor) onBookDoctor(doc);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shrink-0 shadow-xs cursor-pointer flex items-center gap-1"
                                  >
                                    <Calendar className="w-3 h-3" />
                                    <span>Book ₹{doc.fee}</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    ) : (
                      !msg.isGreeting && <p className="whitespace-pre-line">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {loading && (
                <div className="flex items-start gap-2.5 animate-in fade-in duration-200">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700/80 p-3.5 rounded-2xl rounded-tl-xs flex items-center gap-2 text-xs text-slate-300">
                    <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                    <span>Analyzing clinical indicators & matching doctors...</span>
                  </div>
                </div>
              )}

              {/* Quick Prompts Suggestions */}
              {messages.length === 1 && !loading && (
                <div className="pt-3 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Quick Clinical Queries:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all text-left cursor-pointer hover:border-teal-500/50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          ) : (
            /* Matched Doctors Tab */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Matched Certified Specialists
                </span>
                <span className="text-xs text-teal-400 font-semibold">{matchedDoctors.length} available</span>
              </div>

              {matchedDoctors.length > 0 ? (
                <div className="space-y-3">
                  {matchedDoctors.map((doc) => (
                    <div
                      key={doc._id || doc.id}
                      className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md hover:border-teal-500/50 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                              {doc.specialtyName}
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{doc.rating}</span>
                            </div>
                          </div>
                          <h4 className="font-extrabold text-white text-sm truncate">{doc.name}</h4>
                          <p className="text-xs text-slate-400 truncate">{doc.title}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-300 pt-0.5">
                            <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{doc.hospital}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-700 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Fee</span>
                          <span className="text-sm font-extrabold text-white">₹{doc.fee}</span>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            if (onBookDoctor) onBookDoctor(doc);
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Slot</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-3">
                  <Stethoscope className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-300 font-medium">No doctors matched yet.</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Type your symptoms in the chat tab (e.g., "tooth pain" or "skin allergy") to automatically match doctors.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 shrink-0 space-y-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your symptoms (e.g. fever, toothache)..."
              disabled={loading}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500 font-medium disabled:opacity-50 pr-12 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              aria-label="Send message"
              className="absolute right-2 w-9 h-9 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
            <Info className="w-3 h-3" />
            <span>AI guidance provides health information and does not substitute a licensed physician.</span>
          </p>
        </div>

      </aside>
    </div>
  );
}
