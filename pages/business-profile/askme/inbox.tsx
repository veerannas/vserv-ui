import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import MessageBox from "../../../components/messagebox/messagebox";
import { getPrimaryEnquiry, getReadEnquiry, postEnquiryDelete, postEnquiryReply, postReadUnreadEnquiry } from "../../../components/services/api/askme-api";
import styles from "./index.module.css";


const Reviewindex = () => {
  const cookies = new Cookies();
  const [enquiryData, setEnquiryData] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [indexValue, setIndexValue] = useState("0.1");
  const [unreadReview, setUnReadReview] = useState(0);

  const [businessData, setBusinessData] = useState({
    id: "",
    subject: "",
    message: "",
    enquiryDate: "",
    userId: {
      name: { firstName: "" }
    },
    Owner: "",
    img: ""
  });

  const [details, setDetails] = useState(false);
  const [businessColStlValue, setBusinessColStlValue] = useState(false);
  const showDetails = (row: any) => {
    setBusinessColStlValue(true);
    setDetails(!details);
    setBusinessData({
      id: row.id,
      subject: row.subject,
      message: row.message,
      enquiryDate: row.enquiryDate,
      userId: {
        name: { firstName: row.userId.name.firstName }
      },
      Owner: row.Owner,
      img: row.userId.profile.image.image.data
    });

  };

  useEffect(() => {
    fetchBusinessEnquiry();
    fetchReadReviews();
  }, [])

  const fetchBusinessEnquiry = () => {
    getPrimaryEnquiry(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setEnquiryData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchReadReviews = () => {
    getReadEnquiry(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setUnReadReview(data);
      })
      .catch((error) => {
        console.log(error);
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
    setShowBox(false);
  };


  const formik = useFormik({
    initialValues: {
      reviewReply: "",
    },
    validationSchema: yup.object({
      reviewReply: yup.string()
        .required("Reply to the Enquiry")
        .max(140, " Reply should be 140 characters long "),
    }),
    onSubmit: (values: any) => {
      let enquiry = {
        id: businessData.id,
        message: values.reviewReply,
        userId: { id: cookies.get("id") }
      }
      setIsMessage(false);
      postEnquiryReply(enquiry)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          setVariant("success");
          setMessage("Sent message successfully.");
          setShowBox(false);
          setDetails(false);
          fetchBusinessEnquiry();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const changeSideColor = (rowIndex: any) => {
    setIndexValue(rowIndex);
  }
 

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    bgColor: "#DDF7DE"
  };

  const deleteEnquiry = (e:any,rowId: string) => {
    e.stopPropagation();
    let enquiry = {
      id: rowId,
      deleted: true,
    }
    alert(enquiry.deleted)
    postEnquiryDelete(enquiry)
      .then((response) => response.text())
      .then((response) => {
        setIsMessage(true);
        setVariant("success");
        setMessage("Enquiry Deleted successfully.");
        setShowBox(false);
        setDetails(false);
        fetchBusinessEnquiry();
        fetchReadReviews();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const businessDataFormatter = (_rowContent: any, row: any, rowIndex: any) => {

    return (
      <ReviewColumn row={row} rowIndex={rowIndex} setDetails={setDetails} setBusinessData={setBusinessData}
        indexValue={indexValue}
        setIndexValue={setIndexValue}
        changeSideColor={changeSideColor}
        fetchReadReviews={fetchReadReviews}
        deleteEnquiry={deleteEnquiry}
      />
    );
  };

  const columns = [
    {
      dataField: 'businessData',
      text: unreadReview + " Unread",
      formatter: businessDataFormatter,
    }
  ];

  const { SearchBar } = Search;
  return (
    <div className="container-fluid">
      {/* <i className={`far fa-trash-alt ${styles.tabletrashicons}`}></i>
      <i className={`fas fa-envelope-open-text ${styles.tableenvelopopenicons}`}></i>
      <i className={`fas fa-envelope ${styles.tableenvelopcloseicons}`}></i> */}
      <Row>
        <Col>
          <BootstrapTable
            keyField='id'
            data={enquiryData}
            columns={columns}
            selectRow={selectRow}
            bordered={false}
          />
        </Col>
        <Col>
          {isMessage ? (
            <MessageBox variant={variant} message={message} />
          ) : (
            ""
          )}
          <div hidden={!details}>
            <Row>
              <Col>
                <div>
                  <img
                    src={`data:image/jpeg;base64,${businessData.img}`}
                    className={`card-img-top ${styles.prfolePhoto}`}
                    alt="..."
                  />
                  &nbsp; <span className={styles.busOwner}>{businessData.userId.name.firstName}</span>
                  <span className={styles.reviewstarsize}>
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <span><i className={`far fa-trash-alt ${styles.deleteicon}`} onClick={(e) => deleteEnquiry(e,businessData.id)}></i></span>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className={styles.busReviewTitle}>
                      {businessData.subject}
                      <span className={styles.reviewDatecolor}>{moment(businessData.enquiryDate).format("MM-DD-YYYY HH:mm")}</span>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <div className={styles.busreview}>
                      {businessData.message}
                    </div>
                  </Col>
                </Row>
                <br />
                {!showbox && (
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

                {showbox && (
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
                        onClick={clearbuttonHandler}
                      >
                        Clear
                        </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        className={`${styles.formcontrolsend}`}
                      >
                        Send
                            <i className={`fas fa-paper-plane ${styles.sendicon}`}></i>
                      </Button>
                    </Form.Group>
                    <br/>
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
export default Reviewindex;

const ReviewColumn = (props: any) => {
  let reviewStart = props.row.message.match(/.{1,40}/g);
  const [isRead, setIsRead] = useState(props.row.read);

  const showDetails = () => {
    props.changeSideColor(props.rowIndex);
    props.setIndexValue(props.rowIndex);

    readFunc();
    props.setDetails(true);
    props.setBusinessData({
      id: props.row.id,
      subject: props.row.subject,
      message: props.row.message,
      enquiryDate: props.row.enquiryDate,
      userId: {
        name: { firstName: props.row.userId.name.firstName }
      },
      Owner: props.row.Owner,
      img: props.row.userId.profile.image.image.data
    });
  };

  const markUsRead = (e: any) => {
    e.stopPropagation();
    props.changeSideColor(props.rowIndex);
    readFunc();
  }

  const readFunc = () => {
    let data = {
      id: props.row.id,
      read: true
    }
    postReadUnreadEnquiry(data)
      .then((response) => response.text())
      .then((response) => {
        setIsRead(true);
        props.fetchReadReviews();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const unReadFunc = (e: any) => {
    e.stopPropagation();
    let data = {
      id: props.row.id,
      read: false
    }
    postReadUnreadEnquiry(data)
      .then((response) => response.text())
      .then((response) => {
        setIsRead(false);
        props.setDetails(false);
        props.fetchReadReviews();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <div key={"b_" + props.rowIndex} onClick={(_e) => showDetails()}
      className={isRead ? `row` : `row ${styles.businessCol}`}
    >
      <div className={props.indexValue == props.rowIndex ? `${styles.sideline}` : `${styles.notsideline} `}>

        <div className={styles.photo}>
          <img
            src={`data:image/jpeg;base64,${props.row.userId.profile.image.image.data}`}

            className={`card-img-top ${styles.prfolePhoto}`}
            alt="..."
          />
        </div>
        <div className={styles.businessdata}>
          <div className={styles.owner}>{props.row.userId.name.firstName}</div>
          <div className={styles.reviewDate}>{moment(props.row.enquiryDate).format("MM-DD-YYYY HH:mm")}
          </div>
          <br></br>
          <div className={styles.subject}>{props.row.subject}</div>
          <div className={styles.reviewStart}>{reviewStart[0]}...
            <i className={`far fa-trash-alt ${styles.hiddenicons}`} onClick={(e)=>props.deleteEnquiry(e,props.row.id)} data-toggle="tooltip" data-placement="top" title="Delete"></i>
            {isRead ? <i className={`fas fa-envelope-open-text ${styles.hiddenicons}`} data-toggle="tooltip" data-placement="top" title="Unread" onClick={(e) => unReadFunc(e)}></i> : <i className={`fas fa-envelope ${styles.hiddenicons}`} onClick={(e) => markUsRead(e)} data-toggle="tooltip" data-placement="top" title="Read"></i>}
            <i className={`fas fa-reply ${styles.hiddenicons}`}  data-toggle="tooltip" data-placement="top" title="Reply"></i>
          </div>
        </div>
      </div>
    </div>

  );
}
