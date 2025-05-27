import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import PersonalInfoImg from "../../../assets/images/Notification_Bell.svg";
import BreadCrum from "../../../components/breadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import MessageBox from "../../../components/messagebox/messagebox";
import {
  getUserNotification,
  updateUserNotification,
} from "../../../components/services/api/user-api";
import styles from "./index.module.css";

const UserPersonalInfo = () => {
  const cookies = new Cookies();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [notificationId, setNotificationId] = useState(false);

  //initialize variable
  const [userData, setUserData] = useState({
    id: "",
    userId: { id: cookies.get("id") },
    messageEmail: false,
    messageText: false,
    appoinmentRemainderEmail: false,
    appoinmentRemainderText: false,
    remainderTime: "",
  });

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    } else {
      //api for fetch user data
      fetchUserData();
    }
  }, [cookies.get("id")]);

  const fetchUserData = () => {
    getUserNotification(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        //set success data in formik userdata variable
        setNotificationId(data.id);
        formik.values.userData = data;
        setUserData({ ...data });
      });
  };

  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: { userData },

    //form submit call
    onSubmit: (values) => {
      //post call to update user notification
      let notification = {
        id: notificationId,
        userId: { id: cookies.get("id") },
        messageEmail: values.userData.messageEmail,
        messageText: values.userData.messageText,
        appoinmentRemainderEmail: values.userData.appoinmentRemainderEmail,
        appoinmentRemainderText: values.userData.appoinmentRemainderText,
        remainderTime: values.userData.remainderTime,
      };
      updateUserNotification(notification)
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
            fetchUserData();
            setVariant("success");
            setMessage("User notifications updated successfully.");
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
          <div className="container">
            <div className={`footer-fix-height `}>
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-bell"></i> Notification
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
                  <Form noValidate onSubmit={formik.handleSubmit}>
                    <div className="not1">
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Messages
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className={`${styles.labelsubmessage}`}>
                            Allowing notification helps you to receive messages over
                            e-mail and text messages.
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            E-Mail
                          </Form.Label>
                        </Col>
                        <Col>
                          <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="switch"
                            id="custom-switch1"
                            name="userData.messageEmail"
                            // value={formik.values.userData.messageEmail}
                            onChange={formik.handleChange}
                            checked={formik.values.userData.messageEmail}
                          // onClick={editHandler}
                          />
                        </Col>
                      </Row>

                      <hr></hr>

                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Text
                          </Form.Label>
                        </Col>
                        <Col>
                          <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="switch"
                            id="custom-switch2"
                            name="userData.messageText"
                            // value={formik.values.userData.messageText}
                            onChange={formik.handleChange}
                            checked={formik.values.userData.messageText}
                          // onClick={editHandler}
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="not2">
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Appointment Reminder
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className={`${styles.labelsubmessage}`}>
                            It helps you to get reminder for your appointment booking,
                            you can set reminder time
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            E-Mail
                          </Form.Label>
                        </Col>
                        <Col>
                          <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="switch"
                            id="custom-switch33"
                            name="userData.appoinmentRemainderEmail"
                            // value={formik.values.userData.appoinmentRemainderEmail}
                            onChange={formik.handleChange}
                            checked={formik.values.userData.appoinmentRemainderEmail}
                          // onClick={editHandler}
                          />
                        </Col>
                      </Row>

                      <hr></hr>

                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Text
                          </Form.Label>
                        </Col>
                        <Col>
                          <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="switch"
                            id="custom-switch55"
                            name="userData.appoinmentRemainderText"
                            // value={formik.values.userData.appoinmentRemainderText}
                            onChange={formik.handleChange}
                            checked={formik.values.userData.appoinmentRemainderText}
                          // onClick={editHandler}
                          />
                        </Col>
                      </Row>
                    </div>

                    <div className="not3">
                      <br></br>
                      <Row>
                        <Col>
                          <div className={`${styles.labelsubmessage}`}>
                            Set your reminder time to get notification before
                            appointment.
                          </div>
                        </Col>
                        <Col md="3">
                          <Form.Control
                            className={`form-control-border`}
                            as="select"
                            placeholder="Gender"
                            aria-describedby="inputGroupPrepend"
                            name="userData.remainderTime"
                            value={
                              formik.values.userData.remainderTime == null
                                ? (formik.values.userData.remainderTime = "")
                                : formik.values.userData.remainderTime
                            }
                            onChange={formik.handleChange}
                          >
                            <option value="15 min before">15 min before</option>
                            <option value="20 min before">30 min before</option>
                            <option value="1 day">1 day</option>
                          </Form.Control>
                        </Col>
                      </Row>
                    </div>
                    <br></br>
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
                      <h5 className="card-title">Turning on notification helps.</h5>
                      <p className="card-text">
                        Allowing notification helps you to get notification about your
                        bookings and new updates for you.
                      </p>
                      <p className="card-text">
                        Set appointment time so that you can receive notification
                        ahead of the time of appointment.
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
