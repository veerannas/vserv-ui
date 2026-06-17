import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useEffect, useState } from "react";
import "react-awesome-slider/dist/styles.css";
import "react-pro-sidebar/dist/css/styles.css";
import "react-slideshow-image/dist/styles.css";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import BusinessListing from "../../../assets/images/Business-listing.svg";
import BusinessNotification from "../../../assets/images/business-notification.svg";
import styles from "./index.module.css";
import { Cookies } from "react-cookie";

const UserAccount = () => {
  const cookies = new Cookies();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if ((cookies.get("id") || "") == "") { window.location.href = "/" } else {
      // set user name
      setUserName(cookies.get("name"));
      setLastName(cookies.get("lastName"));
    };

  }, [])

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr></hr>
          <div className="container">
            <div className={`footer-fix-height `}>
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-home"></i> Business Account
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  {userName} {lastName}
                  {/* <span className={`${styles.wrimagecardtextcolor}`}>
                Business Profile
              </span> */}
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="row">
                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/business/dashboard")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <img
                          className={`card-img-top ${styles.cardimg}`}
                          src={BusinessListing.src}
                          alt="Card image cap"
                        />
                        <span className={`${styles.wrimagecardheading}`}>
                          Dashboard
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        Set information about business owner and some business related data.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/business/listing")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <img
                          className={`card-img-top ${styles.cardimg}`}
                          src={BusinessListing.src}
                          alt="Card image cap"
                        />
                        <span className={`${styles.wrimagecardheading}`}>
                          Business Listing
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        It contains data visualization and
                        summery of your activity.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/business/business-info")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <img
                          className={`card-img-top ${styles.cardimg}`}
                          src={BusinessListing.src}
                          alt="Card image cap"
                        />
                        <span className={`${styles.wrimagecardheading}`}>
                          Business Info
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        Set information about business owner and some business related data.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/business/notifications")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <img
                          className={`card-img-top ${styles.cardimg}`}
                          src={BusinessNotification.src}
                          alt="Card image cap"
                        />
                        <span className={`${styles.wrimagecardheading}`}>
                          Notification
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        Set your notification and reminder preference
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className={`${styles.wrimagecardcontent}`}>
                End my journey here.
                <span
                  className={`${styles.wrimagecardtextcolor}`}
                  onClick={() => (window.location.href = "/business/deactivation")}
                >
                  &nbsp;Deactivate / Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

}
export default UserAccount;
