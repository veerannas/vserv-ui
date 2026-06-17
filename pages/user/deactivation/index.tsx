import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import DeactivationImg from "../../../assets/images/deactivation.svg";
import BreadCrum from "../../../components/breadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import MessageBox from "../../../components/messagebox/messagebox";
import { UserFeedBack } from "../../../components/models/userfeedback";
import { VendorInfo } from "../../../components/models/vendorinfo";
import { userDeactivateDelete } from "../../../components/services/api/user-api";
import styles from "./index.module.css";

const Deactivation = () => {
  const cookies = new Cookies();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);

  const [UserDeactivateDelete, setUserDeactivateDelete] = useState({
    password: "",
    userDeactivate: {
      userFeedback: {
        accountType: "",
        reason: "",
        otherReason: "",
        feedback: ""
      },
      user: { id: cookies.get("id") }
    }

  })

  // const table: UserDeactivateDelete = {
  //   password:"",
  //   userDeactivate.id=""
  // }
  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    }
  }, [cookies.get("id")]);

  const formik = useFormik({
    initialValues: { UserDeactivateDelete },
    validationSchema: yup.object().shape({
      UserDeactivateDelete: yup.object().shape({
        userDeactivate: yup.object().shape({
          userFeedback: yup.object().shape({
            accountType: yup.string().required("Please select account!"),
            reason: yup.string().required("Please select one reason!"),
            otherReason: yup.string().when("reason", {
              is: "Other",
              then: yup.string().required("Reason is required."),
            }),
            feedback: yup.string().required("Review is required!"),
          }),
        }),
        password: yup.string().required("Password is required!"),
      }),
    }),

    onSubmit: (values) => {
      console.log(
        "values.userDeactivate====",
        values.UserDeactivateDelete
      );

      userDeactivateDelete(values.UserDeactivateDelete)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          if (response == "Password is incorrect") {
            setVariant("danger");
            setMessage("Password is incorrect.");
          } else if (response == "User not found") {
            setVariant("danger");
            setMessage("User not found.");
          } else {
            cookies.remove("id", { path: "/" });
            cookies.remove("name", { path: "/" });
            if (
              values.UserDeactivateDelete.userDeactivate.userFeedback
                .accountType == "Deactivate Account"
            ) {
            } else {
              window.location.href = "/user/";
            }
            setVariant("success");
            setMessage("User Deactivated successfully.");
            setIsFormEdit(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          {/* End Header Menu */}
          <hr></hr>
          {(cookies.get("id") || "") !== "" && (
            <div className="container">
              <div className={`footer-fix-height `}>
                <div>
                  <div className={`${styles.wrimagecard}`}>
                    <i className="fa fa-link"></i> Deactivation and
                    Delete
                  </div>
                  <div className={`${styles.wrimagecardcontent}`}>
                    {/* BreadCrum */}
                    <BreadCrum />
                    {/* End BreadCrum */}
                  </div>
                </div>
                <br />
                <div className="row">
                  {/* Left Panel */}
                  <div className="col-md-8">
                    {isMessage ? (
                      <MessageBox variant={variant} message={message} />
                    ) : (
                      ""
                    )}
                    <div className="">
                      <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                          <Col>
                            <Form.Label
                              className={`${styles.labelcolor} ${styles.formlabelsize}`}
                            >
                              <input
                                type="radio"
                                name="UserDeactivateDelete.userDeactivate.userFeedback.accountType"
                                value="Deactivate Account"
                                checked={
                                  formik.values.UserDeactivateDelete
                                    .userDeactivate.userFeedback.accountType ===
                                  "Deactivate Account"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "UserDeactivateDelete.userDeactivate.userFeedback.accountType",
                                    "Deactivate Account"
                                  )
                                }
                              />
                              &nbsp; Deactivate User Account &nbsp;&nbsp;&nbsp;&nbsp;
                            </Form.Label>
                            <Form.Label
                              className={`${styles.labelcolor} ${styles.formlabelsize}`}
                            >
                              <input
                                type="radio"
                                name="UserDeactivateDelete.userDeactivate.userFeedback.accountType"
                                value="Delete Account"
                                checked={
                                  formik.values.UserDeactivateDelete
                                    .userDeactivate.userFeedback.accountType ===
                                  "Delete Account"
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "UserDeactivateDelete.userDeactivate.userFeedback.accountType",
                                    "Delete Account"
                                  )
                                }
                              />
                              &nbsp; Delete User Account
                            </Form.Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {formik.touched.UserDeactivateDelete
                              ?.userDeactivate?.userFeedback?.accountType &&
                              formik.errors.UserDeactivateDelete?.userDeactivate
                                ?.userFeedback?.accountType ? (
                              <div className={styles.error}>
                                {
                                  formik.errors.UserDeactivateDelete
                                    .userDeactivate.userFeedback.accountType
                                }
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                        <br/>
                        {formik.values.UserDeactivateDelete.userDeactivate
                          .userFeedback.accountType != "" && (
                            <div className={` ${styles.accountleft}`}>
                              {formik.values.UserDeactivateDelete.userDeactivate
                                .userFeedback.accountType == "Deactivate Account" && (
                                  <div>
                                    <Row>
                                      Your data will be saved but it will remain
                                      deactivate till the time you activate again
                                    </Row>
                                    <Form.Label className={`${styles.labelcolor}`}>
                                      Please select a reason for deactivate this user
                                      account -
                                    </Form.Label>
                                  </div>
                                )}
                              {formik.values.UserDeactivateDelete.userDeactivate
                                .userFeedback.accountType == "Delete Account" && (
                                  <div>
                                    <Row>
                                      Your all data will be erased from system
                                    </Row>
                                    <Form.Label className={`${styles.labelcolor}`}>
                                      Please select a reason for deleting this business
                                      account -
                                    </Form.Label>
                                  </div>
                                )}
                              <Row>
                                <Col>
                                  <Form.Label>
                                    <input
                                      className={styles.radiocheck}
                                      type="radio"
                                      name="UserDeactivateDelete.userDeactivate.userFeedback.reason"
                                      value="I am using duplicate account"
                                      checked={
                                        formik.values.UserDeactivateDelete
                                          .userDeactivate.userFeedback.reason ===
                                        "I am using duplicate account"
                                      }
                                      onChange={() =>
                                        formik.setFieldValue(
                                          "UserDeactivateDelete.userDeactivate.userFeedback.reason",
                                          "I am using duplicate account"
                                        )
                                      }
                                    />
                                    &nbsp; I am using duplicate account.
                                  </Form.Label>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Label>
                                    <input
                                      className={styles.radiocheck}
                                      type="radio"
                                      name="UserDeactivateDelete.userDeactivate.userFeedback.reason"
                                      value="I have privacy concern"
                                      checked={
                                        formik.values.UserDeactivateDelete
                                          .userDeactivate.userFeedback.reason ===
                                        "I have privacy concern"
                                      }
                                      onChange={() =>
                                        formik.setFieldValue(
                                          "UserDeactivateDelete.userDeactivate.userFeedback.reason",
                                          "I have privacy concern"
                                        )
                                      }
                                    />
                                    &nbsp; I have privacy concern.
                                  </Form.Label>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Label>
                                    <input
                                      className={styles.radiocheck}
                                      type="radio"
                                      name="UserDeactivateDelete.userDeactivate.userFeedback.reason"
                                      value="Not usefull"
                                      checked={
                                        formik.values.UserDeactivateDelete
                                          .userDeactivate.userFeedback.reason ===
                                        "Not usefull"
                                      }
                                      onChange={() =>
                                        formik.setFieldValue(
                                          "UserDeactivateDelete.userDeactivate.userFeedback.reason",
                                          "Not usefull"
                                        )
                                      }
                                    />
                                    &nbsp; Not usefull.
                                  </Form.Label>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Label>
                                    <input
                                      className={styles.radiocheck}
                                      type="radio"
                                      name="UserDeactivateDelete.userDeactivate.userFeedback.reason"
                                      value="Other"
                                      checked={
                                        formik.values.UserDeactivateDelete
                                          .userDeactivate.userFeedback.reason ===
                                        "Other"
                                      }
                                      onChange={() =>
                                        formik.setFieldValue(
                                          "UserDeactivateDelete.userDeactivate.userFeedback.reason",
                                          "Other"
                                        )
                                      }
                                    />
                                    &nbsp; Other.
                                  </Form.Label>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  {formik.touched.UserDeactivateDelete
                                    ?.userDeactivate?.userFeedback?.reason &&
                                    formik.errors.UserDeactivateDelete
                                      ?.userDeactivate?.userFeedback?.reason ? (
                                    <div className={styles.error}>
                                      {
                                        formik.errors.UserDeactivateDelete
                                          ?.userDeactivate?.userFeedback?.reason
                                      }
                                    </div>
                                  ) : null}
                                </Col>
                              </Row>
                              <br/>
                              {formik.values.UserDeactivateDelete.userDeactivate
                                .userFeedback.reason == "Other" && (
                                  <Row>
                                    <Form.Group
                                      as={Col}
                                      md="8"
                                      controlId="validationFormik1"
                                    >
                                      <Form.Control
                                        as="textarea"
                                        placeholder="Specify the reason"
                                        aria-describedby="inputGroupPrepend"
                                        name="UserDeactivateDelete.userDeactivate.userFeedback.otherReason"
                                        value={
                                          formik.values.UserDeactivateDelete
                                            .userDeactivate.userFeedback.otherReason
                                        }
                                        onChange={formik.handleChange}
                                        isInvalid={
                                          !!formik.errors.UserDeactivateDelete
                                            ?.userDeactivate?.userFeedback
                                            ?.otherReason
                                        }
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {
                                          formik.errors.UserDeactivateDelete
                                            ?.userDeactivate?.userFeedback
                                            ?.otherReason
                                        }
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                )}
                            </div>
                          )}
                        <Row>
                          <Form.Label className={`${styles.labelcolor}`}>
                            <Col>
                              Your feedback matters to us, and confirm password to
                              proceed.
                            </Col>
                          </Form.Label>
                        </Row>
                        <br/>
                        <Row>
                          <Col>
                            <Form.Group
                              as={Col}
                              md="10"
                              controlId="validationFormik2"
                            >
                              <Form.Label>Please share your feedback</Form.Label>
                              <Form.Control
                                as="textarea"
                                placeholder="Write here"
                                aria-describedby="inputGroupPrepend"
                                name="UserDeactivateDelete.userDeactivate.userFeedback.feedback"
                                value={
                                  formik.values.UserDeactivateDelete
                                    .userDeactivate.userFeedback.feedback
                                }
                                onChange={formik.handleChange}
                                isInvalid={
                                  !!formik.errors.UserDeactivateDelete
                                    ?.userDeactivate?.userFeedback?.feedback
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {
                                  formik.errors.UserDeactivateDelete
                                    ?.userDeactivate?.userFeedback?.feedback
                                }
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <br/>
                        <Row>
                          <Col>
                            <Form.Group
                              as={Col}
                              md="10"
                              controlId="validationFormik3"
                            >
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                name="UserDeactivateDelete.password"
                                value={
                                  formik.values.UserDeactivateDelete.password
                                }
                                onChange={formik.handleChange}
                                isInvalid={
                                  !!formik.errors.UserDeactivateDelete?.password
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.UserDeactivateDelete?.password}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <br/>
                        <Row>
                          <Form.Group
                            as={Col}
                            md="10"
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
                            >
                              Cancel
                            </Button>
                          </Form.Group>
                        </Row>
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
                          <img
                            className={`card-img-top ${styles.cardimg}`}
                            src={DeactivationImg.src}
                            alt="Card image cap"
                          />
                        </div>
                        <hr></hr>
                        <h5 className="card-title">
                          Please keep in mind before you go.
                        </h5>
                        <p className="card-text">
                          Your data will be erased, you will not be able to see your past
                          and upcoming appointments.
                        </p>
                        <p className="card-text">
                          If you have any active business listing, your business data
                          will be erased.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End Left Panel */}
                </div>
              </div>
            </div>
          )}
          {(cookies.get("id") || "") == "" &&
            formik.values.UserDeactivateDelete.userDeactivate.userFeedback
              .accountType == "Deactivate Account" && (
              <div className="container">
                <div className={styles.deactivatecontainer}>
                  <div className="row">
                    {/* <div className="offset-md-2"> */}
                    <Col>
                      <Form.Label className={`${styles.labelcolor1}`}>
                        Business Account is successfully deactivated
                      </Form.Label>
                    </Col>
                    {/* </div> */}
                  </div>
                  <div className="row">
                    <Col>
                      <Form.Label className={`${styles.sublabelcolor1}`}>
                        May you had good experience.All your Business data has been
                        wiped out from our system
                      </Form.Label>
                    </Col>
                  </div>
                  <div className="row">
                    <Col>
                      <Button type="button" className={`${styles.activateButton}`}>
                        Activate
                      </Button>
                    </Col>
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Deactivation;
