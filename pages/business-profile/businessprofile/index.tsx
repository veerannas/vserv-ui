import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import 'react-select2-wrapper/css/select2.css';
import 'semantic-ui-css/semantic.min.css';
import BusinessProfile from "../../../assets/images/Business_Profile.svg";
import BackNext from "../../../components/backnext-button/backnext";
import BusinessNavbar from "../../../components/business-navbar/businessnavbar";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import BusinessprofileImages from "../../../components/businessprofileimages/image";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import ProgressBarComponent from "../../../components/progress-bar/progressbar";
import Address from "../../business-profile/address";
import Hours from "../../business-profile/hours";
import Overview from "../../business-profile/overview";
import Photos from "../../business-profile/photos";
import Services from "../../business-profile/services";
import Status from "../../business-profile/status";
import Contact from "../../business-profile/contact";
import styles from "./index.module.css";

const Businessprofile = (props: any) => {

  const cookies = new Cookies();

  const [link, setLink] = useState("overview");
  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      // window.location.href = "/";
    }
  }, [cookies.get("id")]);

  return (
    <div className="div-height" >
      <main>

        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          {/* End Header Menu */}
          <hr></hr>
          <div className="container">
            <div className="footer-fix-height">
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <img
                    className={`card-img-top ${styles.iconcolor}`}
                    src={BusinessProfile.src}
                    alt="Card image cap"
                  />
                  Business Profile
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  {/* BreadCrum */}
                  <BreadCrum link={link} setLink={setLink} />
                  {/* End BreadCrum */}
                </div>
              </div>
              <br />
              <Row>
                <div className="col-md-8">
                  <Row>
                    <BusinessNavbar link={link} setLink={setLink} />
                  </Row>

                  {link == "overview" && (<Overview link={link} setLink={setLink} />)}
                  {link == "address" && (<Address link={link} setLink={setLink} />)}
                  {link == "contact" && (<Contact link={link} setLink={setLink} />)}
                  {link == "services" && (<Services link={link} setLink={setLink} />)}
                  {link == "photos" && (<Photos link={link} setLink={setLink} />)}
                  {link == "hours" && (<Hours link={link} setLink={setLink} />)}
                  {link == "status" && (<Status link={link} setLink={setLink} />)}

                  <BackNext link={link} setLink={setLink} />
                </div>

                <div className="col-md-1"></div>
                <br />
                <div className="col-md-3">
                  <div className={styles.rightimagecard}>
                    <ProgressBarComponent rowId={cookies.get("businessInfoId")} link={link} />
                    <br />
                    <BusinessprofileImages link={link} setLink={setLink} />
                  </div>
                </div>

              </Row>
              <br></br>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Businessprofile;
