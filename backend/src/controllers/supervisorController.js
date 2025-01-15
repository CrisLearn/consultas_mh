import Supervisor from '../models/supervisorModel.js';

// Crear un nuevo supervisor
export const createSupervisor = async (req, res) => {
  const { name, lastname, email, user, password, phone } = req.body;

  try {
    // Verificar si el email o usuario ya existen
    const existingSupervisor = await Supervisor.findOne({ $or: [{ email }, { user }] });
    if (existingSupervisor) {
      return res.status(400).json({ message: 'El email o usuario ya están registrados.' });
    }

    // Crear un nuevo supervisor
    const newSupervisor = await Supervisor.create({ name, lastname, email, user, password, phone });
    res.status(201).json(newSupervisor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el supervisor.', error: error.message });
  }
};
