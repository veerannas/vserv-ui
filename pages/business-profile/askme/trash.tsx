import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Col, Row
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import MessageBox from "../../../components/messagebox/messagebox";
import { getdeleteEnquiry, getReadEnquiry, postEnquiryDelete } from "../../../components/services/api/askme-api";
import styles from "./index.module.css";


const ReviewTrash = () => {
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
    getdeleteEnquiry(cookies.get("businessInfoId"))
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




  const changeSideColor = (rowIndex: any) => {
    setIndexValue(rowIndex);
  }


  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    bgColor: "#DDF7DE"
  };

  const deleteEnquiry = (e: any, rowId: string) => {
    e.stopPropagation();
    let enquiry = {
      id: rowId,
      isDeleted: true
    }
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
      text: "",
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

              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ReviewTrash;

const ReviewColumn = (props: any) => {
  let reviewStart = props.row.message.match(/.{1,40}/g);
  const [isRead, setIsRead] = useState(props.row.read);

  const showDetails = () => {
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


  return (

    <div key={"b_" + props.rowIndex} onClick={(_e) => showDetails()}
      className={`row`}
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
            {/* <i className={`far fa-trash-alt ${styles.hiddenicons}`} onClick={(e) => props.deleteEnquiry(e, props.row.id)}></i>
            {isRead ? <i className={`fas fa-envelope-open-text ${styles.hiddenicons}`}></i> : <i className={`fas fa-envelope ${styles.hiddenicons}`} onClick={(e) => markUsRead(e)}></i>}
            <i className={`fas fa-reply ${styles.hiddenicons}`} onClick={(e) => unReadFunc(e)}></i> */}
          </div>
        </div>
      </div>
    </div>

  );
}
