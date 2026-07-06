import express from 'express';
import { getDashboard, getStudents, getStudentById, getActivity, deleteStudent } from '../controllers/ownerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ownerMiddleware from '../middleware/ownerMiddleware.js';

const router = express.Router();

// All owner routes are doubly protected
router.use(authMiddleware, ownerMiddleware);

router.get('/dashboard', getDashboard);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.get('/activity', getActivity);
router.delete('/students/:id', deleteStudent);

export default router;
