import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { Address } from "../../../components/models/address";
import { BusinessInfo } from "../../../components/models/businessinfo";
import { MenuCategories } from "../../../components/models/menucategories";
import {
    addMenu
} from "../../../components/services/api/menu-api";
import style from "./index.module.css";


const AddService = (props: any) => {
    const cookies = new Cookies();
    let address = new Address();
    let businessInfo = new BusinessInfo(cookies.get("businessInfoId"), address);
    let menuCategories = new MenuCategories("", "", businessInfo);


    const formikMenuCategory = useFormik({
        //put fetch data in initialvalue variable
        initialValues: { menuCategories },
        validationSchema: yup.object({
            menuCategories: yup.object().shape({
                categoryName: yup.string().required("Service name is required"),
            }),
        }),

        //form submit call
        onSubmit: (values, actions) => {
            //post call to update user notification
            console.log(values.menuCategories);
            let data = {
                categoryName: values.menuCategories.categoryName,
                businessInfo: {
                    id: cookies.get("businessInfoId"),
                },
            };
            addMenu(data)
                .then((response) => response.text())
                .then((response) => {
                    props.setIsMessage(true);
                    if (
                        typeof response == "undefined" ||
                        response == null ||
                        response == ""
                    ) {
                        props.setMessage("Something went wrong!.");
                        props.setVariant("danger");
                    } else {
                        props.setVariant("success");
                        props.setMessage("Service add successfully.");
                        props.setModalShow(false)
                        actions.resetForm();
                        props.fetchMenuList();
                        props.allTOtalMenuButton();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            {...props}
        >
            <strong className={`${style.modalheader}`}>
                <Modal.Header closeButton>
                    Add Service
                    {/* {props.row.businessInfo.companyName} */}
                </Modal.Header>
            </strong>
            <Modal.Body>
                <Form onSubmit={formikMenuCategory.handleSubmit} className={style.servicesform}>
                    <Row>
                        <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationFormikServicename"
                        >
                            <Form.Label className={`${style.subservicename}`}>
                                Service Name
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                type="text"
                                placeholder="Service Name"
                                aria-describedby="inputGroupPrepend"
                                name="menuCategories.categoryName"
                                value={formikMenuCategory.values.menuCategories.categoryName}
                                onChange={formikMenuCategory.handleChange}
                                isInvalid={!!formikMenuCategory.errors.menuCategories?.categoryName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikMenuCategory.errors.menuCategories?.categoryName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <div className={`${style.formcontrolbuttonright}`}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={`${style.addservicecolor}`}
                                >
                                    <i className="fas fa-plus-circle"></i> &nbsp; Add Service
                                </Button>
                                &nbsp;
                                <Button
                                    variant="primary"
                                    type="reset"
                                    className={`${style.formcontrolcancel}`}
                                    onClick={() => props.setModalShow(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    {/* <br/><Row>
                        <Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className={`${style.addservicecolor}`}
                            >
                                <i className="fas fa-plus-circle"></i> &nbsp; Add Service
                            </Button>
                        </Form.Group>
                    </Row> */}
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default AddService;

