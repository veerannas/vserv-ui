import Link from "next/link";
import React from "react";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import styles from "./reviewratingnavbar.module.css";
import { useRouter } from "next/router";


const AskmeNavbar = (props: any) => {
  const router = useRouter();

  const Inbox = () => {
    props.setLink("reviews")
  }

  const Sent = () => {
    props.setLink("reviewed")
  }

  return (
    <div>
      <Navbar bg="" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" eventKey="1"
              className={props.link == "reviews" ? `${styles.navbarlinks}` : ``} onClick={Inbox}>

              <i className={`fas fa-envelope-open-text ${styles.navbaricons}`}></i>
              <span className={props.link == "reviews" ? `${styles.activetextcolor} ` : `${styles.textcolor}`}>
                Reviews
                  </span>
            </Nav.Link>
                  &nbsp;&nbsp;&nbsp;
                <Nav.Link href="#" eventKey="2"
              className={props.link == "reviewed" ? `${styles.navbarlinks}` : ``} onClick={Sent}>

              <i className={`fas fa-paper-plane ${styles.navbaricons}`}></i>
              <span className={props.link == "reviewed" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Reviewed
                  </span>
            </Nav.Link>
                &nbsp;&nbsp;&nbsp;

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
