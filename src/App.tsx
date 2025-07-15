import React, { Suspense } from "react";

const Banner = React.lazy(() => import("@components/banner/Banner"));
const Cards = React.lazy(() => import("@components/cards/Cards"));
const Dreams = React.lazy(() => import("@components/dreams/Dreams"));
const Footer = React.lazy(() => import("@components/footer/Footer"));
const Head = React.lazy(() => import("@components/head/Head"));
const Header = React.lazy(() => import("@components/header/Header"));
const SliderList = React.lazy(() => import("@components/slider/SliderList"));

function App() {
  return (
    <div className="page">
      <div className="wrapper">
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        <main>
          <Suspense fallback={null}>
            <Head />
            <Banner />
            <Cards />
            <Dreams />
            <SliderList />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
