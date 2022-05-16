const mongoose = require("mongoose");

const PlatosSchema = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  imgID: {
    type: String,
    trim: true,
  },
  pack: {
    type: String,
    trim: true,
  },
  enMenu: {
    type: Boolean,
    trim: true,
  },
  precio: {
    type: Number,
    trim: true,
  },
  peso: {
    type: Number,
    trim: true,
  },

  calorias: {
    type: Number,
    trim: true,
  },
  proteina: {
    type: Number,
    trim: true,
  },
  carbohidrato: {
    type: Number,
    trim: true,
  },
  grasa: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model("Plato", PlatosSchema);
