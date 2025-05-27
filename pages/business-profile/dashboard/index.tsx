import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useEffect, useState } from "react";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import BusinessListing from "../../../assets/images/Business-listing.svg";
import { Button, Col, Form, Row, Dropdown, ButtonGroup } from "react-bootstrap";
import Highcharts from "highcharts";
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Subtitle,
  Legend,
  LineSeries,
  Caption,
} from "react-jsx-highcharts";
import { Cookies } from "react-cookie";
import { getTotalAppointmment, getTotalCancelAppointmment } from "../../../components/services/api/reservation-api";
import { getTotalEnquiry } from "../../../components/services/api/askme-api";

// import ExampleCode from '../utils/ExampleCode';
// import code from './exampleCode';

const Dashboard = () => {
  const cookies = new Cookies();

  const [totalAppointment, setTotalAppointment] = useState(0);
  const [totalCancelAppointment, setTotalCancelAppointment] = useState(0);
  const [totalEnquiry, setTotalEnquiry] = useState(0);

  const plotOptions = {
    series: {
      pointStart: 2010,
      type: "bellcurve",
    },
  };

  useEffect(() => {
    fetchTotalAppointment();
    fetchTotalCancelAppointment();
    fetchTotalEnquiry();
  }, [])

  const fetchTotalAppointment = () => {
    getTotalAppointmment(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalAppointment(data);
      }).catch((error) => {
        console.log("error====", error);
      })
  }

  const fetchTotalCancelAppointment = () => {
    getTotalCancelAppointmment(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalCancelAppointment(data);
      });
  }

  const fetchTotalEnquiry = () => {
    getTotalEnquiry(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalEnquiry(data);
      });
  }

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr></hr>
          <div className="container">
            <div className={`footer-fix-height `}>

              <div>
                <div className={`${styles.wrimagecard}`}>
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={BusinessListing.src}
                    alt="Card image cap"
                  />
                  <span className={`${styles.wrimagecarmaindheading}`}>Dashboard</span>
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <BreadCrum />
                </div>
              </div>

              <div className="row">
                {/* Left Panel */}

                <div className={`col-md-4 col-sm-4 col-xs-4`}>
                  <br></br>
                  <br></br>
                  {/* <Row>
              <Col>
                <div className={`wrimagecard wrimagecard-topimage ${styles.incomewrimagecard}`}>
                  <div className="wrimagecard-topimage_title">
                    <div className={`${styles.wrimagecardtitle}`}>
                      <span className={`${styles.wrimagecardheading}`}>
                        January, 2021
                      </span>
                    </div>
                    <div className={`${styles.wrimagecardtext}`}>
                      Total Income
                      <span className={styles.wrimagecardtextright}>
                        $ 4050
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row> */}
                  <Row>
                    <Col>
                      <div className={`wrimagecard wrimagecard-topimage ${styles.totalappointmentwrimagecard}`}>
                        <div className="wrimagecard-topimage_title">
                          <div className={`${styles.wrimagecardtitle}`}>
                            <span className={`${styles.wrimagecardheading}`}>
                              January, 2021
                            </span>
                          </div>
                          <div className={`${styles.wrimagecardtext}`}>
                            Total Appointments
                            <span className={styles.wrimagecardtextright}>
                              {totalAppointment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className={`wrimagecard wrimagecard-topimage ${styles.cancelappointmentwrimagecard}`}>
                        <div className="wrimagecard-topimage_title">
                          <div className={`${styles.wrimagecardtitle}`}>
                            <span className={`${styles.wrimagecardheading}`}>
                              January, 2021
                            </span>
                          </div>
                          <div className={`${styles.wrimagecardtext}`}>
                            Cancelled Appointments
                            <span className={styles.wrimagecardtextright}>
                              {totalCancelAppointment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className={`wrimagecard wrimagecard-topimage ${styles.askmewrimagecard}`}>
                        <div className="wrimagecard-topimage_title">
                          <div className={`${styles.wrimagecardtitle}`}>
                            <span className={`${styles.wrimagecardheading}`}>
                              January, 2021
                            </span>
                          </div>
                          <div className={`${styles.wrimagecardtext}`}>
                            Ask Me
                            <span className={styles.wrimagecardtextright}>
                              {totalEnquiry}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* End Left Panel */}
                {/* Right Panel */}

                <div className="col-md-1"></div>
                <div className="col-md-7 col-sm-7 col-xs-7">
                  <Row className={styles.chartheadingcolor}>
                    <Col >Appointment Activities</Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col md="12">
                      <HighchartsChart plotOptions={plotOptions}>
                        <Chart />

                        {/* <Title align="left">Appointment Activities </Title> */}

                        {/* <Subtitle>Source: thesolarfoundation.com</Subtitle> */}

                        <Legend layout="vertical" align="right" verticalAlign="top" />

                        <XAxis>
                          <XAxis.Title>Income ($)</XAxis.Title>
                        </XAxis>

                        <YAxis>
                          <YAxis.Title>Appointment</YAxis.Title>
                          {/* <LineSeries
                      color="limegreen"
                      name="Total Earnings"
                      data={[
                        43934,
                        112503,
                        157177,
                        126658,
                        97031,
                        89931,
                        137133,
                        154175,
                      ]}
                    /> */}
                          <LineSeries
                            name="Total Appointments"
                            color="orange"
                            data={[
                              24916,
                              54064,
                              29742,
                              69851,
                              62490,
                              40282,
                              78121,
                              70434,
                            ]}
                          />
                          <LineSeries
                            name="Total Cancelled"
                            color="tomato"
                            data={[
                              11744,
                              17722,
                              16005,
                              19771,
                              20185,
                              24377,
                              32147,
                              39387,
                            ]}
                          />
                          <LineSeries
                            name="Other"
                            color="lightseagreen"
                            data={[
                              12908,
                              5948,
                              8105,
                              11248,
                              8989,
                              11816,
                              18274,
                              18111,
                            ]}
                          />
                        </YAxis>
                        <Caption align="center">
                          {/* The Earnings sector sees the most growth. */}
                        </Caption>
                      </HighchartsChart>

                      {/* <ExampleCode name="SimpleLine">{code}</ExampleCode> */}
                    </Col>
                  </Row>
                </div>
              </div>
              {/* End Left Panel */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default withHighcharts(Dashboard, Highcharts);
