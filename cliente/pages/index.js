import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Seccion1 from "../components/Inicio/Seccion1/Seccion1";
import Marketing1 from "../components/Inicio/Marketing/Marketing1";
import Seccion2 from "../components/Inicio/Seccion2/Seccion2";
import Marketing2 from "../components/Inicio/Marketing/Marketing2";
import Seccion3 from "../components/Inicio/Seccion3/Seccion3";
import Marketing3 from "../components/Inicio/Marketing/Marketing3";
import Seccion4 from "../components/Inicio/Seccion4/Seccion4";
import Footer from "../components/Footer/Footer";

export default function Index() {
  return (
    <div className="bg-fondoBlanco w-screen">
      <Navbar />
      <Layout>
        <Seccion1 />
      </Layout>
      <Marketing1 />
      <Layout>
        <Seccion2 />
      </Layout>
      <Marketing2 />
      <Layout>
        <Seccion3 />
      </Layout>
      <Marketing3 />
      <Layout>
        <Seccion4 />
      </Layout>
      <Footer />
    </div>
  );
}
