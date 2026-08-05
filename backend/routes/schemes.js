import express from 'express';
import { Scheme, EligibilityProfile } from '../models.js';

const router = express.Router();

// 3. POST /api/eligibility
router.post('/eligibility', async (req, res) => {
  const { sessionId, state, occupation, gender, maritalStatus, landAcres, annualIncome } = req.body;

  try {
    // Save profile for tracking
    const profile = new EligibilityProfile({
      sessionId: String(sessionId || `eligibility-${Date.now()}`),
      state: String(state),
      occupation: String(occupation),
      gender: String(gender),
      maritalStatus: String(maritalStatus),
      landAcres: Number(landAcres) || 0,
      annualIncome: Number(annualIncome) || 0
    });
    await profile.save();
    
    const landVal = Number(landAcres) || 0;
    const incomeVal = Number(annualIncome) || 9999999;
    const safeState = String(state);
    const safeOccupation = String(occupation);
    const safeGender = String(gender);
    const safeMarital = String(maritalStatus);

    const query = {
      $and: [
        {
          $or: [
            { 'eligibility.states': { $size: 0 } },
            { 'eligibility.states': 'All' },
            { 'eligibility.states': safeState }
          ]
        },
        {
          $or: [
            { 'eligibility.occupation': { $size: 0 } },
            { 'eligibility.occupation': 'All' },
            { 'eligibility.occupation': safeOccupation }
          ]
        },
        {
          $or: [
            { 'eligibility.gender': 'All' },
            { 'eligibility.gender': safeGender }
          ]
        },
        {
          $or: [
            { 'eligibility.maritalStatus': { $size: 0 } },
            { 'eligibility.maritalStatus': 'All' },
            { 'eligibility.maritalStatus': safeMarital }
          ]
        },
        { 'eligibility.minLandAcres': { $lte: landVal } },
        { 'eligibility.maxLandAcres': { $gte: landVal } },
        { 'eligibility.maxAnnualIncome': { $gte: incomeVal } }
      ]
    };

    const matches = await Scheme.find(query);

    // Sort: State-specific schemes first, then national schemes
    const sortedMatches = matches.sort((a, b) => {
      const aIsStateSpecific = a.eligibility.states.length > 0 && !a.eligibility.states.includes('All');
      const bIsStateSpecific = b.eligibility.states.length > 0 && !b.eligibility.states.includes('All');
      if (aIsStateSpecific && !bIsStateSpecific) return -1;
      if (!aIsStateSpecific && bIsStateSpecific) return 1;
      return 0;
    });

    res.json(sortedMatches);
  } catch (error) {
    console.error("Error in /eligibility:", error);
    res.status(500).json({ error: "Failed to query eligibility." });
  }
});

// 4. GET /api/schemes/:schemeId
router.get('/:schemeId', async (req, res) => {
  const { schemeId } = req.params;
  try {
    const scheme = await Scheme.findOne({ schemeId });
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found." });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve scheme." });
  }
});

// Flag/report scheme endpoint
router.post('/:schemeId/report', async (req, res) => {
  const { schemeId } = req.params;
  try {
    const scheme = await Scheme.findOne({ schemeId });
    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found." });
    }
    scheme.flagged = true;
    await scheme.save();
    console.log(`[FLAGGED SCHEME]: Scheme "${schemeId}" marked as outdated by operator.`);
    res.json({ message: "Scheme reported successfully. Our team will verify it within 24 hours." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to report scheme." });
  }
});

export default router;
