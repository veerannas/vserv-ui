import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import StarRatingComponent from "react-star-rating-component";
import styles from "./overallratingautomotive.module.css";
import ReviewFeedback from "../reviewfeedback/reviewfeedback";
import { Cookies } from "react-cookie";
import { getAutomotiveRating } from "../services/api/review-api";

const OverallRatingAutomotive = (props: any) => {
  const [modalShow, setModalShow] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const cookies = new Cookies();

  const [loading, setLoading] = useState(false);
  const [overallRating, setOverallRating] = useState({
    averageRating: 0.0,
    foodRating: 0.0,
    serviceRating: 0.0,
    ambienceRating: 0.0,
    valueRating: 0.0,
    totalReviews: 0,
  });

  const router = useRouter();

  useEffect(() => {
    //getting data from reviews api
    fetchTotalRevies();
  }, []);

  const fetchTotalRevies = () => {
    //fetching data for reviews
  
      getAutomotiveRating(props.data.id)
      .then((data) => data.json())
      .then((data) => {
        //Added fetching data in variable
        if (data.status == "500") {
          seterrorStatus(true);
        }
        overallRating.averageRating = data.averageRating;
        overallRating.totalReviews = data.totalReviews;
        overallRating.foodRating = data.averageProductRating;
        overallRating.serviceRating = data.averageSeviceRating;
        overallRating.ambienceRating = data.averageAmbienceRating;
        overallRating.valueRating = data.averageValueRating;
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      {!errorStatus && (
        <div className="row">
          <div className={`col-md-12 `}>
            <div className={`${styles.reviewheading}`}>Reviews</div>
            <hr></hr>
            {/* <p>Reviews can only be made by diners who have eaten at this restaurant</p> */}
            <div className={`row`}>
              <div className={`col-md-2 ${styles.ratingreview}`}>
                <div className={`row`}>
                  <div className={`col-md-12`}>
                    <h1>{overallRating.averageRating.toFixed(1)}</h1>
                  </div>
                  <div className={`col-md-12 ${styles.reviewstar}`}>
                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      renderStarIcon={() => (
                        <span className={styles.starsize}>★</span>
                      )}
                      starCount={5}
                      value={overallRating.averageRating}
                    />
                  </div>
                  <div className={`col-md-12 ${styles.reviewsection}`}>
                    ({overallRating.totalReviews} Reviews)
                  </div>
                </div>
              </div>
              <div className={`col-md-4`}>
                <div className={`${styles.progressbar}`}>
                  <ProgressBar variant="success" now={80} />
                </div>
                <div className={`${styles.progressbar}`}>
                  <ProgressBar variant="info" now={60} />
                </div>
                <div className={`${styles.progressbar}`}>
                  <ProgressBar variant="warning" now={40} />
                </div>
                <div className={`${styles.progressbar}`}>
                  <ProgressBar variant="danger" now={20} />
                </div>
                <div className={`${styles.progressbar}`}>
                  <ProgressBar now={10} />
                </div>
              </div>
              <div className={`col-md-6 ${styles.servicesection}`}>
                <div className="row">
                  <div className={`col-md-3 ${styles.servicereview}`}>
                    <b>{overallRating.foodRating.toFixed(1)}</b>
                    <br></br>
                    Product
                  </div>
                  {/* <div className={`  ${styles.verticalline}`}></div> */}
                  <div className={`col-md-3 ${styles.servicereview} ${styles.verticalline}`}>
                    <b>{overallRating.serviceRating.toFixed(1)}</b>
                    <br></br>
                    Service
                  </div>
                  {/* <div className={`  ${styles.verticalline}`}></div> */}
                  <div className={`col-md-3 ${styles.servicereview} ${styles.verticalline}`}>
                    <b>{overallRating.ambienceRating.toFixed(1)}</b>
                    <br></br>
                    Ambience
                  </div>
                  {/* <div className={`  ${styles.verticalline}`}></div> */}
                  <div className={`col-md-2 ${styles.servicereview} ${styles.verticalline}`}>
                    <b>{overallRating.valueRating.toFixed(1)}</b>
                    <br></br>
                    Value
                  </div>
                </div>
                <br></br>
                {(cookies.get("id") || "") !== "" && (
                  <div className={`row ${styles.reviewbutton}`}>
                    <button onClick={() => setModalShow(true)}>
                      Write a Review
                    </button>
                    &nbsp;&nbsp;&nbsp;
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {errorStatus && (
        <>
          {(cookies.get("id") || "") !== "" && (
            <div className={`row ${styles.reviewbutton}`}>
              <button onClick={() => setModalShow(true)}>Write a Review</button>
              &nbsp;&nbsp;&nbsp;
            </div>
          )}
        </>
      )}
      <br></br>
      <hr></hr>
      <ReviewFeedback
        data={props.data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
export default OverallRatingAutomotive;
