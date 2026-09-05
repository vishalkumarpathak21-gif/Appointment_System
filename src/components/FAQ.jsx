import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, PhoneCall } from 'lucide-react';
import { FAQS } from '../data/doctorsData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3.5 py-1 rounded-full border border-teal-200">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? <span className="text-teal-600">We Have Answers</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about booking, video consultations, and doctor appointments.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5 mb-12">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-teal-400 shadow-md ring-2 ring-teal-500/10' : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question || faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-teal-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.answer || faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-xl font-extrabold text-white">Still have questions?</h4>
            <p className="text-xs sm:text-sm text-teal-100">
              Our 24/7 care coordination desk is ready to help you find the right doctor.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+18005550199"
              className="px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-teal-50 font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-teal-600" />
              <span>Call Support</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
