import express from 'express';
import adminRoutes from './adminRoutes.js';
import supervisorRoutes from './supervisorRoutes.js';

const router = express.Router();

// Rutas para administrador
router.use('/admin', adminRoutes);

// Rutas para supervisor
router.use('/supervisor', supervisorRoutes);

export default router;
