import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import { MDBIcon } from 'mdb-react-ui-kit';
import moment from "moment";
import React, { useRef, useState } from "react";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import styles from "./createvendor.module.css";
import {vendorSignUp} from "../services/api/business-api";
import { getUserData } from "../services/api/user-api";

const CreateVendor = (props: any) => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [cookies, setCookie] = useCookies(["user", "id", "name", "lastName"]);

  const handleSubmit = (data: any, actions: any) => {
    let vendorData = {
      user: {
        name: { firstName: data.firstName, lastName: data.lastName },
        email: data.email,
        mobileNumber: { number: data.mobile },
        birthday: data.date,
        profile: { designation: data.designation },
      },
      password: { currentPasswordHash: data.password },
      vendorInfo: {
        name: { firstName: data.firstName, lastName: data.lastName },
        email: data.email,
        telephone: { number: data.mobile },
        birthday: data.date,
        vendorGovtId: data.vendorGovtId,
        address: { addressLineOne: data.address, country: data.country },
      },
    };

    vendorSignUp(vendorData)
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
  };

  const fetchUserData = (response: any) => {
    getUserData(response)
      .then((data) => data.json())
      .then((data) => {
        //set data into cookies for golbal instance
        setCookie("name", data.name.firstName, { path: "/" });
        window.location.reload();
      });
  };

  // const handleChangeDate = (date: any) => {
  //   setStartDate(date);
  // };
  const [dispalyCreateAccount, setDispalyCreateAccount] = useState(true);
  const nextPage = () => {
    setDispalyCreateAccount(false);
  };
  const backPage = () => {
    setDispalyCreateAccount(true);
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
      .oneOf([yup.ref("password"), null], "Passwords must match."),
    mobile: yup
      .string()
      .required("Mobile is required.")
      .matches(phoneRegExp, "Phone number is not valid.")
      .min(12, "to short")
      .max(12, "to long"),
    designation: yup.string().required("Select Designation."),
    vendorGovtId: yup.string().required("Vendor Govt. Id is required."),
    country: yup.string().required("Select Country."),
    address: yup.string().required("Address is required."),
  });

  return (
    <div className={`col-sm-7 ${styles.rightpanel} `}>
      <div>
        <strong>
          <Modal.Header
            closeButton
            style={{
              padding: "0px",
              borderBottom: "1px solid #fff",
              color: "white",
            }}
          ></Modal.Header>
        </strong>
        <Modal.Title id="contained-modal-title-vcenter">
          {dispalyCreateAccount ? (
            <>Create Account For ReserveHubs</>
          ) : (
            <>Business Details</>
          )}
        </Modal.Title>
      </div>
      <br></br>
      <div className="container-fluid">
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile: "",
            designation: "",
            vendorGovtId: "",
            country: "",
            phone: "",
            address: "",
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
              <div
                style={
                  dispalyCreateAccount
                    ? { display: "inline" }
                    : { display: "none" }
                }
              >
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationFormik101">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="user-alt" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        aria-describedby="inputGroupText"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik102">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="user-alt" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        aria-describedby="inputGroupText"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik103">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="envelope" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-describedby="inputGroupText"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik104">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="unlock" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-describedby="inputGroupText"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik105">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="unlock" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        aria-describedby="inputGroupText"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik106">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="mobile" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Mobile"
                        aria-describedby="inputGroupText"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        isInvalid={!!errors.mobile}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik107">
                    <InputGroup>
                      <InputGroup.Text>
                        <InputGroup.Text id="inputGroupText">
                          <MDBIcon icon="calendar-alt" />
                        </InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        placeholder="D.O.B"
                        aria-describedby="inputGroupText"
                        name="birthday"
                      // onChange={handleChangeDate}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
              </div>
              {dispalyCreateAccount ? (
                <div style={{ display: "inline" }}>
                  <button
                    type="submit"
                    className={`btn ${styles.signupbutton}`}
                    onClick={nextPage}
                  >
                    <b>NEXT</b>
                  </button>
                </div>
              ) : (
                <div style={{ display: "inline" }}>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <MDBIcon icon="user-check" />
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          as="select"
                          placeholder="Vendor Designation"
                          aria-describedby="inputGroupText"
                          name="designation"
                          value={values.designation}
                          onChange={handleChange}
                          isInvalid={!!errors.designation}
                        >
                          <option value="">Vendor Designation</option>
                          <option value="Manager">Manager</option>
                          <option value="Owner">Owner</option>
                          <option value="Staff">Staff</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.designation}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <MDBIcon icon="envelope" />
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Tax Id"
                          aria-describedby="inputGroupText"
                          name="vendorGovtId"
                          value={values.vendorGovtId}
                          onChange={handleChange}
                          isInvalid={!!errors.vendorGovtId}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.vendorGovtId}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <MDBIcon fab icon="font-awesome-flag" />
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          as="select"
                          placeholder="Vendor Designation"
                          aria-describedby="inputGroupText"
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          isInvalid={!!errors.country}
                        >
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="Germany">Germany</option>
                          <option value="India">India</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.country}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <MDBIcon icon="phone-square-alt" />
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Phone"
                          aria-describedby="inputGroupText"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <MDBIcon icon="map-marker" />
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Address"
                          aria-describedby="inputGroupText"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.address}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  <button
                    type="submit"
                    className={`btn ${styles.signupbutton}`}
                  >
                    <b>Sign Up</b>
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: "#006992" }}
                    className={`btn btn-outline-light ${styles.signupbutton}`}
                    onClick={backPage}
                  >
                    <b>BACK</b>
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
        {isError ? <span style={{ color: "red" }}>Error: {error}</span> : ""}
      </div>
    </div>
  );
};
export default CreateVendor;
