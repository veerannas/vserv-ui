// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import FirstImg from "../businesscards/images/firstImg.png";
// import One from "../businesscards/images/one.png";
// import SecondImg from "../businesscards/images/secondImg.png";
// import ThirdImg from "../businesscards/images/thirdImg.png";
// import Three from "../businesscards/images/three.png";
// import Two from "../businesscards/images/two.png";
// import styles from "./cards.module.css";


// const Cards = () => (
//   <div>
//     <div className={styles.cardswrapper}>
//       <span className={styles.cardstitle}> Business </span>
//     </div>
//     {/* <div className={styles.subcardswrapper}>
//       <span className={styles.cardsubtitle}> Easy way of registering your business </span>
//     </div> */}
//     <Container>


//       <div className="card-deck">
//         <div className={`card ${styles.cardborder}`}>
//           <Row>
//             <Col md="12" >
//               <img src={One} className={styles.numberimage}>
//               </img>&nbsp;<b className={`${styles.cardtitle}`}> Create Business Account </b>
//               <br />
//               <div className={`${styles.cardcenter} `}>
//                 <img src={FirstImg} className={styles.cardimage} />
//               </div>
//               <br />
//               <br />
//               <div className={`${styles.cardcenter} ${styles.cardtext} `} >Let user find your business online.</div>
//               <p></p>
//             </Col>
//           </Row>

//         </div>
//         <div className={`card ${styles.cardborder}`}>
//           <Row>
//             <Col md="12" >
//               <img src={Two} className={styles.numberimage}>
//               </img>&nbsp;<b className={`${styles.cardtitle}`}> Manage Business </b>
//               <br />
//               <div className={`${styles.cardcenter} `}>
//                 <img src={SecondImg} className={styles.cardimage} />
//               </div>
//               <br />
//               <br />
//               <div className={`${styles.cardcenter} ${styles.cardtext} `} >Add and keep business updated.</div>
//               <p></p>
//             </Col>
//           </Row>
//         </div>
//         <div className={`card ${styles.cardborder}`}>
//           <Row>
//             <Col md="12" >
//               <img src={Three} className={styles.numberimage}>
//               </img>&nbsp;<b className={`${styles.cardtitle}`}> Grow Business </b>
//               <br />
//               <div className={`${styles.cardcenter} `}>
//                 <img src={ThirdImg} className={styles.cardimage} />
//               </div>
//               <br />
//               <br />
//               <div className={`${styles.cardcenter} ${styles.cardtext} `} >Grow your business with us.</div>
//               <p></p>
//             </Col>
//           </Row>
//         </div>

//         {/* End Card */}
//       </div>
//     </Container>
//   </div>
// );
// export default Cards;


import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./cards.module.css";

const arr = [
  {
    img: "images/businessaccount.png",
    head: "Create Business Account",
    text: "Let user find your business online. "
  },
  {
    img: "images/managebusiness.png",
    head: "Manage Business",
    text: "Add and keep business updated."
  },
  {
    img: "images/goodoffer.png",
    head: "Grow your Business",
    text: "Grow your business with us."
  },
];
const Cards = () => (
  <div>
    <div className={styles.cardswrapper}>
      <span className={styles.cardstitle}> Business </span>
    </div>
    <Container>
      <Row>
        {arr.map((d: any, index: any) => {
          return (
            <Col key={"img_" + index} xs={24} md={4}>
              <div className="section-image-center ">
                <Image src={d.img} fluid className="product-poster-image box" />
                <h5>{d.head}</h5>
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

