import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Login from "../components/Registro-Login/Login";

const login = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <Login />
      </Layout>
      <Footer />
    </div>
  );
};

export default login;
