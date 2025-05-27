import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import ReviewRatingNavbar from "../../../components/review-rating-navbar/reviewratingnavbar";
// import ReviewAndAskMe_Img from "../../../assets/images/reviewandaskme.svg";
import RatingInbox from "./inbox";
import styles from "./index.module.css";
import RatingSent from "./sent";
import { Cookies } from "react-cookie";

const Review = () => {
  const cookies = new Cookies();

  const [link, setLink] = useState("reviews");
  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    }
  }, [cookies.get("id")]);
  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          <HeaderNavbar />
          <hr></hr>
          <div className={`container`}>

            <div className={styles.head}>
              <div className={`${styles.wrimagecard}`}>
                <i className="fa fa-question-circle" aria-hidden="true"></i> Ratings and Reviews
              </div>
              <div className={`${styles.wrimagecardcontent}`}>
                <BreadCrum />
              </div>
            </div>
            <br></br>

            <div className={styles.ReviewRatingNavbar}>
              <ReviewRatingNavbar link={link} setLink={setLink} />
            </div>
            <br></br>
            <div className="row">

              <div className="col-md-12">
                <Row>
                  {link == "reviews" && (<RatingInbox />)}
                  {link == "reviewed" && (<RatingSent />)}
                  {/* {link == "trash" && (<RatingTrash/>)} */}
                </Row>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Review;
