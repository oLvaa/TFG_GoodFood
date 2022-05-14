const Usuario = require("../models/Usuario");
const Plato = require("../models/Plato");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crearToken = (usuario, secreta, expiresIn) => {
  const { id, nombre, email, telefono, direccion, piso, admin } = usuario;
  return jwt.sign(
    { id, nombre, email, telefono, direccion, piso, admin },
    secreta,
    {
      expiresIn,
    }
  );
};

//Resolvers
const resolvers = {
  Query: {
    obtenerUsuario: async (_, {}, ctx) => {
      //El context contiene el usuario autenticado
      return ctx.usuario;
    },

    obtenerPlatos: async () => {
      try {
        const platos = await Plato.find({});
        return platos;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPlato: async (_, { id }) => {
      const plato = await Plato.findById(id);

      if (!plato) {
        throw new Error("Plato no encontrado");
      }

      return plato;
    },
  },

  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { nombre, email, telefono, password } = input;

      //Compruebo si ya existe el email
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        throw new Error(
          "Ya existe un usuario registrado con el mismo correo electrónico"
        );
      }

      //Compruebo si ya existe el nombre
      const existeNombre = await Usuario.findOne({ nombre });
      if (existeNombre) {
        throw new Error(
          "Ya hay un usuario registrado con ese nombre de usuario"
        );
      }

      //Compruebo si ya existe el número de teléfono
      const existeTelefono = await Usuario.findOne({ telefono });
      if (existeTelefono) {
        throw new Error(
          "Ya hay un usuario registrado con ese número de teléfono"
        );
      }

      //Hasheo su password
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(password, salt);

      //Lo guardo en la base de datos
      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.log(error);
      }
    },

    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      //Compruebo si el usuario existe
      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      //Compruebo si la contraseña es correcta
      const passwordCorrecto = await bcrypt.compare(
        password,
        existeUsuario.password
      );

      if (!passwordCorrecto) {
        throw new Error("La contraseña es incorrecta");
      }

      //Creo el token
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "24h"),
      };
    },

    nuevoPlato: async (_, { input }) => {
      try {
        const plato = new Plato(input);
        const resultado = await plato.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarPlato: async (_, { id, input }) => {
      const plato = await Plato.findById(id);

      if (!plato) {
        throw new Error("Plato no encontrado");
      }

      plato = await Plato.findOneAndUpdate({ _id: id }, input, { new: true });

      return plato;
    },

    eliminarPlato: async (_, { id }) => {
      const plato = await Plato.findById(id);

      if (!plato) {
        throw new Error("Plato no encontrado");
      }

      await Plato.findOneAndDelete({ _id: id });

      return "Plato eliminado";
    },
  },
};

module.exports = resolvers;
