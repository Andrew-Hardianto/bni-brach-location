const express = require('express');
const { createUser, getAllUser, login, getMe, getUser, updateUser, deleteUser } = require('../controllers/authControllers');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login)
router.get('/me', protect, getMe)

router.route('/')
    .get(protect, getAllUser)
    .post(protect, createUser)

router.route('/:id')
    .get(protect, getUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser)

module.exports = router;