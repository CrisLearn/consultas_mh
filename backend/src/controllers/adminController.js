import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import { generateToken } from '../utils/jwt.js';

// Crear un nuevo administrador
export const createAdmin = async (req, res) => {
  const { name, lastname, email, user, password, phone } = req.body;

  try {
    // Verificar si el email o usuario ya existen
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { user }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El email o usuario ya están registrados.' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo administrador
    const newAdmin = await Admin.create({
      name,
      lastname,
      email,
      user,
      password: hashedPassword, // Guardar la contraseña hasheada
      phone,
    });

    res.status(201).json({
      message: 'Administrador creado exitosamente.',
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        lastname: newAdmin.lastname,
        email: newAdmin.email,
        user: newAdmin.user,
        phone: newAdmin.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el administrador.', error: error.message });
  }
};

// Iniciar sesión como administrador
export const loginAdmin = async (req, res) => {
  const { user, password } = req.body;

  // Verificar que los campos no estén vacíos
  if (!user || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Buscar al administrador por el campo 'user'
    const admin = await Admin.findOne({ user });
    if (!admin) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Generar token JWT al iniciar sesión
    const token = generateToken({ id: admin._id, user: admin.user });

    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      admin: {
        id: admin._id,
        name: admin.name,
        lastname: admin.lastname,
        email: admin.email,
        user: admin.user,
        phone: admin.phone,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
  }
};
