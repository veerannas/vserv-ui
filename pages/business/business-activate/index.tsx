import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import CreateBusiness from "../../../assets/images/businessLoggedout/businessaccount.svg";
import BusinessGrowth from "../../../assets/images/businessLoggedout/businessgrowth.svg";
import BusinessMan from "../../../assets/images/businessLoggedout/businessman.svg";
import CustomerConnect from "../../../assets/images/businessLoggedout/customerconnect.svg";
import GrowBusiness from "../../../assets/images/businessLoggedout/growbusiness.svg";
import ManageBusiness from "../../../assets/images/businessLoggedout/managebusiness.svg";
import Teacher from "../../../assets/images/businessLoggedout/teacher.svg";
import TechnicalSupport from "../../../assets/images/businessLoggedout/technicalsupport.svg";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import Signin from "../../../components/signin/signin";
import styles from "./index.module.css";
import { postVendorRegistration } from "../../../components/services/api/business-api";

const BusinessActivate = () => {
  const cookies = new Cookies();
  const [modalShow, setModalShow] = useState(false);


  const activateBusiness = () => {
    let user = {
      id: cookies.get("id"),
    };
    postVendorRegistration(user)
      .then((response) => response.text())
      .then((response) => {
        window.location.href = "/business/account";
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                <div className={`${styles.wrimagecardcontent}`}>
                  <span className={`${styles.wrimagecardtextcolor}`}>
                    Activate Your Business Account
                  </span>
                  <span className={`${styles.wrimagecardtextcolor}`}>
                    Step To Follow
                  </span>
                  <span className={`${styles.wrimagecardtextcolor}`}>
                    Advantages Of Business Account
                  </span>
                </div>
              </div>
              <br></br>
              <br></br>

              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={BusinessMan.src}
                    alt="Card image cap"
                  />
                </div>
                <div className={`col-md-4 col-sm-4 ${styles.hellotextcard}`}>
                  <div className={`${styles.hellotextcardtitle}`}>
                    <span className={`${styles.hellotextcardheading}`}>Hello,</span>
                  </div>
                  <div className={`${styles.hellotextcardtext}`}>
                    Register and start your business account.
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className={styles.buttoncard}>
                    {(cookies.get("id") || "") == "" && (
                      <button
                        onClick={() => window.location.href = "/signin"}
                        type="button"
                        className={`btn btn-primary ${styles.buttoncolor}`}
                      >
                        Create Account
                      </button>
                    )}
                    {(cookies.get("id") || "") !== "" && (
                      <button
                        type="button"
                        className={`btn btn-primary ${styles.buttoncolor}`}
                        onClick={activateBusiness}
                      >
                        Activate Business Account
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className={styles.businesscardtitle}>
                    Why Business Account ?
                  </div>
                  <div className={styles.businesscardsubtitle}>
                    Simple and diret way to connect your business with your customer.
                  </div>
                  <div className={styles.businesscardtext}>
                    Business listing is an option that helps every user of Reserve
                    Hubs to upload their business on our online platform, and connect
                    with high numbers of customers easily.
                  </div>
                </div>
                <div className="col-md-2 col-sm-2"></div>
                <div className={`col-md-4 col-sm-4 ${styles.teachercard}`}>
                  <img
                    className={`card-img-top ${styles.teachercardimg}`}
                    src={Teacher.src}
                    alt="Card image cap"
                  />
                </div>
              </div>

              <div className={styles.busiinescardheading}>
                Start your Business Account in Simple steps
              </div>

              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className={styles.businesscards}>
                    <div className={styles.businesscardwrapper}>
                      <div className={styles.businesscardindex}>1</div>
                      <span className={styles.businesscardcaption}>
                        Create Business Account
                      </span>
                    </div>
                    <div>
                      <img
                        className={`card-img-top ${styles.businesscardsimg}`}
                        src={CreateBusiness.src}
                        alt="Card image cap"
                      />
                    </div>
                    <div className={styles.businesscardcontent}>
                      Generate your account. Add your detail, name Phone number to get
                      started.
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className={styles.businesscards}>
                    <div className={styles.businesscardwrapper}>
                      <div className={styles.businesscardindex}>2</div>
                      <span className={styles.businesscardcaption}>
                        Manage Business
                      </span>
                    </div>
                    <div>
                      <img
                        className={`card-img-top ${styles.businesscardsimg}`}
                        src={ManageBusiness.src}
                        alt="Card image cap"
                      />
                    </div>
                    <div className={styles.businesscardcontent}>
                      Add your business, complete business listing and keep your
                      business updated
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className={styles.businesscards}>
                    <div className={styles.businesscardwrapper}>
                      <div className={styles.businesscardindex}>3</div>
                      <span className={styles.businesscardcaption}>
                        Grow your Business
                      </span>
                    </div>
                    <div>
                      <img
                        className={`card-img-top ${styles.businesscardsimg}`}
                        src={GrowBusiness.src}
                        alt="Card image cap"
                      />
                    </div>
                    <div className={styles.businesscardcontent}>
                      Grow your business with us.
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.busiinescardheading}>
                Advantages of Business Account
              </div>

              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className={styles.businesscards}>
                    <div>
                      <img
                        className={`card-img-top ${styles.businesscardsaccountsimg}`}
                        src={TechnicalSupport.src}
                        alt="Card image cap"
                      />
                    </div>
                    <div className={styles.businesscardcontent}>
                      24*7 technical Support for your business.
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className={styles.businesscards}>
                    <div>
                      <img
                        className={`card-img-top ${styles.businesscardsaccountsimg}`}
                        src={BusinessGrowth.src}
                        alt="Card image cap"
                      />
                    </div>
                    <div className={styles.businesscardcontent}>
                      Growth of your business.
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className={styles.businesscards}>
                    <div>
                      <img
                        className={`card-img-top ${styles.businesscardsaccountsimg}`}
                        src={CustomerConnect.src}
                        alt="Card image cap"
                      />
                    </div>
                    <div className={styles.businesscardcontent}>
                      Connect with your customers directly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <Signin show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default BusinessActivate;
