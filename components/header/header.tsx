import homeImage from "./homescreen image.png";
import React, { Component } from "react";
import styles from "./header.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default class Header extends Component {
  render() {
    return (
      <div>
        <section className={`jumbotron ${styles.customjumbo}`}>
          <div className="container">
            <div className="row">
              <div className="col-sm-5">
                <h1 className={`${styles.mainheading}`}>
                  Simple. Online. Powerful
                </h1>
                <p className={`${styles.mainheadingcontent}`}>
                  Central Hub for all kind of reservations.<br></br>
                  Allows any Businesses to get access to a reservation system
                  and to let their customers simply book online. <br></br>
                  <span style={{ color: "#FF784F" }}>24/7 availability.</span>
                </p>
              </div>
              <div className="col-sm-7">
                <Image
                  src={homeImage}
                  className={`${styles.homescreenimage}`}
                  alt="Home image" 
                ></Image>
              </div>
            </div>
            <br/><br/>
          </div>
        </section>
      </div>
    );
  }
}
