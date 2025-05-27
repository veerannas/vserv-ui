import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./benefits.module.css";

// import A1 from "../businesscards/images/a2.png";

const arr = [
  {
    img: "images/a1.png",
    text: "Product targets maximum number of services a business can offer",
  },
  {
    img: "images/a3.png",
    text: "Businesses  can register themselves and provide information regarding their services",
  },
  {
    img: "images/a2.png",
    text: "Customers can reserve appointments according to their need of service",
  },
];
const Cards = () => (
  <div>
    <div className={styles.cardswrapper}>
      <span className={styles.cardstitle}> Benefits </span>
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
