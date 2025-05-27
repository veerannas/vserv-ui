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
import { getBusinessReservationHour, getBusinessReservationHourIsAvailable } from "../../../components/services/api/reservation-api";

const NonEditReservationWorkingHour = (props: any) => {
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
    }, [props.isReservationFormEdit])

    const fetchBusinessHourIsAvailable = () => {
        getBusinessReservationHourIsAvailable(cookies.get("businessInfoId"))
            .then((data) => data.json())
            .then((data) => {
                if (data == 1) {
                    fetchBusinessWorkingHour();
                }
            });
    }

    const fetchBusinessWorkingHour = () => {
        getBusinessReservationHour(cookies.get("businessInfoId"))
            .then((data) => data.json())
            .then((data) => {
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


    const editHandler = () => {
        if (props.isReservationFormEdit == false) {
            props.setIsReservationFormEdit(true);
        } else {
            props.setIsReservationFormEdit(false);
        }
    };

    return (
        <div className="wrapper-display">
            <Row>
                <Col md="6" className={styles.operationCol}>Reservation Hours</Col>
                <Col md="3" className={styles.operationCol}><span className={styles.editSpan} onClick={editHandler}>Edit</span></Col>
            </Row>
            <br></br>
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
                        &nbsp;
            {(companyData.Monday.workStartTime || "") == "" ? "" : moment(companyData.Monday.workStartTime, "HH:mm").format("hh:mm A")}

                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Monday.workEndTime || "") == "" ? "" : moment(companyData.Monday.workEndTime, "HH:mm").format("hh:mm A")}
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
                        &nbsp;
            {(companyData.Tuesday.workStartTime || "") == "" ? "" : moment(companyData.Tuesday.workStartTime, "HH:mm").format("hh:mm A")}
                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Tuesday.workEndTime || "") == "" ? "" : moment(companyData.Tuesday.workEndTime, "HH:mm").format("hh:mm A")}

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
                        &nbsp;
            {(companyData.Wednesday.workStartTime || "") == "" ? "" : moment(companyData.Wednesday.workStartTime, "HH:mm").format("hh:mm A")}
                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Wednesday.workEndTime || "") == "" ? "" : moment(companyData.Wednesday.workEndTime, "HH:mm").format("hh:mm A")}

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
                        &nbsp;
            {(companyData.Thursday.workStartTime || "") == "" ? "" : moment(companyData.Thursday.workStartTime, "HH:mm").format("hh:mm A")}
                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Thursday.workEndTime || "") == "" ? "" : moment(companyData.Thursday.workEndTime, "HH:mm").format("hh:mm A")}

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
                        &nbsp;
            {(companyData.Friday.workStartTime || "") == "" ? "" : moment(companyData.Friday.workStartTime, "HH:mm").format("hh:mm A")}

                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Friday.workEndTime || "") == "" ? "" : moment(companyData.Friday.workEndTime, "HH:mm").format("hh:mm A")}

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
                        &nbsp;
            {(companyData.Saturday.workStartTime || "") == "" ? "" : moment(companyData.Saturday.workStartTime, "HH:mm").format("hh:mm A")}

                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Saturday.workEndTime || "") == "" ? "" : moment(companyData.Saturday.workEndTime, "HH:mm").format("hh:mm A")}
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
                        &nbsp;
            {(companyData.Sunday.workStartTime || "") == "" ? "" : moment(companyData.Sunday.workStartTime, "HH:mm").format("hh:mm A")}
                    </div>
                </Col>
                <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                    <div className={`${styles.labelTo}`}>To</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;
            {(companyData.Sunday.workEndTime || "") == "" ? "" : moment(companyData.Sunday.workEndTime, "HH:mm").format("hh:mm A")}
                    </div>
                </Col>

                <Col className={`${styles.checkBoxCol}`}>
                    {companyData.Sunday.off ? 'Closed' : 'Open'}
                </Col>
            </Row>
            <br />


        </div>
    );
};
export default NonEditReservationWorkingHour;