import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as yup from "yup";
import MessageBox from "../../components/messagebox/messagebox";
import styles from "./createcustomer.module.css";
import { getUserData, userSignUp } from "../services/api/user-api";
import moment from "moment";

const CreateCustomer = (props: any) => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [cookies, setCookie] = useCookies(["user", "id", "name", "lastName"]);
  const [value, setValue] = useState("");
  const [eye, setEye] = useState(false);
  const [secondeye, setSecondEye] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    if (eye == false) {
      setEye(true);
    } else {
      setEye(false);
    }
  };

  const confirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmpasswordShown ? false : true);
    if (secondeye == false) {
      setSecondEye(true);
    } else {
      setSecondEye(false);
    }
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

  const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const password = useRef({});
  const schema = yup.object({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),
    email: yup.string().email("Invalid email").required("Email is required."),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    mobile: yup
      .string()
      .required("Mobile is required."),
    //   .matches(phoneRegExp, "Phone number is not valid")
    //   .min(12, "to short")
    //   .max(12, "to long"),
  });

  const onFocus = (e: any) => {
    e.currentTarget.type = "date";
  }

  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      birthday: "",
    },
    //it is used for validation
    validationSchema: schema,
    //form submit call
    onSubmit: (values, actions) => {

      let userData = {
        user: {
          name: { firstName: values.firstName, lastName: values.lastName },
          email: values.email,
          mobileNumber: { countryCode: countryCode, number: value.slice(countryCode.length) },
          birthday: values.birthday,
          address: {
            addressLineOne: "",
            postalCode: "",
            city: "",
            state: "",
            country: "",
          },
          profile: { about: "" },
        },
        password: { currentPasswordHash: values.password },
      };

      userSignUp(userData)
        .then((response) => response.text())
        .then((response) => {
          if (
            typeof response == "undefined" ||
            response == null ||
            response == ""
          ) {
            setError("Something wrong! User registration failed.");
            setIsError(true);
          } else {
            //After Success fetch api to get user data
            fetchUserData(response);
            actions.resetForm();
            setIsError(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (

    <div className={`col-md-12 col-sm-12 col-xs-12 ${styles.formcard}`}>
      {/* <StyledPhoneInput>
          <label
            style={{
              fontWeight: "bold",
              paddingRight: "5px",
              marginBottom: "",
            }}
            htmlFor=""
          > */}

      {/* </label>
        </StyledPhoneInput> */}

      <Form noValidate onSubmit={formik.handleSubmit} method="post">
        {/* <Row>
                <Form.Group as={Col} md="12" sm="12" xs="12" className={`${styles.signincolor}`}>
                <Form.Label >
                Sign Up
              </Form.Label>    
                </Form.Group>
              </Row> */}
        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik101">
            {/* <Form.Label className={`${styles.labelcolor}`}>
                      First Name <span className={styles.starcolor}>*</span>
                    </Form.Label> */}
            <Form.Control
              className={`form-control-border ${styles.formcontrolinput}`}
              type="text"
              placeholder="First Name"
              aria-describedby="inputGroupPrepend"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.firstName}
            />
            <Form.Control.Feedback type="invalid" >
              <span className={styles.errorcolor}>{formik.errors.firstName}</span>
            </Form.Control.Feedback>

          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik102">

            {/* <Form.Label className={`${styles.labelcolor}`}>
                      Last Name <span className={styles.starcolor}>*</span>
                    </Form.Label> */}
            <Form.Control
              className={`form-control-border ${styles.formcontrolinput}`}
              type="text"
              placeholder="Last Name"
              aria-describedby="inputGroupPrepend"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.lastName}
            />
            <Form.Control.Feedback type="invalid" >
              <span className={styles.errorcolor}>{formik.errors.lastName}</span>
            </Form.Control.Feedback>

          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik103">

            {/* <Form.Label className={`${styles.labelcolor}`}>
                      Email <span className={styles.starcolor}>*</span>
                    </Form.Label> */}
            <Form.Control
              className={`form-control-border ${styles.formcontrolinput}`}
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid" >
              <span className={styles.errorcolor}>{formik.errors.email}</span>
            </Form.Control.Feedback>

          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik104">

            {/* <Form.Label className={`${styles.labelcolor}`}>
                      Password <span className={styles.starcolor}>*</span>
                    </Form.Label> */}
            <Form.Control
              className={`form-control-border ${styles.formcontrolinput}`}
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password}
            />
            {!eye && (<i className={`fas fa-eye-slash ${styles.eye}`}
              onClick={togglePasswordVisiblity}></i>)}
            {eye && (
              <i className={`fas fa-eye ${styles.eye}`} onClick={togglePasswordVisiblity}></i>
            )}
            <Form.Control.Feedback type="invalid" >
              <span className={styles.errorcolor}>{formik.errors.password}</span>
            </Form.Control.Feedback>

          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik105">

            {/* <Form.Label className={`${styles.labelcolor}`}>
                      Confirm Password 
                    </Form.Label> */}
            <Form.Control
              className={`form-control-border ${styles.formcontrolinput}`}
              type={confirmpasswordShown ? "text" : "password"}
              placeholder="Confirm Password"
              aria-describedby="inputGroupPrepend"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.confirmPassword}
            />
            {!secondeye && (<i className={`fas fa-eye-slash ${styles.eye}`}
              onClick={confirmPasswordVisiblity}></i>)}
            {secondeye && (
              <i className={`fas fa-eye ${styles.eye}`} onClick={confirmPasswordVisiblity}></i>
            )}

            <Form.Control.Feedback type="invalid" >
              <span className={styles.errorcolor}>{formik.errors.confirmPassword}</span>
            </Form.Control.Feedback>

          </Form.Group>
        </Row>

        <Row>
          {/* <Form.Label className={`${styles.labelcolor}`}>
                      &nbsp;Phone Number 
                </Form.Label> */}
        </Row>

        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik106">
            <PhoneInput
              country={'us'}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
              placeholder="Enter phone number"
              value={value}
              onChange={(e: any, country: any) => {
                setCountryCode(country.dialCode); setValue(e), formik.setFieldValue("mobile", value.slice(countryCode.length));
              }}
            />
            <div className="formik-error">
              {formik.errors.mobile}
            </div>

            {/* <PhoneInput
                  placeholder="Enter phone number"
                  international
                  countryCallingCodeEditable={false}
                  className={`form-control-border ${styles.formcontrolinput}`}
                  defaultCountry="RU"
                  value={value}
                  onChange={setValue}
                  error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'} /> */}
            {/* <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="US"
                  value={value}
                  onChange={setValue}
                  error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'} /> */}
          </Form.Group>
          {/* <Form.Group as={Col} md="12" controlId="validationFormik106">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        <MDBIcon icon="mobile" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control
                      type="text"
                      placeholder="Mobile"
                      aria-describedby="inputGroupPrepend"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      isInvalid={!!errors.mobile}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.mobile}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group> */}
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="validationFormik107">

            {/* <Form.Label className={`${styles.labelcolor}`}>
                      Date of Birth 
                    </Form.Label> */}
            <Form.Control
              className={`form-control-border ${styles.formcontrolinput}`}
              type="text"
              placeholder="Date Of Birth "
              onFocus={onFocus}
              aria-describedby="inputGroupPrepend"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              max={moment().format("YYYY-MM-DD")}
            />

          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" sm="12" xs="12" className={`btn ${styles.signupbutton}`}>
            <button type="submit" className={` ${styles.btncolor}`}>
              Sign Up
            </button>
          </Form.Group>
        </Row>
      </Form>
       <br/>
      {isMessage ? <MessageBox variant={variant} message={message} /> : ""}
    </div>

  );
};
export default CreateCustomer;
