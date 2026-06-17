import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import "react-awesome-slider/dist/styles.css";
import { Cookies } from "react-cookie";
import "react-pro-sidebar/dist/css/styles.css";
import "react-slideshow-image/dist/styles.css";
import Footer from "../../components/footer/footer";
import HeaderNavbar from "../../components/header-navbar/header-navbar";
import styles from "./index.module.css";

const AdminAccount = () => {
  const cookies = new Cookies();

  useEffect(() => {
    if ((cookies.get("id") || "") == "") window.location.href = "/";

  }, [])

  return (
    <div className={`container-fluid`}>
      {/* Header Menu */}
      <HeaderNavbar />
      <hr></hr>
      <div className="container">
        <div>
          <div className={`${styles.wrimagecard}`}>
            <i className="fa fa-home"></i> Admin Account
          </div>
          <div className={`${styles.wrimagecardcontent}`}>
            Admin
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
            onClick={() => (window.location.href = "/admin/dashboard")}
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
                  Set information about business owner and some business related data.
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 col-sm-4"
            onClick={() => (window.location.href = "/admin/business-account")}
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  {/* <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={BusinessListing}
                    alt="Card image cap"
                  /> */}
                  <i className="fa fa-briefcase"></i>
                  <span className={`${styles.wrimagecardheading}`}>
                    Business Accounts
                  </span>
                </div>
                <div className={`${styles.wrimagecardtext}`}>
                  It contains data of business account
                  users and their businesses.
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 col-sm-4"
            onClick={() => (window.location.href = "/admin/business-listing")}
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  <i className="fa fa-list-alt"></i>
                  <span className={`${styles.wrimagecardheading}`}>
                    Business Listings
                  </span>
                </div>
                <div className={`${styles.wrimagecardtext}`}>
                  It contains all businesses which are
                  registered with us.
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-md-4 col-sm-4"
            onClick={() => (window.location.href = "/admin/customer-account")}
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  <i className="fa fa-user-tie"></i>
                  <span className={`${styles.wrimagecardheading}`}>
                    Customers Accounts
                  </span>
                </div>
                <div className={`${styles.wrimagecardtext}`}>
                  It shows all customers details and their reservations.
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-md-4 col-sm-4"
            onClick={() => (window.location.href = "/admin/city")}
          >
            <div className="wrimagecard wrimagecard-topimage">
              <div className="wrimagecard-topimage_title">
                <div className={`${styles.wrimagecardtitle}`}>
                  <i className="fa fa-user-tie"></i>
                  <span className={`${styles.wrimagecardheading}`}>
                    City and Country
                  </span>
                </div>
                <div className={`${styles.wrimagecardtext}`}>
                  It shows all City and Country details.
                </div>
              </div>
            </div>
          </div>

        </div>
        <br></br>


        {/* <div className={`${styles.wrimagecardcontent}`}>
          End my journey here.
            <span
            className={`${styles.wrimagecardtextcolor}`}
            onClick={() => (window.location.href = "/business/deactivation")}
          >
            &nbsp;Deactivate / Delete
          </span>
        </div> */}
      </div>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );

}
export default AdminAccount;
