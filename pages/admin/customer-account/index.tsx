import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies, useCookies } from "react-cookie";
import BreadCrum from "../../../components/adminbreadcrum/breadcrum";
import ActionComponent from "../../../components/admincustomeraction/actioncomponent";
import BusinessListing from "../../../components/business-listing";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import { getCountBusinessByVendorId, getTotalBusiness } from "../../../components/services/api/business-api";
import { getReservationCountByUserId } from "../../../components/services/api/reservation-api";
import { getAllUserData, getAllActiveUserData, getAllInActiveUserData, getAllDeletedUserData } from "../../../components/services/api/user-api";
import styles from "./index.module.css";
import TodayAppointment from "../../user/active-appointment/todayappointment";
import UpcomingAppointment from "../../user/active-appointment/upcomingappointment";
import AppointmentNavbar from "../../../components/appointment-navbar/appointment";
import PastAppointmet from "../../user/past-appointment";


const AccountListing = () => {
  const cookies = new Cookies();
  const [cookiesSet, setCookie] = useCookies(["user", "businessInfoId", "businessName", "service"]);
  const [action, setAction] = useState("");
  const [data, setData] = useState([]);
  const [businessView, setBusinessView] = useState(false);
  const [vendorId, setVendorId] = useState("");

  const [isDeleted, setIsDeleted] = useState(false);
  const [link, setLink] = useState("todays");
  const [userId, setUserId] = useState("");


  const [totalBusiness, setTotalBusiness] = useState({
    totalBusiness: 0,
    activeBusiness: 0,
    inactiveBusiness: 0,
  });
  useEffect(() => {
    if ((cookies.get("id") || "") == "") { window.location.href = "/" } 
    else {
    //fetch all business data acc vendorId
    fetchAllUserData();
    //count number of acitve business, inactive business and total business
    fetchTotalBusiness();
    };

  }, []);
  const fetchAllUserData = () => {
    setIsDeleted(false);

    //fetch all business data acc vendorId
    getAllUserData()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  const fetchTotalBusiness = () => {
    //count number of acitve business, inactive business and total business
    getTotalBusiness(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
      });
  };


  const statusFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {row.active && <div className={styles.activestatus}>Active</div>}
        {!row.active && <div className={styles.inactivecompany}>Inactive</div>}
      </div>
    );
  };


  const businessRegisterFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <BusinessRegisterComponent row={row} />
      </div>
    );
  };


  const nameFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div className={styles.activecompany}>
        {row.name.firstName} {row.name.middleName} {row.name.lastName}
      </div>
    );
  };

  const emailFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div className={styles.activecompany}>
        {row.email} 
      </div>
    );
  };

  const countryFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div className={styles.activecompany}>
        {(row.address || "") == "" ? "" : row.address.addressLineOne}
      </div>
    );
  };

  const actionFormatter = (rowContent: any, row: any, rowIndex: any) => {
    let value = "View"
    return (
      <ActionComponent
        row={row}
        rowIndex={rowIndex}
        data={data}
        actionValue={value}
        fetchAllUserData={fetchAllUserData}
        setBusinessView={setBusinessView}
        setVendorId={setVendorId}
        isDeleted={isDeleted}
        setUserId={setUserId}
      // setData={setData}
      // setTotalBusiness={setTotalBusiness}
      />

    )
  }
  const columns = [
    {
      dataField: "name.firstName",
      text: "Customer Account",
      formatter: nameFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "email",
      text: "Email",
      formatter: emailFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "20%", color: '#921C00' };
      },
    },
    {
      dataField: "address.addressLineOne",
      text: "Address",
      formatter: countryFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "Status",
      text: "Status",
      formatter: statusFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "Reservation",
      text: "Reservation",
      formatter: businessRegisterFormatter,

      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "10%", paddingLeft: "20px", color: '#921C00' };
      },
    },
    {
      dataField: "Actions",
      text: "Actions",
      formatter: actionFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "25%", paddingLeft: "20px", color: '#921C00' };
      },
    },
  ];
  //Active Listing button click function call
  const filterActiveList = () => {
    setIsDeleted(false);

    getAllActiveUserData()
      .then((data) => data.json())
      .then((data) => {
        setData(data);

      });
  };

  //InActive Listing button click function call
  const filterInactiveList = () => {
    setIsDeleted(false);

    getAllInActiveUserData()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  //Deleted Listing button click function call
  const filterDeletedUserList = () => {
    setIsDeleted(true);

    getAllDeletedUserData()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
    console.log(isDeleted);
  };

  //All List Listing button click function call
  const getAllList = () => {
    fetchAllUserData();
  };
  const { SearchBar } = Search;
  const rowStyle = { color: '#02827f' };
  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr></hr>
          <div className={`container`}>
            <div className={`footer-fix-height `}>

              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-calendar" aria-hidden="true"></i> Customer Account
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <div className="wrimagecardcontent">
                    <BreadCrum />
                  </div>
                </div>
              </div>

              <br></br>
              <br></br>
              {!businessView && (
                <div className="row">
                  <div className="col-md-12">
                    <ToolkitProvider keyField="id" data={data} columns={columns} search>
                      {(props: any) => (
                        <div>
                          <Row>
                            <Col md="7">
                              <div>
                                <Button
                                  variant="default"
                                  type="button"
                                  className="btn-sm btn-outline-danger businessaccount"
                                  onClick={getAllList}
                                >
                                  Customer Accounts
                                </Button>
                                &nbsp;
                                <Button
                                  variant="default"
                                  type="button"
                                  className={`btn-sm btn-outline-danger listingbutton`}
                                  onClick={filterActiveList}
                                >
                                  Active Accounts
                                  <span className="listingNumber">
                                    {/* {totalBusiness.activeBusiness} */}
                                  </span>
                                </Button>
                                &nbsp;
                                <Button
                                  variant="default"
                                  type="button"
                                  className={`btn-sm btn-outline-danger listingbutton`}
                                  onClick={filterInactiveList}
                                >
                                  Inactive Listing
                                  <span className="listingNumber">
                                    {/* {totalBusiness.inactiveBusiness} */}
                                  </span>
                                </Button>
                                &nbsp;
                                <Button
                                  variant="default"
                                  type="button"
                                  className={`btn-sm btn-outline-danger listingbutton`}
                                  onClick={filterDeletedUserList}
                                >
                                  Deleted List
                                  <span className="listingNumber">
                                    {/* {totalBusiness.totalBusiness} */}
                                  </span>
                                </Button>
                              </div>
                            </Col>
                            <Col>
                              <SearchBar {...props.searchProps} />
                            </Col>
                          </Row>
                          <hr />
                          <BootstrapTable
                            {...props.baseProps}
                            pagination={paginationFactory()}
                            bordered={false}
                            wrapperClasses="bootstrap-table-border"
                            // rowStyle={rowStyle}
                          // expandRow={expandRow}
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                </div>
              )}
              {businessView && (
                <>
                  <div className={styles.askmenavbar}>
                    <AppointmentNavbar setLink={setLink} link={link} />
                  </div>
                  <Row>
                    {link == "todays" && (<TodayAppointment userId={userId}/>)}
                    {link == "upcoming" && (<UpcomingAppointment userId={userId}/>)}
                    {link == "past" && (<PastAppointmet userId={userId}/>)}
                  </Row>
                </>
                // <BusinessListing vendorId={vendorId} pageValue={"admin-listing"} />

              )}
              {/* {addBusiness ? (
                <AddBusinessModal
                  show={addBusiness}
                  onHide={() => setAddBusiness(false)}
                  setAddBusiness={setAddBusiness}
                  setData={setData}
                  setTotalBusiness={setTotalBusiness}
                />
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AccountListing;

const BusinessRegisterComponent = (props: any) => {

  const [totalBusiness, setTotalBusiness] = useState(0);
  useEffect(() => {
    fetchTotalBusiness();
  }, [])

  const fetchTotalBusiness = () => {
    getReservationCountByUserId(props.row.id)
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
      });
  }

  return (
    <div className={styles.activecompany}>{totalBusiness}</div>
  )
}
