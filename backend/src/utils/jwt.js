import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

// Generar un token JWT
export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Verificar un token JWT
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
