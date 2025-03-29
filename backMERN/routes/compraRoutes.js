import express from "express";
import Compra from "../models/Compra.js";

const router = express.Router();

// Crear compra
router.post("/", async (req, res) => {
  try {
    const { usuarioId, producto, valor } = req.body;
    const compra = new Compra({ usuarioId, producto, valor });

    await compra.save();
    res.status(201).json(compra);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al realizar la compra" });
  }
});

// Obtener historial de compras
router.get("/:usuarioId", async (req, res) => {
  try {
    const compras = await Compra.find({ usuarioId: req.params.usuarioId });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener compras" });
  }
});

export default router;
