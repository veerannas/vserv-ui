import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import Ratings from "react-ratings-declarative";
import * as yup from "yup";
import { postAddAotomotiveReview } from "../services/api/review-api";
import styles from "./reviewfeedback.module.css";

const ReviewFeedbackFinance = (props: any) => {
  const cookies = new Cookies();
  const [ambienceRating, setFoodRating] = useState(1);
  const [serviceRating, setServiceRating] = useState(1);
  const [productRating, setAmbienceRating] = useState(1);
  const [valueRating, setValueRating] = useState(1);

  const [reviewData, setReviewData] = useState({
    ambienceRating: 0,
    serviceRating: 0,
    productRating: 0,
    valueRating: 0,
    reviews: {
      reviewUser: { id: cookies.get("id") },
      businessInfo: props.data.id,
      reviewTitle: "",
      review: "",
    },
    businessInfo: props.data.id,
  });
  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: { reviewData },
    //it is used for validation
    validationSchema: yup.object({
      reviewData: yup.object().shape({
        reviews: yup.object().shape({
          reviewTitle: yup.string().required("TItle is required."),
          review: yup.string().required("Review is required"),
        }),
      }),
    }),
    //form submit call
    onSubmit: (values) => {
      //post call to update user data
      //console.log("==============" + JSON.stringify(values));
      let reviewData = {
        reviews: {
          reviewUser: { id: cookies.get("id") },
          businessInfo: { id: props.data.id },
          reviewTitle: values.reviewData.reviews.reviewTitle,
          review: values.reviewData.reviews.review,
        },
        ambienceRating: ambienceRating,
        serviceRating: serviceRating,
        productRating: productRating,
        valueRating: valueRating,
        businessInfo: { id: props.data.id },
      };

      postAddAotomotiveReview(reviewData)
        .then((response) => response.text())
        .then((response) => {
          //console.log("response=========" + response);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const changeFoodRating = (newRating: any) => {
    setFoodRating(newRating);
  };

  const changeServiceRating = (newRating: any) => {
    setServiceRating(newRating);
  };

  const changeAmbienceRating = (newRating: any) => {
    setAmbienceRating(newRating);
  };

  const changeValueRating = (newRating: any) => {
    setValueRating(newRating);
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Write a Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <div className="row">
          <div className="col-md-3">
            <img
              src={`data:image/jpeg;base64,${props.data.wallPaper[0].image.data}`}
              width="100%"
            ></img>
          </div>
          <div className={`col-md-9 ${styles.reviewtitle}`}>
            {props.data.companyName}
          </div>
        </div>
        <hr></hr>

        <div className="row"></div>

        <Form noValidate onSubmit={formik.handleSubmit}>
          <br/><Row>
            <Form.Group as={Col} md="12" controlId="validationFormik103">
              <InputGroup>
                <InputGroup.Text>
                  <InputGroup.Text id="inputGroupText">
                    <MDBIcon icon="align-justify" />
                  </InputGroup.Text>
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Review Title"
                  aria-describedby="inputGroupText"
                  name="reviewData.reviews.reviewTitle"
                  value={formik.values.reviewData.reviews.reviewTitle}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.reviewData?.reviews?.reviewTitle}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.reviewData?.reviews?.reviewTitle}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <br/><Row>
            <Form.Group as={Col} md="12" controlId="validationFormik104">
              <InputGroup>
                <InputGroup.Text>
                  <InputGroup.Text id="inputGroupText">
                    <MDBIcon icon="comment" />
                  </InputGroup.Text>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Review Description"
                  aria-describedby="inputGroupText"
                  name="reviewData.reviews.review"
                  value={formik.values.reviewData.reviews.review}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.reviewData?.reviews?.review}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.reviewData?.reviews?.review}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <hr></hr>
          <br/><Row>
            <Col md="2">
              <Form.Label>Trust</Form.Label>
            </Col>
            <Col md="4">
              <Ratings
                rating={ambienceRating}
                widgetRatedColors="red"
                changeRating={changeFoodRating}
                widgetDimensions="15px"
                // widgetSpacings="5px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </Col>
            <Col md="2">
              <Form.Label>Service</Form.Label>
            </Col>
            <Col md="4">
              <Ratings
                rating={serviceRating}
                widgetRatedColors="red"
                changeRating={changeServiceRating}
                widgetDimensions="15px"
                // widgetSpacings="5px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </Col>
          </Row>
          <br/><Row>
            <Col md="2">
              <Form.Label>Support</Form.Label>
            </Col>
            <Col md="4">
              <Ratings
                rating={productRating}
                widgetRatedColors="red"
                changeRating={changeAmbienceRating}
                widgetDimensions="15px"
                // widgetSpacings="5px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </Col>
            <Col md="2">
              <Form.Label>Value</Form.Label>
            </Col>
            <Col md="4">
              <Ratings
                rating={valueRating}
                widgetRatedColors="red"
                changeRating={changeValueRating}
                widgetDimensions="15px"
                // widgetSpacings="5px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </Col>
          </Row>
          <hr></hr>
          <Button
            type="submit"
            id="btnLogin"
            className={`btn  btn-sm  ${styles.reviewsubmit}`}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};
export default ReviewFeedbackFinance;
