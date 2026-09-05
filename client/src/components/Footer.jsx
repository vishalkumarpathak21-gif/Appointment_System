import React, { useState } from 'react';
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Send, 
  Heart, 
  CheckCircle2,
  QrCode
} from 'lucide-react';
import { SPECIALTIES } from '../data/doctorsData';

export default function Footer({ onSpecialtyClick, onOpenAdminAuth }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Newsletter Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xl font-extrabold text-white">Subscribe to DocPulse India Health Insights 🇮🇳</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Receive tips on seasonal health alerts, diabetes care, and special health checkup packages.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-950/50 border border-emerald-800/50 px-4 py-2.5 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! You have been subscribed to DocPulse India newsletter.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-teal-500 font-medium"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Doc<span className="text-teal-400">Pulse</span> India
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting patients with top NMC-registered doctors across Apollo, Fortis, Max, AIIMS & Manipal hospitals for in-clinic and instant video consultations.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Emergency 24x7: Dial 108 | Support: 1800-200-5555</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Support: support@docpulse.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>4th Floor, Salarpuria Tower, Koramangala, Bengaluru, Karnataka 560034</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-teal-400 font-semibold">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>NMC & NABH Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <QrCode className="w-4 h-4" />
                <span>Ayushman Bharat (ABDM) Partner</span>
              </div>
            </div>
          </div>

          {/* Col 2: Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Top Specialties</h4>
            <ul className="space-y-2 text-xs">
              {SPECIALTIES.slice(0, 6).map((spec) => (
                <li key={spec.id}>
                  <a
                    href="#specialties"
                    onClick={() => onSpecialtyClick && onSpecialtyClick(spec.id)}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {spec.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cities in India */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Major Cities</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Doctors in Delhi NCR</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Doctors in Mumbai</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Doctors in Bengaluru</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Doctors in Hyderabad</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Doctors in Chennai</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Doctors in Kolkata & Pune</a></li>
            </ul>
          </div>

          {/* Col 4: Healthcare Providers & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-teal-400 transition-colors">About DocPulse India</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Doctor Onboarding (NMC)</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy & DPDPA</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdminAuth}
                  className="hover:text-purple-300 text-slate-400 flex items-center gap-1.5 cursor-pointer font-bold pt-1 text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Administrator Portal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3">
        <p>© {new Date().getFullYear()} DocPulse Healthcare India Pvt. Ltd. All rights reserved.</p>
        <p className="flex items-center justify-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian healthcare.
        </p>
      </div>
    </footer>
  );
}
