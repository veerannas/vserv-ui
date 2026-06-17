import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import StarRatingComponent from "react-star-rating-component";
import BreadCrum from "../../../components/breadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import {
  getFavourite,
  deleteFavouriteBusiness,
  getUserUpcomingAppointmnet,
  getNumberOfPeopleOfAppointment,
  getServiceOfAppointment,
} from "../../../components/services/api/user-api";
import moment from "moment";

const UserDashboar = () => {
  const cookies = new Cookies();
  const [count, setCount] = useState(0);
  const { SearchBar } = Search;
  const [isSelect, setSelect] = useState("false");
  const [favoriteBusiness, setFavoriteBusiness] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState([]);

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      //api for fetch user favorite Busisnesss
      window.location.href = "/";
    } else {
      fetchFavoriteData();
      fetchUpcomingAppointment();
    }
  }, []);

  const fetchFavoriteData = () => {
    getFavourite(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setFavoriteBusiness(data);
      });
  };

  const fetchUpcomingAppointment = () => {
    getUserUpcomingAppointmnet(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setUpcomingAppointment(data);
      });
  };

  function indication() {
    return <div className={styles.servicecolor}>No Favorite</div>;
  }
  function indicationAppointment() {
    return <div className={styles.servicecolor}>No Appointments</div>;
  }

  //delete fovorite row
  const unFavorite = (rowId: any, e: any) => {
    // remove or add faborder class
    e.target.classList.toggle("faborder");
    let favourite = {
      id: rowId,
    };

    //post call to delete user favorite business
    deleteFavouriteBusiness(favourite)
      .then((response) => response.text())
      .then((response) => {
        if (
          typeof response == "undefined" ||
          response == null ||
          response == ""
        ) {
        } else {
          fetchFavoriteData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // favorite column formatter
  const favoriteFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"heart_" + rowIndex} className={styles.faheartcenter}>
        <i
          className={`fas fa-heart fared facustom `}
          onClick={(e) => unFavorite(row.id, e)}
        ></i>
      </div>
    );
  };
  // service column formatter
  const serviceFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"b_" + rowIndex}>
        <div className={styles.servicecolor}>
          {row.businessInfo.companyName}
        </div>
        <div>
          <StarRatingComponent
            name="rate2"
            editing={false}
            renderStarIcon={() => <span className={styles.starsize}>★</span>}
            starCount={5}
            value={row.businessInfo.averageRating}
          />
        </div>
      </div>
    );
  };

  // service column formatter
  const serviceFormatterUpcoming = (
    rowContent: any,
    row: any,
    rowIndex: any
  ) => {
    return (
      <div key={"b_" + rowIndex}>
        <div className={styles.servicecolor}>
          {row.businessInfo.companyName}
        </div>
        <div>{row.businessInfo.address.addressLineOne}</div>
      </div>
    );
  };

  // date column formatter
  const dateFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>{moment(new Date(row.reservationDate)).format("MM-DD-YYYY")}</div>
    );
  };

  // Time column formatter
  const timeFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return <div> {moment(new Date(row.reservationDate), "HH:mm").format("hh:mm A")}</div>;
  };

  // price column formatter
  const priceFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {row.businessInfo.serviceId.id == "restaurant" && <div>-</div>}
        {row.businessInfo.serviceId.id != "restaurant" && (
          <MenuPriceFormatter row={row} />
        )}
      </div>
    );
  };

  //  favorite column Data
  const columns = [
    {
      dataField: "id",
      text: "",
      formatter: favoriteFormatter,
      formatExtraData: count,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "12%", textAlign: "center" };
      },
    },
    {
      dataField: "businessInfo.companyName",
      text: "Categories",
      align: "left",
      formatter: serviceFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "35%" };
      },
    },
    {
      dataField: "businessInfo.address.addressLineOne",
      text: "Address",
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "46%" };
      },
    },
  ];

  //  Upcoming column Data
  const columnsUpcomingAppointment = [
    {
      dataField: "reservationDate",
      text: "Date",
      formatter: dateFormatter,
      formatExtraData: count,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%" };
      },
    },
    {
      dataField: "reservationDate",
      text: "Time",
      align: "left",
      formatter: timeFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%" };
      },
    },
    {
      dataField: "businessInfo.companyName",
      text: "Business",
      align: "left",
      formatter: serviceFormatterUpcoming,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "35%" };
      },
    },
    {
      dataField: "Price",
      text: "Price",
      align: "left",
      formatter: priceFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "20%" };
      },
    },
  ];

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr></hr>
          <div className="container">
            <div className={`footer-fix-height `}>
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-th-large"></i> Dashboard
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <BreadCrum />
                </div>
              </div>
              <br></br>
              <Row>
                <Col md="5">
                  <ToolkitProvider
                    keyField="id"
                    data={favoriteBusiness}
                    columns={columns}
                    search
                  >
                    {(props: any) => (
                      <div>
                        <Row>
                          <Col>
                            <h5 className={styles.modalfacolor}>Favorites</h5>
                          </Col>
                          <Col>
                            <SearchBar {...props.searchProps} />
                          </Col>
                        </Row>
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          pagination={paginationFactory()}
                          hover
                          bordered={false}
                          wrapperClasses="bootstrap-table-border"
                          noDataIndication={indication}
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </Col>
                <Col md="7">
                  <ToolkitProvider
                    keyField="id"
                    data={upcomingAppointment}
                    columns={columnsUpcomingAppointment}
                    search
                  >
                    {(props: any) => (
                      <div>
                        <Row>
                          <Col>
                            <h5 className={styles.modalfacolor}>Upcoming Reservations</h5>
                          </Col>
                          <Col>
                            <SearchBar {...props.searchProps} />
                          </Col>
                        </Row>
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          pagination={paginationFactory()}
                          hover
                          bordered={false}
                          wrapperClasses="bootstrap-table-border"
                          noDataIndication={indicationAppointment}
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </Col>
              </Row>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboar;

//@@@@@@@@@@@@@@ component @@@@@@@@@@@@@@@//

//Menu price formatter compenent
const MenuPriceFormatter = (props: any) => {
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    //api for fetch service price
    fetchServicePrice();
  }, []);
  const fetchServicePrice = () => {
    getServiceOfAppointment(props.row.id, props.row.businessInfo.serviceId.id)
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setCurrency(data.service.currency);
        setPrice(data.service.price);
      });
  };
  return (
    <div>
      {currency} {price}
    </div>
  );
};
