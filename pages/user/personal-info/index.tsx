import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import PersonalInfoImg from "../../../assets/images/Personal_Info.svg";
import BreadCrum from "../../../components/breadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import MessageBox from "../../../components/messagebox/messagebox";
import * as userApi from "../../../components/services/api/user-api";
import styles from "./index.module.css";
// import User from "../../model/user";
import { useCookies } from "react-cookie";
import PhoneInput from 'react-phone-input-2';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const UserPersonalInfo = () => {
  const cookies = new Cookies();
  const [cookies1, setCookie] = useCookies(["user", "id", "name", "lastName"]);

  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [country, setCountry] = useState('');
  const selectCountry = (val: any) => {
    setCountry(val);
    setRegion("");
  }
  const [region, setRegion] = useState('');
  const selectRegion = (val: any) => {
    setRegion(val);
  }


  //initialize variable
  const [userData, setUserData] = useState({
    id: cookies.get("id"),
    name: { firstName: "", lastName: "" },
    birthday: "",
    gender: "",
    mobileNumber: { countryCode: "", number: "" },
    email: "",
    address: {
      addressLineOne: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    } else {
      //api for fetch user data
      fetchUserData(cookies.get("id"));
      setCountry("United States");
    }
  }, [cookies.get("id")]);

  const fetchUserData = (id: any) => {
    userApi
      .getUserData(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        setCookie("id", data.id, { path: "/" });
        setCookie("name", data.name.firstName, { path: "/" });
        setCookie("lastName", data.name.lastName, { path: "/" });
        setCookie("user", data, { path: "/" });
        // set success data in formik usedata variable
        formik.values.userData = data;
        setValue(data.mobileNumber.countryCode + data.mobileNumber.number);
        setCountryCode(data.mobileNumber.countryCode);
        setUserData({ ...data });
        if ((data.address.state || "") !== "") {
          setRegion(data.address.state);
        }
        if ((data.address.country || "") !== "") {
          setCountry(data.address.country);
        }
      });
  };

  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: { userData },
    //it is used for validation
    validationSchema: yup.object({
      userData: yup.object().shape({
        name: yup.object().shape({
          firstName: yup.string().required("First name is required"),
          lastName: yup.string().required("Last name is required"),
        }),
        email: yup
          .string()
          .required("Email is required")
          .email("Invalid Email"),
      }),
    }),
    //form submit call
    onSubmit: (values) => {
      console.log("=============" + value.slice(countryCode.length));
      if (value == "") {
        setIsMessage(true);
        setMessage("Phone number is required.");
        setVariant("danger");
      }
      else {
        setIsMessage(false);
        let user = {
          id: cookies.get("id"),
          name: {
            firstName: values.userData.name.firstName,
            lastName: values.userData.name.lastName,
          },
          birthday: values.userData.birthday,
          gender: values.userData.gender,
          mobileNumber: {
            countryCode: countryCode,
            number: value.slice(countryCode.length),
          },
          email: values.userData.email,
          address: {
            addressLineOne: values.userData.address.addressLineOne,
            city: values.userData.address.city,
            state: region,
            postalCode: values.userData.address.postalCode,
            country: country,
          },
        };

        userApi
          .updateUserData(user)
          .then((response) => response.text())
          .then((response) => {
            setIsMessage(true);
            if (
              typeof response == "undefined" ||
              response == null ||
              response == ""
            ) {
              setMessage("Something went wrong!.");
              setVariant("danger");
            } else {
              fetchUserData(cookies.get("id"));
              setVariant("success");
              setMessage("User information updated successfully.");
              setIsFormEdit(false);
              // setCookie("name", data.name.firstName, { path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

  });

  //edit show and hide
  const editHandler = () => {
    if (isFormEdit == false) {
      setIsFormEdit(true);
    } else {
      setIsFormEdit(false);
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
                  <i className="fa fa-user"></i> Personal Info
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

                  {!isFormEdit && (
                    <div className="wrapper-display">
                      <div className="row">
                        <Col></Col>
                        <Col>
                          <div
                            onClick={editHandler}
                            className={`${styles.formcontroledit}`}
                          >
                            <span>Edit</span>
                          </div>
                        </Col>
                      </div>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            First Name
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.name.firstName}
                          </div>
                        </Col>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Last name
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.name.lastName}
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Date-of-Birth
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.birthday}
                          </div>
                        </Col>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Gender
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.gender}
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Contact number
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            (+{userData.mobileNumber.countryCode}) {userData.mobileNumber.number}
                          </div>
                        </Col>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            E-mail
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.email}
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Address
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.address.addressLineOne}
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Country
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.address.country}
                          </div>
                        </Col>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            State
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.address.state}
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            City
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.address.city}
                          </div>
                        </Col>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Zip Code
                          </div>
                          <div className={`form-control form-control-border control-height`}>
                            {userData.address.postalCode}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {isFormEdit && (
                    <Form noValidate onSubmit={formik.handleSubmit}>
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            First name
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="First name"
                            aria-describedby="inputGroupPrepend"
                            name="userData.name.firstName"
                            value={formik.values.userData.name.firstName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.name?.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.name?.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Last name
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Last name"
                            aria-describedby="inputGroupPrepend"
                            name="userData.name.lastName"
                            value={formik.values.userData.name.lastName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.name?.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.name?.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <br />
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Date-of-Birth
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="date"
                            placeholder="Date of Birth"
                            aria-describedby="inputGroupPrepend"
                            name="userData.birthday"
                            // value={formik.values.userData.birthday}
                            value={
                              formik.values.userData.birthday == null
                                ? (formik.values.userData.birthday = "")
                                : formik.values.userData.birthday
                            }
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Gender
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            as="select"
                            placeholder="Gender"
                            aria-describedby="inputGroupPrepend"
                            name="userData.gender"
                            value={
                              formik.values.userData.gender == null
                                ? (formik.values.userData.gender = "")
                                : formik.values.userData.gender
                            }
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.gender}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Form.Group>
                      </Row>
                      <br />
                      <Row>
                        {/* <Form.Group
                    as={Col}
                    md="2"
                    controlId="validationFormikUsername"
                  >
                    <Form.Label className={`${styles.labelcolor}`}>
                      &nbsp;
                    </Form.Label>
                    <Form.Control
                      className={`form-control-border`}
                      as="select"
                      placeholder="Gender"
                      aria-describedby="inputGroupPrepend"
                      name="userData.mobileNumber.countryCode"
                      value={
                        formik.values.userData.mobileNumber.countryCode == null
                          ? (formik.values.userData.mobileNumber.countryCode =
                            "+1")
                          : formik.values.userData.mobileNumber.countryCode
                      }
                      onChange={formik.handleChange}
                    >
                      <option value="+1">+1</option>
                      <option value="+91">+91</option>
                    </Form.Control>
                  </Form.Group> */}
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label
                            className={`${styles.labelcolor}`}
                          >
                            Contact number
                          </Form.Label>
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
                          {/* <Form.Control
                      className={`form-control-border`}
                      type="text"
                      placeholder="Mobile No"
                      aria-describedby="inputGroupPrepend"
                      name="userData.mobileNumber.number"
                      value={formik.values.userData.mobileNumber.number}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.userData?.mobileNumber?.number}
                    /> */}
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.mobileNumber?.number}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            E-mail
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="email"
                            placeholder="E-Mail"
                            aria-describedby="inputGroupPrepend"
                            name="userData.email"
                            value={formik.values.userData.email}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.userData?.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.userData?.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <br />
                      <Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Address
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Address"
                            aria-describedby="inputGroupPrepend"
                            name="userData.address.addressLineOne"
                            value={formik.values.userData.address.addressLineOne}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <br />
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label
                            className={`${styles.labelcolor} `}
                          >
                            Country
                          </Form.Label>
                          <CountryDropdown
                            classes={`form-control-border ${styles.formControlPlaceHolder} ${styles.countrycontrol}`}
                            value={country}
                            onChange={(val: any) => selectCountry(val)}
                          />

                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            State
                          </Form.Label>
                          <RegionDropdown
                            classes={`form-control-border ${styles.formControlPlaceHolder} ${styles.statecontrol}`}
                            country={country}
                            value={region}
                            // countryValueType="short"
                            onChange={(val: any) => selectRegion(val)}
                          />

                        </Form.Group>
                      </Row>
                      <br />
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            City
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="City"
                            aria-describedby="inputGroupPrepend"
                            name="userData.address.city"
                            value={formik.values.userData.address.city}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikUsername"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Zip Code
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Zip Code"
                            aria-describedby="inputGroupPrepend"
                            name="userData.address.postalCode"
                            value={formik.values.userData.address.postalCode}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                        {/* <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationFormikUsername"
                    >
                      <Form.Label className={`${styles.labelcolor}`}>
                        Country
                      </Form.Label>
                      <Form.Control
                        className={`form-control-border`}
                        type="text"
                        placeholder="country"
                        aria-describedby="inputGroupPrepend"
                        name="userData.address.country"
                        value={formik.values.userData.address.country}
                        onChange={formik.handleChange}
                      />
                    </Form.Group> */}
                      </Row>
                      <br />
                      <Form.Group className={`${styles.formcontrolbuttonright}`}>
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
                          onClick={editHandler}
                        >
                          Cancel
                        </Button>
                      </Form.Group>
                    </Form>
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
                          src={PersonalInfoImg.src}
                          alt="Card image cap"
                        />
                      </div>
                      <hr></hr>
                      <h5 className="card-title">The details you can edit is..</h5>
                      <p className="card-text">
                        Your contact information and Personal detail, Which identify
                        you. And your contact information helps you to connect with
                        us.
                      </p>
                      <p className="card-text">
                        Your personal detail will not be shared with any one, other
                        than contact and email address.
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
export default UserPersonalInfo;
