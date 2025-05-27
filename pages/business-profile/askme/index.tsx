import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import AskmeNavbar from "../../../components/askme-navbar/askmenavbar";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
// import ReviewAndAskMe_Img from "../../../assets/images/reviewandaskme.svg";
import AskMeInbox from "./inbox";
import styles from "./index.module.css";
import AskMeSent from "./sent";
import AskMeTrash from "./trash";
import { Cookies } from "react-cookie";

const Review = () => {
  const cookies = new Cookies();

  const [link, setLink] = useState("inbox");
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
                <i className="fa fa-question-circle" aria-hidden="true"></i> AskMe
              </div>
              <div className={`${styles.wrimagecardcontent}`}>
                <BreadCrum />
              </div>
            </div>
            <br></br>

            <div className={styles.askmenavbar}>
              <AskmeNavbar link={link} setLink={setLink} />
            </div>
            <br></br>
            <div className="row">

              <div className="col-md-12">
                <Row>
                  {link == "inbox" && (<AskMeInbox />)}
                  {link == "sent" && (<AskMeSent />)}
                  {link == "trash" && (<AskMeTrash />)}
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
