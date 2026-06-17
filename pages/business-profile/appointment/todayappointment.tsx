import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import BusinessCancelAppointmentModel from "../../../components/businesscancelappointmentmodel/businesscancelappointmentmodel";
import MenuRestaurantPeople from "../../../components/menupriceformatter/menupriceformatter";
import RestaurantPeople from "../../../components/restaurantpeople/restaurantpeople";
import ServiceFormatter from "../../../components/serviceformatter/serviceformatter";
import {
  cancelAppointmentByBusiness,
  getBusinessPastAppointmnetDateBet,
  getBusinessTodayAppointmnetDateBet,
  remainderOnOffApi
} from "../../../components/services/api/reservation-api";
import styles from "./index.module.css";

const TodayAppointment = () => {
  const cookies = new Cookies();
  const [count, setCount] = useState(0);
  const { SearchBar } = Search;
  const [upcomingAppointment, setTodayAppointment] = useState([]);
  const [isCheckButton, setIsCheckButton] = useState(false);
  const [row, setRow] = useState<any[]>([]);

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      // window.location.href = "/";
    } else {
      //api for fetch user today Appointment
      fetchTodayAppointment();
    }
  }, []);

  const fetchTodayAppointment = () => {
    let endDate = moment(new Date()).add(1, "days").format("YYYY-MM-DD");
    //fetch today appointment data
    getBusinessTodayAppointmnetDateBet(
      cookies.get("businessInfoId")
    )
      .then((data) => data.json())
      .then((data) => {
        setTodayAppointment([]);
        setTodayAppointment(data);
      });
  };

  function indication() {
    return <div className={styles.servicecolor}>No Reservation</div>;
  }

  // Remainder column formatter
  const reminderFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return <ActionComponent row={row} rowIndex={rowIndex} fetchAppointment={fetchTodayAppointment} />;
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
          {row.reservationUser.name.firstName} {row.reservationUser.name.lastName}
        </div>
        <div>({row.reservationUser.mobileNumber.countryCode}) {row.reservationUser.mobileNumber.number}</div>
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
          <MenuRestaurantPeople row={row} />
        )}
      </div>
    );
  };

  //  column Data
  const columnsTodayAppointment = [
    {
      dataField: "reservationDate",
      text: "Date",
      formatter: dateFormatterUpcoming,
      formatExtraData: count,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "12%" };
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
      dataField: "businessInfo.companyName",
      text: "Customer Name",
      align: "left",
      formatter: businessFormatterUpcoming,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "25%" };
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
        return { width: "15%", textAlign: "center" };
      },
    },
    {
      dataField: "Action",
      text: "Action",
      align: "center",
      formatter: reminderFormatter,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "30%", textAlign: "center" };
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
        isCancel: true,
      };

      cancelAppointmentByBusiness(reservation)
        .then((response) => response.text())
        .then((response) => {
          // setActive(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // fetchTodayAppointment();
    window.location.reload();
  };

  // Reminder On Off
  const remainderOnOffAll = (isOnOff: any) => {
    row.map((r) => {
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
              columns={columnsTodayAppointment}
              search
            >
              {(props: any) => (
                <div>
                  <Row>
                    <Col>
                      <Row>
                        <Col md="5">
                          {/* <h5>Today Reservation</h5> */}
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

export default TodayAppointment;

//@@@@@@@@@@@@@@ component @@@@@@@@@@@@@@@//


//Action componentet
const ActionComponent = (props: any) => {
  const [remainder, setRemainder] = useState(props.row.remainder);
  const [cancel, setcancel] = useState(props.row.cancel);
  const [modalShow, setModalShow] = useState(false);

  //remiander on off
  const remainderOnOff = (row: any, e: any) => {
    e.target.classList.toggle("fared");
    {
      remainder ? setRemainder(false) : setRemainder(true);
    }
    let reservation = {
      id: row.id,
      remainder: !row.remainder,
    };

    //api to set on off
    remainderOnOffApi(reservation)
      .then((response) => response.text())
      .then((response) => { })
      .catch((err) => {
        console.log(err);
      });
  };

  //cancel appointment
  const cancelAppointmentByBusinessFunc = (row: any, e: any) => {
    let reservation = {
      id: row.id,
      isCancel: true,
    };

    cancelAppointmentByBusiness(reservation)
      .then((response) => response.text())
      .then((response) => {
        setcancel(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className={`row ${styles.fabellcenter}`}
        key={"remainder_" + props.rowIndex}
      >
        {!cancel && (
          <Row>
            <Col>
              <button
                className={` btn-sm btn-outline-primary ${styles.actionbutton}`}
                onClick={() => setModalShow(true)}
              >
                Reservation
              </button>
            </Col>
            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
            {props.row.remainder == false && (
              <Col className={` ${styles.remaindermargin}`}>
                <i
                  onClick={(e) => remainderOnOff(props.row, e)}
                  className={`fa fa-bell facustom ${styles.fabellsize}`}
                ></i>
                {remainder ? (
                  <div className={`${styles.remainderbell}`}>Reminder On</div>
                ) : (
                  <div className={`${styles.remainderbell}`}>Reminder Off</div>
                )}
              </Col>
            )}
            
              {props.row.remainder == true && (
                <Col className={` ${styles.remaindermargin}`}>
                  <i
                    onClick={(e) => remainderOnOff(props.row, e)}
                    className={`fa fa-bell facustom fared ${styles.fabellsize}`}
                  ></i>
                  {remainder ? (
                    <div className={`${styles.remainderbell}`}>
                      Reminder On
                    </div>
                  ) : (
                    <div className={`${styles.remainderbell}`}>
                      Reminder Off
                    </div>
                  )}
                </Col>
              )}
           
          </Row>
        )}
        {cancel && (
          <div className={styles.cancelcolor}>
            <span>Cancelled </span>
          </div>
        )}
      </div>
      {modalShow ? (
        // <ResheduleModel
        //   row={props.row}
        //   show={modalShow}
        //   modal={setModalShow}
        //   onHide={() => setModalShow(false)}
        // />
        <BusinessCancelAppointmentModel
          row={props.row}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
          fetchAppointment={props.fetchAppointment}
        />
      ) : (
        ""
      )}
    </>
  );
};

