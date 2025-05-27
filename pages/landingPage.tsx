import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cards from "../components/cards/cards";
import Footer from "../components/footer/footer";
import HeaderNavbar from "../components/header-navbar/header-navbar";
import Header from "../components/header/header";
import SerachboxHome from "../components/searchbox/serachbox-home";
import BusinessCards from "../components/businesscards/cards";
import Benefits from "../components/benefits/benefits";
import CustomerBenefits from "../components/customerbenefits/benefits";

const LandingPage = () => (
  <div className="div-height" >
    <main>
      <div className="container-fluid footer-height">
        <div className="content">
           <HeaderNavbar />
          <Header />
          <div className="col-md-12 ribbon-color">
            <div className="container home-searchbox-wrapper">
              <SerachboxHome />
            </div>
          </div>
          <Cards />
          <div className="distance-between"></div>

          <Benefits />
          <div className="distance-between"></div>
            <CustomerBenefits/>
            <div className="distance-between"></div>
          <BusinessCards />
          <div className="distance-between"></div>

        </div>
      </div>
    </main>
    <Footer />
  </div >
);
export default LandingPage;
