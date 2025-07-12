import Banner from "./components/banner/Banner";
import Cards from "./components/cards/Cards";
import Dreams from "./components/dreams/Dreams";
import Footer from "./components/footer/Footer";
import Head from "./components/head/Head";
import Header from "./components/header/Header";
import SliderList from "./components/slider/SliderList";

function App() {
  return (
    <div className="page">
      <div className="wrapper">
        <Header />

        <main>
          <Head />
          <Banner />
          <Cards />
          <Dreams />
          <SliderList />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
