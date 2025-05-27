import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Search } from "react-bootstrap-table2-toolkit";
// import cellEditFactory from "react-bootstrap-table2-editor";
import StarRatingComponent from "react-star-rating-component";
import * as yup from "yup";
import styles from "./index.module.css";


const ReviewTrash = () => {
  const [businessData, setBusinessData] = useState({
    reviewTitle: "",
    review: "",
    rating: 0,
    reviewDate: Date,
    Owner: "",
  });
  const [details, setDetails] = useState(false);
  const showDetails = (row: any) => {
    setDetails(!details);
    setBusinessData({
      reviewTitle: row.reviewTitle,
      review: row.review,
      rating: row.rating,
      reviewDate: row.reviewDate,
      Owner: row.Owner,
    });
  };

  const [showbox, setShowBox] = useState(false);
  const replyboxHandler = () => {
    // formik.values.service = obj;
    if (showbox == false) {
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const clearbuttonHandler = () => {
    // formik.values.service = obj;
      setShowBox(false);
  };
  const formik = useFormik({
    initialValues: {
      reviewReply: "",
    },
    validationSchema: yup.object({
      reviewReply: yup.string()
      .required("Reply to the Review ")
      .max(140," Reply should be 140 characters long "),
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
      <div key={"b_" + rowIndex} onClick={(_e) => showDetails(row)} className={`row ${styles.businessCol}`}>
        <div className={styles.photo}>
          <img
            src="https://www.freeiconspng.com/uploads/customers-icon-3.png"
            className={`card-img-top ${styles.prfolePhoto}`}
            alt="..."
          />
        </div>
        <div className={styles.businessdata}>
          <div className={styles.owner}>{row.Owner}</div>
          <div className={styles.reviewDate}>{row.reviewDate}</div>
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
              <i className={`far fa-trash-alt ${styles.hiddenicons}`}></i>
              <i className={`fas fa-envelope-open-text ${styles.hiddenicons}`}></i>
          </div>
        </div>
      </div>
    );
  };
  //   const photFormatter = () => {
  //     return (
  //       <div>
  //         <img
  //           src="https://www.freeiconspng.com/uploads/customers-icon-3.png"
  //           className={`card-img-top ${styles.prfolePhoto}`}
  //           alt="..."
  //         />
  //       </div>
  //     );
  //   };
  const columns = [
    // {
    //   dataField: "profilePhoto",
    //   text: "",
    //   formatter: photFormatter,
    // },
    {
      dataField: 'businessData',
      text: '',
      // editCellStyle: (cell: any, row: any, rowIndex: any, colIndex: any) => {
      //   const icon = { style: 'class="far fa-trash-alt">' };
      //   return { icon };
      // },
      formatter: businessDataFormatter
    }
    // {
    //   dataField: "star",
    //   text: "",
    //   formatter: starFormatter,
    // },
  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false
  };
  
  const data = [
    {
      id: 1,
      reviewTitle: "Good Service",
      review:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections",
      rating: 3.275,
      reviewDate: "2021-03-31 12:50PM",
      Owner: "Olean Johnson",
    },
    {
      id: 2,
      reviewTitle: "bad Service",
      review:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections",
      rating: 2,
      reviewDate: "2021-03-30 12:50PM",
      Owner: "Olean Johnson",
    },
    {
      id: 3,
      reviewTitle: "ok Service",
      review:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections",
      rating: 4,
      reviewDate: "2021-03-28 12:50PM",
      Owner: "Olean Johnson",
    },
  ];
  const { SearchBar } = Search;
  return (
    <div className="container-fluid">
      <i className={`far fa-trash-alt ${styles.tabletrashicons}`}></i>
      <i className={`fas fa-envelope-open-text ${styles.tableenvelopopenicons}`}></i>
      
      <Row>
        <Col>
          <BootstrapTable
            keyField='id'
            data={data}
            columns={columns}
            bordered={false}
            selectRow={ selectRow }
            // cellEdit={cellEditFactory({ mode: "click" })}
          />
          {/* <ToolkitProvider
              keyField="id"
              data={data}
              columns={columns}
              wrapperClasses="bootstrap-table-border"
              search
            >
              {(props:any) => (
                <div>
                  <div className="text-right">
                    <SearchBar
                      {...props.searchProps}
                      className={` custome-search-field ${styles.searchBar}`}
                    />
                  </div>
                  <BootstrapTable
                    {...props.baseProps}
                    bordered={false}
                    selectRow={selectRow}
                    data={data}
                    columns={columns}
                  />
                </div>
              )}
            </ToolkitProvider> */}
        </Col>
        <Col>
          <div hidden={!details}>
          <Row>
              <Col>
                <div>
                  <img
                    src="https://www.freeiconspng.com/uploads/customers-icon-3.png"
                    className={`card-img-top ${styles.prfolePhoto}`}
                    alt="..."
                  />
                  &nbsp; <span className={styles.busOwner}>{businessData.Owner}</span>
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
                    <span><i className={`fas fa-envelope-open-text ${styles.inboxicon}`}></i></span>
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
                      <span className={styles.reviewDatecolor}>{businessData.reviewDate.toLocaleString()}</span>
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
                { !showbox && (
                <Button
                          variant="primary"
                          type="submit"
                          className={`${styles.formcontrolsend}`}
                          onClick={replyboxHandler}
                        ><i className={`fas fa-reply ${styles.replyicon}`}></i>
                        &nbsp;
                          Reply 
                        </Button>
                )}
                
                { showbox && (
                <Form onSubmit={formik.handleSubmit} className={styles.replyform}>
                  <Row>
                    <Col md={11} className={styles.replyTextArea}>
                      <Form.Group 
                      controlId="ControlTextarea">
                        <Form.Label className={styles.ownername}>
                            To : {businessData.Owner}
                        </Form.Label>
                        <hr />
                        <Form.Control
                          as="textarea"
                          name="reviewReply"
                          placeholder="write your response here..."
                          rows={3}
                          cols={20}
                          value={formik.values.reviewReply}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.reviewReply}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.reviewReply as string}
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Col>
                    </Row>
                    <br/>
                    <Form.Group className={`${styles.formcontrolbuttonright}`}>
                        <Button
                          variant="primary"
                          type="submit"
                          className={`${styles.formcontrolsend}`}
                        >
                          Clear 
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className={`${styles.formcontrolsend}`}
                          >
                            Send <i className={`fas fa-paper-plane ${styles.sendicon}`}></i>
                          </Button>
                    </Form.Group>
                </Form>
                 )} 
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ReviewTrash;
