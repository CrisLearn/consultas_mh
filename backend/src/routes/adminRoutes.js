import express from 'express';
import { createAdmin,loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Ruta para crear un administrador
router.post('/create-admin', createAdmin);
router.post('/login-admin', loginAdmin);

export default router;
