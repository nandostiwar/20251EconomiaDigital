const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(('mongodb+srv://OscarJM:bOJkIUGJEzqgS3eq@ganaloco.a1u9b.mongodb.net/Whatsapp_bd?retryWrites=true&w=majority&appName=GanaLoco'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("Error de conexión a MongoDB:", error));
db.once("open", () => console.log("Conectado a MongoDB."));

// Esquemas y modelos
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  content: String,
  status: { type: String, default: "Pendiente" },
});

const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);

// Verificar y registrar usuario
app.post("/register", async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).send({ message: "Nombre y celular son requeridos." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ name }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "El usuario ya está registrado." });
    }

    const newUser = new User({ name, phone });
    await newUser.save();
    res.status(201).send({ message: `Usuario ${name} registrado exitosamente.` });
  } catch (error) {
    res.status(500).send({ message: "Error al registrar usuario.", error });
  }
});

// Enviar mensaje
app.post("/messages", async (req, res) => {
  const { sender, recipient, content } = req.body;

  if (!sender || !recipient || !content) {
    return res
      .status(400)
      .send({ message: "Remitente, destinatario y contenido son requeridos." });
  }

  try {
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    res
      .status(201)
      .send({ message: "Mensaje enviado correctamente.", data: newMessage });
  } catch (error) {
    res.status(500).send({ message: "Error al enviar mensaje.", error });
  }
});

// Obtener mensajes
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener mensajes.", error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
