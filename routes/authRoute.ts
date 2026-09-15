import express from 'express';
import { createUser, getAllUser, login, getMe, getUser, updateUser, deleteUser  } from '../controllers/authControllers';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', login)
router.get('/me', protect, getMe)

router.route('/')
    .get(protect, getAllUser)
    // .post(protect, createUser)
    .post(createUser)

router.route('/:id')
    .get(protect, getUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser)

export default router;