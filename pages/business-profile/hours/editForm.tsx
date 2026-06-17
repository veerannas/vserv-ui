import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Col, Form, Row, Modal, FormControl } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";

const EditForm = (props:any) => {
  const [customHours, setCustomHours] = useState({});

  const [companyData, setCompanyData] = useState({
    Monday: {
      dayOfWeek: "MONDAY",
      isWorkingDay: true,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
      workEndTime: "",
    },
    Tuesday: {
      dayOfWeek: "TUESDAY",
      isWorkingDay: true,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
      workEndTime: "",
    },
    Wednesday: {
      dayOfWeek: "WEDNESDAY",
      isWorkingDay: true,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
      workEndTime: "",
    },
    Thursday: {
      dayOfWeek: "THURSDAY",
      isWorkingDay: true,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
      workEndTime: "",
    },
    Friday: {
      dayOfWeek: "FRIDAY",
      isWorkingDay: true,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
      workEndTime: "",
    },
    Saturday: {
      dayOfWeek: "SATURDAY",
      isWorkingDay: true,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
      workEndTime: "",
    },
    Sunday: {
      dayOfWeek: "SUNDAY",
      isWorkingDay: false,
      workStartTime: "",
      breakStartTime: "",
      breakEndTime: "",
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
    },
    ResMonday: {
      dayOfWeek: "MONDAY",
      workStartTime: "",
      workEndTime: "",
    },
    ResTuesday: {
      dayOfWeek: "TUESDAY",
      workStartTime: "",
      workEndTime: "",
    },
    ResWednesday: {
      dayOfWeek: "WEDNESDAY",
      workStartTime: "",
      workEndTime: "",
    },
    ResThursday: {
      dayOfWeek: "THURSDAY",
      workStartTime: "",
      workEndTime: "",
    },
    ResFriday: {
      dayOfWeek: "FRIDAY",
      workStartTime: "",
      workEndTime: "",
    },
    ResSaturday: {
      dayOfWeek: "SATURDAY",
      workStartTime: "",
      workEndTime: "",
    },
    ResSunday: {
      dayOfWeek: "SUNDAY",
      workStartTime: "",
      workEndTime: "",
    },
  });
 
  const formik = useFormik({
    initialValues: {
      companyData,
      singleSlotReservation: "",
      singleSlotPeriod: "",
      reservationStart: "",
      reservationEnd: "",
    },
    validationSchema: yup.object({
      companyData: yup.object().shape({
        Monday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          // breakStartTime: yup.string().required("required"),
          // breakEndTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        Tuesday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          // breakStartTime: yup.string().required("required"),
          // breakEndTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        Wednesday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          // breakStartTime: yup.string().required("required"),
          // breakEndTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        Thursday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          // breakStartTime: yup.string().required("required"),
          // breakEndTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        Friday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          // breakStartTime: yup.string().required("required"),
          // breakEndTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        Saturday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          // breakStartTime: yup.string().required("required"),
          // breakEndTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResMonday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResTuesday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResWednesday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResThursday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResFriday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResSaturday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        ResSunday: yup.object().shape({
          workStartTime: yup.string().required("required"),
          workEndTime: yup.string().required("required"),
        }),
        HappyHour: yup.object().shape({
          startTime: yup.string().required("required"),
          endTime: yup.string().required("required"),
        }),
      }),
      singleSlotReservation: yup.string().required("required"),
      singleSlotPeriod: yup.string().required("required"),
      reservationStart: yup.string().required("required"),
      reservationEnd: yup.string().required("required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const editHandler = () => {
    if (props.isFormEdit == false) {
      props.setIsFormEdit(true);
    } else {
      props.setIsFormEdit(false);
    }
  };

  return (
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
            name="companyData.Monday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Monday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
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
              // value={formik.values.companyData.Tuesday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.Tuesday?.workEndTime}
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
            name="companyData.Tuesday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Tuesday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
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
            name="companyData.Wednesday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Wednesday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
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
            name="companyData.Thursday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Thursday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
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
              // value={formik.values.companyData.Friday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.Friday?.workEndTime}
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
            name="companyData.Friday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Friday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
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
            name="companyData.Saturday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Saturday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
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
              // value={formik.values.companyData.Sunday.workEndTime}
              onChange={formik.handleChange}
              // isInvalid={!!formik.errors.companyData?.Sunday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {/* {formik.errors.companyData?.Sunday?.workEndTime} */}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col as={Col} md="2" className={`${styles.checkBoxCol}`}>
          <Form.Check
            className={`${styles.notificationcheckbox}`}
            type="checkbox"
            id="checkbox7"
            name="companyData.Sunday.isWorkingDay"
            label="Closed"
            // value={formik.values.companyData.Sunday.isWorkingDay}
            onChange={formik.handleChange}
            // checked={formik.values.companyData.Monday.isWorkingDay}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col className={styles.reservationCol}>Break Hours</Col>
      </Row>
      <br />
      <br/><Row>
        <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
          Break Time
        </Col>
        <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
          <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
          <Form.Group>
            <Form.Control
              className={`form-control-border ${styles.formControlPlaceHolder}`}
              type="time"
              placeholder="--:--"
              name="companyData.HappyHour.startTime"
              value={formik.values.companyData.HappyHour.startTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.HappyHour?.startTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.HappyHour?.startTime}
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
              name="companyData.HappyHour.endTime"
              value={formik.values.companyData.HappyHour.endTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.HappyHour?.endTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.HappyHour?.endTime}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        {/* <Col as={Col} md="10"> */}
        {/* <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bordered={false}
        
          // }) }
          /> */}

        {/* </Col> */}
      </Row>
      <br />
      <Row>
        <Col className={styles.reservationCol}>Reservation Hours</Col>
      </Row>
      <br />
      <br/><Row>
        <Col as={Col} md="3">
          Single Slot Period
        </Col>

        <Col as={Col} md="2" className={`${styles.timeSelectCol}`}>
          <Form.Group>
            <Form.Control
              className={`form-control-border ${styles.singleSlotPeriod}`}
              as="select"
              placeholder="select"
              name="singleSlotPeriod"
              value={formik.values.singleSlotPeriod}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.singleSlotPeriod}
            >
              <option value="30">30 min</option>
              <option value="60">60 min</option>
              <option value="90">90 min</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.singleSlotPeriod}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <br />
      <br/><Row>
        <Col as={Col} md="3" className={styles.ssrCol}>
          Single Slot Reservation
        </Col>

        <Col as={Col} md="2" className={`${styles.timeSelectCol}`}>
          <Form.Group>
            <Form.Control
              className={`form-control-border ${styles.singleSlotReservation}`}
              type="text"
              placeholder=""
              aria-describedby="inputGroupPrepend"
              name="singleSlotReservation"
              value={formik.values.singleSlotReservation}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.singleSlotReservation}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.singleSlotReservation}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col className={styles.rstCol}>Reservation Start Timing</Col>
      </Row>
      <br />
      <br/><Row>
        <Col as={Col} md="4">
          <Form.Check
            type="radio"
            label="Set Same timing (All days)"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
          />
        </Col>
        <Col as={Col} md="5">
          <Form.Check
            type="radio"
            label="Set different timing (individual days)"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            defaultChecked
          />
        </Col>
      </Row>
      <br />
      <br/><Row>
        <Col as={Col} md="3" className={`${styles.timeSelectCol}`}>
          <Form.Label className={`${styles.labelFrom}`}>From</Form.Label>
          <Form.Group>
            <Form.Control
              className={`form-control-border ${styles.formControlPlaceHolder}`}
              type="time"
              placeholder="hh:mm"
              aria-describedby="inputGroupPrepend"
              name="reservationStart"
              value={formik.values.reservationStart}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.reservationStart}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.reservationStart}
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
              aria-describedby="inputGroupPrepend"
              name="reservationEnd"
              value={formik.values.reservationEnd}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.reservationEnd}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.reservationEnd}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <br />
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResMonday.workStartTime"
              value={formik.values.companyData.ResMonday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResMonday?.workStartTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResMonday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResMonday.workEndTime"
              value={formik.values.companyData.ResMonday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResMonday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResMonday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResTuesday.workStartTime"
              value={formik.values.companyData.ResTuesday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResTuesday?.workStartTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResTuesday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResTuesday.workEndTime"
              value={formik.values.companyData.ResTuesday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResTuesday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResTuesday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResWednesday.workStartTime"
              value={formik.values.companyData.ResWednesday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={
                !!formik.errors.companyData?.ResWednesday?.workStartTime
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResWednesday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResWednesday.workEndTime"
              value={formik.values.companyData.ResWednesday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResWednesday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResWednesday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResThursday.workStartTime"
              value={formik.values.companyData.ResThursday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={
                !!formik.errors.companyData?.ResThursday?.workStartTime
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResThursday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResThursday.workEndTime"
              value={formik.values.companyData.ResThursday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResThursday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResThursday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResFriday.workStartTime"
              value={formik.values.companyData.ResFriday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResFriday?.workStartTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResFriday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResFriday.workEndTime"
              value={formik.values.companyData.ResFriday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResFriday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResFriday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResSaturday.workStartTime"
              value={formik.values.companyData.ResSaturday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={
                !!formik.errors.companyData?.ResSaturday?.workStartTime
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResSaturday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResSaturday.workEndTime"
              value={formik.values.companyData.ResSaturday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResSaturday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResSaturday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResSunday.workStartTime"
              value={formik.values.companyData.ResSunday.workStartTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResSunday?.workStartTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResSunday?.workStartTime}
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
              aria-describedby="inputGroupPrepend"
              name="companyData.ResSunday.workEndTime"
              value={formik.values.companyData.ResSunday.workEndTime}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.companyData?.ResSunday?.workEndTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyData?.ResSunday?.workEndTime}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <br />
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
    </Form>
  );
};

export default EditForm;
