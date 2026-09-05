import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Video, 
  Building2, 
  ShieldCheck, 
  Filter, 
  Check, 
  Award, 
  ChevronRight,
  LogIn,
  UserCheck
} from 'lucide-react';

export default function DoctorList({
  doctors,
  onBookDoctor,
  onViewDoctorProfile,
  searchQuery,
  selectedSpecialty,
  selectedLocation,
  selectedMode,
  availabilityFilter,
  setAvailabilityFilter,
  sortBy,
  setSortBy,
  onResetFilters,
  currentUser
}) {
  return (
    <section id="doctors" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              NMC & State Medical Council Registered
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Top Specialist <span className="text-teal-600">Doctors in India</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Select your preferred physician to view available OPD and video consultation slots.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            Showing <span className="text-slate-900 font-bold">{doctors.length}</span> verified specialists
          </div>
        </div>

        {/* Filter & Sorting Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Availability Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setAvailabilityFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                availabilityFilter === 'all'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Doctors
            </button>
            <button
              onClick={() => setAvailabilityFilter('today')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                availabilityFilter === 'today'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Available Today
            </button>
            <button
              onClick={() => setAvailabilityFilter('video')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                availabilityFilter === 'video'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Online Video Only
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort doctors list"
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="rating">Highest Rated ★</option>
              <option value="experience">Most Experienced</option>
              <option value="fee_low">Consultation Fee: Low to High</option>
              <option value="fee_high">Consultation Fee: High to Low</option>
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor._id || doctor.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Doctor Top Row: Photo & Header Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-slate-100 group-hover:border-teal-400 transition-colors shadow-sm"
                      />
                      <div className="absolute -bottom-2 -right-1 bg-white p-1 rounded-full shadow-xs">
                        <div className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded-full text-[10px] font-bold border border-teal-200 flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                          {doctor.specialtyName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 truncate">
                          {doctor.nmcNumber || 'NMC Registered'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-extrabold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                        {doctor.name}
                      </h3>
                      
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {doctor.title}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-slate-600 pt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{doctor.hospital}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges: Experience & Distance */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-1.5 text-slate-700 border border-slate-100">
                      <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-semibold">{doctor.experience} Yrs Exp.</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-1.5 text-slate-700 border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-semibold truncate">{doctor.location || 'Metro City'}</span>
                    </div>
                  </div>

                  {/* Consultation Mode Badges */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      {doctor.modes?.includes("Video Consultation") && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                          <Video className="w-3 h-3" /> Video
                        </span>
                      )}
                      {doctor.modes?.includes("In-Clinic") && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <Building2 className="w-3 h-3" /> Clinic
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>Next: Today</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Card Footer: Fee & Conditional Booking Button */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Consultation Fee</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-black text-slate-900">{doctor.currency}{doctor.fee}</span>
                      <span className="text-[10px] text-slate-500 font-medium">/ session</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDoctorProfile(doctor)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                    >
                      Bio
                    </button>

                    {currentUser ? (
                      <button
                        onClick={() => onBookDoctor(doctor)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onBookDoctor(doctor)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5 text-teal-400" />
                        <span>Sign In to Book</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-900">No doctors match your search</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any specialist matching your filters. Try selecting another city or reset filters.
            </p>
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
