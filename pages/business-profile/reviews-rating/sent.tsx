import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import StarRatingComponent from "react-star-rating-component";
import * as yup from "yup";
import { getSentReviews } from "../../../components/services/api/review-api";
import styles from "./index.module.css";
import moment from "moment";

const ReviewSent = () => {
  const cookies = new Cookies();
  const [reviewData, setReviewData] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [businessData, setBusinessData] = useState({
    id: "",
    reviewTitle: "",
    review: "",
    rating: 0,
    reviewDate: "",
    reviewUser: {
      name: { firstName: "" }
    },
    Owner: "",
    img: "",
    reply: {
      id: "",
      reviewTitle: "",
      review: "",
      rating: 0,
      reviewDate: "",
      reviewUser: {
        name: { firstName: "" }
      },
      Owner: "",
      img: "",
      businessInfo: {
        companyName: ""
      }

    }
  });

  const [details, setDetails] = useState(false);
  const [showbox, setShowBox] = useState(false);

  const sentboxHandler = () => {
    // formik.values.service = obj;
    if (showbox == false) {
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const showDetails = (row: any) => {
    setDetails(!details);
    setBusinessData({
      id: row.id,
      reviewTitle: row.reviewTitle,
      review: row.review,
      rating: row.rating,
      reviewDate: row.reviewDate,
      reviewUser: {
        name: { firstName: row.reviewUser.name.firstName }
      },
      Owner: row.Owner,
      img: row.reviewUser.profile.image.image.data,
      reply: {
        id: row.reply.id,
        reviewTitle: row.reply.reviewTitle,
        review: row.reply.review,
        rating: row.reply.rating,
        reviewDate: row.reply.reviewDate,
        reviewUser: {
          name: { firstName: row.reply.reviewUser.name.firstName }
        },
        Owner: row.reply.Owner,
        img: row.reply.reviewUser.profile.image.image.data,
        businessInfo: {
          companyName: row.reply.businessInfo.companyName
        }
      }
    });
  }

  useEffect(() => {
    fetchBusinessReview();
  }, [])

  const fetchBusinessReview = () => {
    getSentReviews(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setReviewData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const formik = useFormik({
    initialValues: {
      reviewReply: "",
    },
    validationSchema: yup.object({
      reviewReply: yup.string()
        .required("Reply to the Review ")
        .max(140, " Reply should be 140 characters long "),
    }),
    onSubmit: (values: any) => {
      console.log(values);
    },
  });
  const businessDataFormatter = (_rowContent: any, row: any, rowIndex: any) => {
    let reviewStart = row.review.match(/.{1,40}/g);

    // let date=row.reviewDate.toLocaleDateString();
    // let time =row.reviewDate.toLocaleTimeString();
    // let n=date.concat(time)

    return (
      <Row key={"b_" + rowIndex} onClick={(_e) => showDetails(row)} >
        <Col className={styles.photo}>
          <img
            src={`data:image/jpeg;base64,${row.reviewUser.profile.image.image.data}`}
            className={`card-img-top ${styles.prfolePhoto}`}
            alt="..."
          />
        </Col>
        <Col className={styles.businessdata}>
          <div className={styles.owner}>{row.reviewUser.name.firstName}</div>
          <div className={styles.reviewDate}>{moment(row.reviewDate).format("MM-DD-YYYY HH:mm")}</div>
          <div className={styles.starsize}>
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIcon={() => <span>★</span>}
              starCount={5}
              value={row.rating}
            />
          </div>
          <div className={styles.reviewTitle}>{row.reviewTitle}</div>
          <div className={styles.reviewStart}>{reviewStart[0]}...
          </div>
        </Col>
      </Row>
    );
  };
  const columns = [
    {
      dataField: 'businessData',
      text: '',
      formatter: businessDataFormatter
    }
  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false
  };

  const { SearchBar } = Search;
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <BootstrapTable
            keyField='id'
            data={reviewData}
            columns={columns}
            bordered={false}
            selectRow={selectRow}
          />

        </Col>
        <Col>
          <div hidden={!details}>
            <Row>
              <Col>
                <div>
                  <img
                    src={`data:image/jpeg;base64,${businessData.img}`}
                    className={`card-img-top ${styles.prfolePhoto}`}
                    alt="..."
                  />
                  &nbsp; <span className={styles.busOwner}>{businessData.reviewUser.name.firstName}</span>
                  <span className={styles.reviewstarsize}>
                    <StarRatingComponent
                      name="rate3"
                      editing={false}
                      renderStarIcon={() => <span>★</span>}
                      starCount={5}
                      value={businessData.rating}
                    />
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className={styles.busReviewTitle}>
                      {businessData.reviewTitle}
                      <span className={styles.reviewDatecolor}>{moment(businessData.reviewDate).format("MM-DD-YYYY HH:mm")}</span>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <div className={styles.busreview}>
                      {businessData.review}
                    </div>
                  </Col>
                </Row>
                <br />
                <Row className={styles.sentbox}>
                  <div onClick={sentboxHandler}> ... </div><br />
                </Row>
                <Row>
                  {showbox && (
                    <div className={styles.sentreplybox}>
                      <div>{moment(businessData.reply.reviewDate).format("MM-DD-YYYY HH:mm")}</div><br />
                      {/* <div>{businessData.reply.businessInfo.companyName}</div><br /> */}
                      <div><b>Reply,</b></div><br />
                      <div>{businessData.reply.review}</div><br />
                      <div>Thank you {businessData.reviewUser.name.firstName} , Hope to see you again. </div>
                    </div>
                  )}
                </Row>

              </Col>
            </Row>
          </div>
        </Col>
      </Row>

    </div>
  );
};
export default ReviewSent;
