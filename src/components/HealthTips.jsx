import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { HEALTH_ARTICLES } from '../data/doctorsData';

export default function HealthTips() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              Doctor-Reviewed Health Insights
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest <span className="text-teal-600">Health & Wellness Tips</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Evidence-based medical guides and preventative health articles curated by our certified specialists.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-slate-50 hover:bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => alert(`Opening full article: "${article.title}"`)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-teal-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/40 shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">By {article.author}</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
