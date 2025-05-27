import Link from "next/link";
import React from "react";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import styles from "./askmenavbar.module.css";
import { useRouter } from "next/router";


const AskmeNavbar = (props: any) => {
  const router = useRouter();

  const Inbox = () => {
    props.setLink("inbox")
  }

  const Sent = () => {
    props.setLink("sent")
  }

  const Trash = () => {
    props.setLink("trash")
  }

  return (
    <div>
      <Navbar bg="" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" eventKey="1"
              className={props.link == "inbox" ? `${styles.navbarlinks}` : ``} onClick={Inbox}>

              <i className={`fas fa-envelope-open-text ${styles.navbaricons}`}></i>
              <span className={props.link == "inbox" ? `${styles.activetextcolor} ` : `${styles.textcolor}`}>
                Inbox
                  </span>
            </Nav.Link>
                  &nbsp;&nbsp;&nbsp;
                <Nav.Link href="#" eventKey="2"
              className={props.link == "sent" ? `${styles.navbarlinks}` : ``} onClick={Sent}>

              <i className={`fas fa-paper-plane ${styles.navbaricons}`}></i>
              <span className={props.link == "sent" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Sent
                  </span>
            </Nav.Link>
                &nbsp;&nbsp;&nbsp;
                <Nav.Link href="#" eventKey="3"
              className={props.link == "trash" ? `${styles.navbarlinks}` : ``} onClick={Trash}>

              <i className={`far fa-trash-alt ${styles.navbaricons}`}></i>
              <span className={props.link == "trash" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Trash
                  </span>
            </Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default AskmeNavbar;
