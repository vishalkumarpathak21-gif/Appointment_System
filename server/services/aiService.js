/**
 * SmartCare AI Service — Handles AI Health Guidance and Doctor Specialization Recommendation.
 * 
 * Complies with Medical Safety Guidelines:
 * 1. NEVER provides a definitive medical diagnosis.
 * 2. NEVER prescribes specific medications or dosages.
 * 3. ALWAYS includes the standard medical disclaimer.
 * 4. Detects emergency red-flag symptoms and advises immediate emergency care.
 */

// Supported DocPulse Specialties with Keywords and Tailored Clinical Guidance Templates
export const SUPPORTED_SPECIALTIES = [
  { 
    key: 'general_medicine', 
    name: 'General Physician', 
    keywords: ['fever', 'cough', 'cold', 'flu', 'weakness', 'fatigue', 'vomiting', 'diarrhea', 'infection', 'body ache', 'dengue', 'malaria', 'typhoid', 'chills', 'viral', 'throat', 'sore throat', 'sneezing', 'runny nose', 'stomach ache', 'nausea'],
    getObservation: (symptoms) => `Your symptoms (${symptoms}) commonly point to an acute upper respiratory tract infection, viral pharyngitis, or seasonal viral syndrome. Key supportive care includes warm saline gargles, steam inhalation, drinking plenty of warm fluids (water, soups, ORS), and getting adequate bed rest. Monitor your body temperature regularly with a digital thermometer. We recommend consulting a licensed General Physician for a comprehensive physical evaluation, throat inspection, and clinical checkup.`
  },
  { 
    key: 'dentistry', 
    name: 'Dental & Oral Surgeon', 
    keywords: ['tooth', 'teeth', 'gum', 'cavity', 'toothache', 'root canal', 'bleeding gums', 'molar', 'dental', 'braces', 'jaw pain', 'wisdom tooth', 'swollen gum', 'mouth ulcer', 'dentist'],
    getObservation: (symptoms) => `Symptoms of acute toothache, gum swelling, or tooth sensitivity (${symptoms}) commonly indicate dental pulp inflammation (pulpitis), tooth decay, deep cavity, or periodontal gum infection. Key supportive measures include rinsing with lukewarm salt water, avoiding chewing on the affected side, and avoiding extremely hot, cold, or sugary items. We recommend consulting a licensed Dental & Oral Surgeon for a physical intra-oral examination and dental radiograph (X-ray).`
  },
  { 
    key: 'dermatology', 
    name: 'Dermatologist', 
    keywords: ['skin', 'acne', 'rash', 'itching', 'pimples', 'hair fall', 'eczema', 'psoriasis', 'pigmentation', 'dandruff', 'allergy', 'boil', 'scabies', 'melasma', 'redness', 'hives', 'urticaria', 'patch'],
    getObservation: (symptoms) => `Reported dermatological symptoms (${symptoms}) are consistent with inflammatory acne vulgaris, contact dermatitis, allergic urticaria, eczema, or superficial fungal skin infections. Recommended supportive steps include washing gently with a mild fragrance-free cleanser, avoiding scratching or picking at lesions, and refraining from applying unprescribed steroid creams. We recommend consulting a licensed Dermatologist for clinical skin examination and personalized dermatological treatment.`
  },
  { 
    key: 'orthopedics', 
    name: 'Orthopedic Surgeon', 
    keywords: ['knee', 'joint', 'bone', 'fracture', 'back pain', 'arthritis', 'shoulder pain', 'spine', 'ligament', 'sprain', 'stiffness', 'sciatica', 'ankle', 'hip pain', 'swollen knee', 'walking pain', 'neck pain'],
    getObservation: (symptoms) => `Joint pain, localized swelling, and morning stiffness (${symptoms}) are characteristic clinical indicators of musculoskeletal strain, osteoarthritis, ligament sprain, or lumbar/cervical spine stress. Follow the PRICE protocol (Protection, Rest, Ice application for acute swelling), maintain ergonomic posture, and avoid high-impact weight bearing. We recommend consulting a licensed Orthopedic Surgeon for physical joint range-of-motion testing and imaging.`
  },
  { 
    key: 'neurology', 
    name: 'Neurologist', 
    keywords: ['headache', 'migraine', 'dizziness', 'seizure', 'numbness', 'tremors', 'brain', 'nerve', 'paralysis', 'memory loss', 'vertigo', 'tingling', 'head pain', 'fainting'],
    getObservation: (symptoms) => `Symptoms of throbbing headache, light sensitivity, or dizziness (${symptoms}) are commonly associated with migraine episodes, tension-type headaches, or cervical-neurological tension. Recommended supportive care includes resting in a dimly lit, quiet room, staying well-hydrated, and limiting screen exposure and caffeine triggers. We recommend consulting a licensed Neurologist for a comprehensive neurological examination and tailored migraine management.`
  },
  { 
    key: 'cardiology', 
    name: 'Cardiologist', 
    keywords: ['heart', 'chest pain', 'palpitations', 'high bp', 'blood pressure', 'breathlessness', 'hypertension', 'cholesterol', 'angina', 'chest tightness', 'rapid pulse', 'heart rate'],
    getObservation: (symptoms) => `Clinical symptoms (${symptoms}) suggest potential cardiovascular or circulatory involvement, such as acute angina, hypertension, or arrhythmia. Avoid strenuous physical exertion and stimulants. If you experience crushing chest tightness radiating to the left arm, neck, or jaw, or acute breathlessness, seek immediate emergency medical care. We recommend consulting a licensed Cardiologist for an ECG, blood pressure evaluation, and clinical assessment.`
  },
  { 
    key: 'pediatrics', 
    name: 'Pediatrician & Child Specialist', 
    keywords: ['child', 'baby', 'infant', 'kid', 'newborn', 'vaccination', 'child fever', 'growth', 'pediatric', 'toddler', 'colic', 'child cough'],
    getObservation: (symptoms) => `Pediatric symptoms (${symptoms}) in infants and children require careful monitoring of fluid intake, active alertness, and wet diaper frequency. Ensure the child stays comfortably hydrated with fluids/ORS. Never administer adult over-the-counter medications to a child without professional guidance. We recommend consulting a licensed Pediatrician for weight-based pediatric dosage calculation and gentle physical evaluation.`
  },
  { 
    key: 'ophthalmology', 
    name: 'Ophthalmologist (Eye Specialist)', 
    keywords: ['eye', 'vision', 'blurred vision', 'cataract', 'eye pain', 'red eyes', 'watery eyes', 'lasik', 'glaucoma', 'eye strain', 'gritty eyes', 'itchy eyes'],
    getObservation: (symptoms) => `Eye irritation, redness, watery discharge, or visual strain (${symptoms}) frequently point to dry eye syndrome, allergic conjunctivitis, or digital computer vision syndrome. Practice the 20-20-20 screen rule, avoid rubbing your eyes, and use preservative-free lubricating drops if recommended. We recommend consulting a licensed Ophthalmologist for slit-lamp biomicroscopy and visual acuity testing.`
  },
  { 
    key: 'psychiatry', 
    name: 'Psychiatrist & Mental Health Specialist', 
    keywords: ['anxiety', 'depression', 'stress', 'insomnia', 'sleep', 'panic', 'mental health', 'mood swing', 'restlessness', 'burnout', 'overthinking'],
    getObservation: (symptoms) => `Persistent sleep disruption, excessive worry, cognitive fatigue, or mood fluctuations (${symptoms}) are common manifestations of chronic stress, generalized anxiety, or sleep-wake cycle dysregulation. Establishing a consistent sleep schedule, daily mindfulness breathing, and reducing caffeine intake can support wellbeing. We recommend consulting a licensed Psychiatrist for empathetic evaluation and evidence-based mental healthcare.`
  }
];

