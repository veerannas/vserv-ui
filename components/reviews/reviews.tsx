import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import styles from "./reviews.module.css";
import { useRouter } from "next/router";
import { getAutomotiveRating, getFinanceRating, getHealthRating, getRestaurantRating } from "../services/api/review-api";

const Reviews = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  // console.log("propscat=====", props.data);
  const router = useRouter();

  useEffect(() => {
    //getting data from reviews api
    fetchTotalRevies();
  }, []);

  const fetchTotalRevies = () => {
    //fetching data for reviews
    let _url = "";

    if (props.service == "restaurant") {
      getRestaurantRating(props.data)
        .then((data) => data.json())
        .then((data) => {
          //Added fetching data in list
          if (data.totalReviews != undefined) {
            setTotalReviews(data.totalReviews);
            setAverageRating(data.averageRating);
          }
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else if (props.service == "finance") {
      getFinanceRating(props.data)
        .then((data) => data.json())
        .then((data) => {
          //Added fetching data in list
          if (data.totalReviews != undefined) {
            setTotalReviews(data.totalReviews);
            setAverageRating(data.averageRating);
          }
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else if (props.service == "automotive") {
      getAutomotiveRating(props.data)
        .then((data) => data.json())
        .then((data) => {
          //Added fetching data in list
          if (data.totalReviews != undefined) {
            setTotalReviews(data.totalReviews);
            setAverageRating(data.averageRating);
          }
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else if (props.service == "health") {
      getHealthRating(props.data)
        .then((data) => data.json())
        .then((data) => {
          //Added fetching data in list
          if (data.totalReviews != undefined) {
            setTotalReviews(data.totalReviews);
            setAverageRating(data.averageRating);
          }
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

  };

  return (
    <>
      {router.pathname != "/search" && (
        <div className="row">
          <div className="col-md-2">
            <span>
              <StarRatingComponent
                name="rate2"
                editing={false}
                renderStarIcon={() => <span className={styles.starsize}>★</span>}
                starCount={5}
                value={averageRating}
              />
            </span>
          </div>
          <div className={`col-md-10 ${styles.starrating}`}>
            {averageRating.toFixed(1)}
            <MDBIcon far icon="comment-alt" className={`${styles.feedimage}`} />
            {totalReviews} Reviews
      </div>
        </div>
      )}
      {router.pathname == "/search" && (
        <>
          <div className="col-md-12">

            <div>
              <span className={`${styles.starratingcolor}`}>
                <StarRatingComponent
                  name="rate2"
                  editing={false}
                  renderStarIcon={() => <span>★</span>}
                  starCount={5}
                  value={averageRating}
                />
              </span>
              <span className={`${styles.review}`}>
                <MDBIcon far icon="comment-alt" /> {totalReviews}
                 Reviews
             </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Reviews;
