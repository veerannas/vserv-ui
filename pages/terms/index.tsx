import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/header-navbar/header-navbar";
import Terms from "./terms";

const Contact = () => {

  return (
    <div className="div-height" >
      <main>
        <Navbar />
        <hr></hr>
        <div className="container-fluid">
          <br></br>
          <div>
            <Terms />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
