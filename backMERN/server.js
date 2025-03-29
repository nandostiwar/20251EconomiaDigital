import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb+srv://estebancastano01:uijj8q0kQmflQ4Bm@parcialc1.vw17jzf.mongodb.net/?retryWrites=true&w=majority&appName=parcialC1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.error("❌ Error al conectar MongoDB:", err));

// Rutas
import authRoutes from "./routes/authRoutes.js";
import compraRoutes from "./routes/compraRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/compras", compraRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡El backend está funcionando!");
});

// Servidor en marcha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
