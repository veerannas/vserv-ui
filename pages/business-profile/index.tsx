import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import BusinessActive from "../../assets/images/BusinessProfile_Active.svg";
import BusinessDashboard from "../../assets/images/BusinessProfile_Dashbaord.svg";
import BusinessInfo from "../../assets/images/BusinessProfile_Info.svg";
import BusinessRating from "../../assets/images/BusinessProfile_Raating.svg";
import BusinessProfile from "../../assets/images/Business_Profile.svg";
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
      // window.location.href = "/";
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
            <div>
              <div className={`${styles.wrimagecard}`}>
                <i className="fa fa-home"></i> {cookies.get("businessName")}
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
                onClick={() =>
                  (window.location.href = "/business-profile/dashboard")
                }
              >
                <div className="wrimagecard wrimagecard-topimage">
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <img
                        className={`card-img-top ${styles.cardimg}`}
                        src={BusinessDashboard.src}
                        alt="Card image cap"
                      />
                      <span className={`${styles.wrimagecardheading}`}>
                        Dashboard
                      </span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      It contains data visualization and summery of your activity.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 col-sm-4"
                onClick={() =>
                  (window.location.href = "/business-profile/businessprofile")
                }
              >
                <div className="wrimagecard wrimagecard-topimage">
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <img
                        className={`card-img-top ${styles.cardimg}`}
                        src={BusinessProfile.src}
                        alt="Card image cap"
                      />
                      <span className={`${styles.wrimagecardheading}`}>
                        Business Profile
                      </span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      It contains business introduction, address and contact
                      information.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 col-sm-4"
                onClick={() =>
                  (window.location.href = "/business-profile/reviews-rating")
                }
              >
                <div className="wrimagecard wrimagecard-topimage">
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <img
                        className={`card-img-top ${styles.cardimg}`}
                        src={BusinessRating.src}
                        alt="Card image cap"
                      />
                      <span className={`${styles.wrimagecardheading}`}>
                        Rating And Reviews
                      </span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      Honest response a customer gives to a service.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 col-sm-4"
                onClick={() =>
                  (window.location.href = "/business-profile/askme")
                }
              >
                <div className="wrimagecard wrimagecard-topimage">
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <i className="fa fa-question-circle"></i>
                      <span className={`${styles.wrimagecardheading}`}>Ask Me</span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      Questions intended to help customer understand your service.
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-4 col-sm-4"
                onClick={() =>
                  (window.location.href = "/business-profile/appointment")
                }
              >
                <div className="wrimagecard wrimagecard-topimage">
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <img
                        className={`card-img-top ${styles.cardimg}`}
                        src={BusinessActive.src}
                        alt="Card image cap"
                      />
                      <span className={`${styles.wrimagecardheading}`}>
                        Business Reservation
                      </span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      Status of your Reservation.
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
            className="col-md-4 col-sm-4"
            onClick={() =>
              (window.location.href = "/business-profile/notifications")
            }
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={BusinessPast}
                    alt="Card image cap"
                  />
                  <span className={`${styles.wrimagecardheading}`}>
                    Past appointments
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
                onClick={() =>
                  (window.location.href = "/business-profile/info")
                }
              >
                <div className="wrimagecard wrimagecard-topimage">
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <img
                        className={`card-img-top ${styles.cardimg}`}
                        src={BusinessInfo.src}
                        alt="Card image cap"
                      />
                      <span className={`${styles.wrimagecardheading}`}>
                        Business Profile Info
                      </span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      Business profile info-official details of a business.
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
            className="col-md-4 col-sm-4"
            onClick={() =>
              (window.location.href = "/business-profile/notifications")
            }
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={BusinessNotification}
                    alt="Card image cap"
                  />
                  <span className={`${styles.wrimagecardheading}`}>
                    Notification
                  </span>
                </div>
                <div className={`${styles.wrimagecardtext}`}>
                  Detail of your past appointments.{" "}
                </div>
              </div>
            </div>
          </div> */}
            </div>
            <br></br>
            <div className={`${styles.wrimagecardcontent}`}>
              End my journey here.
              <span
                className={`${styles.wrimagecardtextcolor}`}
                onClick={() =>
                  (window.location.href = "/business-profile/deactivation")
                }
              >
                &nbsp;Deactivate / Delete
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserAccount;
