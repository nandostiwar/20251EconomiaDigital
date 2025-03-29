import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const usuarioExistente = await User.findOne({ correo });

    if (usuarioExistente) return res.status(400).json({ mensaje: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const usuario = new User({ nombre, correo, contraseña: hashedPassword, rol });

    await usuario.save();
    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await User.findOne({ correo });

    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const passwordCorrecto = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordCorrecto) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el login" });
  }
});

export default router;
