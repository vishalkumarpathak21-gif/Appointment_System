const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // OTP Endpoints
  sendAuthOtp: async (email, name = 'User', type = 'Sign In') => {
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, type })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
    return data;
  },

  sendBookingOtp: async (bookingDetails) => {
    const res = await fetch(`${API_BASE_URL}/appointments/send-booking-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingDetails)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send booking OTP');
    return data;
  },

  // Auth
  login: async (email, password, otp = '') => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, otp })
    });
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.error || 'Login failed');
      error.applicationPending = data.applicationPending;
      error.applicationRejected = data.applicationRejected;
      error.applicationStatus = data.applicationStatus;
      error.doctorName = data.doctorName;
      error.nmcNumber = data.nmcNumber;
      throw error;
    }
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  },

  // Doctors
  getDoctors: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/doctors?${query}`);
    if (!res.ok) throw new Error('Failed to fetch doctors');
    return res.json();
  },

  getDoctorById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
    if (!res.ok) throw new Error('Doctor not found');
    return res.json();
  },

  updateDoctor: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update doctor profile');
    return res.json();
  },

  checkDoctorStatus: async (email) => {
    const res = await fetch(`${API_BASE_URL}/doctors/check-status/${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('Failed to check doctor approval status');
    return res.json();
  },

  // Doctor Application & Verification Workflow
  getDoctorApplications: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/doctor-applications`);
    if (!res.ok) throw new Error('Failed to fetch doctor applications');
    return res.json();
  },

  reviewDoctorApplication: async (id, action, adminRemarks = '') => {
    const res = await fetch(`${API_BASE_URL}/admin/doctor-applications/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, adminRemarks })
    });
    if (!res.ok) throw new Error('Failed to process doctor review action');
    return res.json();
  },

  // Appointments
  getAppointments: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/appointments?${query}`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  createAppointment: async (appointmentData) => {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create appointment');
    return data;
  },

  issuePrescription: async (id, prescriptionData) => {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}/prescription`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prescriptionData)
    });
    if (!res.ok) throw new Error('Failed to issue prescription');
    return res.json();
  },

  processPayment: async (id, paymentMethod) => {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}/pay`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod })
    });
    if (!res.ok) throw new Error('Failed to process payment');
    return res.json();
  },

  cancelAppointment: async (id) => {
    const res = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to cancel appointment');
    return res.json();
  },

  // Admin
  getAdminStats: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/stats`);
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
  },

  getComplaints: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/admin/complaints${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch complaints');
    return res.json();
  },

  submitComplaint: async (complaintData) => {
    const res = await fetch(`${API_BASE_URL}/admin/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(complaintData)
    });
    if (!res.ok) throw new Error('Failed to submit complaint');
    return res.json();
  },

  resolveComplaint: async (id, adminResponse) => {
    const res = await fetch(`${API_BASE_URL}/admin/complaints/${id}/resolve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminResponse })
    });
    if (!res.ok) throw new Error('Failed to resolve complaint');
    return res.json();
  },

  // ==========================================
  // SmartCare AI Assistant APIs
  // ==========================================
  getAiHealthGuidance: async (symptoms) => {
    const token = localStorage.getItem('docpulse_token');
    const res = await fetch(`${API_BASE_URL}/ai/health-guidance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ symptoms })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate AI health guidance');
    return data.data;
  },

  getAiDoctorRecommendation: async (symptoms) => {
    const token = localStorage.getItem('docpulse_token');
    const res = await fetch(`${API_BASE_URL}/ai/recommend-doctor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ symptoms })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get doctor recommendation');
    return data.data;
  }
};
