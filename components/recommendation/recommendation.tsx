import "bootstrap/dist/css/bootstrap.min.css";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import styles from "./recommendation.module.css";
import Favorite from "../favorite/favorite";
import { getBusinessSuggestion } from "../services/api/business-api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommendation = (props: any) => {
  const checkValue = props.data;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getBusinessSuggestion(checkValue)
      .then((data) => data.json())
      .then((data) => {
        setList(data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    // swipeToSlide: true,
    // autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerMode: true,
        },
      },
    ],
  };
  return (
    // <div className={styles.cardswrapper}>
    //   <h4 className={` ${styles.headstl} ${styles.headsize}`}>
    //     Recommendations
    //   </h4>
    //   <hr></hr>
    //   <div className={styles.cards}>
    //     {/* <CardDeck> */}
    //     <Row className={` ${styles.cardsback}`} data-aos="fade-zoom-in"
    //       data-aos-easing="ease-in-back"
    //       data-aos-delay="300"
    //       data-aos-offset="0">
    //       <Col xs={12} md="9">
    //         <Slider {...settings} className="careercardslider">
    //           {list.map(function (d: any) {
    //             return (
    //               <Col>
    //                 <Card
    //                   style={{ marginLeft: "4px", marginRight: "4px" }}
    //                   className={styles.customcards}
    //                   key={d.id}
    //                 >
    //                   <Card.Img
    //                     className={` ${styles.imgsiz}`}
    //                     variant="top"
    //                     src={`data:image/jpeg;base64,${d.wallPaper[0].image.data}`}
    //                   />
    //                   <div className={`${styles.cssribbon}`}>
    //                     <span className={`${styles.bookmarkdesign}`}>
    //                       <b className={`${styles.heartcol}`}>
    //                         <Favorite data={d.id} />
    //                       </b>
    //                     </span>
    //                   </div>
    //                   <Card.Body className={`${styles.cardtextalign}`}>
    //                     <div className={`${styles.cardtextsize}`}>
    //                       {d.companyName}
    //                     </div>
    //                     <div className={`${styles.starmar}`}>
    //                       <StarRatingComponent
    //                         name="rate2"
    //                         editing={false}
    //                         renderStarIcon={() => (
    //                           <span className={styles.starsize}>★</span>
    //                         )}
    //                         starCount={5}
    //                         value={parseInt(d.averageRating)}
    //                       />
    //                     </div>
    //                     <div className={` ${styles.cardtextmar}`}>
    //                       {d.address.addressLineOne}
    //                     </div>
    //                   </Card.Body>
    //                 </Card>
    //               </Col>
    //             );
    //           })}
    //         </Slider>
    //       </Col>
    //     </Row>
    //     {/* </CardDeck> */}
    //   </div>
    // </div>
    <div className={styles.cardswrapper}>
      <h4 className={` ${styles.headstl} ${styles.headsize}`}>
        Recommendations
      </h4>
      <hr></hr>
      <Container>
        <Row
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
        >
          <Col xs={12} md="12">
            <Slider {...settings} >
              {list && list.map((d: any, index: any) => {
                return (
                  // <Col
                  //   key={"title_" + index}
                  //   xs={12}
                  //   md={12}
                  //   className="card-border-top-space"
                  // >
                  <div className={` ${styles.sectionpadding}`} key={"recom_"+index}>
                    <Card
                      // style={{ marginLeft: "4px", marginRight: "4px" }}
                      className={styles.customcards}
                      key={d.id}
                    >
                      <Card.Img
                        className={` ${styles.imgsiz}`}
                        variant="top"
                        src={`data:image/jpeg;base64,${d.wallPaper[0].image.data}`}
                      />
                      <div className={`${styles.cssribbon}`}>
                        <span className={`${styles.bookmarkdesign}`}>
                          <b className={`${styles.heartcol}`}>
                            <Favorite data={d.id} />
                          </b>
                        </span>
                      </div>
                      <Card.Body className={`${styles.cardtextalign}`}>
                        <div className={`${styles.cardtextsize}`}>
                          {d.companyName}
                        </div>
                        <div className={`${styles.starmar}`}>
                          <StarRatingComponent
                            name="rate2"
                            editing={false}
                            renderStarIcon={() => (
                              <span className={styles.starsize}>★</span>
                            )}
                            starCount={5}
                            value={parseInt(d.averageRating)}
                          />
                        </div>
                        <div className={` ${styles.cardtextmar}`}>
                          {d.address.addressLineOne}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}

            </Slider>
          </Col>
        </Row>
        <br></br>
      </Container>
    </div>

  );
};
export default Recommendation;
