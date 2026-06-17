import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as yup from "yup";
import { getMenuData } from "../services/api/menu-api";
import { cancelAppointmentByBusiness } from "../services/api/reservation-api";
import { getNumberOfPeopleOfAppointment, getServiceOfAppointment } from "../services/api/user-api";
import styles from "./businesscancelappointmentmodel.module.css";


const BusinessCancelAppointmentModel = (props: any) => {
  const [list, setList] = useState([]);
  const [reschedule, setReschedule] = useState(false);
  const [isRemainder, setIsRemainder] = useState(false);
  const [people, setPeople] = useState("");
  const [dataPeople, setDataPeople] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (props.row.businessInfo.serviceId.id == "restaurant") {
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


  const fetchNumberOfPeople = () => {
    getNumberOfPeopleOfAppointment(props.row.id)
      .then((data) => data.json())
      .then((data) => {
        // formik.values.reservationData.numberOfPeople = data.people.id;
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
        // formik.values.reservationData.service = data.service.id;
      });
  };


  const formik = useFormik({
    initialValues: {
      id: props.row.id, reason: "", otherReason: "", lastModified: "vendor",
    },
    validationSchema: yup.object().shape({
      reason: yup.string().required("Please select one reason!"),
      otherReason: yup.string().when("reason", {
        is: "Other",
        then: yup.string().required("Reason is required."),
      }),

    }),
    //form submit call
    onSubmit: (values) => {
      cancelAppointmentByBusiness(values)
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
    },
  });

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
          {!reschedule && (
            <>
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
                      {/* <Button
                          variant="primary"
                          type="button"
                          className={`${styles.cancelappointment}`}
                          onClick={(e) => cancelAppointmentByBusinessFunc(props.row, e)}
                        >
                          Cancel Appointment
                      </Button> */}
                      &nbsp;
                      <Button
                        variant="primary"
                        type="button"
                        className={`${styles.cancelappointment}`}
                        onClick={() => setReschedule(!reschedule)}
                      >
                        Cancel Appointment
                      </Button>
                    </div>
                  </Col>
                </Row>
                <br></br>
              </div>
            </>)}
          {reschedule && (
            <div className="resheduleEdit">
              <Form noValidate onSubmit={formik.handleSubmit}>
                <br/><Row>
                  <Col>
                    <Form.Label>
                      <input
                        className={styles.radiocheck}
                        type="radio"
                        name="reason"
                        value="No attendant availble"
                        checked={
                          formik.values.reason ===
                          "No attendant availble"
                        }
                        onChange={() =>
                          formik.setFieldValue(
                            "reason",
                            "No attendant availble"
                          )
                        }
                      />
                      &nbsp; No attendant availble.
                    </Form.Label>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <Form.Label>
                      <input
                        className={styles.radiocheck}
                        type="radio"
                        name="reason"
                        value="Service unavilable"
                        checked={
                          formik.values.reason ===
                          "Service unavilable"
                        }
                        onChange={() =>
                          formik.setFieldValue(
                            "reason",
                            "Service unavilable"
                          )
                        }
                      />
                      &nbsp; Service unavilable.
                    </Form.Label>
                  </Col>
                </Row>

                <br/><Row>
                  <Col>
                    <Form.Label>
                      <input
                        className={styles.radiocheck}
                        type="radio"
                        name="reason"
                        value="Other"
                        checked={
                          formik.values.reason ===
                          "Other"
                        }
                        onChange={() =>
                          formik.setFieldValue(
                            "reason",
                            "Other"
                          )
                        }
                      />
                      &nbsp; Other.
                    </Form.Label>
                  </Col>
                </Row>
                <br/><Row>
                  <Col>
                    {formik.touched.reason &&
                      formik.errors.reason ? (
                      <div className={styles.error}>
                        {
                          formik.errors.reason
                        }
                      </div>
                    ) : null}
                  </Col>
                </Row>
                
                {formik.values.reason == "Other" && (
                  <Row>
                    <Form.Group
                      as={Col}
                      md="8"
                      controlId="validationFormik1"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Specify the reason"
                        aria-describedby="inputGroupPrepend"
                        name="otherReason"
                        value={
                          formik.values.otherReason
                        }
                        onChange={formik.handleChange}
                        isInvalid={
                          !!formik.errors.otherReason
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {
                          formik.errors.otherReason
                        }
                      </Form.Control.Feedback>
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
                        Cancel Appointment
                      </Button>
                      &nbsp;
                      {/* <Button
                        variant="primary"
                        type="reset"
                        className={`${styles.formcontrolcancel}`}
                        onClick={() => setReschedule(!reschedule)}
                      >
                        Cancel
                      </Button> */}
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

export default BusinessCancelAppointmentModel;