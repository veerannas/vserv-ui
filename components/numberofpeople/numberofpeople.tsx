import React, { useEffect, useState } from "react";
import style from "./numberofpeople.module.css";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Cookies } from "react-cookie";
import { getBusinessIsAvalable, getRestaurantInfoByBusinessInfoId, postRegisterRestaurantInfo } from "../services/api/business-api";
import MessageBox from "../../components/messagebox/messagebox";

const Numberofpeople = () => {
  const cookies = new Cookies();
  const [id, setId] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState(0);
  const [numberofpeople, setNumberOfPeople] = useState({
    id: "",
    seatingCapacity: 1,
    businessInfo: { id: cookies.get("businessInfoId") }
  })

  useEffect(() => {
    businessIsAvailable();
  }, [])

  const businessIsAvailable = () => {
    //fetching data for people
    getBusinessIsAvalable(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        if (data == 1) {
          fetchResturantInfo();
        }
      });
  };

  const fetchResturantInfo = () => {
    //fetching data for people
    getRestaurantInfoByBusinessInfoId(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {

        formik.values.numberofpeople.id = data.id;
        formik.values.numberofpeople.seatingCapacity = data.seatingCapacity;
        setSeatingCapacity(data.seatingCapacity);
      });
  };


  const formik = useFormik({
    initialValues: { numberofpeople },
    validationSchema: yup.object({
      numberofpeople: yup.object({
        seatingCapacity: yup.number().integer('invalid decimal').required("Number is required"),
      }),
    }),
    onSubmit: (values) => {
      postRegisterRestaurantInfo(values.numberofpeople)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          setVariant("success");
          setMessage("Register Succefully.");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {isMessage ? <MessageBox variant={variant} message={message} /> : ""}
      <Row className={`${style.rightside}`}>
        <Form.Group
          as={Col}
          md="6"
        >
          <Form.Label>
            No. Of People
          </Form.Label>
          <Form.Control
            className={`form-control-border`}
            type="number"
            id="number"
            placeholder="No. of people"
            name="numberofpeople.seatingCapacity"
            value={formik.values.numberofpeople.seatingCapacity}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.numberofpeople?.seatingCapacity}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.numberofpeople?.seatingCapacity}
          </Form.Control.Feedback>
          <Button
            variant="primary"
            type="submit"
            className={`${style.formcontrolsave}`}
          >
            <i className="fa fa-check" aria-hidden="true"></i>

          </Button>
          &nbsp;
          <Button
            variant="primary"
            type="reset"
            className={`${style.formcontrolcancel}`}
          >
            <i className="fa fa-times" aria-hidden="true"></i>

          </Button>
        </Form.Group>
      </Row>
    </Form>

  );
};
export default Numberofpeople;