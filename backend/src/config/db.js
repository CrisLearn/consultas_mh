import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Finaliza el proceso si hay un error crítico
  }
};

export default connectDB;
