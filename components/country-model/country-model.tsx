import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { postVendorActivateDeactivate, postVendorDelete } from "../services/api/admin-api";
import styles from "./country-model.module.css";
import * as yup from "yup";
import { useFormik } from "formik";



const ConfirmationBox = (props: any) => {

  const onActivateDeacitivate = () => {

    if (props.funcValue == "Delete Account") {

      let vendorDelete = {
        id: props.row.id,
      }
      postVendorDelete(vendorDelete)
        .then((response) => response.text())
        .then((response) => {
          props.fetchAllVendorData();
          props.onHide();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

      let vendorDeactivateDelete = {
        id: props.row.id,
        deactivated: props.isDeactivated
      }
      postVendorActivateDeactivate(vendorDeactivateDelete)
        .then((response) => response.text())
        .then((response) => {
          props.fetchAllVendorData();
          props.onHide();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  const formik = useFormik({
    initialValues: {
      companyName: "",
      vendor: { id: props.vendorId },
      serviceId: { id: "" },
    },
    validationSchema: yup.object().shape({
      companyName: yup.string().required("Give the name of Your Organisation"),
      serviceId: yup.object().shape({
        id: yup.string().required("Service is required"),
      }),
    }),
    onSubmit: (values) => {
    //   postRegisterBusiness(values)
    //     .then((response) => response.text())
    //     .then((response) => {
    //       props.setAddBusiness(false);
    //       fetchBusinessData();
    //       fetchTotalBusiness();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    },
  });

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={`${styles.modalheading}`}>
        <h4>Add Country</h4>
      </Modal.Header>
      <Modal.Body>
      <Form noValidate onSubmit={formik.handleSubmit}>
            <br/><Row>
              <Col>
                <Form.Control
                  className={`form-control-border`}
                  type="text"
                  placeholder="Organisation Name"
                  name="companyName"
                  aria-describedby="inputGroupPrepend"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.companyName}
                  autoComplete="off"
                />

                <Form.Control.Feedback type="invalid">
                  {formik.errors.companyName}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Group className={`${styles.formcontrolbuttonright}`}>
                  <Button
                    variant="primary"
                    type="submit"
                    className={`${styles.formcontrolsave}`}
                  >
                    Save
                  </Button>
                  &nbsp;
                  <Button
                    variant="primary"
                    type="reset"
                    className={`${styles.modalButton}`}
                    // onClick={showBusinessModal}
                  >
                    Cancel
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={()=>onActivateDeacitivate()}
          variant="default"
          className={`${styles.modalButton}`}
        >Yes</Button>
        <Button onClick={props.onHide}
          variant="default"
          className={`${styles.modalButton}`}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmationBox;