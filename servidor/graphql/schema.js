const { gql } = require("apollo-server");

//Schema
const typeDefs = gql`
  type Query {
    obtenerUsuario: Usuario
  }

  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
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
`;

module.exports = typeDefs;
