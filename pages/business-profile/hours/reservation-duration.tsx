import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./index.module.css";
import moment from "moment";

const Duration = (props: any) => {
    const cookies = new Cookies();
    const [companyData, setCompanyData] = useState({

        durationTime: "",
        durationTimeNone: false,
        reservationNumber: "",
        reservationNumberNone: false

    });

    const formik = useFormik({
        initialValues: {
            companyData
        },
        validationSchema: yup.object({
            companyData: yup.object().shape({
                
                durationTime: yup.string().when("durationTimeNone", {
                    is: false,
                    then: yup.string().required("Required"),
                }),
                reservationNumber: yup.string().when("reservationNumberNone", {
                    is: false,
                    then: yup.string().required("Required"),
                }),

            }),

        }),
        onSubmit: (values) => {

            values.companyData.durationTime = values.companyData.durationTime;
            values.companyData.reservationNumber = values.companyData.reservationNumber;

            console.log(values);

            // workingDay.push(values.companyData.Monday);
            // workingDay.push(values.companyData.Tuesday);
            // workingDay.push(values.companyData.Wednesday);
            // workingDay.push(values.companyData.Thursday);
            // workingDay.push(values.companyData.Friday);
            // workingDay.push(values.companyData.Saturday);
            // workingDay.push(values.companyData.Sunday);

            // let workingDaysCalendar = {
            //     id: workingdayId,
            //     businessInfo: { id: cookies.get("businessInfoId") },
            //     workingDay: workingDay
            // }
            // postAddWorkingHoursOfBusiness(workingDaysCalendar)
            //     .then((response) => response.text())
            //     .then((response) => {
            //         workingDay.length = 0;
            //         props.setIsFormEdit(false);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        },
    });



    // useEffect(() => {
    //     fetchBusinessHourIsAvailable();
    // }, [])

    // const fetchBusinessHourIsAvailable = () => {
    //     getBusinessHourIsAvailable(cookies.get("businessInfoId"))
    //         .then((data) => data.json())
    //         .then((data) => {
    //             if (data == 1) {
    //                 fetchBusinessWorkingHour();
    //             }
    //         });
    // }

    // const fetchBusinessWorkingHour = () => {
    //     getBusinessHour(cookies.get("businessInfoId"))
    //         .then((data) => data.json())
    //         .then((data) => {
    //             let workingDay = [];
    //             workingDay = data.workingDay;
    //             setCompanyData({
    //                 Monday: {
    //                     dayOfWeek: workingDay[0].workStartTime,
    //                     off: workingDay[0].off,
    //                     workStartTime: workingDay[0].workStartTime,
    //                     workEndTime: workingDay[0].workEndTime,
    //                 },
    //                 Tuesday: {
    //                     dayOfWeek: workingDay[1].workStartTime,
    //                     off: workingDay[1].off,
    //                     workStartTime: workingDay[1].workStartTime,
    //                     workEndTime: workingDay[1].workEndTime,
    //                 },
    //                 Wednesday: {
    //                     dayOfWeek: workingDay[2].workStartTime,
    //                     off: workingDay[2].off,
    //                     workStartTime: workingDay[2].workStartTime,
    //                     workEndTime: workingDay[2].workEndTime,
    //                 },
    //                 Thursday: {
    //                     dayOfWeek: workingDay[3].workStartTime,
    //                     off: workingDay[3].off,
    //                     workStartTime: workingDay[3].workStartTime,
    //                     workEndTime: workingDay[3].workEndTime,
    //                 },
    //                 Friday: {
    //                     dayOfWeek: workingDay[4].workStartTime,
    //                     off: workingDay[4].off,
    //                     workStartTime: workingDay[4].workStartTime,
    //                     workEndTime: workingDay[4].workEndTime,
    //                 },
    //                 Saturday: {
    //                     dayOfWeek: workingDay[5].workStartTime,
    //                     off: workingDay[5].off,
    //                     workStartTime: workingDay[5].workStartTime,
    //                     workEndTime: workingDay[5].workEndTime,
    //                 },
    //                 Sunday: {
    //                     dayOfWeek: workingDay[6].workStartTime,
    //                     off: workingDay[6].off,
    //                     workStartTime: workingDay[6].workStartTime,
    //                     workEndTime: workingDay[6].workEndTime,
    //                 },
    //                 breakStartTime: workingDay[6].breakStartTime,
    //                 breakEndTime: workingDay[6].breakEndTime,
    //                 durationTime: workingDay[6].duartionTime,
    //                 reservationNumber: workingDay[6].reservationNumber
    //             });


    //         });
    // }

const[formEdit,setFormEdit]=useState(false);

    const editHandler = () => {
        if (formEdit == false) {
            setFormEdit(true);
        } else {
            setFormEdit(false);
        }
    };

    
    const DurationIsNone = (e: any) => {
        formik.setFieldValue(
            "companyData.durationTimeNone",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.durationTime = "";
        }
    }

    const ReservationIsNone = (e: any) => {
        formik.setFieldValue(
            "companyData.reservationNumberNone",
            e.target.checked
        )
        if (e.target.checked == true) {
            formik.values.companyData.reservationNumber = "";
        }
    } 

    return (
    <div className="wrapper-display">
    {!formEdit && ( 
       <div>
            <Row>
                <Col md="6" className={styles.operationCol}>Duration Hours</Col>
                <Col md="6" className={styles.operationCol}><span className={styles.editSpan} onClick={editHandler}>Edit</span></Col>
            </Row>
            <br></br>
                
            <Row>
                <Col as={Col} md="3">
                    <div className={styles.weekday}>Reservation Duration</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;  {(companyData.durationTime || "") == "" ? "" : moment(companyData.durationTime, "HH:mm").format("hh:mm A")}

                    </div>
                </Col>
                <Col className={`${styles.checkBoxColumn}`}>
                &nbsp; {(companyData.durationTime || "") == "" ? "None" : ""}
                </Col>
            </Row>
            <br />
            <Row>
                <Col as={Col} md="3">
                    <div className={styles.weekday}>Number of Simultaneous Reservations</div>
                </Col>
                <Col as={Col} md="2">
                    <div
                        className={`form-control-border ${styles.formControlPlaceHolder}`}
                    >
                        &nbsp;  {(companyData.reservationNumber || "") == "" ? "" : moment(companyData.reservationNumber, "HH:mm").format("hh:mm A")}

                    </div>
                </Col>
                <Col className={`${styles.checkBoxColumn}`}>
                &nbsp; {(companyData.reservationNumber || "") == "" ? "None" : ""}
                </Col>
            </Row>
        </div>
       )}



{ formEdit && (
            <div>
            <Row>
                <Col className={styles.operationCol}>Duration Hours</Col>
            </Row>
            <br></br>
            <Form noValidate onSubmit={formik.handleSubmit}>
        
                <br/><Row>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                    Reservation Duration
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        {/* <Form.Label className={`${styles.labelFrom}`}>From</Form.Label> */}
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder}`}
                                as="select"
                                placeholder="30 mins"
                                name="companyData.durationTime"
                                value={formik.values.companyData.durationTime}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.durationTime}
                                readOnly={formik.values.companyData.durationTimeNone}

                            >
                            <option value="1" >30 mins</option>
                            <option value="2" >1 hour</option>
                            <option value="3" >1 hour 30 mins</option>
                            <option value="4" >2 hour</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.durationTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>                    
                    <Col as={Col} md="2" className={`${styles.formcheckBoxColumn}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox9"
                            name="companyData.durationTimeNone"
                            label="None"
                            onChange={(e) => DurationIsNone(e)}
                            checked={formik.values.companyData.durationTimeNone}
                        />
                    </Col>
                </Row>
                <br/><Row>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                    Number of Simultaneous Reservations
                    </Col>
                    <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
                        {/* <Form.Label className={`${styles.labelFrom}`}>From</Form.Label> */}
                        <Form.Group>
                            <Form.Control
                                className={`form-control-border ${styles.formControlPlaceHolder} ${styles.formControl}`}
                                type="number"
                                placeholder=""
                                name="companyData.reservationNumber"
                                value={formik.values.companyData.reservationNumber}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.companyData?.reservationNumber}
                                readOnly={formik.values.companyData.reservationNumberNone}

                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.companyData?.reservationNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>                    
                    <Col as={Col} md="2" className={`${styles.formcheckBoxColumn}`}>
                        <Form.Check
                            className={`${styles.notificationcheckbox}`}
                            type="checkbox"
                            id="checkbox10"
                            name="companyData.reservationNumberNone"
                            label="None"
                            onChange={(e) => ReservationIsNone(e)}
                            checked={formik.values.companyData.reservationNumberNone}
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
        )}

            <br></br>
            <br></br>
        </div>
        
    );
};
export default Duration;