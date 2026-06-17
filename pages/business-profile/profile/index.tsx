import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";

const Businessprofile = () => {

  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);

  //initialize variable
  const [BusinessData, setBusinessData] = useState({

    Businessname: "",
    Category: "",
    addtags: "",
    about: "",
    Website: "",
    address: {
      addressLineOne: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });


  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: { BusinessData },
    //it is used for validation
    validationSchema: yup.object({
      BusinessData: yup.object().shape({
        name: yup.object().shape({
          BusinessName: yup.string().required("Business name is required"),
        }),
      }),
    }),
    //form submit call
    onSubmit: (values) => {
      //post call to update Business data
      // BusinessApi.updateBusinessData(values.BusinessData)
      //   .then((response) => response.text())
      //   .then((response) => {
      //     setIsMessage(true);
      //     if (
      //       typeof response == "undefined" ||
      //       response == null ||
      //       response == ""
      //     ) {
      //       setMessage("Something went wrong!.");
      //       setVariant("danger");
      //     } else {

      //       setVariant("success");
      //       setMessage("Business information updated successfully.");
      //       setIsFormEdit(false);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

  });


  return (
    <div className={`container-fluid`}>
      <HeaderNavbar />
      <div>
        <div className="container">
          <div className={`${styles.wrimagecard}`}>
            <i className="fa fa-Business"></i> Profile
          </div>
          <br></br>
          <div>
            <h3>Overview</h3>
          </div>
          <br></br>
          <div className="row">
            {/* Left Panel */}
            <div className="col-md-8">
              <div className="wrapper-display">


                <Form noValidate onSubmit={formik.handleSubmit}>
                  <br/><Row>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormikBusinessname"
                    >
                      <Form.Label className={`${styles.labelcolor}`}>
                        Business Name*
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormikBusinessname"
                    >
                      <Form.Control
                        className={`form-control-border`}
                        type="text"
                        placeholder="Name"
                        aria-describedby="inputGroupPrepend"
                        name="BusinessData.Businessname"
                        value={formik.values.BusinessData.Businessname}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <br/><Row>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormikBusinessname"
                    >
                      <Form.Label className={`${styles.labelcolor}`}>
                        Category Type
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormikBusinessname"
                    >
                      <Form.Control
                        className={`form-control-border`}
                        as="select"
                        placeholder="Category Type"
                        aria-describedby="inputGroupPrepend"
                        name="BusinessData.Category"
                        value={formik.values.BusinessData.Category}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.BusinessData?.Category}
                      >
                        <option value="cafe">Cafe</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Restaurent">Restaurant</option>
                      </Form.Control>
                    </Form.Group>
                  </Row>

                  <br/><Row>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormikaddtags"
                    >
                      <Form.Label className={`${styles.labelcolor}`}>
                        Add tags
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormikaddtags"
                    >
                      <Form.Control
                        className={`form-control-border`}
                        type="text"
                        placeholder="tags"
                        aria-describedby="inputGroupPrepend"
                        name="BusinessData.addtags"
                        value={formik.values.BusinessData.addtags}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <br/><Row>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormikAabout"
                    >
                      <Form.Label className={`${styles.labelcolor}`}>
                        About
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormikabout"
                    >
                      <Form.Control
                        className={`form-control-border`}
                        type="text"
                        placeholder="About"
                        aria-describedby="inputGroupPrepend"
                        name="BusinessData.about"
                        value={formik.values.BusinessData.about}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <br></br>
                  <div className="row">
                    <div className="col-md-8">
                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationFormikBusinessname"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Address
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Address"
                            aria-describedby="inputGroupPrepend"
                            name="BusinessData.address.addressLineOne"
                            value={formik.values.BusinessData.address.addressLineOne}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikBusinessname"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            City
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="City"
                            aria-describedby="inputGroupPrepend"
                            name="BusinessData.address.city"
                            value={formik.values.BusinessData.address.city}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikBusinessname"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            State
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="state"
                            aria-describedby="inputGroupPrepend"
                            name="BusinessData.address.state"
                            value={formik.values.BusinessData.address.state}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Row>

                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikBusinessname"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Zip Code
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Zip Code"
                            aria-describedby="inputGroupPrepend"
                            name="BusinessData.address.postalCode"
                            value={formik.values.BusinessData.address.postalCode}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikBusinessname"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Country
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="country"
                            aria-describedby="inputGroupPrepend"
                            name="BusinessData.address.country"
                            value={formik.values.BusinessData.address.country}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Row>
                    </div>


                    <div className="col-md-4">
                      <div><iframe width="150%" height="300" frameBorder="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Malet%20St,%20London%20WC1E%207HU,%20United%20Kingdom+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                      </div>
                    </div>

                    <Form noValidate onSubmit={formik.handleSubmit}>
                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="3"
                          controlId="validationFormikWebsite"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Website
                          </Form.Label>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikWebsite"
                        >
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="www.example.com"
                            aria-describedby="inputGroupPrepend"
                            name="BusinessData.Website"
                            value={formik.values.BusinessData.Website}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Row>
                    </Form>

                  </div>








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
                    >
                      Cancel
                    </Button>
                  </Form.Group>
                </Form>

              </div>
            </div>



            {/* End Left Panel */}
            {/* Right Panel */}
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className={`${styles.cardimgcenter}`}>

                  </div>
                  <hr></hr>
                  <h5 className="card-title">Turning on notification Helps.</h5>
                  <p className="card-text">
                    Allowing notification helps you to get notification about your booking and
                    new updates for you.
                  </p>
                  <p className="card-text">
                    Set appointment time so that you can receive notificationahead of the time of
                    appointment.
                  </p>
                  <p className="card-text">
                    Allowing notification helps you to get notification aboutyour booking and
                    new update for you.
                  </p>
                  <p className="card-text">
                    Set appointmenttime so that you can receive notificationahead of the time of appointment.
                  </p>
                </div>
              </div>
            </div>
            {/* End Left Panel */}
          </div>
        </div>
        <br></br>
        <br></br>
        <Footer />
      </div>
    </div>
  );
}
export default Businessprofile;