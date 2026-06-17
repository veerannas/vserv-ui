import { useFormik } from "formik";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { Address } from "../../../components/models/address";
import { BusinessInfo } from "../../../components/models/businessinfo";
import { MenuCategories } from "../../../components/models/menucategories";
import { MenuSubCategories } from "../../../components/models/menusubcategories";
import {
    addSubMenu
} from "../../../components/services/api/menu-api";
import style from "./index.module.css";

const AddSubService = (props: any) => {
    const cookies = new Cookies();
    let address = new Address();
    let businessInfo = new BusinessInfo(cookies.get("businessInfoId"), address);
    let menuCategories = new MenuCategories("", "", businessInfo);
    let menuSubCategories = new MenuSubCategories(
        "",
        menuCategories,
        "",
        "",
        "",
        "",
        false
    );

    const formikMenuSubCategories = useFormik({
        //put fetch data in initialvalue variable
        initialValues: { menuSubCategories },
        validationSchema: yup.object({
            menuSubCategories: yup.object().shape({
                menuName: yup.string().required("Service name is required"),
                price: yup.string().required("Service cost is required"),
                information: yup
                    .string()
                    .required("Service details are required")
                    .max(140, " Details should be 140 characters long "),
            }),
        }),

        //form submit call
        onSubmit: (values, action) => {
            //post call to update user notification
            let data = {
                menuCategories: { id: props.menuId },
                menuName: values.menuSubCategories.menuName,
                information: values.menuSubCategories.information,
                currency: values.menuSubCategories.currency,
                price: values.menuSubCategories.price
            };
            addSubMenu(data)
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
                        props.setMessage("Service Added successfully.");
                        action.resetForm();
                        props.fetchSubMenuList(props.menuId, props.serviceName);
                        props.setAddSubServiceModal(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    const cancelHandler = () => {
        props.setAddSubServiceModal(false);
    };
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
                <Form onSubmit={formikMenuSubCategories.handleSubmit} className={style.serviceform}>
                    <br/><Row>
                        <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationFormikServicename"
                        >
                            <Form.Label className={`${style.subservicename}`}>
                                Sub Service Name
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                type="text"
                                placeholder="Service Name"
                                aria-describedby="inputGroupPrepend"
                                name="menuSubCategories.menuName"
                                value={formikMenuSubCategories.values.menuSubCategories.menuName}
                                onChange={formikMenuSubCategories.handleChange}
                                isInvalid={!!formikMenuSubCategories.errors.menuSubCategories?.menuName}
                            >

                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formikMenuSubCategories.errors.menuSubCategories?.menuName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <br/><Row>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationFormikUsername"
                        >
                            <Form.Label className={`${style.labelcolor}`}>
                                Cost
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                as="select"
                                placeholder=""
                                aria-describedby="inputGroupPrepend"
                                name="menuSubCategories.currency"
                                value={formikMenuSubCategories.values.menuSubCategories.currency}
                                onChange={formikMenuSubCategories.handleChange}
                            >
                                <option value="$">$</option>
                                <option value="$">€</option>
                                <option value="Rs.">₹</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="9"
                            controlId="validationFormikUsername"
                        >
                            <Form.Label className={`${style.labelcolor}`}>
                                &nbsp;
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                type="text"
                                placeholder="Service Cost"
                                aria-describedby="inputGroupPrepend"
                                name="menuSubCategories.price"
                                value={formikMenuSubCategories.values.menuSubCategories.price}
                                onChange={formikMenuSubCategories.handleChange}
                                isInvalid={!!formikMenuSubCategories.errors.menuSubCategories?.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikMenuSubCategories.errors.menuSubCategories?.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <br/><Row>
                        <Col>
                            <Form.Label className={`${style.labelcolor}`}>
                                Details
                            </Form.Label>
                            <Form.Group controlId="ControlTextarea">
                                <Form.Control
                                    as="textarea"
                                    className={style.detailsTextarea}
                                    name="menuSubCategories.information"
                                    placeholder="Service Details"
                                    rows={5}
                                    value={formikMenuSubCategories.values.menuSubCategories.information}
                                    onChange={formikMenuSubCategories.handleChange}
                                    isInvalid={!!formikMenuSubCategories.errors.menuSubCategories?.information}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formikMenuSubCategories.errors.menuSubCategories?.information?.toLocaleString()}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Form.Group className={`${style.formcontrolbuttonright}`}>
                        <Button
                            variant="primary"
                            type="submit"
                            className={`${style.formcontrolsave}`}
                        >
                            Save
                        </Button>
                        &nbsp;
                        <Button
                            variant="primary"
                            type="reset"
                            className={`${style.formcontrolcancel}`}
                            onClick={cancelHandler}
                        >
                            Cancel
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>

    );
};
export default AddSubService;