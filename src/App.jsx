import Banner from "./components/banner/Banner";
import Cards from "./components/cards/Cards";
import Footer from "./components/footer/Footer";
import Head from "./components/head/Head";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="page">
      <div className="wrapper">
        <Header />

        <main>
          <Head />
          <Banner />
          <Cards />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
