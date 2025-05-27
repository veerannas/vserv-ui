import React, { useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import styles from "./messagebox.module.css";

const MessageBox = (props: any) => {
  const [show, setShow] = useState(false);

  return (
    <Alert variant={props.variant}>
      <div className={`${styles.alerticon}`}>
        <Icon.ExclamationCircle />
      </div>
      <div className={`${styles.alertext}`}>{props.message}</div>
    </Alert>
  );
};
export default MessageBox;
