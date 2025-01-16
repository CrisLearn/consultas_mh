import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

// Manejo de promesas rechazadas no capturadas
process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada no capturada:', err);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejo gracioso del cierre del servidor
process.on('SIGTERM', () => {
  console.log('Señal SIGTERM recibida. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});