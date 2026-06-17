import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Col,

  Row
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
import { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { getSentEnquiry } from "../../../components/services/api/askme-api";
import styles from "./index.module.css";


const ReviewSent = () => {
  const cookies = new Cookies();
  const [reviewData, setReviewData] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [businessData, setBusinessData] = useState({
    id: "",
    subject: "",
    message: "",
    enquiryDate: "",
    userId: {
      name: { firstName: "" }
    },
    img: "",
    reply: {
      id: "",
      subject: "",
      message: "",
      enquiryDate: "",
      userId: {
        name: { firstName: "" }
      },
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
      subject: row.subject,
      message: row.message,
      enquiryDate: row.enquiryDate,
      userId: {
        name: { firstName: row.userId.name.firstName }
      },
      img: row.userId.profile.image.image.data,
      reply: {
        id: row.reply.id,
        subject: row.reply.subject,
        message: row.reply.message,
        enquiryDate: row.reply.enquiryDate,
        userId: {
          name: { firstName: row.reply.userId.name.firstName }
        },
        img: row.reply.userId.profile.image.image.data,
        businessInfo: {
          companyName: row.reply.businessInfo.companyName
        }
      }
    });
  }

  useEffect(() => {
    fetchBusinessEnquiry();
  }, [])

  const fetchBusinessEnquiry = () => {
    // getBusinessReview(cookies.get("businessInfoId"))
    getSentEnquiry(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setReviewData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clearbuttonHandler = () => {
    // formik.values.service = obj;
    setShowBox(false);
  };

  const replyboxHandler = () => {
    // formik.values.service = obj;
    if (showbox == false) {
      setShowBox(true);
    } else {
      setShowBox(false);
    }
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
    let reviewStart = row.message.match(/.{1,40}/g);

    // let date=row.reviewDate.toLocaleDateString();
    // let time =row.reviewDate.toLocaleTimeString();
    // let n=date.concat(time)

    return (
      <Row key={"b_" + rowIndex} onClick={(_e) => showDetails(row)}>
        <Col className={styles.photo}>
          <img
            src={`data:image/jpeg;base64,${row.userId.profile.image.image.data}`}
            className={`card-img-top ${styles.prfolePhoto}`}
            alt="..."
          />
        </Col>
        <Col className={styles.businessdata}>
          <div className={styles.owner}>{row.userId.name.firstName}</div>
          <div className={styles.reviewDate}>{moment(row.enquiryDate).format("MM-DD-YYYY HH:mm")}</div>
          <div className={styles.starsize}>
            <br></br>
          </div>
          <div className={styles.reviewTitle}>{row.subject}</div>
          <div className={styles.reviewStart}>{reviewStart[0]}...
              {/* <i className={`far fa-trash-alt ${styles.hiddenicons}`}></i>
            <i className={`fas fa-envelope-open-text ${styles.hiddenicons}`}></i>
            <i className={`fas fa-reply ${styles.hiddenicons}`}></i> */}
          </div>
        </Col>
      </Row>
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
      {/* <i className={`far fa-trash-alt ${styles.tabletrashicons}`}></i>
      <i className={`fas fa-envelope-open-text ${styles.tableenvelopopenicons}`}></i>
      <i className={`fas fa-envelope ${styles.tableenvelopcloseicons}`}></i> */}
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
                  &nbsp; <span className={styles.busOwner}>{businessData.userId.name.firstName}</span>
                  <span className={styles.reviewstarsize}>

                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  {/* <span><i className={`far fa-trash-alt ${styles.deleteicon}`}></i></span> */}
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
                <Row className={styles.sentbox}>
                  <div onClick={sentboxHandler}> ... </div><br />
                </Row>
                <Row>
                  {showbox && (
                    <div className={styles.sentreplybox}>
                      <div>{moment(businessData.reply.enquiryDate).format("MM-DD-YYYY HH:mm")}</div><br />
                      <div>{businessData.reply.businessInfo.companyName}</div><br />
                      <div><b>Reply,</b></div><br />
                      <div>{businessData.reply.message}</div><br />
                      <div>Thank you {businessData.userId.name.firstName} , Hope to see you again. </div>
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
