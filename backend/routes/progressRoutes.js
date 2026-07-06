import express from 'express';
import { getMyCourses, completeModule } from '../controllers/progressController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-courses', authMiddleware, getMyCourses);
router.post('/module-complete', authMiddleware, completeModule);

export default router;
