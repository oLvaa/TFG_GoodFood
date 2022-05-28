import React from "react";
import useAuth from "../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../utils/constants";
import FormularioPago from "./FormularioPago";

const stripePromise = loadStripe(STRIPE_TOKEN);

const Pago = ({ productosCarrito }) => {
  const { user } = useAuth();

  return (
    <div>
      <Elements stripe={stripePromise}>
        <FormularioPago user={user} productosCarrito={productosCarrito} />
      </Elements>
    </div>
  );
};

export default Pago;
