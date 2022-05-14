import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PacksComponent from "../components/Packs/Packs";

const Packs = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <PacksComponent />
      </Layout>
      <Footer />
    </div>
  );
};

export default Packs;
