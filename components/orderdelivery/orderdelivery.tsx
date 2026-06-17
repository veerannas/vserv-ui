import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./orderdelivery.module.css";

const OrderDelivery = (props: any) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleChangeDate = (e: any) => {
    setStartDate(e.value);
  };
  return (
    <div className={`col-md-12 ${styles.box}`}>
      <div className={`${styles.boxtitle}`}>
        <h4>
          <b>
            <MDBIcon icon="user-circle" /> Contact
          </b>
        </h4>
      </div>
      <hr></hr>
      <div className={`container`}>
        <div className={`${styles.boxicon}`}>
          <MDBIcon icon="phone-alt" /> Phone
        </div>
        <div>{(props.data.vendor || "") != "" && (props.data.vendor.managingDirector.mobileNumber.number || "") != "" ? props.data.vendor.managingDirector.mobileNumber.number : ""}  Reception</div>
        <div>{(props.data.telephone.number || "") != "" ? props.data.telephone.number : ""} Manager </div>
        <div className={`${styles.boxicon}`}>
          <MDBIcon icon="envelope" /> Email
        </div>
        <div>
          <a className={`${styles.boxicon} `} href="#">
            <u>{(props.data.email || "") != "" ? props.data.email : ""} </u>
          </a>
        </div>
        <div className={`${styles.boxicon} `}>
          <MDBIcon icon="globe" /> Website
        </div>
        <div>
          <a className={`${styles.boxicon} `} href="#">
            <u>{(props.data.profile && props.data.profile.websiteUrl || "") != "" ? props.data.profile.websiteUrl : ""} </u>
          </a>
        </div>
      </div>
      <p></p>
      <br></br>
    </div>
  );
};
export default OrderDelivery;
