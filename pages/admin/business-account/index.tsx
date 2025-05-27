import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies, useCookies } from "react-cookie";
import BreadCrum from "../../../components/adminbreadcrum/breadcrum";
import ActionComponent from "../../../components/adminbusinesslistingactions/actioncomponent";
import BusinessListing from "../../../components/business-listing";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import { getAllVendor, getCountBusinessByVendorId, getDeletedBusinessByVendorId, getTotalBusiness } from "../../../components/services/api/business-api";
import { getAllActiveVendor, getallDeletedVendor, getAllInActiveVendor } from "../../../components/services/api/vendor-api";
import styles from "./index.module.css";


const AccountListing = () => {
  const cookies = new Cookies();
  const [cookiesSet, setCookie] = useCookies(["user", "businessInfoId", "businessName", "service"]);
  const [action, setAction] = useState("");
  const [data, setData] = useState([]);
  const [businessView, setBusinessView] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [isDeleted, setDeletedValue] = useState(false);

  const [totalBusiness, setTotalBusiness] = useState({
    totalBusiness: 0,
    activeBusiness: 0,
    inactiveBusiness: 0,
  });
  useEffect(() => {
    if ((cookies.get("id") || "") == "") { window.location.href = "/" } 
    else {
    //fetch all business data acc vendorId
    fetchAllVendorData();
    //count number of acitve business, inactive business and total business
    fetchTotalBusiness();
    };

  }, []);
  const fetchAllVendorData = () => {
    //fetch all business data acc vendorId
    getAllVendor()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setDeletedValue(false);
      });
  };

  const fetchTotalBusiness = () => {
    //count number of acitve business, inactive business and total business
    getTotalBusiness(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
        setDeletedValue(false);
      });
  };
  const setBusinessCookies = (row: any) => {
    setCookie("businessInfoId", row.id, { path: "/" });
    setCookie("businessName", row.companyName, { path: "/" });
    setCookie("service", row.serviceId.id, { path: "/" });
    window.location.href = "/business-profile/";
  };
  const statusFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {!row.deactivated && <div className={styles.activestatus}>Active</div>}
        {row.deactivated && <div className={styles.inactivecompany}>Inactive</div>}
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
        {row.managingDirector.name.firstName} {row.managingDirector.name.middleName} {row.managingDirector.name.lastName}
      </div>
    );
  };

  const emailFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div className={styles.activecompany}>
        {row.managingDirector.email} 
      </div>
    );
  };
  
  const countryFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div className={styles.activecompany}>
        {row.managingDirector.address.country} 
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
        fetchAllVendorData={fetchAllVendorData}
        setBusinessView={setBusinessView}
        setVendorId={setVendorId}
        isDeleted={isDeleted}
        setDeletedValue={setDeletedValue}
        filterDeletedBusinessList={filterDeletedBusinessList}
      // setData={setData}
      // setTotalBusiness={setTotalBusiness}
      />

    )
  }
  const columns = [
    {
      dataField: "managingDirector.name.firstName",
      text: "Business User",
      formatter: nameFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "managingDirector.email",
      text: "Email",
      formatter: emailFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "managingDirector.address.country",
      text: "Country",
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
      dataField: "Registered Businesses",
      text: "Business Listings",
      formatter: businessRegisterFormatter,

      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", paddingLeft: "20px", color: '#921C00' };
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
    getAllActiveVendor()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setDeletedValue(false);
      });
  };

  //InActive Listing button click function call
  const filterInactiveList = () => {
    getAllInActiveVendor()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setDeletedValue(false);
      });
  };

  //All List Listing button click function call
  const getAllList = () => {
    fetchAllVendorData();
    setDeletedValue(false);
  };

  const filterDeletedBusinessList = () => {
    getallDeletedVendor()
      .then((data) => data.json())
      .then((data) => {
        setDeletedValue(true);
        setData(data);
        
      });
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
                  <i className="fa fa-calendar" aria-hidden="true"></i> Business Account
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
                                {/* <Button
                                  variant="default"
                                  type="button"
                                  className="btn-sm btn-outline-danger businessaccount"
                                // onClick={showBusinessModal}
                                >
                                  Business Accounts
                                </Button>
                                &nbsp; */}
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
                                  InActive Listing
                                  <span className="listingNumber">
                                    {/* {totalBusiness.inactiveBusiness} */}
                                  </span>
                                </Button>
                                &nbsp;
                                <Button
                                  variant="default"
                                  type="button"
                                  className={`btn-sm btn-outline-danger listingbutton`}
                                  onClick={getAllList}
                                >
                                  All List
                                  <span className="listingNumber">
                                    {/* {totalBusiness.totalBusiness} */}
                                  </span>
                                </Button>
                                &nbsp;
                                <Button
                                  variant="primary"
                                  type="button"
                                  className={`btn-sm btn-outline-primary ${styles.listingButton}`}
                                  onClick={filterDeletedBusinessList}
                                >
                                  Deleted Listing
                                 
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
                <BusinessListing vendorId={vendorId} pageValue={"admin-listing"}/>
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
    getCountBusinessByVendorId(props.row.id)
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
      });
  }

  return (
    <div className={styles.activecompany}>{totalBusiness}</div>
  )
}
