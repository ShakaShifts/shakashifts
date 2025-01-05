import express from 'express'
import { login, verify } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js';

// creating an instance of router
const router = express.Router()

// posting to path, also importing login from authController
router.post('/login', login)
router.post('/verify', authMiddleware, verify)

export default router;