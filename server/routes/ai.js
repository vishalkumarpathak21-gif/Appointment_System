import express from 'express';
import { optionalAuthenticateJWT } from '../middleware/auth.js';
import { getHealthGuidance, recommendDoctor } from '../services/aiService.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();

/**
 * 1. AI Health Guidance Endpoint
 * POST /api/ai/health-guidance
 * Supports authenticated patients as well as homepage guests
 */
router.post('/health-guidance', optionalAuthenticateJWT, async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string' || !symptoms.trim()) {
      return res.status(400).json({ error: 'Please provide a valid description of symptoms.' });
    }

    const guidance = await getHealthGuidance(symptoms.trim());
    return res.json({
      success: true,
      data: guidance
    });
  } catch (error) {
    console.error('AI Health Guidance Error:', error);
    return res.status(500).json({ 
      error: error.message || 'An error occurred while generating health guidance.' 
    });
  }
});

/**
 * 2. AI Doctor Recommendation Endpoint
 * POST /api/ai/recommend-doctor
 * Supports authenticated patients as well as homepage guests
 * 
 * Predicts recommended specialization and queries existing MongoDB Doctor collection
 * for approved & verified specialists.
 */
router.post('/recommend-doctor', optionalAuthenticateJWT, async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string' || !symptoms.trim()) {
      return res.status(400).json({ error: 'Please provide a valid description of symptoms.' });
    }

    // 1. Get AI Recommendation
    const recommendation = await recommendDoctor(symptoms.trim());

    // 2. Query Existing MongoDB Doctor Collection for Approved & Verified Doctors
    let doctors = await Doctor.find({
      specialty: recommendation.specialtyKey,
      isVerified: true,
      applicationStatus: 'Approved'
    }).sort({ rating: -1, experience: -1 });

    // Fallback: If no specialist in that exact specialty key is approved yet, fetch all approved doctors
    if (!doctors || doctors.length === 0) {
      doctors = await Doctor.find({
        isVerified: true,
        applicationStatus: 'Approved'
      }).sort({ rating: -1 }).limit(3);
    }

    return res.json({
      success: true,
      data: {
        recommendation,
        doctors,
        totalFound: doctors.length
      }
    });
  } catch (error) {
    console.error('AI Doctor Recommendation Error:', error);
    return res.status(500).json({ 
      error: error.message || 'An error occurred while finding recommended doctors.' 
    });
  }
});

export default router;
