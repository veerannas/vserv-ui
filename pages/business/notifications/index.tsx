import { useFormik } from "formik";
import React, { useEffect, useState, MouseEvent, Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import PersonalInfoImg from "../../../assets/images/Notification_Bell.svg";
import BreadCrum from "../../../components/businessbreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import MessageBox from "../../../components/messagebox/messagebox";
import Switch from "react-switch";

import {
  getBusinessNotificationByVendorId,
  postUpdateBusinessNotification,
} from "../../../components/services/api/business-api";
const UserPersonalInfo = () => {
  const cookies = new Cookies();
  const [notificationId, setNotificationId] = useState("");
  const [notificationSetting, setNotificationSetting] = useState("false");
  const [dailyEmail, setDailyEmail] = useState(false);
  const [dailyText, setDailyText] = useState(false);
  const [otherNotificationEmail, setOtherNotificationEmail] = useState(false);
  const [otherNotificationText, setOtherNotificationText] = useState(false);

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    } else {
      //api for fetch user data
      fetchBusinessNotifications();
    }
  }, [cookies.get("id")]);

  const fetchBusinessNotifications = () => {
    getBusinessNotificationByVendorId(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        //set success data in formik userdata variabless
        setNotificationId(data.id);
        if (data.notificationSetting == true) {
          setNotificationSetting("true");
        } else {
          setNotificationSetting("false");
        }
        setDailyEmail(data.dailyEmail);
        setDailyText(data.dailyText);
        setOtherNotificationEmail(data.otherNotificationEmail);
        setOtherNotificationText(data.otherNotificationText);
      });
  };

  const notificationSettingFunc = (e: any) => {
    setNotificationSetting(e.target.value);
    var notifications = {
      id: notificationId,
      notificationSetting: e.target.value,
      dailyEmail: dailyEmail,
      dailyText: dailyText,
      otherNotificationEmail: otherNotificationEmail,
      otherNotificationText: otherNotificationText,
    };
    updateNotification(notifications);
  };

  const dailyEmailFunc = (e: any) => {
    if (dailyEmail == true) {
      setDailyEmail(false);
    } else {
      setDailyEmail(true);
    }
    var notifications = {
      id: notificationId,
      notificationSetting: notificationSetting,
      dailyEmail: e,
      dailyText: dailyText,
      otherNotificationEmail: otherNotificationEmail,
      otherNotificationText: otherNotificationText,
    };
    updateNotification(notifications);
  };

  const dailyTextFunc = (e: any) => {
    if (dailyText == true) {
      setDailyText(false);
    } else {
      setDailyText(true);
    }
    var notifications = {
      id: notificationId,
      notificationSetting: notificationSetting,
      dailyEmail: dailyEmail,
      dailyText: e,
      otherNotificationEmail: otherNotificationEmail,
      otherNotificationText: otherNotificationText,
    };
    updateNotification(notifications);
  };

  const otherNotificationEmailFunc = (e: any) => {
    if (otherNotificationEmail == true) {
      setOtherNotificationEmail(false);
    } else {
      setOtherNotificationEmail(true);
    }
    var notifications = {
      id: notificationId,
      notificationSetting: notificationSetting,
      dailyEmail: dailyEmail,
      dailyText: dailyText,
      otherNotificationEmail: e,
      otherNotificationText: otherNotificationText,
    };
    updateNotification(notifications);
  };

  const otherNotificationTextFunc = (e: any) => {
    if (otherNotificationText == true) {
      setOtherNotificationText(false);
    } else {
      setOtherNotificationText(true);
    }
    var notifications = {
      id: notificationId,
      notificationSetting: notificationSetting,
      dailyEmail: dailyEmail,
      dailyText: dailyText,
      otherNotificationEmail: otherNotificationEmail,
      otherNotificationText: e,
    };
    updateNotification(notifications);
  };

  const updateNotification = (notifications: any) => {
    postUpdateBusinessNotification(notifications)
      .then((response) => response.text())
      .then((response) => { })
      .catch((err) => {
        console.log(err);
      });
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
                  <Form>
                    <div className="not1">
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Notification Setting
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className={`${styles.labelsubmessage}`}>
                            Here you can adjust if you would like to receive various
                            notifications.
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.label}`}>
                            <input
                              type="radio"
                              name="notificationSetting"
                              value="true"
                              checked={notificationSetting === "true"}
                              onChange={(e) => notificationSettingFunc(e)}
                            />
                            &nbsp; Yes &nbsp;&nbsp;&nbsp;&nbsp;
                          </Form.Label>
                          <Form.Label className={`${styles.label}`}>
                            <input
                              type="radio"
                              name="notificationSetting"
                              value="false"
                              checked={notificationSetting === "false"}
                              onChange={(e) => notificationSettingFunc(e)}
                            />
                            &nbsp; No
                          </Form.Label>
                        </Col>
                      </Row>
                    </div>
                    <br></br>
                    <div className="not2">
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Daily Overview Notifications
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className={`${styles.labelsubmessage}`}>
                            Set your preference here to get daily overview appointment
                            notification.
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
                          <div className={styles.notficationright}>
                            <Switch
                              onChange={(e:any) => dailyEmailFunc(e)}
                              checked={dailyEmail}
                              onColor="#007bff"
                              height={20}
                              width={40}
                              checkedIcon={false}
                              uncheckedIcon={false}
                            />
                          </div>
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
                          <div className={styles.notficationright}>
                            <Switch
                              onChange={(e:any) => dailyTextFunc(e)}
                              checked={dailyText}
                              onColor="#007bff"
                              height={20}
                              width={40}
                              checkedIcon={false}
                              uncheckedIcon={false}
                            />
                          </div>
                        </Col>
                      </Row>
                      <hr></hr>
                    </div>
                    <div className="not3">
                      <Row>
                        <Col>
                          <Form.Label className={`${styles.labelcolor}`}>
                            Business Message Notification
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className={`${styles.labelsubmessage}`}>
                            Receive notification whenever customer ask you a query or
                            writers a review.
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
                          <div className={styles.notficationright}>
                            <Switch
                              onChange={(e:any) => otherNotificationEmailFunc(e)}
                              checked={otherNotificationEmail}
                              onColor="#007bff"
                              height={20}
                              width={40}
                              checkedIcon={false}
                              uncheckedIcon={false}
                            />
                          </div>
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
                          <div className={styles.notficationright}>
                            <Switch
                              onChange={(e:any) => otherNotificationTextFunc(e)}
                              checked={otherNotificationText}
                              onColor="#007bff"
                              height={20}
                              width={40}
                              checkedIcon={false}
                              uncheckedIcon={false}
                            />
                          </div>
                        </Col>
                      </Row>
                      <hr></hr>
                    </div>
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
