import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../utils/constants";
import FormularioPago from "./FormularioPago";

const stripePromise = loadStripe(STRIPE_TOKEN);

const Pago = ({
  productosCarrito,
  setDisplayPagoDialog,
  borrarProductosCarrito,
}) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <FormularioPago
          productosCarrito={productosCarrito}
          setDisplayPagoDialog={setDisplayPagoDialog}
          borrarProductosCarrito={borrarProductosCarrito}
        />
      </Elements>
    </div>
  );
};

export default Pago;
