import Link from "next/link";
import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import styles from "./businessnavbar.module.css";
import { useRouter } from "next/router";

const BusinessNavbar = (props:any) => {
  const router = useRouter();

  const Overview = () => {
    props.setLink("overview")
  }

  const Address = () => {
    props.setLink("address")
  }

  const Contact = () => {
    props.setLink("contact")
  }

  const Services = () => {
    props.setLink("services")
  }

  const Photos = () => {
    props.setLink("photos")
  }

  const Hours = () => {
    props.setLink("hours")
  }

  const Status = () => {
    props.setLink("status")
  }

  return (

    <div>
      <Navbar bg="" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" eventKey="1"
              className={props.link == "overview" ? `nav-link ${styles.navbarlinks}` : ``} onClick={Overview}>

              <span className={props.link == "overview" ? `${styles.activetextcolor} ` : `${styles.textcolor}`}>
                Overview
              </span>
            </Nav.Link>
                  &nbsp;&nbsp;&nbsp;
            <Nav.Link href="#" eventKey="2"
              className={props.link == "address" ? `${styles.navbarlinks}` : ``} onClick={Address}>

              <span className={props.link == "address" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Address
                  </span>
            </Nav.Link>
                &nbsp;&nbsp;&nbsp;
            <Nav.Link href="#" eventKey="3"
              className={props.link == "contact" ? `${styles.navbarlinks}` : ``} onClick={Contact}>

              <span className={props.link == "contact" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Contact
              </span>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
            <Nav.Link href="#" eventKey="3"
              className={props.link == "services" ? `${styles.navbarlinks}` : ``} onClick={Services}>

              <span className={props.link == "services" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Services
              </span>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
            <Nav.Link href="#" eventKey="3"
              className={props.link == "photos" ? `${styles.navbarlinks}` : ``} onClick={Photos}>

              <span className={props.link == "photos" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Photos
              </span>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
            <Nav.Link href="#" eventKey="3"
              className={props.link == "hours" ? `${styles.navbarlinks}` : ``} onClick={Hours}>

              <span className={props.link == "hours" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Hours
              </span>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
            <Nav.Link href="#" eventKey="3"
              className={props.link == "status" ? `${styles.navbarlinks}` : ``} onClick={Status}>

              <span className={props.link == "status" ? `${styles.activetextcolor}` : `${styles.textcolor}`}>
                Status
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>





    // <div>
    //   <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav>
    //         <Link href="/business-profile/overview" >

    //           {router.pathname == "/business-profile/overview" ? (
    //             <span className={styles.active} > Overview</span>
    //           ) : (
    //             <span className={styles.customnavbar}> Overview</span>
    //           )}

    //         </Link>
    //         <Nav>
    //           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //           <Link href="/business-profile/address">
    //             {router.pathname == "/business-profile/address" ? (
    //               <span className={styles.active} onClick={Address}> Address</span>
    //             ) : (
    //               <span className={styles.customnavbar}> Address</span>
    //             )}
    //           </Link>
    //         </Nav>
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <Nav>
    //           <Link href="/business-profile/contact">
    //             {router.pathname == "/business-profile/contact" ? (
    //               <span className={styles.active}> Contact</span>
    //             ) : (
    //               <span className={styles.customnavbar}> Contact</span>
    //             )}
    //           </Link>
    //         </Nav>
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <Nav>
    //           <Link href="/business-profile/services">
    //             {router.pathname == "/business-profile/services" ? (
    //               <span className={styles.active}> Services</span>
    //             ) : (
    //               <span className={styles.customnavbar}> Services</span>
    //             )}
    //           </Link>
    //         </Nav>
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <Nav>
    //           <Link href="/business-profile/photos">
    //             {router.pathname == "/business-profile/photos" ? (
    //               <span className={styles.active}> Photos</span>
    //             ) : (
    //               <span className={styles.customnavbar}> Photos</span>
    //             )}
    //           </Link>
    //         </Nav>
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <Nav>
    //           <Link href="/business-profile/hours">
    //             {router.pathname == "/business-profile/hours" ? (
    //               <span className={styles.active}> Hours</span>
    //             ) : (
    //               <span className={styles.customnavbar}> Hours</span>
    //             )}
    //           </Link>
    //         </Nav>
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <Nav>
    //           <Link href="/business-profile/status">
    //             {router.pathname == "/business-profile/status" ? (
    //               <span className={styles.active}> Status</span>
    //             ) : (
    //               <span className={styles.customnavbar}> Status</span>
    //             )}
    //           </Link>
    //         </Nav>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    // </div>
  );
};
export default BusinessNavbar;
