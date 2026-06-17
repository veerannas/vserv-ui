import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import ActionComponent from "../../../components/actioncomponent/actioncomponent";
import MenuPriceFormatter from "../../../components/menupriceformatter/menupriceformatter";
import RestaurantPeople from "../../../components/restaurantpeople/restaurantpeople";
import ServiceFormatter from "../../../components/serviceformatter/serviceformatter";
import {
  cancelAppointment,
  remainderOnOffApi
} from "../../../components/services/api/reservation-api";
import {
  getUserUpcomingAppointmnet
} from "../../../components/services/api/user-api";
import styles from "./index.module.css";

const UpcomingAppointment = (props:any) => {
  const cookies = new Cookies();
  const [count, setCount] = useState(0);
  const { SearchBar } = Search;
  const [upcomingAppointment, setUpcomingAppointment] = useState([]);
  const [isCheckButton, setIsCheckButton] = useState(false);
  const [row, setRow] = useState<any[]>([]);

  useEffect(() => {
      //api for fetch Upcoming appointment
      fetchUpcomingAppointment();
  }, []);

  const fetchUpcomingAppointment = () => {
    getUserUpcomingAppointmnet(props.userId)
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setUpcomingAppointment([]);
        setUpcomingAppointment(data);
        console.log(JSON.stringify(data));
      });
  };

  function indication() {
    return <div className={styles.servicecolor}>No Reservation</div>;
  }

  // Remainder column formatter
  const reminderFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return <ActionComponent row={row} rowIndex={rowIndex} fetchAppointment={fetchUpcomingAppointment} />;
  };

  // Business column formatter
  const businessFormatterUpcoming = (
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

  // Service column formatter

  const serviceFormatterUpcoming = (
    rowContent: any,
    row: any,
    rowIndex: any
  ) => {
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

  // Time column formatter
  const timeFormatterUpcoming = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"time_" + rowIndex}>
        {moment(new Date(row.reservationDate), "HH:mm").format("hh:mm A")}
      </div>
    );
  };

  // date column formatter
  const dateFormatterUpcoming = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"date_" + rowIndex}>
        {moment(new Date(row.reservationDate)).format("MM-DD-YYYY")}
      </div>
    );
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

  //  column Data
  const columnsUpcomingAppointment = [
    {
      dataField: "reservationDate",
      text: "Date",
      formatter: dateFormatterUpcoming,
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
      formatter: timeFormatterUpcoming,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "10%" };
      },
    },
    {
      dataField: "businessInfo.serviceId.category",
      text: "Category",
      align: "left",
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "11%" };
      },
    },
    {
      dataField: "businessInfo.companyName",
      text: "Businesss",
      align: "left",
      formatter: businessFormatterUpcoming,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "30%" };
      },
    },
    {
      dataField: "Services",
      text: "Services",
      formatter: serviceFormatterUpcoming,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "23%" };
      },
    },
    {
      dataField: "Price",
      text: "Price",
      align: "center",
      formatter: priceFormatter,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "10%", textAlign: "center" };
      },
    },
    {
      dataField: "Action",
      text: "Action",
      align: "center",
      formatter: reminderFormatter,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "35%", textAlign: "center" };
      },
    },
  ];

  // insert row in list
  const handleOnSelectAll = (isSelect: any, rows: any) => {
    {
      isSelect ? setIsCheckButton(true) : setIsCheckButton(false);
    }
    setRow(rows);
    const ids = row.map((r) => { });
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    // onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  // cancel all appointment
  const cancelAllAppointment = () => {
    row.map((r) => {
      console.log(r.id);

      let reservation = {
        id: r.id,
        isCancel: false,
      };

      cancelAppointment(reservation)
        .then((response) => response.text())
        .then((response) => {
          // setActive(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // fetchUpcomingAppointment();
    window.location.reload();
  };

  // Reminder On Off
  const remainderOnOffAll = (isOnOff: any) => {
    row.map((r) => {
      console.log(r.id);

      let reservation = {
        id: r.id,
        remainder: isOnOff,
      };

      remainderOnOffApi(reservation)
        .then((response) => response.text())
        .then((response) => { })
        .catch((err) => {
          console.log(err);
        });
    });
    window.location.reload();
  };

  return (
    <div className={`container-fluid`}>
      {/* Header Menu */}
      <div className="container">
        <br></br>
        <Row>
          <Col md="12">
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
                      <Row>
                        <Col md="5">
                          {/* <h5 className={styles.modalfacolor}>Upcoming Reservation</h5> */}
                        </Col>
                        {isCheckButton && (
                          <Col md="7">
                            <div>
                              <Button
                                variant="primary"
                                type="button"
                                className={`btn-sm btn-outline-primary ${styles.cancelappointment}`}
                                onClick={cancelAllAppointment}
                              >
                                Cancel
                              </Button>
                              &nbsp;
                              <Button
                                variant="primary"
                                type="button"
                                className={`btn-sm btn-outline-primary ${styles.formcontrolcancel}`}
                                onClick={(e) => remainderOnOffAll(true)}
                              >
                                Reminder On
                              </Button>
                              &nbsp;
                              <Button
                                variant="primary"
                                type="button"
                                className={`btn-sm btn-outline-primary ${styles.formcontrolcancel}`}
                                onClick={(e) => remainderOnOffAll(false)}
                              >
                                Reminder Off
                              </Button>
                            </div>
                          </Col>
                        )}
                      </Row>
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
                    selectRow={selectRow}
                  // rowEvents={rowEvents}
                  />
                </div>
              )}
            </ToolkitProvider>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpcomingAppointment;
