import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import styles from "./appointment.module.css";
import { useRouter } from "next/router";


const AskmeNavbar = (props: any) => {
  const router = useRouter();

  const todays = () => {
    props.setLink("todays")
  }

  const upcoming = () => {
    props.setLink("upcoming")
  }

  const past = () => {
    props.setLink("past")
  }

  return (
    <div>
      <Navbar bg="" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            <Nav.Link href="#" eventKey="1"
              className={props.link == "todays" ? `${styles.activelink} ` : ``} onClick={todays}>
              <span className={props.link == "todays" ? `${styles.acitvetextcolor}` : `${styles.textcolor}`}>
                Todays Reservation
              </span>
            </Nav.Link>
            <Nav.Link ></Nav.Link>
            <Nav.Link ></Nav.Link>
            <Nav.Link href="#" eventKey="2" className={props.link == "upcoming" ? ` ${styles.activelink}` : ``} onClick={upcoming}>
              <span className={props.link == "upcoming" ? `${styles.acitvetextcolor}` : `${styles.textcolor}`}>
                Upcoming Reservation
              </span>

            </Nav.Link>
            <Nav.Link ></Nav.Link>
            <Nav.Link ></Nav.Link>
            <Nav.Link href="#" eventKey="3" className={props.link == "past" ? ` ${styles.activelink}` : ``} onClick={past}>
              <span className={props.link == "past" ? `${styles.acitvetextcolor}` : `${styles.textcolor}`}>
                Past Reservation
              </span>

            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>




  );
};
export default AskmeNavbar;
