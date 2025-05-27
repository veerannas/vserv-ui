import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import TodayAppointment from "./todayappointment";
import UpcomingAppointment from "./upcomingappointment";
import AppointmentNavbar from "../../../components/appointment-navbar/appointment";
import PastAppointmet from "../../business-profile/past-appointment";


const ActiveAppointment = () => {
  const [link, setLink] = useState("todays");

  const cookies = new Cookies();
  useEffect(() => {
    if ((cookies.get("id") || "") == "") window.location.href = "/";
  }, []);

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
                  <i className="fa fa-th-large"></i> Business  Reservation
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <BreadCrum />
                </div>
              </div>
              <br></br>
              <div className={styles.askmenavbar}>
                <AppointmentNavbar setLink={setLink} link={link} />
              </div>
              <Row>
                {link == "todays" && (<TodayAppointment />)}
                {link == "upcoming" && (<UpcomingAppointment />)}
                {link == "past" && (<PastAppointmet />)}
              </Row>
              {/* <Row>
          <UpcomingAppointment />
        </Row> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActiveAppointment;
