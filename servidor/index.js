const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const conectarDB = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

//Conexión a la base de datos
conectarDB();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers["authorization"] || "";

      if (token) {
        try {
          const usuario = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.SECRETA
          );
          return {
            usuario,
          };
        } catch (error) {
          console.log("Hubo un error");
          console.log(error);
        }
      }
    },
  });

  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`Servidor listo en http://localhost:4000${server.graphqlPath}`);
}

startServer();
