import React, { useEffect, useState } from "react";
import styles from "./address.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { MDBIcon } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Hours = (props: any) => {
  const [googleMapUrl, setGoogleMapUrl] = useState(
    "<iframe  width='100%' height='100%'  frameborder='0' src='https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Chicago United States+(Your%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' aria-hidden='false' ></iframe>"
  );
  useEffect(() => {
    var fullAddress =
      props.data.companyName +
      " " +
      props.data.cityId.city +
      " " +
      props.data.address.addressLineOne;
    let _mapUrl =
      "<iframe width='100%' height='100%' frameborder='0' src='https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=" +
      fullAddress +
      "&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' aria-hidden='false' ></iframe>";
    setGoogleMapUrl(_mapUrl);
  });
  const googleMapIframe = () => {
    return {
      __html: googleMapUrl,
    };
  };
  return (
    <div className={`col-md-12 ${styles.box}`}>
      <div className={`${styles.boxtitle}`}>
        <h4>
          <b>
            <MDBIcon icon="map-marker-alt" /> Address
          </b>
        </h4>
      </div>
      <hr></hr>
      <div className="container">
      <div>{props.data.address.addressLineOne}</div>
      <div>{props.data.stateId &&  props.data.stateId.state}</div>
      <p></p>
      {/* Displaying Google Maps with iframe using this dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={googleMapIframe()}></div>
      </div>
      <br></br>
    </div>
  );
};
export default Hours;
