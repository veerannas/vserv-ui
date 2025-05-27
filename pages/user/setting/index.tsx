import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import LoginSecurity from "../../../assets/images/LoginSecurity.svg";
import BreadCrum from "../../../components/breadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import MessageBox from "../../../components/messagebox/messagebox";
import * as userApi from "../../../components/services/api/user-api";
import styles from "./index.module.css";
import PhoneInput from 'react-phone-input-2';
import Link from 'next/link'

const UserLoginSecurity = () => {
  const cookies = new Cookies();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isEditpassword, setIsEditPassWord] = useState(false);
  const [isEditMobileNumber, setIsEditMobileNumber] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [eye, setEye] = useState(false);
  const [secondeye, setSecondEye] = useState(false);
  const [thirdeye, setThirdEye] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [newpasswordShown, setNewPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);

    if (eye == false) {
      setEye(true);
    } else {
      setEye(false);
    }

  };
  const newPasswordVisiblity = () => {
    setNewPasswordShown(newpasswordShown ? false : true);

    if (secondeye == false) {
      setSecondEye(true);
    } else {
      setSecondEye(false);
    }
  };
  const confirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmpasswordShown ? false : true);

    if (thirdeye == false) {
      setThirdEye(true);
    } else {
      setThirdEye(false);
    }
  };

  //initialize variable
  const [userData, setUserData] = useState({
    userId: cookies.get("id"),
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    mobileNumber: { number: "", countryCode: "" },
    email: ""
  });
  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      // window.location.href = "/" 
    }
    else {
      fetchUserData(cookies.get("id"));
    };

  }, []);

  const fetchUserData = (id: any) => {
    userApi
      .getUserData(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        // set success data in formik usedata variable
        formik.values.userData = data;
        setUserData({ ...data });
        setMobileNumber(data.mobileNumber.number);
        setCountryCode(data.mobileNumber.countryCode);

      });
  };

  // const changeMobile = changeMobileForm(
  //   userData,
  //   setIsEditMobileNumber,
  //   cookies.get("id"),
  //   mobileNumber,
  //   countryCode
  // );

  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: { userData },
    //it is used for validation
    validationSchema: yup.object({
      userData: yup.object().shape({
        oldPassword: yup.string().required("Passwords is required"),
        newPassword: yup
          .string()
          .required("New passwords is required")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        confirmNewPassword: yup
          .string()
          .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
      }),
    }),
    //form submit call
    onSubmit: (values) => {
      let userPassword = {
        userId: cookies.get("id"),
        oldPassword: values.userData.oldPassword,
        newPassword: values.userData.newPassword,
        confirmNewPassword: values.userData.confirmNewPassword,
      };

      userApi
        .changeUserPassword(userPassword)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          if (response == "Current password is incorrect") {
            setVariant("danger");
            setMessage("Current password is incorrect.");
          } else if (response == "Please add new password") {
            setVariant("danger");
            setMessage("Please add new passwords.");
          } else {
            setIsEditPassWord(false);
            setVariant("success");
            setMessage("Password updated successfully.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const changePassword = () => {
    if (isEditpassword == true) {
      setIsEditPassWord(false);
    } else {
      setIsEditPassWord(true);
    }
  };

  const changeMobileNumber = () => {
    if (isEditMobileNumber == true) {
      setIsEditMobileNumber(false);
    } else {
      setIsEditMobileNumber(true);
    }
  };

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
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-key"></i> Setting
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  {/* BreadCrum */}
                  <BreadCrum />
                  {/* End BreadCrum */}
                </div>
              </div>
              <br />
              <div></div>
              <div className="row">
                {/* Left Panel */}
                <div className="col-md-8">
                  {isMessage ? (
                    <MessageBox variant={variant} message={message} />
                  ) : (
                    ""
                  )}
                  <Row>
                    <Col>
                      <div className={`${styles.labelcolor} ${styles.labledisplay}`}>
                        Email
                      </div>
                      <div className="form-control form-control-border">
                        {userData.email}
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                  <br></br>
                  {!isEditpassword && (
                    <Row>
                      <Col>
                        <div
                          className={`${styles.labelcolor} ${styles.labledisplay}`}
                        >
                          Password
                        </div>
                        <div className="form-control form-control-border">
                          ********
                        </div>
                      </Col>
                      <Col>
                        <div
                          className={`${styles.labelcolor} ${styles.labledisplay}`}
                        ></div>
                        <div className={styles.linkcolor}>
                          <Link href=""><span onClick={changePassword}>change password</span></Link>
                        </div>
                      </Col>
                    </Row>
                  )}
                  {isEditpassword && (
                    <Form noValidate onSubmit={formik.handleSubmit}>
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormik1"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Change password
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type={passwordShown ? "text" : "password"}
                            placeholder="Current password"
                            aria-describedby="inputGroupPrepend"
                            name="userData.oldPassword"
                            value={formik.values.userData.oldPassword}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.oldPassword}
                          />
                          {!eye && (<i className={`fas fa-eye-slash ${styles.eye}`}
                            onClick={togglePasswordVisiblity}></i>)}
                          {eye && (
                            <i className={`fas fa-eye ${styles.eye}`} onClick={togglePasswordVisiblity}></i>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.oldPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6"></Form.Group>
                      </Row>
                      <br />
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormik2"
                        >
                          <Form.Control
                            className={`form-control-border`}
                            type={newpasswordShown ? "text" : "password"}
                            placeholder="New password"
                            aria-describedby="inputGroupPrepend"
                            name="userData.newPassword"
                            value={formik.values.userData.newPassword}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.newPassword}
                          />
                          {!secondeye && (<i className={`fas fa-eye-slash ${styles.eye}`}
                            onClick={newPasswordVisiblity}></i>)}
                          {secondeye && (
                            <i className={`fas fa-eye ${styles.eye}`} onClick={newPasswordVisiblity}></i>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.newPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6"></Form.Group>
                      </Row>
                      <br />
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormik3"
                        >
                          <Form.Control
                            className={`form-control-border`}
                            type={confirmpasswordShown ? "text" : "password"}
                            placeholder="Confirm password"
                            aria-describedby="inputGroupPrepend"
                            name="userData.confirmNewPassword"
                            value={formik.values.userData.confirmNewPassword}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.confirmNewPassword}
                          />
                          {!thirdeye && (<i className={`fas fa-eye-slash ${styles.eye}`}
                            onClick={confirmPasswordVisiblity}></i>)}
                          {thirdeye && (
                            <i className={`fas fa-eye ${styles.eye}`} onClick={confirmPasswordVisiblity}></i>
                          )}
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.confirmNewPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6"></Form.Group>
                      </Row>
                      <br />
                      <Form.Group
                        as={Col}
                        md="6"
                        className={`${styles.formcontrolbuttonright}`}
                      >
                        <Button
                          variant="primary"
                          type="submit"
                          className={`${styles.formcontrolsave}`}
                        >
                          Save
                        </Button>
                        &nbsp;
                        <Button
                          variant="primary"
                          type="reset"
                          className={`${styles.formcontrolcancel}`}
                          onClick={changePassword}
                        >
                          Cancel
                        </Button>
                      </Form.Group>
                    </Form>
                  )}
                  <br></br>
                  {!isEditMobileNumber && (
                    <Row>
                      <Col>
                        <div
                          className={`${styles.labelcolor} ${styles.labledisplay}`}
                        >
                          Mobile number
                        </div>
                        <div className="form-control form-control-border">
                          ({userData.mobileNumber.countryCode}) {userData.mobileNumber.number}
                        </div>
                      </Col>
                      <Col>
                        <div
                          className={`${styles.labelcolor} ${styles.labledisplay}`}
                        ></div>
                        <div className={styles.linkcolor}>
                          <Link href="" ><span onClick={changeMobileNumber}>change mobile number</span></Link>
                        </div>
                      </Col>
                    </Row>
                  )}
                  {isEditMobileNumber && (
                    <div>
                      {/* {changeMobile} */}
                      <ChangeMobileForm
                        userId={cookies.get("id")}
                        mobileNumber={mobileNumber}
                        countryCode={countryCode}
                        setIsEditMobileNumber={setIsEditMobileNumber}
                      />
                    </div>
                  )}
                </div>

                {/* End Left Panel */}
                {/* Right Panel */}
                <div className="col-md-1"></div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className={`${styles.cardimgcenter}`}>
                        <img
                          className={`card-img-top ${styles.cardimg}`}
                          src={LoginSecurity.src}
                          alt="Card image cap"
                        />
                      </div>
                      <hr></hr>
                      <h5 className="card-title">Your security is our priority.</h5>
                      <p className="card-text">
                        While you are setting your password you must be more confident
                        about your password strength.
                      </p>
                      <p className="card-text">
                        Make password strong with alphanumeric key some characters,
                        numbers, and some special letters.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Left Panel */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default UserLoginSecurity;

const ChangeMobileForm = (props: any) => {
  const [value, setValue] = useState(props.countryCode + props.mobileNumber);
  const [countryCode, setCountryCode] = useState(props.countryCode);

  const changeMobileNumber = () => {
    props.setIsEditMobileNumber(false);
  };


  const formik = useFormik({
    //put fetch data in initialvalue variable

    initialValues: {
      id: props.userId,
      mobileNumber: {
        number: props.mobileNumber,
        countryCode: props.countryCode,
      },
    },
    //it is used for validation
    validationSchema: yup.object({
      mobileNumber: yup.object().shape({
        // number: yup.string().required("Mobile Number is required"),
      }),
    }),
    //form submit call
    onSubmit: (values) => {
      let data = {
        id: props.userId,
        mobileNumber: {
          number: value,
          countryCode: countryCode,
        },
      }
      // post call to update user data
      userApi
        .updateUserData(data)
        .then((response) => response.text())
        .then((response) => {
          // setIsMessage(true);
          if (
            typeof response == "undefined" ||
            response == null ||
            response == ""
          ) {
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Form.Label className={`${styles.labelcolor}`}>
          Mobile number
        </Form.Label>
      </Row>
      <Row>
        <Form.Text>
          Your current mobile number is {props.mobileNumber}
          {/* , enter new mobile */}
          {/* number to get OTP. */}
        </Form.Text>
      </Row>
      <br></br>
      <Row>
        {/* <Form.Group as={Col} md="2" controlId="validationFormik4">
          <Form.Control
            className={`form-control-border`}
            as="select"
            placeholder="CountryCode"
            aria-describedby="inputGroupPrepend"
            name="mobileNumber.countryCode"
            value={formik.values.mobileNumber.countryCode}
            onChange={formik.handleChange}
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </Form.Control>
        </Form.Group> */}
        {/* <Form.Group as={Col} md="4" controlId="validationFormik5">
          <Form.Control
            className={`form-control-border`}
            type="text"
            placeholder="New Mobile number"
            aria-describedby="inputGroupPrepend"
            name="mobileNumber.number"
            value={formik.values.mobileNumber.number}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.mobileNumber?.number}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.mobileNumber?.number}
          </Form.Control.Feedback>
        </Form.Group> */}
        <Form.Group as={Col} md="6">
          <PhoneInput
            country={'us'}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
            placeholder="Enter phone number"
            value={value}
            onChange={(e: any, country: any) => { setCountryCode(country.dialCode); setValue(e) }}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
        </Form.Group>
      </Row>
      <br/>
      <Form.Group
        as={Col}
        md="6"
        className={`${styles.formcontrolbuttonright}`}
      >
        <Button
          variant="primary"
          type="submit"
          className={`${styles.formcontrolsave}`}
        >
          Save
        </Button>
        &nbsp;
        <Button
          variant="primary"
          type="reset"
          className={`${styles.formcontrolcancel}`}
          onClick={changeMobileNumber}
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};
