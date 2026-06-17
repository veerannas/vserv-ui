import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row
} from "react-bootstrap";
import { Cookies } from "react-cookie";
import { getBusinessHour, getBusinessHourIsAvailable } from "../../../components/services/api/business-api";
import styles from "./index.module.css";
import moment from "moment";

const NonEditForm = () => {
  const cookies = new Cookies();
  const [companyData, setCompanyData] = useState({
    Monday: {
      dayOfWeek: "MONDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },
    Tuesday: {
      dayOfWeek: "TUESDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },
    Wednesday: {
      dayOfWeek: "WEDNESDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },
    Thursday: {
      dayOfWeek: "THURSDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },
    Friday: {
      dayOfWeek: "FRIDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },
    Saturday: {
      dayOfWeek: "SATURDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },
    Sunday: {
      dayOfWeek: "SUNDAY",
      off: false,
      workStartTime: "",
      workEndTime: "",
    },

  });


  useEffect(() => {
    fetchBusinessHourIsAvailable();
  }, [])

  const fetchBusinessHourIsAvailable = () => {
    getBusinessHourIsAvailable(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        if (data == 1) {
          // setIsBusinessHourAvailable(data);
          fetchBusinessWorkingHour();
        }
        console.log("data=====", JSON.stringify(data));
      });
  }

  const fetchBusinessWorkingHour = () => {
    getBusinessHour(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        console.log("list=====", JSON.stringify(data));
        // console.log("list000=====", JSON.stringify(data.workingDay[0].workStartTime));
        let workingDay = [];
        workingDay = data.workingDay;
        setCompanyData({
          Monday: {
            dayOfWeek: workingDay[0].workStartTime,
            off: workingDay[0].off,
            workStartTime: workingDay[0].workStartTime,
            workEndTime: workingDay[0].workEndTime,
          },
          Tuesday: {
            dayOfWeek: workingDay[1].workStartTime,
            off: workingDay[1].off,
            workStartTime: workingDay[1].workStartTime,
            workEndTime: workingDay[1].workEndTime,
          },
          Wednesday: {
            dayOfWeek: workingDay[2].workStartTime,
            off: workingDay[2].off,
            workStartTime: workingDay[2].workStartTime,
            workEndTime: workingDay[2].workEndTime,
          },
          Thursday: {
            dayOfWeek: workingDay[3].workStartTime,
            off: workingDay[3].off,
            workStartTime: workingDay[3].workStartTime,
            workEndTime: workingDay[3].workEndTime,
          },
          Friday: {
            dayOfWeek: workingDay[4].workStartTime,
            off: workingDay[4].off,
            workStartTime: workingDay[4].workStartTime,
            workEndTime: workingDay[4].workEndTime,
          },
          Saturday: {
            dayOfWeek: workingDay[5].workStartTime,
            off: workingDay[5].off,
            workStartTime: workingDay[5].workStartTime,
            workEndTime: workingDay[5].workEndTime,
          },
          Sunday: {
            dayOfWeek: workingDay[6].workStartTime,
            off: workingDay[6].off,
            workStartTime: workingDay[6].workStartTime,
            workEndTime: workingDay[6].workEndTime,
          },
        });


      });
  }
  return (
    <div className="wrapper-display">
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Monday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Monday.workStartTime, "HH:mm").format("hh:mm A")}
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Monday.workEndTime, "HH:mm").format("hh:mm A")}
          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Monday.off ? 'Closed' : 'Open'}
        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Tuesday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Tuesday.workStartTime, "HH:mm").format("hh:mm A")}
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Tuesday.workEndTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Tuesday.off ? 'Closed' : 'Open'}
        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Wednesday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Wednesday.workStartTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Wednesday.workEndTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Wednesday.off ? 'Closed' : 'Open'}
        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Thursday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Thursday.workStartTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Thursday.workEndTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Thursday.off ? 'Closed' : 'Open'}

        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Friday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Friday.workStartTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Friday.workEndTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Friday.off ? 'Closed' : 'Open'}

        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Saturday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Saturday.workStartTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Saturday.workEndTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Saturday.off ? 'Closed' : 'Open'}

        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Sunday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Sunday.workStartTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            &nbsp;{moment(companyData.Sunday.workEndTime, "HH:mm").format("hh:mm A")}

          </div>
        </Col>

        <Col className={`${styles.checkBoxCol}`}>
          {companyData.Sunday.off ? 'Closed' : 'Open'}
        </Col>
      </Row>
      <br />
      <Row>
        <Col className={styles.reservationCol}>Break Hours</Col>
      </Row>
      <br />
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Break Time</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            --:--
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            --:--
          </div>
        </Col>

      </Row>
      <br />
      <Row>
        <Col className={styles.reservationCol}>Reservation Hours</Col>
      </Row>
      <br />
      <Row>
        <Col as={Col} md="3">
          Single Slot Period
        </Col>

        <Col
          as={Col}
          md="2"
          className={`${styles.timeSelectCol}`}
        >
          <div className={`form-control-border ${styles.singleSlotPeriod}`}>
            --:--
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col as={Col} md="3" className={styles.ssrCol}>
          Single Slot Reservation
        </Col>

        <Col
          as={Col}
          md="2"
          className={`${styles.timeSelectCol}`}
        >
          <div
            className={`form-control-border ${styles.singleSlotReservation}`}
          >
            {7}
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col className={styles.rstCol}>Reservation Start Timing</Col>
      </Row>
      <br />
      <Row>
        <Col as={Col} md="4">
          <Form.Check
            type="radio"
            label="Set Same timing (All days)"
            name="allDays"
            id="allDays"
          />
        </Col>
        <Col as={Col} md="5">
          <Form.Check
            type="radio"
            label="Set different timing (individual days)"
            name="indDays"
            id="indDays"
            defaultChecked
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Monday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Tuesday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Wednesday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>

      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Thursday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Friday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>

      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Saturday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>

      </Row>
      <Row>
        <Col as={Col} md="2">
          <div className={styles.weekday}>Sunday</div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelFrom}`}>From</div>
        </Col>
        <Col as={Col} md="2">
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>
        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
          <div className={`${styles.labelTo}`}>To</div>
        </Col>
        <Col as={Col} md="2" className={`${styles.timeSelectCol}`}>
          <div
            className={`form-control-border ${styles.formControlPlaceHolder}`}
          >
            Open 24 hours
          </div>
        </Col>

      </Row>
    </div>
  );
};


export default NonEditForm;
