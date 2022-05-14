const mongoose = require("mongoose");

const PlatosSchema = mongoose.Schema({
  pack: {
    type: String,
    required: true,
    trim: true,
  },

  enMenu: {
    type: Boolean,
    required: true,
    trim: true,
  },

  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  calorias: {
    type: Number,
    required: true,
    trim: true,
  },
  proteina: {
    type: Number,
    required: true,
    trim: true,
  },
  carbohidrato: {
    type: Number,
    required: true,
    trim: true,
  },
  grasa: {
    type: Number,
    required: true,
    trim: true,
  },
  peso: {
    type: Number,
    required: true,
    trim: true,
  },

  precio: {
    type: Number,
    required: true,
    trim: true,
  },

  img: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Plato", PlatosSchema);
