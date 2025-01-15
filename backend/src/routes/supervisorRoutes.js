import express from 'express';
import { createSupervisor } from '../controllers/supervisorController.js';

const router = express.Router();

// Ruta para crear un supervisor
router.post('/create', createSupervisor);

export default router;
