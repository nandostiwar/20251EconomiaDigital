import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  producto: { type: String, required: true },
  valor: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ["Pendiente", "Pagado", "Enviado"], default: "Pendiente" }
});

export default mongoose.model("Compra", compraSchema);
