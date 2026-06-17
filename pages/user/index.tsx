import React, { Component, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import Footer from "../../components/footer/footer";
import HeaderNavbar from "../../components/header-navbar/header-navbar";
import styles from "./index.module.css";

/**
 * User Account
 *
 * @author Nahid
 *
 */
const UserAccount = () => {
  const cookies = new Cookies();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    } else {
      // set user name
      setUserName(cookies.get("name"));
      setLastName(cookies.get("lastName"));
    }
  });

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
                  <i className="fa fa-home"></i> Account
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  {userName} {lastName}
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="row">
                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/user/dashboard")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <i className="fa fa-th-large"></i>
                        <span className={`${styles.wrimagecardheading}`}>
                          Dashboard
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        It contains data visualization and summary of your activity.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/user/active-appointment")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <i className="fa fa-pen-square"></i>{" "}
                        <span className={`${styles.wrimagecardheading}`}>
                          Reservation
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        Status of your reservations.
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div
            className="col-md-4 col-sm-4"
            onClick={() => (window.location.href = "/user/past-appointment")}
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <span className={`${styles.wrimagecardheading}`}>
                    Past Appointment
                  </span>
                </div>
                <div className={`${styles.wrimagecardtext}`}>
                  Detail of your past appointments.
                </div>
              </div>
            </div>
          </div> */}
                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/user/personal-info")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <i className="fa fa-user"></i>
                        <span className={`${styles.wrimagecardheading}`}>
                          Personal Info
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        Keep your data update and so we can reach to you easily.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-4 col-sm-4"
                  onClick={() => (window.location.href = "/user/notifications")}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        <i className="fa fa-bell"></i>
                        <span className={`${styles.wrimagecardheading}`}>
                          Notification
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        Set your notification and reminder preference.
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
                  onClick={() => (window.location.href = "/user/deactivation")}
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
};

export default UserAccount;
