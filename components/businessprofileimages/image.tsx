import React, { useState } from 'react';
import styles from "./image.module.css";
import OverviewImg from "../../assets/images/overview.svg";
import AddressImage from "../../assets/images/Business-address.svg";
import contact_Img from "../../assets/images/businessContact.svg";
import ServicesImg from "../../assets/images/ServicesImage.svg";
import Hours_Img from "../../assets/images/businessHours.svg";
import Photos from "../../assets/images/photos.svg";
import Status from "../../assets/images/status.svg";


const Image = (props:any) => {


return (

              
              <div className="card">
                <div className="card-body">
                <div className={`${styles.cardimgcenter}`}>
                {props.link == "overview" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={OverviewImg.src}
                    alt="Card image cap"
                  />
                )}
                {props.link == "address" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={AddressImage.src}
                    alt="Card image cap"
                  />
                )}
                {props.link == "contact" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={contact_Img.src}
                    alt="Card image cap"
                  />
                )}
                {props.link == "services" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={ServicesImg.src}
                    alt="Card image cap"
                  />
                )}
                {props.link == "photos" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={Photos.src}
                    alt="Card image cap"
                  />
                )}
                {props.link == "hours" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={Hours_Img.src}
                    alt="Card image cap"
                  />
                )}
                {props.link == "status" && (
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={Status.src}
                    alt="Card image cap"
                  />
                )}
                </div>
              </div>
              </div>
        
);
};           

export default Image;