const EMERGENCY_KEYWORDS = [
  'unconscious', 'severe chest pain radiating', 'crushing chest pain', 
  'difficulty breathing', 'severe breathlessness', 'coughing blood', 
  'paralysis of face', 'sudden slurred speech', 'uncontrolled bleeding', 
  'high fever in newborn', 'poisoning', 'suicidal'
];

/**
 * Intelligent Medical Heuristic Engine
 */
function analyzeSymptomsHeuristically(symptoms) {
  const lower = symptoms.toLowerCase();
  
  // Emergency Check
  const isEmergency = EMERGENCY_KEYWORDS.some(kw => lower.includes(kw));

  let matchedSpecialty = SUPPORTED_SPECIALTIES[0]; // Default General Physician
  let maxScore = 0;

  for (const spec of SUPPORTED_SPECIALTIES) {
    let score = 0;
    for (const kw of spec.keywords) {
      if (lower.includes(kw)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      matchedSpecialty = spec;
    }
  }

  return {
    specialization: matchedSpecialty.name,
    specialtyKey: matchedSpecialty.key,
    isEmergency,
    observation: matchedSpecialty.getObservation(symptoms)
  };
}

/**
 * 1. AI Health Guidance Function
 * Provides general wellness advice, recommended specialist, and medical disclaimer.
 */
export async function getHealthGuidance(symptoms) {
  if (!symptoms || !symptoms.trim()) {
    throw new Error('Please describe your symptoms to receive AI Health Guidance.');
  }

  const symptomsClean = symptoms.trim();
  const heuristic = analyzeSymptomsHeuristically(symptomsClean);
  const openAiKey = process.env.OPENAI_API_KEY;

  if (openAiKey && openAiKey !== 'your_api_key_here' && openAiKey.startsWith('sk-')) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0.2,
          messages: [
            {
              role: 'system',
              content: `You are SmartCare AI, an empathetic and certified healthcare guidance assistant for DocPulse India.
CRITICAL MEDICAL SAFETY RULES:
1. You DO NOT provide a definitive medical diagnosis or certainty of any illness.
2. You DO NOT prescribe drugs or dosages.
3. Provide tailored, accurate General Clinical Observations explaining possible causes, supportive self-care (hydration, rest, compresses), and non-pharmacological care.
4. If symptoms suggest an emergency (e.g. crushing chest pain, severe shortness of breath, sudden numbness), explicitly flag isEmergency: true and advise urgent emergency care.
5. Recommend ONE doctor specialization from the list: General Physician, Dermatologist, Cardiologist, Orthopedic Surgeon, Pediatrician & Child Specialist, Dental & Oral Surgeon, Neurologist, ENT Specialist (Ear, Nose, Throat), Ophthalmologist (Eye Specialist), Obstetrician & Gynecologist, Psychiatrist & Mental Health Specialist.
6. Return ONLY a valid JSON object matching this schema:
{
  "specialization": "string",
  "specialtyKey": "general_medicine | dermatology | cardiology | orthopedics | pediatrics | dentistry | neurology | ophthalmology | psychiatry",
  "guidance": "string detailing tailored general clinical observations and supportive self-care for these exact symptoms",
  "safetyNote": "This information is for general guidance only and is not a medical diagnosis.",
  "isEmergency": boolean
}`
            },
            {
              role: 'user',
              content: `Patient Symptoms: "${symptomsClean}"`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content?.trim();
        const jsonMatch = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonMatch);

        if (parsed.specialization && parsed.guidance) {
          return {
            specialization: parsed.specialization,
            specialtyKey: parsed.specialtyKey || heuristic.specialtyKey,
            guidance: parsed.guidance,
            safetyNote: parsed.safetyNote || 'This information is for general guidance only and is not a medical diagnosis.',
            isEmergency: Boolean(parsed.isEmergency || heuristic.isEmergency)
          };
        }
      }
    } catch (err) {
      console.warn('OpenAI API request error, falling back to clinical engine:', err.message);
    }
  }

  // Clinical Heuristic Safety Response with tailored, exact observations
  const emergencyPrefix = heuristic.isEmergency
    ? '⚠️ Urgent Emergency Warning: The symptoms you described may indicate a critical emergency requiring immediate medical attention. Please visit the nearest emergency room or dial 108 immediately.\n\n'
    : '';

  return {
    specialization: heuristic.specialization,
    specialtyKey: heuristic.specialtyKey,
    guidance: `${emergencyPrefix}${heuristic.observation}`,
    safetyNote: 'This information is for general guidance only and is not a medical diagnosis.',
    isEmergency: heuristic.isEmergency
  };
}

