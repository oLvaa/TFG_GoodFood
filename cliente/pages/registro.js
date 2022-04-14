import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Registro from "../components/Registro-Login/Registro";

const registro = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <Registro />
      </Layout>
      <Footer />
    </div>
  );
};

export default registro;
