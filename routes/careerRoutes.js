import express from 'express';
import { getAllCareers, getCareerBySlug, selectCareer } from '../controllers/careerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCareers);
router.get('/:slug', getCareerBySlug);
router.post('/select', protect, selectCareer);

export default router;
