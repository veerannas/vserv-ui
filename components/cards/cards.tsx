import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import AutoImage from "../cards/images/auto.jpeg";
import HealthcentImage from "../cards/images/healthcent.jpg";
import MetingImage from "../cards/images/meeting.jpeg";
import RestImage from "../cards/images/restaurant.jpg";
import styles from "./cards.module.css";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
const Cards = () => (
  <div>
    <div className={styles.cardswrapper}>
      <span className={styles.cardstitle}> Featured Categories </span>
    </div>
    {/* cards */}
    <div className="card-deck">
      <Row>
        <Col>
          <div className="card" >
            <img className="card-img-top" src={RestImage.src} alt="Card image" />
            <div className="card-body">
              <div className={`card-title ${styles.cardtitle}`}>Restaurant</div>
              <p className={`card-text ${styles.cardtext}`}>
                Food brings families and friends together. Whether you’re the
                charming local neighborhood restaurant, a fine dining establishment,
                or are part of a well-known franchise, we’ll help keep your doors
                open for business.
              </p>
            </div>
          </div>
        </Col>
        {/* End Card */}
        <Col>
          <div className="card" >
            <img className="card-img-top" src={MetingImage.src} alt="Card image" />
            <div className="card-body">
              <div className={`card-title ${styles.cardtitle}`}>Finance</div>
              <p className={`card-text ${styles.cardtext}`}>
                We are here to help you through every step of the financial aid
                process. We recommend scheduling an appointment before visiting the
                office. For your convenience, please use our platform to set up an
                appointment for in-person assistance.
              </p>
            </div>
          </div>
        </Col>
        {/* End Card */}
        <Col>
          <div className="card" >
            <img className="card-img-top" src={AutoImage.src} alt="Card image" />
            <div className="card-body">
              <div className={`card-title ${styles.cardtitle}`}>Automotive</div>
              <p className={`card-text ${styles.cardtext}`}>
                The automotive industry comprises a wide range of companies and
                organizations involved in the design, development, manufacturing,
                marketing, and selling of motor vehicles.
                <br></br>
                <br></br>
              </p>
            </div>
          </div>
        </Col>
        {/* End Card */}
        <Col>
          <div className="card" >
            <img className="card-img-top" src={HealthcentImage.src} alt="Card image" />
            <div className="card-body">
              <div className={`card-title ${styles.cardtitle}`}>Health</div>
              <p className={`card-text ${styles.cardtext}`}>
                The need for healthcare services is growing with the increase in
                population and the number of patients who seek health care. For your
                convenience and ease of access, reserve yourself for any healthcare
                service near you and save your time on the go.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <br></br>
  </div>
);
export default Cards;
