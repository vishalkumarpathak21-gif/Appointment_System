import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specialties from './components/Specialties';
import DoctorList from './components/DoctorList';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import HealthTips from './components/HealthTips';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import DoctorDetailsModal from './components/DoctorDetailsModal';
import AuthModal from './components/AuthModal';
import AdminPortal from './components/AdminPortal';
import DoctorPortal from './components/DoctorPortal';
import PatientPortal from './components/PatientPortal';
import DoctorPendingApprovalModal from './components/DoctorPendingApprovalModal';
import DoctorProfileModal from './components/DoctorProfileModal';
import HomeAIAssistant from './components/HomeAIAssistant';
import FloatingAIAssistant from './components/FloatingAIAssistant';
import AISidePanel from './components/AISidePanel';
import { DOCTORS } from './data/doctorsData';
import { api } from './services/api';
import { CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation & View Routing ('home' | 'patient' | 'doctor' | 'admin')
  const [currentView, setCurrentView] = useState('home');
  
  // Auth State (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('docpulse_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [pendingBookingDoctor, setPendingBookingDoctor] = useState(null);

  // Doctor Pending Approval & Profile View States
  const [pendingDoctorData, setPendingDoctorData] = useState(null);
  const [isDoctorPendingModalOpen, setIsDoctorPendingModalOpen] = useState(false);
  const [isDoctorProfileModalOpen, setIsDoctorProfileModalOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedMode, setSelectedMode] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Doctors & Appointments Data (synced with MongoDB API)
  const [doctorsList, setDoctorsList] = useState(DOCTORS);
  const [appointments, setAppointments] = useState([]);

  // Modals
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAISidePanelOpen, setIsAISidePanelOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch verified doctors and appointments from MongoDB backend for the current user
  const refreshBackendData = async (userToQuery = currentUser) => {
    try {
      const docs = await api.getDoctors({ verifiedOnly: 'true' });
      if (docs && docs.length > 0) {
        setDoctorsList(docs);
      }
    } catch (err) {
      console.warn('Backend API connection note: using local fallback dataset');
    }

    if (userToQuery && userToQuery.email) {
      try {
        const appts = await api.getAppointments({ patientEmail: userToQuery.email });
        if (appts && Array.isArray(appts)) {
          setAppointments(appts);
        }
      } catch (err) {
        console.error('Failed to load patient appointments:', err);
      }
    } else {
      setAppointments([]);
    }
  };

  useEffect(() => {
    refreshBackendData(currentUser);
  }, [currentUser]);

  const showToast = (title, description, type = 'success') => {
    setToastMessage({ title, description, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Open Auth Modal with mode
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Doctor Application Submission Handler -> triggers pop-up
  const handleDoctorPendingSubmitted = (doctorData, userObj) => {
    setPendingDoctorData(doctorData);
    setIsDoctorPendingModalOpen(true);
  };

  // Proceed to Doctor Portal from Doctor Pending Approval Modal
  const handleProceedToHomeFromPendingModal = () => {
    setIsDoctorPendingModalOpen(false);
    
    // Log user in as pending doctor
    const pendingDoctorUser = {
      ...pendingDoctorData,
      role: 'doctor',
      isApproved: false,
      applicationStatus: 'Pending',
      doctorProfile: pendingDoctorData
    };
    
    setCurrentUser(pendingDoctorUser);
    try {
      localStorage.setItem('docpulse_user', JSON.stringify(pendingDoctorUser));
    } catch (e) {}
    
    setCurrentView('doctor');
    showToast(
      "Application Submitted",
      "Your Doctor Portal access is pending Administrator verification. You can check status or sign out.",
      "info"
    );
  };

  // Auth Handlers - Persists across logout/login cycles
  const handleAuthSuccess = async (user, token) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('docpulse_user', JSON.stringify(user));
      localStorage.setItem('docpulse_token', token);
    } catch (e) {}

    // Immediately fetch patient's historical and active appointments from MongoDB
    if (user.role === 'patient') {
      try {
        const userAppts = await api.getAppointments({ patientEmail: user.email });
        if (userAppts && Array.isArray(userAppts)) {
          setAppointments(userAppts);
        }
      } catch (e) {
        console.error('Failed to reload bookings on login:', e);
      }
    }

    showToast(
      `Welcome ${user.name}!`,
      `Signed in successfully as ${user.role.toUpperCase()} (${user.email}).`,
      'success'
    );

    // If there was a pending booking attempt before login, open the booking modal now!
    if (pendingBookingDoctor) {
      const doctorToBook = pendingBookingDoctor;
      setPendingBookingDoctor(null);
      setTimeout(() => {
        setSelectedDoctorForBooking(doctorToBook);
        setIsBookingModalOpen(true);
      }, 350);
      return;
    }

    // Auto navigate directly to respective dashboard
    if (user.role === 'admin') {
      setCurrentView('admin'); // Admin Dashboard
    } else if (user.role === 'doctor') {
      setCurrentView('doctor'); // Doctor Dashboard (Pending view if unverified, Full portal if approved)
    } else if (user.role === 'patient') {
      setCurrentView('patient'); // Patient Dashboard
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppointments([]);
    try {
      localStorage.removeItem('docpulse_user');
      localStorage.removeItem('docpulse_token');
    } catch (e) {}
    setCurrentView('home');
    setIsBookingModalOpen(false);
    setIsDoctorProfileModalOpen(false);
    setIsDoctorPendingModalOpen(false);
    showToast('Signed Out', 'You have been signed out successfully.', 'info');
  };

  // Filter and Sort Doctors (Strictly show ONLY Admin-Approved & NMC-Verified Doctors on Home Page)
  const filteredDoctors = useMemo(() => {
    return doctorsList.filter((doc) => {
      // Strict Verification check: only show Admin-approved & NMC-verified doctors on public home page
      if (doc.isVerified !== true || doc.applicationStatus === 'Pending' || doc.applicationStatus === 'Rejected') {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpecialty = doc.specialtyName?.toLowerCase().includes(query) || doc.specialty?.toLowerCase().includes(query);
        const matchesHospital = doc.hospital?.toLowerCase().includes(query);
        const matchesAbout = doc.about?.toLowerCase().includes(query);
        const matchesCity = doc.city?.toLowerCase().includes(query);
        if (!matchesName && !matchesSpecialty && !matchesHospital && !matchesAbout && !matchesCity) {
          return false;
        }
      }

      // Specialty filter
      if (selectedSpecialty !== 'all' && doc.specialty !== selectedSpecialty) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All Locations') {
        if (!doc.location?.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Mode filter
      if (selectedMode !== 'all' && !doc.modes?.includes(selectedMode)) {
        return false;
      }

      // Availability Quick Filter
      if (availabilityFilter === 'today') {
        if (!doc.availableToday && (!doc.slots?.today || doc.slots.today.length === 0)) {
          return false;
        }
      } else if (availabilityFilter === 'video') {
        if (!doc.modes?.includes('Video Consultation')) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'fee_low') return a.fee - b.fee;
      if (sortBy === 'fee_high') return b.fee - a.fee;
      return 0;
    });
  }, [doctorsList, searchQuery, selectedSpecialty, selectedLocation, selectedMode, availabilityFilter, sortBy, currentView]);

  // Booking handlers with Strict Patient Authentication Gate
  const handleOpenBooking = (doctor) => {
    // If user is a pending doctor or not logged in
    if (!currentUser) {
      setPendingBookingDoctor(doctor);
      handleOpenAuth('login');
      showToast(
        "Sign In Required", 
        "Please sign in or create a patient account to book your consultation slot.", 
        "info"
      );
      return;
    }

    if (currentUser.role === 'doctor' && currentUser.isApproved === false) {
      showToast(
        "Doctor Account Under Review",
        "Doctor accounts cannot book appointments. Please view your submitted profile info.",
        "info"
      );
      setIsDoctorProfileModalOpen(true);
      return;
    }

    setSelectedDoctorForBooking(doctor);
    setIsBookingModalOpen(true);
  };

  const handleOpenProfile = (doctor) => {
    setSelectedDoctorForProfile(doctor);
    setIsProfileModalOpen(true);
  };

  const handleBookingSuccess = async (newBooking) => {
    const bookingPayload = {
      ...newBooking,
      patientId: currentUser?.id || null,
      patientEmail: (currentUser?.email || newBooking.patientEmail).toLowerCase().trim()
    };

    try {
      const response = await api.createAppointment(bookingPayload);
      if (response && response.appointment) {
        setAppointments(prev => [
          response.appointment, 
          ...prev.filter(a => a._id !== response.appointment._id && a.appointmentCode !== response.appointment.appointmentCode)
        ]);
      }
    } catch (err) {
      console.error('Booking persistence error:', err);
      setAppointments(prev => [newBooking, ...prev]);
    }

    showToast(
      "Appointment Confirmed! 🇮🇳", 
      `Booking with ${newBooking.doctorName} for ${newBooking.date} at ${newBooking.timeSlot} confirmed. View in Patient Portal.`,
      "success"
    );
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await api.cancelAppointment(appointmentId);
    } catch (err) {
      // fallback
    }
    setAppointments(prev => prev.filter(app => app.id !== appointmentId && app._id !== appointmentId));
    showToast(
      "Appointment Cancelled", 
      `Booking reference ${appointmentId} has been successfully cancelled.`,
      "info"
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('all');
    setSelectedLocation('All Locations');
    setSelectedMode('all');
    setAvailabilityFilter('all');
    setSortBy('rating');
  };

  const handleSearchSubmit = () => {
    const el = document.getElementById('doctors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSpecialtySelect = (specId) => {
    setSelectedSpecialty(specId);
    const el = document.getElementById('doctors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickBookFromHero = (docId) => {
    const doctor = doctorsList.find(d => d.id === docId || d._id === docId) || doctorsList[0];
    handleOpenBooking(doctor);
  };

  // Render Role Portals if activated (Locked for unverified doctors)
  if (currentView === 'admin') {
    return (
      <AdminPortal
        currentUser={currentUser}
        onBackToHome={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'doctor') {
    return (
      <DoctorPortal
        currentUser={currentUser}
        onBackToHome={() => setCurrentView('home')}
        onLogout={handleLogout}
      />
    );
  }

  // Dedicated Patient Portal
  if (currentView === 'patient') {
    return (
      <PatientPortal
        currentUser={currentUser}
        onBackToHome={() => setCurrentView('home')}
        onBookNewAppointment={(doc, specKey) => {
          setCurrentView('home');
          setTimeout(() => {
            if (doc) {
              handleOpenBooking(doc);
            } else if (specKey) {
              setSelectedSpecialty(specKey);
              const el = document.getElementById('doctors');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
              handleOpenBooking(doctorsList[0]);
            }
          }, 300);
        }}
      />
    );
  }

  // Home Page View
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-bold text-white">{toastMessage.title}</h5>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toastMessage.description}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        currentUser={currentUser}
        onOpenAuth={(mode) => handleOpenAuth(mode)}
        onLogout={handleLogout}
        onOpenPortal={(portal) => setCurrentView(portal)}
        onOpenDoctorProfile={() => setIsDoctorProfileModalOpen(true)}
        onOpenAIPanel={() => setIsAISidePanelOpen(true)}
        currentView={currentView}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        onSearchSubmit={handleSearchSubmit}
        onQuickBook={handleQuickBookFromHero}
        onOpenSignUp={() => handleOpenAuth('register')}
      />

      {/* Specialties Browser */}
      <Specialties
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        onSpecialtySelect={handleSpecialtySelect}
      />

      {/* SmartCare AI Assistant - Home Page Section */}
      <HomeAIAssistant
        onBookDoctor={handleOpenBooking}
        onSelectSpecialty={handleSpecialtySelect}
      />

      {/* Doctor Cards & Directory (Only verified specialists) */}
      <DoctorList
        doctors={filteredDoctors}
        onBookDoctor={handleOpenBooking}
        onViewDoctorProfile={handleOpenProfile}
        searchQuery={searchQuery}
        selectedSpecialty={selectedSpecialty}
        selectedLocation={selectedLocation}
        selectedMode={selectedMode}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
        currentUser={currentUser}
      />

      {/* How It Works & Why Us */}
      <HowItWorks
        onGetStarted={() => {
          const el = document.getElementById('doctors');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Patient Testimonials */}
      <Testimonials />

      {/* Health Articles & Wellness Tips */}
      <HealthTips />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Floating Quick Access AI Widget */}
      <FloatingAIAssistant onOpenAI={() => setIsAISidePanelOpen(true)} />

      {/* Footer */}
      <Footer 
        onSpecialtyClick={handleSpecialtySelect} 
        onOpenAdminAuth={() => handleOpenAuth('admin')} 
      />

      {/* Slide-out Chatbot Side Panel for SmartCare AI Assistant */}
      <AISidePanel
        isOpen={isAISidePanelOpen}
        onClose={() => setIsAISidePanelOpen(false)}
        onBookDoctor={handleOpenBooking}
        onSelectSpecialty={handleSpecialtySelect}
      />

      {/* Interactive Booking Modal */}
      {currentUser && currentUser.role === 'patient' && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
          currentUser={currentUser}
        />
      )}

      {/* Doctor Profile Quick View Modal */}
      <DoctorDetailsModal
        doctor={selectedDoctorForProfile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onBookDoctor={handleOpenBooking}
        currentUser={currentUser}
      />

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onDoctorPendingSubmitted={handleDoctorPendingSubmitted}
      />

      {/* Doctor Application Submitted for Administrator Verification Pop-up Modal */}
      <DoctorPendingApprovalModal
        isOpen={isDoctorPendingModalOpen}
        onClose={() => setIsDoctorPendingModalOpen(false)}
        doctorData={pendingDoctorData}
        onProceedToHome={handleProceedToHomeFromPendingModal}
      />

      {/* Pending Doctor Profile Viewer Modal (Only profile info, no active portal/bookings) */}
      <DoctorProfileModal
        isOpen={isDoctorProfileModalOpen}
        onClose={() => setIsDoctorProfileModalOpen(false)}
        currentUser={currentUser}
      />

    </div>
  );
}
