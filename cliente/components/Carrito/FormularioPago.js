import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "black",
          letterSpacing: "0.025em",
          fontFamily: "Roboto, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "rgb(220 38 38)",
        },
      },
    }),
    [16]
  );

  return options;
};

const NUEVO_PEDIDO = gql`
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

const FormularioPago = ({
  productosCarrito,
  setDisplayPagoDialog,
  borrarProductosCarrito,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      toast.error(result.error.message);
    } else {
      try {
        const { data } = await nuevoPedido({
          variables: {
            input: {
              info: JSON.stringify(productosCarrito),
              token: JSON.stringify(result),
            },
          },
        });
        toast.success("Pedido realizado correctamente");
      } catch (error) {
        toast.error("Error al realizar el pedido");
      }
    }
    borrarProductosCarrito();
    setDisplayPagoDialog(false);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span className="font-medium text-lg">Número de tarjeta</span>
        <CardNumberElement options={options} />
      </label>
      <label>
        <span className="font-medium text-lg">Fecha de expiración</span>
        <CardExpiryElement options={options} />
      </label>
      <label>
        <span className="font-medium text-lg">CVC</span>
        <CardCvcElement options={options} />
      </label>
      <button
        className="blackButton text-lg w-full flex justify-center p-2 mt-10"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? <CircularProgress color="success" /> : "Pagar"}
      </button>
    </form>
  );
};

export default FormularioPago;
