import Admin from '../models/adminModel.js';

// Crear un nuevo administrador
export const createAdmin = async (req, res) => {
  const { name, lastname, email, user, password, phone } = req.body;

  try {
    // Verificar si el email o usuario ya existen
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { user }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El email o usuario ya están registrados.' });
    }

    // Crear un nuevo administrador
    const newAdmin = await Admin.create({ name, lastname, email, user, password, phone });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el administrador.', error: error.message });
  }
};
