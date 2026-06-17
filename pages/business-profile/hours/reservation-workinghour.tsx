import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { getBusinessReservationHour, getBusinessReservationHourIsAvailable, postAddBusinessReservationHour } from "../../../components/services/api/reservation-api";
import styles from "./index.module.css";

const ReservationWorkigHour = (props: any) => {
    const cookies = new Cookies();
    const [workingdayId, setWorkingdayId] = useState("");
    const [workingDay, setWorkingDay] = useState<any[]>([]);
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
        HappyHour: {
            startTime: "",
            endTime: "",
        },
        LunchDaily: {
            startTime: "",
            endTime: "",
        },
        DinnerDaily: {
            startTime: "",
            endTime: "",
        }
    });

    useEffect(() => {
        fetchBusinessHourIsAvailable();
    }, [])

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
                    HappyHour: {
                        startTime: "",
                        endTime: "",
                    },
                    LunchDaily: {
                        startTime: "",
                        endTime: "",
                    },
                    DinnerDaily: {
                        startTime: "",
                        endTime: "",
                    }
                });
            });
    }


    const formik = useFormik({
        initialValues: {
            companyData
        },
        validationSchema: yup.object({
            companyData: yup.object().shape({
                Monday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),
                Tuesday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),
                Wednesday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),
                Thursday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),
                Friday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),
                Saturday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),
                Sunday: yup.object().shape({
                    workStartTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                    workEndTime: yup.string().when("off", {
                        is: false,
                        then: yup.string().required("Required"),
                    }),
                }),

            }),

        }),
        onSubmit: (values) => {
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
            postAddBusinessReservationHour(workingDaysCalendar)
                .then((response) => response.text())
                .then((response) => {
                    workingDay.length = 0;
                    props.setIsReservationFormEdit(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });
    const editHandler = () => {
        if (props.isReservationFormEdit == false) {
            props.setIsReservationFormEdit(true);
        } else {
            props.setIsReservationFormEdit(false);
        }
    };

    const mondayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Monday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Monday.workStartTime = "";
            formik.values.companyData.Monday.workEndTime = "";
        }
    }

    const tuesdayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Tuesday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Tuesday.workStartTime = "";
            formik.values.companyData.Tuesday.workEndTime = "";
        }
    }

    const wednesdayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Wednesday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Wednesday.workStartTime = "";
            formik.values.companyData.Wednesday.workEndTime = "";
        }
    }

    const thursdayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Thursday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Thursday.workStartTime = "";
            formik.values.companyData.Thursday.workEndTime = "";
        }
    }

    const fridayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Friday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Friday.workStartTime = "";
            formik.values.companyData.Friday.workEndTime = "";
        }
    }
    const saturdayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Saturday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Saturday.workStartTime = "";
            formik.values.companyData.Saturday.workEndTime = "";
        }
    }

    const sundayIsClosed = (e: any) => {
        formik.setFieldValue(
            "companyData.Sunday.off",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.Sunday.workStartTime = "";
            formik.values.companyData.Sunday.workEndTime = "";
        }
    }

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <Row>
                <Col className={styles.operationCol}>Reservation Hours</Col>
            </Row>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <br/><Row>
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
                </Row>

                <br/><Row>
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
                </Row>
                <br/><Row>
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
                </Row>

                <br/><Row>
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
                </Row>

                <br/><Row>
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
                </Row>
                <br/><Row>
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
                </Row>
                <br/><Row>
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
        </div>
    );
};

export default ReservationWorkigHour;
