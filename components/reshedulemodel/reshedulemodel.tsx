import { useFormik } from "formik";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Modal, Col, InputGroup, Button, Row, Form } from "react-bootstrap";
import { getMenuData } from "../services/api/menu-api";
import { updateRestaurantAppointment, updateFinanceAppointment, updateAutomotiveAppointment, updateHealthAppointment, cancelAppointment, getRestuarantPeople, getUserPastAppointmnetDateBet } from "../services/api/reservation-api";
import { getNumberOfPeopleOfAppointment, getServiceOfAppointment } from "../services/api/user-api";
import * as yup from "yup";
import styles from './reshedulemodel.module.css';
import { Cookies } from "react-cookie";
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { getBusinessHour } from "../services/api/business-api";
import { Time } from "highcharts";
import { DateUtils } from "react-day-picker";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

const ResheduleModel = (props: any) => {
  const cookies = new Cookies();

  const [list, setList] = useState([]);
  const [reschedule, setReschedule] = useState(false);
  const [isRemainder, setIsRemainder] = useState(false);
  const [people, setPeople] = useState("");
  const [dataPeople, setDataPeople] = useState<any[]>([]);
  const [menu, setMenu] = useState([]);

  const [timevalue, setTimeValue] = useState<any>();
  const [dayArr, setDayArr] = useState<any[]>([]);
  const [disableHourArr, setDisableHourArr] = useState<any[]>([]);
  const [dateValue, setDateValue] = useState<any>();
  const [workingDay, setWorkingDay] = useState([]);
  const [dateError, setDateError] = useState("Date is required.");
  const [updatedValue, setUpdatedValue] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeDuration, setTimeDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  const [reservationData, setReservationData] = useState({
    reservationDate: moment(new Date(props.row.reservationDate)).format(
      "YYYY-MM-DD"
    ),
    reservationTime: moment(
      new Date(props.row.reservationDate),
      "HH:mm"
    ).format("HH:mm"),
    numberOfPeople: "",
    service: "",
  });

  useEffect(() => {

    if (props.row.businessInfo.serviceId.id == "restaurant") {
      fetchPeople();
      fetchNumberOfPeople();
    } else {
      fetchData();
      fetchServicePrice();
    }
  }, [props.row]);

  const fetchData = () => {
    getMenuData(props.row.businessInfo.id)
      .then((data) => data.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPeople = () => {
    //fetching data for people
    getRestuarantPeople(props.row.businessInfo.id)
      .then((data) => data.json())
      .then((data) => {
        for (var i = 1; i <= data; i++) {
          dataPeople.push(i);
        }
        // setDataPeople(data);
      });
  };

  const fetchNumberOfPeople = () => {
    getNumberOfPeopleOfAppointment(props.row.id)
      .then((data) => data.json())
      .then((data) => {
        formik.values.reservationData.numberOfPeople = data.seatingCapacity;
        setPeople(data.seatingCapacity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchServicePrice = () => {
    getServiceOfAppointment(props.row.id, props.row.businessInfo.serviceId.id)
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setMenu(data.service.menuName);
        formik.values.reservationData.service = data.service.id;
      });
  };

  const remainderOnOff = (e: any) => {
    e.target.classList.toggle("fared");

    if (isRemainder == true) {
      setIsRemainder(false);
    } else {
      setIsRemainder(true);
    }
  };

  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: {
      reservationData,
    },
    //it is used for validation
    validationSchema: yup.object({
      reservationData: yup.object().shape({
        reservationDate: yup.string().required("Date is required"),
        reservationTime: yup.string().required("Time is required"),
      }),
    }),
    //form submit call
    onSubmit: (values) => {
      var date = moment(new Date(values.reservationData.reservationDate), 'YYYY-MM-DD').format();

      const dateTime = moment(
        `${date} ${values.reservationData.reservationTime}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();
      if (props.row.businessInfo.serviceId.id == "restaurant") {
        let reservationData = {
          reservation: {
            id: props.row.id,
            reservationDate: new Date(dateTime),
          },
          seatingCapacity: values.reservationData.numberOfPeople,
        };
        // post call to update Restaurant data
        updateRestaurantAppointment(reservationData)
          .then((response) => response.text())
          .then((response) => {
            if (
              typeof response == "undefined" ||
              response == null ||
              response == ""
            ) {
            } else {
              props.setModalShow(false);
              props.fetchAppointment();
              // window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let reservationData = {
          reservation: {
            id: props.row.id,
            reservationDate: new Date(dateTime),
          },
          service: { id: values.reservationData.service },
        };

        if (props.row.businessInfo.serviceId.id == "finance") {
          updateFinanceAppointment(reservationData)
            .then((response) => response.text())
            .then((response) => {
              if (
                typeof response == "undefined" ||
                response == null ||
                response == ""
              ) {
              } else {
                props.setModalShow(false);
                props.fetchAppointment();
                // // props.modal.setModalShow(false);
                // window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        if (props.row.businessInfo.serviceId.id == "automotive") {
          updateAutomotiveAppointment(reservationData)
            .then((response) => response.text())
            .then((response) => {
              if (
                typeof response == "undefined" ||
                response == null ||
                response == ""
              ) {
              } else {
                // props.modal.setModalShow(false);
                //window.location.reload();
                props.setModalShow(false);
                props.fetchAppointment();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        if (props.row.businessInfo.serviceId.id == "health") {
          updateHealthAppointment(reservationData)
            .then((response) => response.text())
            .then((response) => {
              if (
                typeof response == "undefined" ||
                response == null ||
                response == ""
              ) {
              } else {
                // props.modal.setModalShow(false);
                //window.location.reload();
                props.setModalShow(false);
                props.fetchAppointment();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  });

  const cancelAppointmentFunc = (row: any, e: any) => {
    let reservation = {
      id: row.id,
      isCancel: true,
    };

    cancelAppointment(reservation)
      .then((response) => response.text())
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const showSecond = false;
  const str = 'HH:mm';

  function disabledHours() {
    return disableHourArr;
  }

  function disabledSeconds(h: any, m: any) {
    return [h + m % 60];
  }

  function parseDate(str: any, format: any, locale: any) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }

  function formatDate(date: any, format: any, locale: any) {
    return dateFnsFormat(date, format, { locale });
  }

  const FORMAT = 'MM-dd-yyyy';

  useEffect(() => {
    fetchBusinessWorkingHour();
  }, [])

  const AnEnum = (days: string) => {
    if (days == "SUNDAY") { return 0 } else if (days == "0") { return "SUNDAY" }
    if (days == "MONDAY") { return 1 } else if (days == "1") { return "MONDAY" }
    if (days == "TUESDAY") { return 2 } else if (days == "2") { return "TUESDAY" }
    if (days == "WEDNESDAY") { return 3 } else if (days == "3") { return "WEDNESDAY" }
    if (days == "THURSDAY") { return 4 } else if (days == "4") { return "THURSDAY" }
    if (days == "FRIDAY") { return 5 } else if (days == "5") { return "FRIDAY" }
    if (days == "SATURDAY") { return 6 } else if (days == "6") { return "SATURDAY" }
  }

  const fetchBusinessWorkingHour = () => {
    getBusinessHour(String(props.row.businessInfo.id))
      .then((data) => data.json())
      .then((data) => {
        setTimeDuration(Number(data.duration));
        setWorkingDay(data.workingDay);
        {
          data.workingDay.map((d: any, index: any) => {
            if (d.off == true) {
              dayArr.push(AnEnum(d.dayOfWeek));
              setLoading(true);
            }
          })
          setDateValue(new Date(props.row.reservationDate));

        }

      });
  }

  useEffect(() => {
    if (dateValue != undefined) {
      var reserveDate = new Date(dateValue);
      var today = new Date();
      let filterdata: any;
      filterdata = workingDay.find((obj: any) => obj.dayOfWeek == AnEnum(reserveDate.getDay().toString()))
      console.log("filterdata===========", filterdata);
      if (filterdata.off == false) {
        let workStartTime: any;
        let workEndTime: any;
        workStartTime = new Time(filterdata.workStartTime);
        workEndTime = new Time(filterdata.workEndTime);
        if (reserveDate.getDate() == today.getDate() && moment(new Date(), 'hh:mm A').format("HH:mm") > moment(filterdata.workEndTime, 'hh:mm A').format("HH:mm")) {
          setDateValue("");
          formik.setFieldValue("date", "")
          setDateError("Appointment not available.")
        } else if (reserveDate.getDate() == today.getDate() && moment(new Date(), 'hh:mm A').format("HH:mm") > moment(filterdata.workStartTime, 'hh:mm A').format("HH:mm")) {
          today.setHours(Number(today.getHours()) + 1);
          today.setMinutes(0);
          // setStartTime(moment(today, 'HH:mm').format("hh:mm A"));
          // setEndTime(moment(filterdata.workEndTime, 'HH:mm').format("hh:mm A"));
          setStartTime(moment(today, ["h:mm A"]).format("HH:mm"));
          setEndTime(moment(filterdata.workEndTime, ["h:mm A"]).format("HH:mm"));

          setTimeValue(moment(today, 'HH:mm').format("hh:mm A") + "");
        } else {
          // setStartTime(moment(filterdata.workStartTime, 'HH:mm').format("hh:mm A"));
          // setEndTime(moment(filterdata.workEndTime, 'HH:mm').format("hh:mm A"));
          
          setStartTime(moment(filterdata.workStartTime, ["h:mm A"]).format("HH:mm"));
          setEndTime(moment(filterdata.workEndTime, ["h:mm A"]).format("HH:mm"));

          setTimeValue(moment(filterdata.workStartTime, 'HH:mm').format("hh:mm A") + "");
        }

        if (updatedValue == 0) {
          // setTimeValue(moment(props.row.reservationDate));
          setTimeValue(moment(new Date(props.row.reservationDate), 'HH:mm').format("hh:mm A") + "");

          setUpdatedValue(1);
        }

      }
    }

  }, [dateValue])

  // useEffect(() => {
  //   if (dateValue != "") {
  //     var reserveDate = new Date(dateValue);
  //     var today = new Date();
  //     let filterdata: any;
  //     filterdata = workingDay.find((obj: any) => obj.dayOfWeek == AnEnum(reserveDate.getDay().toString()))

  //     console.log("filterdata===========", filterdata);
  //     if (filterdata.off == false) {
  //       let workStartTime: any;
  //       let workEndTime: any;
  //       workStartTime = new Time(filterdata.workStartTime);
  //       workEndTime = new Time(filterdata.workEndTime);
  //       if (reserveDate.getDate() == today.getDate() && moment(new Date(), 'hh:mm A').format("HH:mm") > moment(filterdata.workEndTime, 'hh:mm A').format("HH:mm")) {
  //         setDateValue("");
  //         formik.setFieldValue("date", "")
  //         setDateError("Appointment not available.")
  //       } else if (reserveDate.getDate() == today.getDate() && moment(new Date(), 'hh:mm A').format("HH:mm") > moment(filterdata.workStartTime, 'hh:mm A').format("HH:mm")) {
  //         today.setHours(Number(today.getHours()) + 1);
  //         today.setMinutes(0);
  //         setStartTime(moment(today, 'HH:mm').format("hh:mm A"));
  //         setEndTime(moment(filterdata.workEndTime, 'HH:mm').format("hh:mm A"));
  //         setTimeValue(moment(today, 'HH:mm').format("hh:mm A") + "");
  //       } else {
  //         setStartTime(moment(filterdata.workStartTime, 'HH:mm').format("hh:mm A"));
  //         setEndTime(moment(filterdata.workEndTime, 'HH:mm').format("hh:mm A"));
  //         setTimeValue(moment(filterdata.workStartTime, 'HH:mm').format("hh:mm A") + "");
  //       }

  //       if (updatedValue == 0) {
  //         setTimeValue(moment(props.row.reservationDate));
  //         setUpdatedValue(1);
  //       }

  //     }
  //   }

  // }, [dateValue])

  useEffect(() => {
    if (timevalue != undefined) {
      formik.setFieldValue("reservationData.reservationTime", moment(timevalue, 'hh:mm A').format('HH:mm'));

    }
  }, [timevalue])

  const changeTime = (startHour: string, endHour: string) => {
    let hourArr = [];
    for (var i = 0; i < 24; i++) {
      if (i < Number(startHour) || i > Number(endHour) - 1) {
        hourArr.push(i);
      }

    }
    if (hourArr.length == 24) {
      setDateValue("");
      formik.setFieldValue("reservationData.reservationDate", "")
      setTimeValue(undefined);
      setDateError("Appointment not available.")
    } else {
      setDateError("Date is required.")
      setDisableHourArr(hourArr);
    }
  }

  function onChange(value: any) {
    // console.log(value && value.format(str));
    setTimeValue(value);
    formik.setFieldValue("reservationData.reservationTime", value.format(str));
  }

  const onTimeChange = (options: any) => {
    var time = options.hour + ":" + options.minute + " " + options.meridiem;
    setTimeValue(time);
  }



  return (
    <div>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        {...props}
      >
        <strong className={`${styles.modalheader}`}>
          <Modal.Header closeButton>
            {props.row.businessInfo.companyName}
          </Modal.Header>
        </strong>
        <Modal.Body>
          <Row>
            <Col md="12" xs={12}>
              <div className={`${styles.modalcontrolborder}`}>
                <span className={styles.modalfacolor}>
                  <i className="fa fa-map-marker fa-lg"></i>&nbsp;&nbsp; Address
                  &nbsp;&nbsp;
                </span>
                {props.row.businessInfo.address.addressLineOne}
              </div>
            </Col>
            <br></br>
            <br></br>
          </Row>
          <Row>
            <Col md="12">
              <div className={` ${styles.modalcontrolborder}`}>
                <Row>
                  <Col>
                    <span className={styles.modalfacolor}>
                      <i className="fa fa-phone "></i>&nbsp;&nbsp;Contact
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div
                      className={`${styles.modalcontrolborder} ${styles.bordernone}`}
                    >
                      {props.row.businessInfo.telephone.number}
                    </div>
                  </Col>
                  <Col md="2">
                    <div
                      className={`${styles.modalcontrolborder} ${styles.bordernone}`}
                    >
                      Reception
                    </div>
                  </Col>
                  <Col md="6">
                    <div
                      className={`${styles.modalcontrolborder} ${styles.bordernone}`}
                    >
                      <span className={styles.modalfacolor}>
                        <i className="fa fa-envelope"></i>
                      </span>
                      &nbsp;<u> {props.row.businessInfo.email}</u>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div
                      className={`${styles.modalcontrolborder} ${styles.bordernone}`}
                    >
                      {props.row.businessInfo.vendor && props.row.businessInfo.vendor.managingDirector.mobileNumber.number}
                    </div>
                  </Col>
                  <Col md="2">
                    <div
                      className={`${styles.modalcontrolborder} ${styles.bordernone}`}
                    >
                      Manager
                    </div>
                  </Col>
                  <Col md="6">
                    <div
                      className={`${styles.modalcontrolborder} ${styles.bordernone}`}
                    >
                      <span className={styles.modalfacolor}>
                        <i className="fa fa-globe"></i>
                      </span>
                      &nbsp;<u>{props.row.businessInfo.profile.websiteUrl}</u>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <br />
          {!reschedule && (
            <div className="reshedule">
              <Row>
                <Col md="6" xs={12}>
                  <div className={`${styles.modalcontrolborder}`}>
                    <span className={styles.modalfacolor}>
                      <i className="fa fa-calendar"></i>&nbsp;&nbsp; Date
                      &nbsp;&nbsp;
                    </span>
                    {moment(new Date(props.row.reservationDate)).format(
                      "MM-DD-YYYY"
                    )}
                  </div>
                </Col>
                <Col md="6" xs={12}>
                  <div className={`${styles.modalcontrolborder}`}>
                    <span className={styles.modalfacolor}>
                      <i className="fas fa-clock"></i>&nbsp;&nbsp; Time
                      &nbsp;&nbsp;
                    </span>
                    {moment(new Date(props.row.reservationDate), "HH:mm").format(
                      "hh:mm A"
                    )}
                  </div>
                </Col>
              </Row>
              <br />
              {props.row.businessInfo.serviceId.id == "restaurant" && (
                <Row>
                  <Col md="12" xs={12}>
                    <div className={`${styles.modalcontrolborder}`}>
                      <span className={styles.modalfacolor}>
                        <i className="fa fa-align-justify"></i>&nbsp;&nbsp; No
                        Of People &nbsp;&nbsp;
                      </span>
                      {people}
                    </div>
                  </Col>
                </Row>
              )}
              {props.row.businessInfo.serviceId.id != "restaurant" && (
                <Row>
                  <Col md="12" xs={12}>
                    <div className={`${styles.modalcontrolborder}`}>
                      <span className={styles.modalfacolor}>
                        <i className="fa fa-align-justify"></i>&nbsp;&nbsp;
                        Service Type &nbsp;&nbsp;
                      </span>
                      {menu}
                    </div>
                  </Col>
                </Row>
              )}
              <hr />
              <Row>
                <Col>
                  <div className={`${styles.buttonright}`}>
                    <Button
                      variant="primary"
                      type="button"
                      className={`${styles.cancelappointment}`}
                      onClick={(e) => cancelAppointmentFunc(props.row, e)}
                    >
                      Cancel Appointment
                    </Button>
                    &nbsp;
                    <Button
                      variant="primary"
                      type="button"
                      className={`${styles.formcontrolcancel}`}
                      onClick={() => setReschedule(!reschedule)}
                    >
                      Reschedule
                    </Button>
                  </div>
                </Col>
              </Row>
              <br></br>
            </div>
          )}
          {reschedule && (
            <div className="resheduleEdit">
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationFormik101">
                    <InputGroup>
                      <Row>
                        <Col md="4">
                          <InputGroup>
                            <InputGroup.Text id="inputGroupText">
                              <span className={styles.modalfacolor}>
                                <i className="fa fa-calendar"></i>&nbsp;&nbsp; Date
                                &nbsp;&nbsp;
                              </span>
                            </InputGroup.Text>
                          </InputGroup>
                        </Col>
                        {/* <Form.Control
                        type="date"
                        placeholder="Date"
                        aria-describedby="inputGroupText"
                        name="reservationData.reservationDate"
                        value={formik.values.reservationData.reservationDate}
                        onChange={formik.handleChange}
                        isInvalid={
                          !!formik.errors.reservationData?.reservationDate
                        }
                      /> */}
                        <Col md="8">
                          <DayPickerInput
                            placeholder="Select Date"
                            inputProps={{
                              className: 'date-control',
                              readOnly: true,
                            }}
                            value={dateValue}
                            formatDate={formatDate}
                            format={FORMAT}
                            onDayChange={(day: any) => {
                              setDateValue(day); formik.setFieldValue("reservationData.reservationDate", day);
                            }}
                            parseDate={parseDate}

                            dayPickerProps={{
                              modifiers: {
                                disabled: [
                                  {
                                    daysOfWeek: dayArr
                                  },
                                  {
                                    before: new Date()
                                  }
                                ]
                              }
                            }}
                          />
                        </Col>
                        {/* <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.reservationData?.reservationDate}
                      </Form.Control.Feedback> */}
                        <i className={`far fa-calendar-alt ${styles.dateicon}`}></i>
                        <div className="formik-error">
                          {formik.errors.reservationData?.reservationDate}
                        </div>
                      </Row>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik102">
                    <InputGroup>
                      <Row>
                        <Col md="4">
                          <InputGroup>
                            <InputGroup.Text id="inputGroupText" className={styles.inputmarginleft}>
                              <span className={styles.modalfacolor}>
                                <i className="fas fa-clock"></i>&nbsp;&nbsp; Time
                                &nbsp;&nbsp;
                              </span>
                            </InputGroup.Text>
                          </InputGroup>
                        </Col>
                        {/* <Form.Control
                        type="time"
                        placeholder="Time"
                        aria-describedby="inputGroupText"
                        name="reservationData.reservationTime"
                        value={formik.values.reservationData.reservationTime}
                        onChange={formik.handleChange}
                        isInvalid={
                          !!formik.errors.reservationData?.reservationTime
                        }
                      /> */}
                        <Col md="8">
                          {/* <TimePicker
                            placeholder="Select Time"
                            showSecond={showSecond}
                            className={`form-control-border ${styles.formControlPlaceHolder} ${styles.timecontrol}`}
                            disabledHours={disabledHours}
                            disabledSeconds={disabledSeconds}
                            value={timevalue}
                            onChange={onChange}
                          /> */}
                          {loading && (
                            <TimePicker
                              onTimeChange={onTimeChange}
                              value={timevalue}
                              time={timevalue}
                              theme="classic"
                              timeMode="12"
                              // className={`form-control-border ${styles.formControlPlaceHolder} ${styles.timecontrol}`}
                              // focused
                              timeConfig={{
                                from: startTime,
                                to: endTime,
                                step: timeDuration,
                                unit: 'minutes',
                              }}
                            />
                          )}
                        </Col>
                        {/* <i className={`far fa-clock ${styles.timeicon}`}></i> */}
                        <div className="formik-error">
                          {formik.errors.reservationData?.reservationTime}
                        </div>
                      </Row>
                      {/* <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.reservationData?.reservationTime}
                      </Form.Control.Feedback> */}

                    </InputGroup>
                  </Form.Group>
                  
                </Row>
                <br/>
                {props.row.businessInfo.serviceId.id == "restaurant" && (
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <span className={styles.modalfacolor}>
                              <i className="fa fa-align-justify"></i>
                              &nbsp;&nbsp; No Of People &nbsp;&nbsp;
                            </span>
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          as="select"
                          placeholder="Vendor Designation"
                          aria-describedby="inputGroupText"
                          name="reservationData.numberOfPeople"
                          value={formik.values.reservationData.numberOfPeople}
                          onChange={formik.handleChange}
                          isInvalid={
                            !!formik.errors.reservationData?.numberOfPeople
                          }
                        >
                          <option value="">Select People</option>
                          <option value="1">For 1</option>
                          <option value="2">For 2</option>
                          <option value="3">For 3</option>
                          <option value="4">For 4</option>
                          <option value="5">For 5</option>
                          <option value="6">For 6</option>
                          <option value="7">For 7</option>
                          <option value="8">For 8</option>
                          {/* {dataPeople.map((d: any, index: any) => {
                            return (
                              <option value={d} key={"people_" + index}>
                                For {d}
                              </option>
                            );
                          })} */}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.reservationData?.numberOfPeople}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                )}
                {props.row.businessInfo.serviceId.id != "restaurant" && (
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik106"
                    >
                      <InputGroup>
                        <InputGroup.Text>
                          <InputGroup.Text id="inputGroupText">
                            <span className={styles.modalfacolor}>
                              <i className="fa fa-align-justify"></i>
                              &nbsp;&nbsp; Service Type &nbsp;&nbsp;
                            </span>
                          </InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          as="select"
                          placeholder="Vendor Designation"
                          aria-describedby="inputGroupText"
                          name="reservationData.service"
                          value={formik.values.reservationData.service}
                          onChange={formik.handleChange}
                          isInvalid={!!formik.errors.reservationData?.service}
                        >
                          {list.map((d: any, index: any) => {
                            return (
                              <optgroup
                                className={`${styles.formcontroloptgroup}`}
                                label={d.menuCategories.categoryName}
                                key={"menu_"+index}
                              >
                                {d.menuSubCategoriesList.map(
                                  (menuSubCategories: any, index: any) => {
                                    return (
                                      <option
                                        className={`${styles.formcontroloption}`}
                                        value={menuSubCategories.id}
                                        key={"submenu_"+index}
                                      >
                                        {menuSubCategories.menuName}
                                      </option>
                                    );
                                  }
                                )}
                              </optgroup>
                            );
                          })}
                        </Form.Control>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                )}
                <hr />
                <Row>
                  <Col>
                    <div className={`${styles.buttonright}`}>
                      <Button
                        variant="primary"
                        type="submit"
                        className={`${styles.formcontrolsave}`}
                      >
                        Save
                      </Button>
                      &nbsp;
                      <Button
                        variant="primary"
                        type="reset"
                        className={`${styles.formcontrolcancel}`}
                        onClick={() => setReschedule(!reschedule)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ResheduleModel;