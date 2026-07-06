import express from 'express';
import { getCourses, getCourseById, enrollCourse } from '../controllers/courseController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public with optional auth (to get enrollment status)
router.get('/', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) return authMiddleware(req, res, next);
  next();
}, getCourses);

router.get('/:id', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) return authMiddleware(req, res, next);
  next();
}, getCourseById);

// Protected
router.post('/:id/enroll', authMiddleware, enrollCourse);

export default router;
