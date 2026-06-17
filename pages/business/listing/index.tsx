import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import BusinessListingComp from "../../../components/business-listing";
import BreadCrum from "../../../components/businessbreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";

const BusinessListing = () => {
  const cookies = new Cookies();
  const [vendorId, setVendorId] = useState(cookies.get("vendorId"));

  useEffect(() => {
    if ((cookies.get("id") || "") == "") { window.location.href = "/" }
  }, []);

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr></hr>
          <div className={`container`}>
            <div className={`footer-fix-height `}>

              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                  Business Listing
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <BreadCrum />
                </div>
              </div>
              <br></br>
              <BusinessListingComp vendorId={vendorId} pageValue={"business-listing"}/>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default BusinessListing;