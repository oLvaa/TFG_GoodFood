const { gql } = require("apollo-server-express");

//Schema
const typeDefs = gql`
  type Query {
    # Usuarios
    obtenerUsuario: Usuario

    # Platos
    obtenerPlatos: [Plato]
    obtenerPlato(id: ID!): Plato
  }

  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    # Platos
    nuevoPlato(input: PlatoInput): Plato
    actualizarPlato(id: ID!, input: PlatoInput): Plato
    eliminarPlato(id: ID!): String

    # Platos personalizados
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
    pack: String
    enMenu: Boolean
    nombre: String
    calorias: Int
    proteina: Int
    carbohidrato: Int
    grasa: Int
    peso: Int
    precio: Float
    img: String
  }

  input PlatoInput {
    pack: String!
    enMenu: Boolean!
    nombre: String!
    calorias: Int!
    proteina: Int!
    carbohidrato: Int!
    grasa: Int!
    peso: Int!
    precio: Float!
    img: String!
  }
`;

module.exports = typeDefs;
