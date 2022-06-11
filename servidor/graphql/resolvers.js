const Usuario = require("../models/Usuario");
const Plato = require("../models/Plato");
const Pedido = require("../models/Pedido");
const Mensaje = require("../models/Mensaje");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        let platos = await Plato.find({});
        platos = platos.reverse();
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

    obtenerPedidos: async () => {
      try {
        let pedidos = await Pedido.find({});
        pedidos = pedidos.reverse();
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPedidosUsuario: async (_, { idUsuario }) => {
      const pedidos = await Pedido.find({
        idUsuario: idUsuario,
      });

      if (!pedidos) {
        throw new Error("No hay pedidos");
      }

      return pedidos;
    },

    obtenerMensajes: async () => {
      try {
        let mensajes = await Mensaje.find({});
        mensajes = mensajes.reverse();
        return mensajes;
      } catch (error) {
        console.log(error);
      }
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

    eliminarPlatos: (_, { input }) => {
      input.forEach(async (id) => {
        const plato = await Plato.findById(id);

        if (!plato) {
          console.log(`El plato con id "${id}" no se ha encontrado`);
          throw new Error("Plato no encontrado");
        }

        await Plato.findOneAndDelete({ _id: id });
      });

      if (input.length === 1) {
        return "Plato eliminado";
      } else {
        return "Platos eliminados";
      }
    },

    nuevoPedido: async (_, { input }, ctx) => {
      const { token, info } = input;

      //Stripe
      let importeTotal = 0;
      JSON.parse(info).forEach((producto) => {
        importeTotal += producto.precio;
      });

      let parsedToken = JSON.parse(token);

      const charge = await stripe.charges.create({
        amount: importeTotal * 100,
        currency: "eur",
        source: parsedToken.token.id,
        description: `ID Usuario: ${ctx.usuario.id}`,
      });

      //Mongo
      try {
        const pedido = new Pedido({
          importe: importeTotal,
          info: info,
          idUsuario: ctx.usuario.id,
          idPago: charge.id,
          direccion: ctx.usuario.direccion,
          piso: ctx.usuario.piso ? ctx.usuario.piso : "",
        });
        const resultado = await pedido.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarPedido: async (_, { id, estado }) => {
      let pedido = await Pedido.findById(id);

      if (!pedido) {
        throw new Error("Pedido no encontrado");
      }

      pedido = await Pedido.findOneAndUpdate({ _id: id }, { estado: estado });

      return pedido;
    },

    nuevoMensaje: async (_, { input }, ctx) => {
      const { asunto, mensaje } = input;

      try {
        const _mensaje = new Mensaje({
          asunto: asunto,
          mensaje: mensaje,
          nombre: ctx.usuario.nombre,
          email: ctx.usuario.email,
          idUsuario: ctx.usuario.id,
        });
        const resultado = await _mensaje.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    eliminarMensaje: async (_, { id }) => {
      const mensaje = await Mensaje.findById(id);

      if (!mensaje) {
        console.log(`El mensaje con id "${id}" no se ha encontrado`);
        throw new Error("Mensaje no encontrado");
      }

      await Mensaje.findOneAndDelete({ _id: id });

      return "Mensaje eliminado";
    },
  },
};

module.exports = resolvers;
