import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import BusinessListing from "../../../assets/images/Business-listing.svg";
import { Button, Col, Form, Row, Dropdown, ButtonGroup } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Cookies } from "react-cookie";
import { getTotalAppointmment, getTotalCancelAppointmment } from "../../../components/services/api/reservation-api";
import { getTotalEnquiry } from "../../../components/services/api/askme-api";

const Dashboard = () => {
  const [totalAppointment, setTotalAppointment] = useState(0);
  const [totalCancelAppointment, setTotalCancelAppointment] = useState(0);
  const [totalEnquiry, setTotalEnquiry] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [businessInfoId, setBusinessInfoId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const cookies = new Cookies();
    const businessId = cookies.get("businessInfoId");
    if (businessId) {
      setBusinessInfoId(businessId);
      fetchTotalAppointment(businessId);
      fetchTotalCancelAppointment(businessId);
      fetchTotalEnquiry(businessId);
    }
  }, []);

  const chartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Appointment Activities'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    },
    yAxis: {
      title: {
        text: 'Count'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false
        },
        enableMouseTracking: true
      }
    },
    series: [
      {
        name: 'Total Appointments',
        color: 'orange',
        data: [24916, 54064, 29742, 69851, 62490, 40282, 78121, 70434]
      },
      {
        name: 'Total Cancelled',
        color: 'tomato',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: 'Other',
        color: 'lightseagreen',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ]
  };

  const fetchTotalAppointment = (businessId: string) => {
    getTotalAppointmment(businessId)
      .then((data) => data.json())
      .then((data) => {
        setTotalAppointment(data);
      }).catch((error) => {
        console.log("error====", error);
      })
  }

  const fetchTotalCancelAppointment = (businessId: string) => {
    getTotalCancelAppointmment(businessId)
      .then((data) => data.json())
      .then((data) => {
        setTotalCancelAppointment(data);
      });
  }

  const fetchTotalEnquiry = (businessId: string) => {
    getTotalEnquiry(businessId)
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
                              {isClient ? totalAppointment : 0}
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
                              {isClient ? totalCancelAppointment : 0}
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
                              {isClient ? totalEnquiry : 0}
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
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                      />
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

export default Dashboard;
