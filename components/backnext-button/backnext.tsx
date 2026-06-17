import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styles from "./backnext.module.css";
import { useRouter } from "next/router";

const BackNextButton = (props: any) => {

  const router = useRouter();

  const backbuttonHandler = () => {

    if (props.link == "address") {
      props.setLink("overview")
    }
    if (props.link == "contact") {
      props.setLink("address")
    }
    if (props.link == "services") {
      props.setLink("contact")
    }
    if (props.link == "photos") {
      props.setLink("services")
    }
    if (props.link == "hours") {
      props.setLink("photos")
    }
    if (props.link == "status") {
      props.setLink("hours")
    }
  };

  const nextbuttonHandler = () => {
    if (props.link == "overview") {
      props.setLink("address")
    }
    if (props.link == "address") {
      props.setLink("contact")
    }
    if (props.link == "contact") {
      props.setLink("services")
    }
    if (props.link == "services") {
      props.setLink("photos")
    }
    if (props.link == "photos") {
      props.setLink("hours")
    }
    if (props.link == "hours") {
      props.setLink("status")
    }
  };

  return (
    <Row>
      <Col>
        {props.link != "overview" && (
          <Button
            variant="primary"
            type="reset"
            className={`${styles.formcontrolback}`}
            onClick={backbuttonHandler}
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i> Back
          </Button>
        )}
      </Col>
      <Col>
        {props.link != "status" && (
          <Button
            variant="primary"
            type="submit"
            className={`text-right ${styles.formcontrolnext}`}
            onClick={nextbuttonHandler}
          >
            Next
            &nbsp;<i className="fa fa-angle-right" aria-hidden="true"></i>
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default BackNextButton;