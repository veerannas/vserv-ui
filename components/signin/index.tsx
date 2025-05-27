import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Col, Modal, Row ,Button} from "react-bootstrap";
import CreateCustomer from "../../components/createcustomer/createcustomer";
import CreateVendor from "../../components/createvendor/createvendor";
import Footer from "../../components/footer/footer";
import HeaderNavbar from "../../components/header-navbar/header-navbar";
import Signinrhubs from "../../components/signinrhubs/signinrhubs";
import Rhublogo from "./new_Logo.svg";
import styles from "./index.module.css";
import Image from "next/image";

const Signin = (props: any) => {

    const [showSigninrhubs, setShowSigninrhubs] = React.useState(true);
    const [customerPanel, setCustomerPanel] = React.useState(false);
    const [vendorPanel, setVendorPanel] = React.useState(false);
    const [signup, setSignUp] = React.useState(true);
    const [member, setMember] = React.useState(false);

    const onClickSignUpVendor = () => {
      setShowSigninrhubs(false);
      setVendorPanel(true);
      setCustomerPanel(false);
    };
    const onClickSignUpCustomer = () => {
      setShowSigninrhubs(false);
      setCustomerPanel(true);
      setVendorPanel(false);
      setSignUp(false);
      setMember(true);
    };
    const onClickSignIn = () => {
      setCustomerPanel(false);
      setVendorPanel(false);
      setShowSigninrhubs(true);
      setMember(false);
      setSignUp(true);
    };


  return (
    
    <div className="container-fluid">
    <div className={`container col-md-9 col-sm-12 col-xs-12 ${styles.maincard}`}>

    
        
    <Row>
      
      <Col className={styles.leftcol}></Col>

    { signup ?
      <Col md={4} className={styles.signinmain}>
      <div className={`col-md-12 col-sm-12 col-xs-12 ${styles.logocolor}`}>
            <Image src={Rhublogo} alt="rhub logo image"></Image>
        </div>
        <Row>
          
            {signup ? 
              <Col md={12} sm={12} xs={12} className={`${styles.logintextcolor}`}>Login</Col>
              :null}

        </Row>

        <div className={styles.signincol}>

            {showSigninrhubs ? <Signinrhubs /> : null}
            {customerPanel ? <CreateCustomer data={props} /> : null}
            {vendorPanel ? <CreateVendor data={props}/> : null}

        
            {signup ?
                <div className={`col-md-12 col-sm-12 col-xs-12 `}>
                  <Button onClick={() => (window.location.href = "/")}  className={styles.backcolor}>Back</Button>
                    <div className={`${styles.signupcolor}`}>
                      <span>Click here for</span> <a href="#" onClick={onClickSignUpCustomer} ><u>Sign Up</u> </a>
                    </div>
                </div>
              :null}

      </div>
      
        
      </Col>
      :null}


    {member ?
      <Col md={4} className={styles.signupmain}>
      <div className={`col-md-12 col-sm-12 col-xs-12 ${styles.logocolor}`}>
            <Image src={Rhublogo} alt="rhub logo image"></Image>
        </div>
        <Row>

              {member ?
                <Col md={12} sm={12} xs={12} className={`${styles.signuptextcolor}`}>Sign Up</Col>
              :null}

              {/* <Col md={12} sm={12} xs={12} className={`${styles.backcolor}`}>
                <a href="#" onClick={() => (window.location.href = "/")}><u>Back</u></a>
              </Col> */}
        </Row>

        <div className={styles.signupcol}>

            {showSigninrhubs ? <Signinrhubs /> : null}
            {customerPanel ? <CreateCustomer data={props} /> : null}
            {vendorPanel ? <CreateVendor data={props}/> : null}

        

            {member ?
                <div className={`col-md-12 col-sm-12 col-xs-12 `}>
                  <Button onClick={() => (window.location.href = "/")} className={styles.backcolor}>Back</Button>
                    <div className={`${styles.membercolor}`}>
                        <a href="#" onClick={onClickSignIn} > 
                        Already have account? Login </a>
                    </div>
                </div>
              :null}
      </div>
      
        
      </Col>
      :null}

      <Col className={styles.rightcol}></Col>
    </Row>
    
    </div>
    <Footer/>
    </div>

  );
};
export default Signin;


