import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { getBusinessHour, getBusinessHourIsAvailable, postAddWorkingHoursOfBusiness } from "../../../components/services/api/business-api";
import styles from "./index.module.css";
import moment from "moment";

const EditForm = (props: any) => {
    const cookies = new Cookies();
    const [workingdayId, setWorkingdayId] = useState("");
    const [workingDay, setWorkingDay] = useState<any[]>([]);
    const [isFormEdit, setIsFormEdit] = useState(false);

    const [companyData, setCompanyData] = useState({
        Monday: {
            dayOfWeek: "MONDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""

        },
        Tuesday: {
            dayOfWeek: "TUESDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""
        },
        Wednesday: {
            dayOfWeek: "WEDNESDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""
        },
        Thursday: {
            dayOfWeek: "THURSDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""
        },
        Friday: {
            dayOfWeek: "FRIDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""
        },
        Saturday: {
            dayOfWeek: "SATURDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""
        },
        Sunday: {
            dayOfWeek: "SUNDAY",
            off: false,
            workStartTime: "",
            workEndTime: "",
            breakStartTime: "",
            breakEndTime: ""
        },
        breakStartTime: "",
        breakEndTime: ""

    });

    useEffect(() => {
        fetchBusinessHourIsAvailable();
    }, [isFormEdit])

    const fetchBusinessHourIsAvailable = () => {
        getBusinessHourIsAvailable(cookies.get("businessInfoId"))
            .then((data) => data.json())
            .then((data) => {
                if (data == 1) {
                    fetchBusinessWorkingHour();
                }
            });
    }

    const fetchBusinessWorkingHour = () => {
        getBusinessHour(cookies.get("businessInfoId"))
            .then((data) => data.json())
            .then((data) => {
                setWorkingdayId(data.id);
                let workingDay = [];
                workingDay = data.workingDay;
                if ((workingDay[0].workStartTime || "") !== "") {
                    formik.values.companyData.Monday.workStartTime = workingDay[0].workStartTime;
                }
                if ((workingDay[0].workEndTime || "") !== "") {
                    formik.values.companyData.Monday.workEndTime = workingDay[0].workEndTime;
                }

                if ((workingDay[1].workStartTime || "") !== "") {
                    formik.values.companyData.Tuesday.workStartTime = workingDay[1].workStartTime;
                }
                if ((workingDay[1].workEndTime || "") !== "") {
                    formik.values.companyData.Tuesday.workEndTime = workingDay[1].workEndTime;
                }

                if ((workingDay[2].workStartTime || "") !== "") {
                    formik.values.companyData.Wednesday.workStartTime = workingDay[2].workStartTime;
                }
                if ((workingDay[2].workEndTime || "") !== "") {
                    formik.values.companyData.Wednesday.workEndTime = workingDay[2].workEndTime;
                }

                if ((workingDay[3].workStartTime || "") !== "") {
                    formik.values.companyData.Thursday.workStartTime = workingDay[3].workStartTime;
                }
                if ((workingDay[3].workEndTime || "") !== "") {
                    formik.values.companyData.Thursday.workEndTime = workingDay[3].workEndTime;
                }

                if ((workingDay[4].workStartTime || "") !== "") {
                    formik.values.companyData.Friday.workStartTime = workingDay[4].workStartTime;
                }
                if ((workingDay[4].workEndTime || "") !== "") {
                    formik.values.companyData.Friday.workEndTime = workingDay[4].workEndTime;
                }

                if ((workingDay[5].workStartTime || "") !== "") {
                    formik.values.companyData.Saturday.workStartTime = workingDay[5].workStartTime;
                }
                if ((workingDay[5].workEndTime || "") !== "") {
                    formik.values.companyData.Saturday.workEndTime = workingDay[5].workEndTime;
                }

                if ((workingDay[6].workStartTime || "") !== "") {
                    formik.values.companyData.Sunday.workStartTime = workingDay[6].workStartTime;
                }
                if ((workingDay[6].workEndTime || "") !== "") {
                    formik.values.companyData.Sunday.workEndTime = workingDay[6].workEndTime;
                }
                if ((workingDay[6].breakStartTime || "") !== "") {
                    formik.values.companyData.breakStartTime = workingDay[6].breakStartTime;
                }
                if ((workingDay[6].breakEndTime || "") !== "") {
                    formik.values.companyData.breakEndTime = workingDay[6].breakEndTime;
                }

                formik.values.companyData.Monday.off = workingDay[0].off;
                formik.values.companyData.Tuesday.off = workingDay[1].off;
                formik.values.companyData.Wednesday.off = workingDay[2].off;
                formik.values.companyData.Thursday.off = workingDay[3].off;
                formik.values.companyData.Friday.off = workingDay[4].off;
                formik.values.companyData.Saturday.off = workingDay[5].off;
                formik.values.companyData.Sunday.off = workingDay[6].off;

                setCompanyData({
                    Monday: {
                        dayOfWeek: workingDay[0].workStartTime,
                        off: workingDay[0].off,
                        workStartTime: workingDay[0].workStartTime,
                        workEndTime: workingDay[0].workEndTime,
                        breakStartTime: workingDay[0].breakStartTime,
                        breakEndTime: workingDay[0].breakEndTime
                    },
                    Tuesday: {
                        dayOfWeek: workingDay[1].workStartTime,
                        off: workingDay[1].off,
                        workStartTime: workingDay[1].workStartTime,
                        workEndTime: workingDay[1].workEndTime,
                        breakStartTime: workingDay[1].breakStartTime,
                        breakEndTime: workingDay[1].breakEndTime
                    },
                    Wednesday: {
                        dayOfWeek: workingDay[2].workStartTime,
                        off: workingDay[2].off,
                        workStartTime: workingDay[2].workStartTime,
                        workEndTime: workingDay[2].workEndTime,
                        breakStartTime: workingDay[2].breakStartTime,
                        breakEndTime: workingDay[2].breakEndTime
                    },
                    Thursday: {
                        dayOfWeek: workingDay[3].workStartTime,
                        off: workingDay[3].off,
                        workStartTime: workingDay[3].workStartTime,
                        workEndTime: workingDay[3].workEndTime,
                        breakStartTime: workingDay[3].breakStartTime,
                        breakEndTime: workingDay[0].breakEndTime
                    },
                    Friday: {
                        dayOfWeek: workingDay[4].workStartTime,
                        off: workingDay[4].off,
                        workStartTime: workingDay[4].workStartTime,
                        workEndTime: workingDay[4].workEndTime,
                        breakStartTime: workingDay[4].breakStartTime,
                        breakEndTime: workingDay[4].breakEndTime
                    },
                    Saturday: {
                        dayOfWeek: workingDay[5].workStartTime,
                        off: workingDay[5].off,
                        workStartTime: workingDay[5].workStartTime,
                        workEndTime: workingDay[5].workEndTime,
                        breakStartTime: workingDay[5].breakStartTime,
                        breakEndTime: workingDay[5].breakEndTime
                    },
                    Sunday: {
                        dayOfWeek: workingDay[6].workStartTime,
                        off: workingDay[6].off,
                        workStartTime: workingDay[6].workStartTime,
                        workEndTime: workingDay[6].workEndTime,
                        breakStartTime: workingDay[6].breakStartTime,
                        breakEndTime: workingDay[6].breakEndTime
                    },
                    breakStartTime: workingDay[6].breakStartTime,
                    breakEndTime: workingDay[6].breakEndTime

                });
            });
    }


    const formik = useFormik({
        initialValues: {
            companyData
        },
        validationSchema: yup.object({
            companyData: yup.object().shape({
                breakStartTime: yup
                    .string()
                    .required("Required"),
                breakEndTime: yup
                    .string()
                    .required("Required"),

            }),

        }),
        onSubmit: (values) => {

            values.companyData.Monday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Monday.breakEndTime = values.companyData.breakEndTime;

            values.companyData.Tuesday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Tuesday.breakEndTime = values.companyData.breakEndTime;

            values.companyData.Wednesday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Wednesday.breakEndTime = values.companyData.breakEndTime;

            values.companyData.Thursday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Thursday.breakEndTime = values.companyData.breakEndTime;

            values.companyData.Friday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Friday.breakEndTime = values.companyData.breakEndTime;

            values.companyData.Saturday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Saturday.breakEndTime = values.companyData.breakEndTime;

            values.companyData.Sunday.breakStartTime = values.companyData.breakStartTime;
            values.companyData.Sunday.breakEndTime = values.companyData.breakEndTime;

            workingDay.push(values.companyData.Monday);
            workingDay.push(values.companyData.Tuesday);
            workingDay.push(values.companyData.Wednesday);
            workingDay.push(values.companyData.Thursday);
            workingDay.push(values.companyData.Friday);
            workingDay.push(values.companyData.Saturday);
            workingDay.push(values.companyData.Sunday);

            let workingDaysCalendar = {
                id: workingdayId,
                businessInfo: { id: cookies.get("businessInfoId") },
                workingDay: workingDay
            }
            postAddWorkingHoursOfBusiness(workingDaysCalendar)
                .then((response) => response.text())
                .then((response) => {
                    workingDay.length = 0;
                    setIsFormEdit(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });
    const editHandler = () => {
        if (isFormEdit == false) {
            setIsFormEdit(true);
        } else {
            setIsFormEdit(false);
        }
    };



    return (
        <div>
            {/* <Row>
                <Col className={styles.operationCol}>Operation Hours</Col>
            </Row> */}
            {!isFormEdit && (
                <>
                    <Row>
                        <Col md="6" className={styles.reservationCol}>Break Hours</Col>
                        <Col md="3" className={styles.operationCol}><span className={styles.editSpan} onClick={editHandler}>Edit</span></Col>

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
                                &nbsp;  {(companyData.breakStartTime || "") == "" ? "" : moment(companyData.breakStartTime, "HH:mm").format("hh:mm A")}

                            </div>
                        </Col>
                        <Col as={Col} md="1" className={`${styles.timeSelectCol}`}>
                            <div className={`${styles.labelTo}`}>To</div>
                        </Col>
                        <Col as={Col} md="2">
                            <div
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                            >
                                &nbsp; {(companyData.breakEndTime || "") == "" ? "" : moment(companyData.breakEndTime, "HH:mm").format("hh:mm A")}

                            </div>
                        </Col>

                    </Row>
                </>
            )}
            <br></br>
            {isFormEdit && (
                <>
                    <Row>
                        <Col md="6" className={styles.reservationCol}>Break Hours</Col>
                        {/* <Col md="3" className={styles.operationCol}><span className={styles.editSpan} onClick={editHandler}>Edit</span></Col> */}

                    </Row>
                    <Form noValidate onSubmit={formik.handleSubmit}>

                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Monday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Monday.workStartTime"
                                value={formik.values.companyData.Monday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Monday?.workStartTime}
                                readOnly={formik.values.companyData.Monday.off}
                            />

                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Monday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Monday.workEndTime"
                                value={formik.values.companyData.Monday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Monday?.workEndTime}
                                readOnly={formik.values.companyData.Monday.off}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Monday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox1"
                            name="companyData.Monday.off"
                            label="Closed"
                            onChange={(e) => mondayIsClosed(e)}
                            checked={formik.values.companyData.Monday.off}
                        />
                    </Col>
                </Row> */}

                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Tuesday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Tuesday.workStartTime"
                                value={formik.values.companyData.Tuesday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Tuesday?.workStartTime}
                                readOnly={formik.values.companyData.Tuesday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Tuesday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Tuesday.workEndTime"
                                value={formik.values.companyData.Tuesday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Tuesday?.workEndTime}
                                readOnly={formik.values.companyData.Tuesday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Tuesday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox2"
                            name="companyData.Tuesday.off"
                            label="Closed"
                            onChange={(e) => tuesdayIsClosed(e)}
                            checked={formik.values.companyData.Tuesday.off}
                        />
                    </Col>
                </Row> */}
                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Wednesday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Wednesday.workStartTime"
                                value={formik.values.companyData.Wednesday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Wednesday?.workStartTime}
                                readOnly={formik.values.companyData.Wednesday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Wednesday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Wednesday.workEndTime"
                                value={formik.values.companyData.Wednesday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Wednesday?.workEndTime}
                                readOnly={formik.values.companyData.Wednesday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Wednesday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox3"
                            name="companyData.Wednesday.off"
                            label="Closed"
                            onChange={(e) => wednesdayIsClosed(e)}
                            checked={formik.values.companyData.Wednesday.off}
                        />
                    </Col>
                </Row> */}

                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Thursday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Thursday.workStartTime"
                                value={formik.values.companyData.Thursday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Thursday?.workStartTime}
                                readOnly={formik.values.companyData.Thursday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Thursday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Thursday.workEndTime"
                                value={formik.values.companyData.Thursday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Thursday?.workEndTime}
                                readOnly={formik.values.companyData.Thursday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Thursday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox4"
                            name="companyData.Thursday.off"
                            label="Closed"
                            onChange={(e) => thursdayIsClosed(e)}
                            checked={formik.values.companyData.Thursday.off}
                        />
                    </Col>
                </Row> */}

                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Friday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Friday.workStartTime"
                                value={formik.values.companyData.Friday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Friday?.workStartTime}
                                readOnly={formik.values.companyData.Friday.off}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Friday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Friday.workEndTime"
                                value={formik.values.companyData.Friday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Friday?.workEndTime}
                                readOnly={formik.values.companyData.Friday.off}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Friday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox5"
                            name="companyData.Friday.off"
                            label="Closed"
                            onChange={(e) => fridayIsClosed(e)}
                            checked={formik.values.companyData.Friday.off}
                        />
                    </Col>
                </Row> */}
                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Saturday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Saturday.workStartTime"
                                value={formik.values.companyData.Saturday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Saturday?.workStartTime}
                                readOnly={formik.values.companyData.Saturday.off}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Saturday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Saturday.workEndTime"
                                value={formik.values.companyData.Saturday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Saturday?.workEndTime}
                                readOnly={formik.values.companyData.Saturday.off}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Saturday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox6"
                            name="companyData.Saturday.off"
                            label="Closed"
                            onChange={(e) => saturdayIsClosed(e)}
                            checked={formik.values.companyData.Saturday.off}
                        />
                    </Col>
                </Row> */}
                        {/* <br/><Row>
                    <Col as={Col} md="2">
                        <div className={styles.weekday}>Sunday</div>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Sunday.workStartTime"
                                value={formik.values.companyData.Sunday.workStartTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Sunday?.workStartTime}
                                readOnly={formik.values.companyData.Sunday.off}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Sunday?.workStartTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                type="time"
                                placeholder="hh:mm"
                                name="companyData.Sunday.workEndTime"
                                value={formik.values.companyData.Sunday.workEndTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.Sunday?.workEndTime}
                                readOnly={formik.values.companyData.Sunday.off}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.Sunday?.workEndTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox7"
                            name="companyData.Sunday.off"
                            label="Closed"
                            onChange={(e) => sundayIsClosed(e)}
                            checked={formik.values.companyData.Sunday.off}
                        />
                    </Col>
                </Row> */}
                        <br />
                        {/* <Row>
                    <Col className={styles.reservationCol}>Break Hours</Col>
                </Row>
                <br /> */}
                        <br/><Row>
                            <Col as={Col} md="2" className={`${styles.timeSelectCol}`}>
                                Break Time
                            </Col>
                            <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                                <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
                                <Form.Group>
                                    <Form.Control
                                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                                        type="time"
                                        placeholder="--:--"
                                        name="companyData.breakStartTime"
                                        value={formik.values.companyData.breakStartTime}
                                        onChange={formik.handleChange}
                                        isInvalid={!!formik.errors.companyData?.breakStartTime}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.companyData?.breakStartTime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                                <Form.Label className={`${styles.labelTo}`}>To</Form.Label>
                                <Form.Group>
                                    <Form.Control
                                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                                        type="time"
                                        placeholder="hh:mm"
                                        name="companyData.breakEndTime"
                                        value={formik.values.companyData.breakEndTime}
                                        onChange={formik.handleChange}
                                        isInvalid={!!formik.errors.companyData?.breakEndTime}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.companyData?.breakEndTime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <br />
                        <Col md="10">
                            <Row className={`${styles.formcontrolbuttonright}`}>
                                <Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className={`${styles.btnSave}`}
                                    >
                                        Save
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant="primary"
                                        type="reset"
                                        className={`${styles.btnCancel}`}
                                        onClick={editHandler}
                                    >
                                        Cancel
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Form>
                </>
            )}
        </div>
    );
};

export default EditForm;