/**
 * 2. AI Doctor Recommendation Function
 * Analyzes symptoms, predicts specialty, and prepares doctor query.
 */
export async function recommendDoctor(symptoms) {
  if (!symptoms || !symptoms.trim()) {
    throw new Error('Please describe your symptoms to find recommended specialists.');
  }

  const symptomsClean = symptoms.trim();
  const heuristic = analyzeSymptomsHeuristically(symptomsClean);
  const openAiKey = process.env.OPENAI_API_KEY;

  if (openAiKey && openAiKey !== 'your_api_key_here' && openAiKey.startsWith('sk-')) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0.2,
          messages: [
            {
              role: 'system',
              content: `You are SmartCare AI. Recommend the most appropriate medical specialist based on the patient's symptoms.
Return ONLY a valid JSON object matching this schema:
{
  "specialization": "string",
  "specialtyKey": "general_medicine | dermatology | cardiology | orthopedics | pediatrics | dentistry | neurology | ophthalmology | psychiatry",
  "reason": "string explaining why this specialist is the best fit for these symptoms",
  "safetyNote": "This information is for general guidance only and is not a medical diagnosis.",
  "isEmergency": boolean
}`
            },
            {
              role: 'user',
              content: `Patient Symptoms: "${symptomsClean}"`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content?.trim();
        const jsonMatch = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonMatch);

        if (parsed.specialization && parsed.reason) {
          return {
            specialization: parsed.specialization,
            specialtyKey: parsed.specialtyKey || heuristic.specialtyKey,
            reason: parsed.reason,
            safetyNote: parsed.safetyNote || 'This information is for general guidance only and is not a medical diagnosis.',
            isEmergency: Boolean(parsed.isEmergency || heuristic.isEmergency)
          };
        }
      }
    } catch (err) {
      console.warn('OpenAI API request error for doctor recommendation, falling back to clinical engine:', err.message);
    }
  }

  return {
    specialization: heuristic.specialization,
    specialtyKey: heuristic.specialtyKey,
    reason: `The symptoms you described (${symptomsClean}) correspond to clinical conditions treated by a ${heuristic.specialization}.`,
    safetyNote: 'This information is for general guidance only and is not a medical diagnosis.',
    isEmergency: heuristic.isEmergency
  };
}
