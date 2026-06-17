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
import { getAllVendor, getCountBusinessByVendorId, getTotalBusiness } from "../../../components/services/api/business-api";
import { getAllActiveVendor, getAllInActiveVendor } from "../../../components/services/api/vendor-api";
import styles from "./index.module.css";

import CountryModal from "../../../components/country-model/country-model";


const AccountListing = () => {
  const cookies = new Cookies();
  const [cookiesSet, setCookie] = useCookies(["user", "businessInfoId", "businessName", "service"]);
  const [action, setAction] = useState("");
  const [data, setData] = useState([]);
  const [businessView, setBusinessView] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [modalshow, setModalshow] = useState(false);

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
  const setBusinessCookies = (row: any) => {
    setCookie("businessInfoId", row.id, { path: "/" });
    setCookie("businessName", row.companyName, { path: "/" });
    setCookie("service", row.serviceId.id, { path: "/" });
    window.location.href = "/business-profile/";
  };
  const statusFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {!row.deactivated && <div className="activestatus">Active</div>}
        {row.deactivated && <div className="inactivecompany">Inactive</div>}
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
      <div>
        {row.managingDirector.name.firstName} {row.managingDirector.name.middleName} {row.managingDirector.name.lastName}
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
      // setData={setData}
      // setTotalBusiness={setTotalBusiness}
      />

    )
  }
  const columns = [
    {
      dataField: "managingDirector.name.firstName",
      text: "BusinessAccounts",
      formatter: nameFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "managingDirector.email",
      text: "Email",
      //   formatter: serviceFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%", color: '#921C00' };
      },
    },
    {
      dataField: "managingDirector.address.country",
      text: "Country",
      // formatter: countryFormatter,
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
      text: "Registered Businesses",
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
      });
  };

  //InActive Listing button click function call
  const filterInactiveList = () => {
    getAllInActiveVendor()
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  //All List Listing button click function call
  const getAllList = () => {
    fetchAllVendorData();
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
                  <i className="fa fa-calendar" aria-hidden="true"></i> City and Country
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <div className="wrimagecardcontent">
                    <BreadCrum />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/************ modal **************/}
      {modalshow && (
        <CountryModal
          show={modalshow}
          onHide={() => { setModalshow(false); }}
        />
      )}
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
    <div>{totalBusiness}</div>
  )
}
