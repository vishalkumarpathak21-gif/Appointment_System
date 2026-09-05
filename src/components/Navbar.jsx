import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  User,
  Stethoscope, 
  LogOut, 
  ChevronDown, 
  LayoutDashboard, 
  UserPlus, 
  LogIn,
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  selectedLocation,
  setSelectedLocation,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenPortal,
  onOpenDoctorProfile,
  onOpenAIPanel,
  currentView
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const navLinks = [
    { label: 'Specialties', href: '#specialties' },
    { label: 'Find Doctors', href: '#doctors' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why DocPulse', href: '#why-us' },
    { label: 'Patient Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' }
  ];

  const isPendingDoctor = currentUser?.role === 'doctor' && currentUser?.isApproved === false;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top emergency ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>24/7 National Health & Emergency:</span>
              <a href="tel:108" className="text-white hover:underline font-semibold ml-1 bg-emerald-800/60 px-1.5 py-0.5 rounded">
                Dial 108
              </a>
              <span className="text-slate-500">|</span>
              <a href="tel:18002005555" className="text-slate-200 hover:underline font-semibold">
                1800-200-5555
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Available 24x7 Across India</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 border border-slate-700">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Select Indian City"
                className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer pr-1"
              >
                <option value="All Locations" className="bg-slate-900 text-white">All Indian Metros</option>
                <option value="Delhi NCR" className="bg-slate-900 text-white">Delhi NCR (Delhi, Noida, Gurgaon)</option>
                <option value="Mumbai" className="bg-slate-900 text-white">Mumbai, Maharashtra</option>
                <option value="Bengaluru" className="bg-slate-900 text-white">Bengaluru, Karnataka</option>
                <option value="Hyderabad" className="bg-slate-900 text-white">Hyderabad, Telangana</option>
                <option value="Chennai" className="bg-slate-900 text-white">Chennai, Tamil Nadu</option>
                <option value="Kolkata" className="bg-slate-900 text-white">Kolkata, West Bengal</option>
                <option value="Pune" className="bg-slate-900 text-white">Pune, Maharashtra</option>
              </select>
            </div>
            
            <div className="hidden sm:flex items-center gap-1 text-teal-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NMC & ABHA Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' : 'bg-white py-3 shadow-xs'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenPortal('home'); }} className="flex items-center gap-2 group shrink-0 mr-1 sm:mr-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Doc<span className="text-teal-600">Pulse</span>
                </span>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide border border-orange-200 shrink-0">
                  India 🇮🇳
                </span>
              </div>
              <p className="text-[9px] text-slate-500 font-medium tracking-wide whitespace-nowrap">
                TOP SPECIALISTS & TELEHEALTH
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          {currentView === 'home' ? (
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => onOpenPortal('home')}
                className="text-xs xl:text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 hover:bg-teal-100 cursor-pointer whitespace-nowrap"
              >
                ← Back to Home Page
              </button>
            </div>
          )}

          {/* Right Action Buttons (Desktop LG+) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0 ml-auto lg:ml-2">

            {/* SmartCare AI Chatbot Side Panel Trigger */}
            <button
              onClick={onOpenAIPanel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/15 via-cyan-500/15 to-emerald-500/15 text-teal-800 hover:text-teal-900 border border-teal-300 hover:border-teal-400 hover:bg-teal-100/60 text-xs font-bold transition-all shadow-xs cursor-pointer group whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="whitespace-nowrap">SmartCare AI</span>
            </button>
            
            {/* If Logged In */}
            {currentUser ? (
              <div ref={dropdownRef} className="relative shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    currentUser.role === 'admin' ? 'bg-purple-400' :
                    isPendingDoctor ? 'bg-amber-400 animate-ping' :
                    currentUser.role === 'doctor' ? 'bg-cyan-400' :
                    'bg-emerald-400'
                  }`} />
                  <span className="truncate max-w-[120px]">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${
                        isPendingDoctor 
                          ? 'bg-amber-50 text-amber-800 border-amber-300' 
                          : 'bg-teal-50 text-teal-700 border-teal-200'
                      }`}>
                        {isPendingDoctor ? '⏳ Verification Pending by Admin' : `Role: ${currentUser.role}`}
                      </span>
                    </div>

                    <div className="py-1">
                      {/* If Pending Doctor: Only show Profile Info */}
                      {isPendingDoctor ? (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenDoctorProfile && onOpenDoctorProfile();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-50 flex items-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-amber-600" />
                          <span>View Submitted Profile Info</span>
                        </button>
                      ) : (
                        <>
                          {currentUser.role === 'admin' && (
                            <button
                              onClick={() => {
                                setUserDropdownOpen(false);
                                onOpenPortal('admin');
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-purple-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
                            >
                              <ShieldCheck className="w-4 h-4 text-purple-600" />
                              <span>Admin Command Center</span>
                            </button>
                          )}

                          {currentUser.role === 'doctor' && (
                            <button
                              onClick={() => {
                                setUserDropdownOpen(false);
                                onOpenPortal('doctor');
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Stethoscope className="w-4 h-4 text-teal-600" />
                              <span>Doctor Consultation Portal</span>
                            </button>
                          )}

                          {currentUser.role === 'patient' && (
                            <button
                              onClick={() => {
                                setUserDropdownOpen(false);
                                onOpenPortal('patient');
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 flex items-center gap-2 cursor-pointer"
                            >
                              <User className="w-4 h-4 text-teal-600" />
                              <span>Patient Portal & Bookings</span>
                            </button>
                          )}
                        </>
                      )}

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenPortal('home');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        <span>Home Page</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If NOT Logged In: Sign In and Sign Up buttons */
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 hover:text-teal-700 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-teal-600" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-white" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

          </div>

          {/* Mobile & Tablet Trigger Buttons (Hidden on LG+) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {/* Quick AI Trigger */}
            <button
              onClick={onOpenAIPanel}
              className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
              title="Open SmartCare AI"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline text-[11px]">AI</span>
            </button>

            {!currentUser ? (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-xl text-white bg-slate-900 text-xs font-bold whitespace-nowrap cursor-pointer hover:bg-slate-800"
              >
                Sign In
              </button>
            ) : isPendingDoctor ? (
              <button
                onClick={onOpenDoctorProfile}
                className="px-2.5 py-1.5 rounded-xl text-amber-800 bg-amber-50 border border-amber-300 text-xs font-bold truncate max-w-[120px] cursor-pointer"
              >
                My Profile
              </button>
            ) : (
              <button
                onClick={() => onOpenPortal(currentUser.role === 'doctor' ? 'doctor' : currentUser.role === 'admin' ? 'admin' : 'patient')}
                className="px-2.5 py-1.5 rounded-xl text-teal-700 bg-teal-50 border border-teal-200 text-xs font-bold truncate max-w-[120px] cursor-pointer"
              >
                {currentUser.role === 'doctor' ? 'Doctor Portal' : currentUser.role === 'admin' ? 'Admin' : 'Patient Portal'}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Dropdown Menu (lg:hidden) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAIPanel && onOpenAIPanel();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open SmartCare AI Chatbot</span>
                </button>
                {currentUser ? (
                  <>
                    {isPendingDoctor ? (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenDoctorProfile && onOpenDoctorProfile();
                        }}
                        className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-300"
                      >
                        <FileText className="w-4 h-4 text-amber-600" />
                        <span>View Submitted Profile Information</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenPortal(currentUser.role === 'doctor' ? 'doctor' : currentUser.role === 'admin' ? 'admin' : 'patient');
                        }}
                        className="w-full py-2.5 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-200"
                      >
                        <User className="w-4 h-4 text-teal-600" />
                        <span>Go to {currentUser.role === 'doctor' ? 'Doctor Portal' : 'Patient Portal'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs"
                    >
                      Sign Out ({currentUser.name})
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth('login');
                      }}
                      className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center border border-slate-200"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth('register');
                      }}
                      className="py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs text-center"
                    >
                      Sign Up (Free)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
