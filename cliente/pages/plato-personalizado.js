import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WorkInProgress from "../components/WorkInProgress";

const PlatoPersonalizado = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <WorkInProgress />
      </Layout>
      <Footer />
    </div>
  );
};

export default PlatoPersonalizado;
