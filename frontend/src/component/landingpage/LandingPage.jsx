import React from "react";
import AboutUs from "./pages/AboutUs";
import Developers from "./pages/Developers";
import Join from "./pages/Join";
import Loading from "./pages/Loading";
import Partners from "./pages/Partners";
import WhyChoose from "./pages/WhyChoose";
import "./LandingPage.css";

function LandingPage()  {
  return (
    <div className="landing-page-container">
        <Loading />
        <AboutUs />
        <WhyChoose />
        <Partners />
        <Developers />
        <Join />
    </div>
  );
}

export default LandingPage;
