import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import StarRatingComponent from "react-star-rating-component";
import { getReviews } from "../services/api/review-api";
import styles from "./userreview.module.css";
import ReactPaginate from 'react-paginate';
import { Col, Row } from "react-bootstrap";

const UserReview = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const router = useRouter();

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    //getting data from reviews api
    // fetchData();
  }, []);

  const fetchData = () => {
    //fetching data for reviews
    getReviews(props.data)
      .then((data) => data.json())
      .then((res) => {
        //Added fetching data in lists
        // setList(res);
        setLoading(true);
        const data = res;
        const slice = data.slice(offset, offset + perPage)
        const postData = slice.map((pd: any, index: any) => <div key={pd.id}>
          <Reviews data={pd} />
        </div>)
        setData(postData)
        setPageCount(Math.ceil(data.length / perPage))
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage)
  };

  useEffect(() => {
    console.log("offset=========", offset)
    fetchData()
  }, [offset])


  return (
    <div>
      <div className="App">
        {loading ? (
          <div className="row">
            <div className="offer-dedicated-body-left">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade active show"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                >
                  <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                    {data}
                    {/* <hr></hr>
                  <a
                    className="text-center w-100 d-block mt-4 font-weight-bold"
                    href="#"
                  >
                    See All Reviews
                  </a> */}

                    <div className={styles.paginate}>
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        // subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>...Data Loading.....</div>
        )}


      </div>

    </div>
  );
};
export default UserReview;

const Reviews = (props: any) => {

  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const replyFUnc = () => {
    { isReplyOpen ? setIsReplyOpen(false) : setIsReplyOpen(true) }
  }

  return (
    <>
      <div>
        <div className="reviews-members pt-4 pb-4">
          <div className="media">
            <Row>
              <Col md={1}>
              <a href="#">
                <img
                  alt="Generic placeholder image"
                  src={`data:image/jpeg;base64,${props.data.reviewUser.profile.image.image.data}`}
                  className="mr-3 rounded-pill"
                />
              </a>
              </Col>
              <Col>
              <div className="media-body media-padding">
                <div className="reviews-members-header">
                  <span className="star-rating float-right">
                    <a href="#">
                      <i className="icofont-ui-rating active"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-ui-rating active"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-ui-rating active"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-ui-rating active"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-ui-rating"></i>
                    </a>
                  </span>
                  <h6 className="mb-1">
                    <div className={styles.starratingleft}>
                      <StarRatingComponent
                        name="rate2"
                        editing={false}
                        renderStarIcon={() => (
                          <span className={styles.starsize}>
                            ★
                          </span>
                        )}
                        starCount={5}
                        value={props.data.rating}
                      />
                    </div>
                    <a className="text-black" >
                      {props.data.reviewUser.name.firstName}&nbsp;
                      {props.data.reviewUser.name.lastName}&nbsp;&nbsp;
                      {moment(props.data.reviewDate).format("MM-DD-YYYY HH:mm")}
                    </a>
                  </h6>
                  <p className="text-gray ">
                    <b>{props.data.reviewTitle}</b>
                  </p>
                </div>
                <div className="reviews-members-body">
                  <p>
                    <ReactReadMoreReadLess
                      charLimit={200}
                      readMoreText={
                        <b>
                          <br></br>Read more ▼
                        </b>
                      }
                      readLessText={
                        <b>
                          <br></br>Read less ▲
                        </b>
                      }
                    >
                      {props.data.review}
                    </ReactReadMoreReadLess>
                  </p>
                  {props.data.replied == true && (
                    <p onClick={replyFUnc} className="cursor-pointer text-muted font-weight-normal">Replies</p>
                  )}
                </div>
              </div>
              </Col>
            </Row>
          </div>
        </div>

        {/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
        {/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}

        {props.data.replied == true && isReplyOpen == true && (
          <div key={"rep_" + props.index}>
            <div className={`reviews-members pt-4 pb-4 ${styles.replysection}`}>
              <div className="media">
                <a href="#">
                  <img
                    alt="Generic placeholder image"
                    src={`data:image/jpeg;base64,${props.data.reply.reviewUser.profile.image.image.data}`}
                    className="mr-3 rounded-pill"
                  />
                </a>
                <div className="media-body">
                  <div className="reviews-members-header">
                    <span className="star-rating float-right">
                      <a href="#">
                        <i className="icofont-ui-rating active"></i>
                      </a>
                      <a href="#">
                        <i className="icofont-ui-rating active"></i>
                      </a>
                      <a href="#">
                        <i className="icofont-ui-rating active"></i>
                      </a>
                      <a href="#">
                        <i className="icofont-ui-rating active"></i>
                      </a>
                      <a href="#">
                        <i className="icofont-ui-rating"></i>
                      </a>
                    </span>
                    <h6 className="mb-1">
                      <div className={styles.starratingleft}>
                        {/* <StarRatingComponent
                                            name="rate2"
                                            editing={false}
                                            renderStarIcon={() => (
                                              <span className={styles.starsize}>
                                                ★
                                              </span>
                                            )}
                                            starCount={5}
                                            value={d.reply.rating}
                                          /> */}
                      </div>
                      <a className="text-black" href="#">
                        {props.data.reply.reviewUser.name.firstName}&nbsp;
                        {props.data.reply.reviewUser.name.lastName}&nbsp;&nbsp;
                        {moment(props.data.reply.reviewDate).format("MM-DD-YYYY HH:mm")}
                      </a>
                    </h6>
                    {/* <p className="text-gray ">
                                        <b>{d.reviewTitle}</b>
                                      </p> */}
                  </div>
                  <div className="reviews-members-body">
                    <p>
                      <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={
                          <b>
                            <br></br>Read more ▼
                          </b>
                        }
                        readLessText={
                          <b>
                            <br></br>Read less ▲
                          </b>
                        }
                      >
                        {props.data.reply.review}
                      </ReactReadMoreReadLess>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}



        {/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
        {/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}










        <hr></hr>
      </div>



    </>
  )
}
