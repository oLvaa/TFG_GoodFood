const mongoose = require("mongoose");

const PlatosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  imgID: {
    type: String,
    required: true,
    trim: true,
  },
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
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  peso: {
    type: Number,
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
});

module.exports = mongoose.model("Plato", PlatosSchema);
