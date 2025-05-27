import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import A1 from "../customerbenefits/images/a1.png";
import A2 from "../customerbenefits/images/a2.png";
import A3 from "../customerbenefits/images/a3.png";
import styles from "./benefits.module.css";

// import A1 from "../businesscards/images/a2.png";

const arr = [
  {
    img: "images/varietybusiness.png",
    text: "Variety of Business",
  },
  {
    img: "images/appointmentmanage.png",
    text: "Appointment Management",
  },
  {
    img: "images/goodoffer.png",
    text: "Good offers",
  },
];
const Cards = () => (
  <div>
    <div className={styles.cardswrapper}>
      <span className={styles.cardstitle}> Customer </span>
    </div>
    <Container>
      <Row>
        {arr.map((d: any, index: any) => {
          return (
            <Col key={"img_" + index} xs={24} md={4}>
              <div className="section-image-center ">
                <Image src={d.img} fluid className="product-poster-image box" />
                <div className={`productsection-image-text ${styles.textcolor}`}>{d.text}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  </div>
);
export default Cards;
