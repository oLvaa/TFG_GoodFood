import { gql } from "@apollo/client";

//QUERIES

export const OBTENER_PLATOS = gql`
  query ObtenerPlatos {
    obtenerPlatos {
      id
      nombre
      img
      imgID
      pack
      enMenu
      precio
      peso
      calorias
      proteina
      carbohidrato
      grasa
      ingredientes
    }
  }
`;

export const OBTENER_PEDIDOS = gql`
  query Query {
    obtenerPedidos {
      id
      importe
      info
      idUsuario
      idPago
      direccion
      estado
      piso
      creado
    }
  }
`;

export const OBTENER_MENSAJES = gql`
  query Query {
    obtenerMensajes {
      id
      asunto
      mensaje
      nombre
      idUsuario
      creado
    }
  }
`;

//MUTATIONS

export const REGISTRAR_USUARIO = gql`
  mutation Mutation($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      email
      telefono
      direccion
      piso
      admin
      creado
    }
  }
`;

export const AUTENTICAR_USUARIO = gql`
  mutation AutenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

export const NUEVO_PLATO = gql`
  mutation NuevoPlato($input: PlatoInput) {
    nuevoPlato(input: $input) {
      id
      nombre
      img
      imgID
      pack
      enMenu
      precio
      peso
      calorias
      proteina
      carbohidrato
      grasa
      ingredientes
    }
  }
`;

export const ELIMINAR_PLATOS = gql`
  mutation EliminarPlatos($input: [ID]!) {
    eliminarPlatos(input: $input)
  }
`;

export const ACTUALIZAR_PLATO = gql`
  mutation ActualizarPlato($id: ID!, $input: PlatoInput) {
    actualizarPlato(id: $id, input: $input) {
      nombre
      img
      imgID
      pack
      enMenu
      precio
      peso
      calorias
      proteina
      carbohidrato
      grasa
      ingredientes
    }
  }
`;

export const NUEVO_PEDIDO = gql`
  mutation Mutation($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
      importe
      info
      idUsuario
      idPago
      direccion
      piso
      estado
      creado
    }
  }
`;

export const ACTUALIZAR_PEDIDO = gql`
  mutation Mutation($actualizarPedidoId: ID!, $estado: String!) {
    actualizarPedido(id: $actualizarPedidoId, estado: $estado) {
      id
    }
  }
`;

export const NUEVO_MENSAJE = gql`
  mutation Mutation($input: MensajeInput) {
    nuevoMensaje(input: $input) {
      id
      asunto
      mensaje
      nombre
      idUsuario
      creado
    }
  }
`;
