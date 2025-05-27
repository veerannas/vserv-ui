import "@fortawesome/fontawesome-free/css/all.min.css";
import { Formik } from "formik";
import { MDBIcon } from 'mdb-react-ui-kit';
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import styles from "./askme.module.css";
import { Cookies } from "react-cookie";
import MessageBox from "../messagebox/messagebox";
import { postEnquiryRegistration } from "../services/api/askme-api";

const AskMe = () => {
  const cookies = new Cookies();

  const router = useRouter();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleSubmit = (data: any, actions: any) => {
    let enquiryData = {
      subject: data.subject,
      message: data.message,
      email: data.email,
      businessInfo: { id: router.query.id },
      userId: { id: cookies.get("id") }
    };

    if ((cookies.get("id") || "") == "") {
      setIsMessage(true);
      setMessage("Please Sign In.");
      setVariant("danger");
    } else {
      postEnquiryRegistration(enquiryData)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);

          if (
            typeof response == "undefined" ||
            response == null ||
            response == ""
          ) {
            setMessage("Something wrong! ");
            setVariant("danger");
          } else {
            actions.resetForm();
            setVariant("success");
            setMessage("Thanks! For enquiry.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required."),
    subject: yup.string().required("Subject is required."),
    message: yup.string().required("Message is required."),
  });
  return (
    <div className={`col-md-12 ${styles.box}`}>
      <div className={`${styles.boxtitle}`}>
        <h4>
          <b>
            <MDBIcon icon="question-circle" /> Ask Me
          </b>
        </h4>
      </div>
      <hr></hr>

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          subject: "",
          message: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="12" controlId="validationFormik103">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={` ${styles.formcontrol}`}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <br /><Row>
              <Form.Group as={Col} md="12" controlId="validationFormik103">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    aria-describedby="inputGroupPrepend"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    className={` ${styles.formcontrol}`}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.subject}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <br /><Row>
              <Form.Group as={Col} md="12" controlId="validationFormik103">
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Type Your Message"
                    aria-describedby="inputGroupPrepend"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    className={` ${styles.formcontrol}`}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <i className={` ${styles.formcorner}`}>120 words left</i>
            <br></br>
            <br></br>
            <div className="text-end">
              <Button
                type="submit"
                id="btnLogin"
                className={`btn  btn-sm  ${styles.submitbutton}`}
              >
                Submit
              </Button>
              &nbsp;
              <Button
                type="submit"
                id="btnLogin"
                className={`btn  btn-sm  ${styles.resetbutton}`}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <br></br>
      {isMessage ? <MessageBox variant={variant} message={message} /> : ""}

      <br></br>
    </div>
  );
};
export default AskMe;
