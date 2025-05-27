import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import BusinessListing from "../../../assets/images/Business-listing.svg";
import BreadCrum from "../../../components/businessbreadcrum/breadcrum";
import { Col, Row } from "react-bootstrap";
import { getCountBusinessByVendorId } from "../../../components/services/api/business-api";
import { Cookies } from "react-cookie";

const Dashboard = () => {
  const [totalBusiness, setTotalBusiness] = useState(0);
  const cookies = new Cookies();

  useEffect(() => {
    if ((cookies.get("id") || "") == "") { window.location.href = "/" } else {
      fetchTotalBusiness();
    };

  }, [])

  const fetchTotalBusiness = () => {
    getCountBusinessByVendorId(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
      });
  }

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          {/* End Header Menu */}
          <hr></hr>
          <div className="container">
            <div className={`footer-fix-height `}>
              <div className={`${styles.wrimagecard}`}>
                <img
                  className={`card-img-top ${styles.cardimg}`}
                  src={BusinessListing.src}
                  alt="Card image cap"
                />
                <span className={`${styles.wrimagecarmaindheading}`}>Dashboard</span>
              </div>
              <div className={`${styles.wrimagecardcontent}`}>
                {/* BreadCrum */}
                <BreadCrum />
                {/* End BreadCrum */}
              </div>
              <div className="row">
                <div className={`col-md-4 col-sm-4 col-xs-4`}>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col>
                      <div className={`wrimagecard wrimagecard-topimage ${styles.incomewrimagecard}`}>
                        <div className="wrimagecard-topimage_title">
                          <div className={`${styles.wrimagecardtext}`}>
                            Total Business
                            <span className={styles.wrimagecardtextright}>
                              {totalBusiness}
                            </span>
                          </div>
                          <span className={styles.subtext}>Registered Business</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Dashboard;