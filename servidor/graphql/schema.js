const { gql } = require("apollo-server-express");

//Schema
const typeDefs = gql`
  type Query {
    # Usuarios
    obtenerUsuario: Usuario

    # Platos
    obtenerPlatos: [Plato]
    obtenerPlato(id: ID!): Plato

    # Platos personalizados

    # Pedidos
    obtenerPedidos: [Pedido]
    obtenerPedidosUsuario(idUsuario: ID!): [Pedido]

    # Mensajes
    obtenerMensajes: [Mensaje]

    # Dashboard
    obtenerDatos: Datos
  }

  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    # Platos
    nuevoPlato(input: PlatoInput): Plato
    actualizarPlato(id: ID!, input: PlatoInput): Plato
    eliminarPlatos(input: [ID]!): String

    # Platos personalizados

    # Pedidos
    nuevoPedido(input: PedidoInput): Pedido
    actualizarPedido(id: ID!, estado: String!): Pedido

    # Mensajes
    nuevoMensaje(input: MensajeInput): Mensaje
    eliminarMensaje(input: ID): String
  }

  type Usuario {
    id: ID
    nombre: String
    email: String
    telefono: String
    direccion: String
    piso: String
    admin: Boolean
    creado: String
  }

  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
    telefono: String!
    piso: String
    direccion: String!
  }

  type Token {
    token: String
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  type Plato {
    id: ID
    nombre: String
    img: String
    imgID: String
    pack: String
    enMenu: Boolean
    precio: Float
    peso: Int
    calorias: Float
    proteina: Float
    carbohidrato: Float
    grasa: Float
    ingredientes: String
  }

  input PlatoInput {
    nombre: String
    img: String
    imgID: String
    pack: String
    enMenu: Boolean
    precio: Float
    peso: Int
    calorias: Float
    proteina: Float
    carbohidrato: Float
    grasa: Float
    ingredientes: String
  }

  type Pedido {
    id: ID
    importe: Float
    info: String
    idUsuario: ID
    idPago: String
    direccion: String
    piso: String
    estado: String
    creado: String
  }

  input PedidoInput {
    info: String!
    token: String!
  }

  type Mensaje {
    id: ID
    asunto: String
    mensaje: String
    nombre: String
    email: String
    idUsuario: ID
    creado: String
  }

  input MensajeInput {
    asunto: String!
    mensaje: String!
  }

  type Datos {
    numUsuarios: Int
    numPlatos: Int
    pedidosTotales: Int
    pedidosMes: Int
    facturacionTotal: Float
    facturacionMes: Float
  }
`;

module.exports = typeDefs;
