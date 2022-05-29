const mongoose = require("mongoose");

const PedidosSchema = mongoose.Schema({
  importe: {
    type: Number,
    required: true,
    trim: true,
  },
  info: {
    type: String,
    required: true,
    trim: true,
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  idPago: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  piso: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    default: "Pendiente de envío",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Pedido", PedidosSchema);
