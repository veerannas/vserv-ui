import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { Component } from "react";
import "react-awesome-slider/dist/styles.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-scroll";
import "react-slideshow-image/dist/styles.css";
import Address from "../../components/address/address";
import AskMe from "../../components/askme/askme";
import Footer from "../../components/footer/footer";
import HeaderNavbar from "../../components/header-navbar/header-navbar";
import Hours from "../../components/hours/hours";
import Menurestaurant from "../../components/menurestaurant/menurestaurant";
import OrderDelivery from "../../components/orderdelivery/orderdelivery";
import OverallRating from "../../components/overallrating/overallrating";
import PhotosPanel from "../../components/photospanel/photospanel";
import Recommendation from "../../components/recommendation/recommendation";
import ReservationPanel from "../../components/reservationpanel/reservationpanel";
import Reviews from "../../components/reviews/reviews";
import TopTags from "../../components/toptags/toptags";
import styles from "./profile.module.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import UserReview from "../../components/userreview/userreview";
import Favorite from "../../components/favorite/favorite";
import { getBusinessByBusinessInfoId } from "../../components/services/api/business-api";

export default class RestaurantProfile extends Component<any, any> {
  constructor(props: any) {
    super(props);
    // Set initial state
    this.state = {
      heartValue: false,
      scrollTop: false,
    };
    // Binding this keyword
    this.heartClick = this.heartClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  static async getInitialProps({ query }: any) {
    //fetching data for Business
    const res = await getBusinessByBusinessInfoId(query.id);
    const result = await res.json();
    return {
      //set data in  variable
      data: result,
    };
  }
  heartClick = () => {
    if (this.state.heartValue == false) {
      this.setState({ heartValue: true });
    } else {
      this.setState({ heartValue: false });
    }
  };

  // componentDidMount() {
  //   document.addEventListener("scroll", this.handleScroll, true);
  // }
  handleScroll = () => {
    console.log("scrolling ...");
    // It's the window
    if (window.scrollY >= 400) {
      this.setState({ scrollTop: true });
    } else {
      this.setState({ scrollTop: false });
    }
  };

  render() {
    return (
      <div className="div-height" >
        <main>
          <div className={`container-fluid`}>
            {/* Header Menu */}
            <HeaderNavbar />
            {/* End Header Menu */}
            {/* Wallpaper Panel */}
            <div className="row">
              <div className={`col-md-12 `}>
                <PhotosPanel data={this.props.data.wallPaper} />
                <div className={`${styles.cssribbon}`}>
                  <span className={`${styles.bookmarkdesign}`}>
                    <span className={`${styles.heartcolor}`}>
                      <Favorite data={this.props.data.id} />
                    </span>
                    &nbsp;Save
                  </span>
                </div>
              </div>
            </div>
            {/* End Wallpaper Panel */}
            <div className={`container  ${styles.containerarea}`}>
              <div className={` row `}>
                {/* Right Panel */}
                <div className={` col-md-8 ${styles.rightpanel}`}>
                  {/* added link to scroll tab */}
                  <div
                  className={
                    this.state.scrollTop ? `${styles.navbarfixedtop}` : ``
                  }
                  >
                    <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav" className={`${styles.navlink}`}>
                        <Nav>
                          <Link
                            activeClass="active"
                            to="overview"
                            spy={true}
                            smooth={true}
                            className={styles.link}
                          >
                            Overview
                          </Link>
                          <Nav>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="menu" spy={true} smooth={true}>
                              Menu
                            </Link>
                          </Nav>
                          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                          <Nav>
                            <Link to="reviews" spy={true} smooth={true}>
                              Reviews
                            </Link>
                          </Nav>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Nav>
                            <Link to="reservation" spy={true} smooth={true}>
                              Reservation
                            </Link>
                          </Nav>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Nav>
                            <Link to="contact" spy={true} smooth={true}>
                              Contact
                            </Link>
                          </Nav>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Nav>
                            <Link to="hours" spy={true} smooth={true}>
                              Hours
                            </Link>
                          </Nav>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Nav>
                            <Link to="address" spy={true} smooth={true}>
                              Address
                            </Link>
                          </Nav>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Nav>
                            <Link to="askme" spy={true} smooth={true}>
                              AskMe
                            </Link>
                          </Nav>
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>
                  </div>
                  {/* End added link to scroll tab */}
                  <hr></hr>
                  <div className={`${styles.companytitle}`}>
                    {this.props.data.companyName}
                  </div>
                  {/* TopTags */}
                  <TopTags data={this.props.data.tags} />
                  {/* End TopTags */}
                  <hr></hr>
                  {/* Overview Section */}
                  <div id="overview">
                    {/*Reviews */}
                    <Reviews data={this.props.data.id} service={this.props.data.serviceId.id} />
                    {/* End Reviews */}
                    <div className="row">
                      <div className={`col-md-12`}>
                        <ReactReadMoreReadLess
                          charLimit={200}
                          readMoreText={
                            <div className={`${styles.readmoreless}`}>
                              Read more
                            </div>
                          }
                          readLessText={
                            <div className={`${styles.readmoreless}`}>
                              Read less
                            </div>
                          }
                        >
                          {String(this.props.data.profile.about)}
                        </ReactReadMoreReadLess>
                      </div>
                    </div>
                  </div>
                  {/* End Overview Section */}
                  <br></br>
                  {/* Menu Section */}
                  <div id="menu">
                    {/* Menu */}
                    <div className={`${styles.serviceheading}`}>Menu</div>
                    <Menurestaurant data={this.props.data.id} />
                    {/* End Menu */}
                  </div>
                  {/* End Menu Section */}
                  <br></br>
                  {/* Reviews Section */}
                  <div id="reviews">
                    <OverallRating data={this.props.data} />
                    <UserReview data={this.props.data.id} />
                  </div>
                  {/* End Reviews Section */}
                </div>
                {/*End Right Panel */}

                {/* Left Panel */}
                <div className={` col-md-4 `}>
                  {/* Reservation Section */}
                  <div id="reservation">
                    <ReservationPanel data={this.props.data.id} />
                  </div>
                  {/* End Reservation Section */}
                  <br></br>
                  {/* OrderDelivery Section */}
                  <div id="contact">
                    <OrderDelivery data={this.props.data} />
                  </div>
                  {/* End OrderDelivery Section */}
                  <br></br>
                  {/* Hours Section */}
                  <div id="hours">
                    <Hours data={this.props.data.id} />
                  </div>
                  {/* End Hours Section */}
                  <br></br>
                  {/* Address Section */}
                  <div id="address">
                    <Address data={this.props.data} />
                  </div>
                  {/* End Address Section */}
                  <br></br>
                  {/* AskMe Section */}
                  <div id="askme">
                    <AskMe />
                  </div>
                  {/* End AskMe Section */}
                </div>
                {/*End Left Panel */}
                <Recommendation data={this.props.data.serviceId.id} businessInfoId={this.props.data.id} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
