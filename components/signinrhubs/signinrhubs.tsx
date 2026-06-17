import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import styles from "./signinrhubs.module.css";
import MessageBox from "../../components/messagebox/messagebox";
import { getUserData, userSignIn } from "../services/api/user-api";

const SigninRhubs = () => {
  const [cookies, setCookie] = useCookies(["user", "id", "name", "lastName"]);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  // const [eye, setEye] = useState(false);

  // const handleEye = () => {

  //   if(eye == false){
  //     setEye(true);
  //   }else{
  //     setEye(false);
  //   }
  // }
  const [eye, setEye] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);

    if (eye == false) {
      setEye(true);
    } else {
      setEye(false);
    }
  };


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



  const handleSubmit = (data: any, actions: any) => {
    let signInData = {
      email: data.email,
      password: data.password,
    };
    //api for checking user and password
    userSignIn(signInData)
      .then((response) => response.text())
      .then((response) => {
        setIsMessage(true);
        if (
          typeof response == "undefined" ||
          response == null ||
          response == ""
        ) {
          setMessage("Something wrong! Invalid password!.");
          setVariant("danger");
        } else {
          //After Success fetch api to get user data
          fetchUserData(response);
          actions.resetForm();
          setVariant("success");
          setMessage("Thanks! Sign In successfully.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserData = (response: any) => {
    getUserData(response)
      .then((data) => data.json())
      .then((data) => {
        //set data into cookies for golbal instance
        setCookie("id", data.id, { path: "/" });
        setCookie("name", data.name.firstName, { path: "/" });
        setCookie("lastName", data.name.lastName, { path: "/" });
        setCookie("user", data, { path: "/" });
        window.location.href = "/";
      });
  };

  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required."),
    password: yup.string().required("No password provided."),
  });

  return (


    <div className={`col-md-12 col-sm-12 col-xs-12 ${styles.formcard}`}>
      {isMessage ? <MessageBox variant={variant} message={message} /> : ""}

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {/* <Row>
                <Form.Group as={Col} md="12" sm="12" xs="12" className={`${styles.signincolor}`}> 
                <Form.Label >
                    Login
              </Form.Label>    
                </Form.Group>
              </Row> */}

            <Row>
              <Form.Group as={Col} md="12" sm="12" xs="12" controlId="validationFormik103">

                {/* <Form.Label className={`${styles.labelcolor}`}>
                      Email
                    </Form.Label> */}
                <Form.Control
                  className={`form-control-border ${styles.formcontrolinput}`}
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  <span className={styles.errorcolor}>{errors.email}</span>
                </Form.Control.Feedback>

              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="12" sm="12" xs="12" controlId="validationFormik104">

                {/* <Form.Label className={`${styles.labelcolor}`}>
                      Password
                    </Form.Label> */}
                <Form.Control
                  className={`form-control-border ${styles.formcontrolinput}`}
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}

                />

                {!eye && (<i className={`fas fa-eye-slash ${styles.eye}`}
                  onClick={togglePasswordVisiblity}></i>)}
                {eye && (
                  <i className={`fas fa-eye ${styles.eye}`} onClick={togglePasswordVisiblity}></i>
                )}
                <Form.Control.Feedback type="invalid" >
                  <span className={styles.errorcolor}>{errors.password}</span>
                </Form.Control.Feedback>

              </Form.Group>
            </Row>
            <br/>
            <Row>
              
              <Form.Group as={Col} md="12" sm="12" xs="12" className={`btn ${styles.signinbutton}`} controlId="validationFormik104">
                <button type="submit" className={` ${styles.btncolor}`} >
                  Sign In
                </button>
              </Form.Group>
            </Row>
            {/* <Row>
                <Form.Group as={Col} md="6" controlId="validationFormik104">
                  <a href="">
                    <u className={`${styles.formrowpassword}`}>
                      Forgot your password?
                    </u>
                  </a>
                </Form.Group>
              </Row> */}
            {/* <Row>
                <Form.Group as={Col} md="12" controlId="validationFormik104">
                  <a href="">
                    <u className={`${styles.formrowpassword}`} onClick={onClickSignUpCustomer}>
                      Sign Up
                    </u>
                  </a>
                </Form.Group>
              </Row> */}
          </Form>
        )}
      </Formik>
    </div>

  );
};
export default SigninRhubs;
