import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import MenuPriceFormatter from "../../../components/menupriceformatter/menupriceformatter";
import RestaurantPeople from "../../../components/restaurantpeople/restaurantpeople";
import ServiceFormatter from "../../../components/serviceformatter/serviceformatter";
import { getUserPastAppointmnetDateBet } from "../../../components/services/api/reservation-api";
import {
  getUserPastAppointmnet
} from "../../../components/services/api/user-api";
import styles from "./index.module.css";

const Appointmenthistory = (props:any) => {
  const cookies = new Cookies();
  const [count, setCount] = useState(0);
  const { SearchBar } = Search;

  const [pastAppointment, setPastAppointment] = useState([]);

  useEffect(() => {

      //api for fetch user past appointment
      fetchPastAppointment();
  }, []);

  //fetch past appointmnet
  const fetchPastAppointment = () => {
    getUserPastAppointmnet(props.userId)
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setPastAppointment(data);
      });
  };

  //date Column appointmnet
  const dateFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>{moment(new Date(row.reservationDate)).format("MM-DD-YYYY")}</div>
    );
  };

  //Time Column appointmnet
  const timeFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {moment(new Date(row.reservationDate), "HH:mm").format("hh:mm A")}
      </div>
    );
  };

  //Company Column appointmnet
  const companyFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"b_" + rowIndex}>
        <div className={styles.servicecolor}>
          {row.businessInfo.companyName}
        </div>
        <div>{row.businessInfo.address.addressLineOne}</div>
      </div>
    );
  };

  //Service Column appointmnet
  const serviceFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {row.businessInfo.serviceId.id == "restaurant" && (
          <span>
            <RestaurantPeople data={row.id} />
          </span>
        )}
        {row.businessInfo.serviceId.id != "restaurant" && (
          <ServiceFormatter
            data={row.id}
            category={row.businessInfo.serviceId.id}
          />
        )}
      </div>
    );
  };

  //History Column appointmnet
  const historyFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {!row.cancel && (
          <div>
            <div className={styles.historygreentextcolor}>ACCEPTED</div>
            <div className={styles.accept}>
              {row.businessInfo.serviceId.id != "restaurant" && (
                <MenuPriceFormatter row={row} />
              )}
            </div>
          </div>
        )}
        {row.cancel && (
          <div>
            <div className={styles.historyredtextcolor}>CANCELLED</div>
            <div className={styles.reject}>
              {row.businessInfo.serviceId.id != "restaurant" && (
                <MenuPriceFormatter row={row} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Column Data
  const columns = [
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
      dataField: "reservationTime",
      text: "Time",
      align: "left",
      formatter: timeFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "13%" };
      },
    },
    {
      dataField: "businessInfo.companyName",
      text: "Business",
      align: "left",
      formatter: companyFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "35%" };
      },
    },

    {
      dataField: "businessInfo.serviceId.category",
      text: "Service Name",
      formatter: serviceFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { textAlign: "center", width: "30%" };
      },
    },
    {
      dataField: "history",
      text: "History",
      formatter: historyFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { textAlign: "center", width: "15%" };
      },
    },
  ];
  function indication() {
    return <div className={styles.servicecolor}>No Reservation.</div>;
  }

  //set date
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //selected date range
  const dateRange = (item: any) => {
    setState([item.selection]);
    getUserPastAppointmnetDateBet(
      props.userId,
      moment(new Date(item.selection.startDate)).format("YYYY-MM-DD HH:mm:ss"),
      moment(new Date(item.selection.endDate)).format("YYYY-MM-DD HH:mm:ss")
    )
      .then((data) => data.json())
      .then((data) => {
        setPastAppointment(data);
      });
  };

  return (
    <div className={`container-fluid`}>
      {/* Header Menu */}
      <div className="container">
        <div className="row">
          {/* Left Panel */}
          <div className={`col-md-4 col-sm-4 col-xs-4 ${styles.calendercard}`}>
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => dateRange(item)}
              moveRangeOnFirstSelection={false}
              ranges={state}
              maxDate={moment().toDate()}
            />
          </div>
          {/* End Left Panel */}

          {/* Right Panel */}
          <div className="col-md-8 col-sm-8 col-xs-8">
            <Row>
              <Col md="12">
                <ToolkitProvider
                  keyField="id"
                  data={pastAppointment}
                  columns={columns}
                  search
                >
                  {(props: any) => (
                    <div>
                      <Row>
                        <Col>
                          {/* <h5>Past Appointment</h5> */}
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
            </Row>
          </div>
        </div>
        {/* End Left Panel */}
      </div>
    </div>
  );
};
export default Appointmenthistory;