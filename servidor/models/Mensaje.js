const mongoose = require("mongoose");

const MensajesSchema = mongoose.Schema({
  asunto: {
    type: String,
    trim: true,
    required: true,
  },
  mensaje: {
    type: String,
    trim: true,
    required: true,
  },
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },

  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
    required: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Mensaje", MensajesSchema);
