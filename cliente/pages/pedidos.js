import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Layout from "../components/Layout";
import Footer from "../components/Footer/Footer";
import Pedidos from "../components/Perfil/Pedidos";

const pedidos = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <Pedidos />
      </Layout>
      <Footer />
    </div>
  );
};

export default pedidos;
