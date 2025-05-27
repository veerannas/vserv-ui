import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CreateCustomer from "../createcustomer/createcustomer";
import CreateVendor from "../createvendor/createvendor";
import Signinrhubs from "../signinrhubs/signinrhubs";
import styles from "./signin.module.css";

const Signin = (props: any) => {
  const [showSigninrhubs, setShowSigninrhubs] = React.useState(true);
  const [customerPanel, setCustomerPanel] = React.useState(false);
  const [vendorPanel, setVendorPanel] = React.useState(false);
  const onClickSignUpVendor = () => {
    setShowSigninrhubs(false);
    setVendorPanel(true);
    setCustomerPanel(false);
  };
  const onClickSignUpCustomer = () => {
    setShowSigninrhubs(false);
    setCustomerPanel(true);
    setVendorPanel(false);
  };
  const onClickSignIn = () => {
    setCustomerPanel(false);
    setVendorPanel(false);
    setShowSigninrhubs(true);
  };
  return (
    <Modal size="lg" {...props} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      <Modal.Body className="show-grid">
        <div className="container">
          <div className={`row `}>
            {showSigninrhubs ? <Signinrhubs /> : null}
            <div className={`col-sm-5 ${styles.rightpanel}`}>
              {showSigninrhubs ? (
                <div>
                  <strong>
                    <Modal.Header
                      closeButton
                      style={{
                        padding: "0px",
                        borderBottom: "1px solid #01345B",
                        color: "white",
                      }}
                    ></Modal.Header>
                  </strong>
                </div>
              ) : null}
              <div className={`${styles.verticalalign}`}>
                {showSigninrhubs ? (
                  <div>
                    <p className={`${styles.maincontent}`}>
                      <b>Hello, Friend !</b>
                    </p>
                    <p>
                      Enter your personal details and start<br></br> your
                      journey with us
                    </p>
                    <br></br>
                    <div className={`${styles.dropdown}`}>
                      <button className={`${styles.dropdownbutton}`} onClick={onClickSignUpCustomer}>
                        SIGN UP
                      </button>
                      {/* <div className={`${styles.dropdowncontent}`}>
                        <a href="#" onClick={onClickSignUpCustomer}>
                          Customer
                        </a>
                        <a href="#" onClick={onClickSignUpVendor}>
                          Vendor
                        </a>
                      </div> */}
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.verticalalign}`}>
                    <p className={`${styles.maincontent}`}>
                      <b>Welcome Back!</b>
                    </p>
                    <p>
                      To keep connected with us please login<br></br> to your
                      personal info
                    </p>
                    <br></br>
                    <p>
                      <button
                        className={`btn btn-outline-light ${styles.signupbut}`}
                        type="button"
                        onClick={onClickSignIn}
                      >
                        SIGN IN
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
            {customerPanel ? <CreateCustomer data={props} /> : null}
            {vendorPanel ? <CreateVendor data={props}/> : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Signin;
