import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { useFormik } from "formik";
import { Time } from "highcharts";
import { MDBIcon } from "mdb-react-ui-kit";
import moment from "moment";
import 'moment/locale/it';
import { useRouter } from "next/router";
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import { DateUtils } from 'react-day-picker';
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';
import * as yup from "yup";
import MessageBox from "../../components/messagebox/messagebox";
import { getBusinessHour } from "../services/api/business-api";
import { postBookAppointment, postRestaurantBookAppointment } from "../services/api/reservation-api";
import styles from "./reservationpanel.module.css";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import { getMenuData } from '../services/api/menu-api';

const ReservationPanel = (props: any) => {
  const cookies = new Cookies();
  const router = useRouter();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [timevalue, setTimeValue] = useState<any>();
  const [dayArr, setDayArr] = useState<any[]>([]);

  const [dateValue, setDateValue] = useState("");
  const [workingDay, setWorkingDay] = useState([]);
  const [dateError, setDateError] = useState("Date is required.");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeDuration, setTimeDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    //getting data from people api
    fetchPeople();
    fetchData();
  }, []);

  const fetchPeople = () => {
    //fetching data for people
    // getRestuarantPeople(props.data)
    //   .then((data) => data.json())
    //   .then((data) => {
    //     for (var i = 1; i <= data; i++) {
    //       dataPeople.push(i);
    //     }
    //   });
  };

  const fetchData = () => {
    setLoading(true);
    getMenuData(props.data)
      .then((data) => data.json())
      .then((data) => {
        setList(data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

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
    getBusinessHour(String(router.query.id))
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
        }

      });
  }

  useEffect(() => {
    if (dateValue != "") {
      setLoading(false);

      var reserveDate = new Date(dateValue);
      var today = new Date();
      let filterdata: any;
      filterdata = workingDay.find((obj: any) => obj.dayOfWeek == AnEnum(reserveDate.getDay().toString()))
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

      }
      setLoading(true);
    //  console.log("startTime==========",startTime)
    //  console.log("endtime==========",endTime)

    }

  }, [dateValue])

  useEffect(() => {
    if (timevalue != undefined) {
      formik.setFieldValue("time", moment(timevalue, 'hh:mm A').format('HH:mm'));
    }
  }, [timevalue])


  const validationSchema = yup.object({
    services: yup.string().required("Required feild."),
    date: yup.string().required(dateError),
    time: yup.string().required("Time is required"),
  })

  const formik = useFormik({
    initialValues: { services: "", date: "", time: "" },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      var date = moment(new Date(values.date), 'YYYY-MM-DD').format();
      const dateTime = moment(
        `${date} ${values.time}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();


      if (cookies.get("id") == undefined) {
        setIsMessage(true);
        setMessage("Please Sign In.");
        setVariant("danger");
      } else {
        if (router.pathname == "/restaurant") {
          let reservationData = {
            reservation: {
              reservationDate: new Date(dateTime),
              // reservationTime: values.time,
              businessInfo: { id: router.query.id },
              reservationUser: { id: cookies.get("id") },
            },
            seatingCapacity: values.services,
          };
          postRestaurantBookAppointment(reservationData)
            .then((response) => response.text())
            .then((response) => {
              setIsMessage(true);
              console.log("response========",response);

              if (
                typeof response == "undefined" ||
                response == null ||
                response == ""
              ) {
                setMessage("Something wrong! Appointment Not booked.");
                setVariant("danger");
              } else {
                actions.resetForm();
                setTimeValue(undefined);
                setDateValue("");
                setVariant("success");
                setMessage("Thanks! Appointment booked successfully.");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          let reservationData = {
            reservation: {
              reservationDate: new Date(dateTime),
              businessInfo: { id: router.query.id },
              reservationUser: { id: cookies.get("id") },
            },
            service: { id: values.services },
          };
          postBookAppointment(reservationData, router.pathname)
            .then((response) => response.text())
            .then((response) => {
              setIsMessage(true);

              if (
                typeof response == "undefined" ||
                response == null ||
                response == ""
              ) {
                setMessage("Something wrong! Appointment Not booked.");
                setVariant("danger");
              } else {
                actions.resetForm();
                setTimeValue(undefined);
                setDateValue("");
                setVariant("success");
                setMessage("Thanks! Appointment booked successfully.");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }


    },
  });

  const onTimeChange = (options: any) => {
    var time = options.hour + ":" + options.minute + " " + options.meridiem;
    setTimeValue(time);
  }

  return (
    <div className={` ${styles.box}`}>
      <div className={`${styles.boxtitle}`}>
        <h4>
          <b>
            <MDBIcon icon="external-link-alt" />
            &nbsp;Reservation
          </b>
        </h4>
      </div>
      <hr></hr>

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          {router.pathname != "/restaurant" && (
            <Form.Group as={Col} md="12" controlId="validationFormik101">
              <Form.Label>
                <b>Services</b>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  as="select"
                  placeholder="Services"
                  aria-describedby="inputGroupPrepend"
                  name="services"
                  value={formik.values.services}
                  onChange={formik.handleChange}
                  className={` ${styles.formcontrol}`}
                  isInvalid={!!formik.errors.services}
                >
                  <option value="">Select Service</option>

                  {list.map((d: any, index: any) => {
                    return (
                      <optgroup
                        className={`${styles.formcontroloptgroup}`}
                        label={d.menuCategories.categoryName}
                        key={"category_"+index}
                      >
                        {d.menuSubCategoriesList.map(
                          (menuSubCategories: any, index: any) => {
                            return (
                              <option
                                className={`${styles.formcontroloption}`}
                                value={menuSubCategories.id}
                                key={"subcategory_"+index}

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
                <Form.Control.Feedback type="invalid" >
                  {formik.errors.services}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}
          {router.pathname == "/restaurant" && (
            <Form.Group as={Col} md="12" controlId="validationFormik101">
              <Form.Label>
                <b>People</b>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  as="select"
                  placeholder="People"
                  aria-describedby="inputGroupPrepend"
                  name="services"
                  value={formik.values.services}
                  onChange={formik.handleChange}
                  className={` ${styles.formcontrol}`}
                  isInvalid={!!formik.errors.services}
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
                <Form.Control.Feedback type="invalid">
                  {formik.errors.services}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}
        </Row>


        <br/><Row>
          <Form.Group as={Col} md="7" controlId="validationFormik102">
            <Form.Label>
              <b>Date</b>
            </Form.Label>
            <br />
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
                setDateValue(day); formik.setFieldValue("date", day);
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
            <i className={`far fa-calendar-alt ${styles.dateicon}`}></i>
            <div className="formik-error">
              {formik.errors.date}
            </div>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationFormik103">
            <Form.Label>
              <b>Time</b>
            </Form.Label>
            <br />
            {loading && (
              <TimePicker
                onTimeChange={onTimeChange}
                value={timevalue}
                time={timevalue}
                theme="classic"
                timeMode="12"
                // focused
                timeConfig={{
                  from: startTime,
                  to: endTime,
                  step: timeDuration,
                  unit: 'minutes',
                }}
              />
            )}
            <div className="formik-error">
              {formik.errors.time}
            </div>
          </Form.Group>
        </Row>
        <br/>
        <Button
          type="submit"
          id="btnLogin"
          className={`btn  btn-sm  ${styles.findtable}`}
        >
          {router.pathname == "/restaurant" ?<>Book a Table</>:<>Book an Appointment</>}
        </Button>
      </Form>
      <br></br>
      {isMessage ? <MessageBox variant={variant} message={message} /> : ""}

      <br></br>
    </div>
  );
};
export default ReservationPanel;
