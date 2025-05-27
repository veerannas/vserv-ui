import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { updateSubMenu } from "../../../components/services/api/menu-api";
import style from "./index.module.css";

const EditSubService = (props: any) => {
    const cookies = new Cookies();
    const [menuSubCategories, setMenuSubCategories] = useState({
        id: "",
        menuName: "",
        currency: "",
        price: "",
        categoryName: "",
        information: ""
    });


    useEffect(() => {
        // console.log("data====", props.editSubMenu.id);
        props.setCountSubService(0);
        formikUpdateMenuSubCategories.values.menuSubCategories.id = props.editSubMenu.id;
        formikUpdateMenuSubCategories.values.menuSubCategories.menuName = props.editSubMenu.menuName;
        formikUpdateMenuSubCategories.values.menuSubCategories.currency = props.editSubMenu.currency;
        formikUpdateMenuSubCategories.values.menuSubCategories.price = props.editSubMenu.price;
        formikUpdateMenuSubCategories.values.menuSubCategories.categoryName = props.editSubMenu.categoryName;
        formikUpdateMenuSubCategories.values.menuSubCategories.information = props.editSubMenu.information;
    }, [props.countSubService])

    const formikUpdateMenuSubCategories = useFormik({
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
        onSubmit: (values) => {

            let data = {
                id: values.menuSubCategories.id,
                menuName: values.menuSubCategories.menuName,
                currency: values.menuSubCategories.currency,
                price: values.menuSubCategories.price,
                information: values.menuSubCategories.information,
            };
            updateSubMenu(data)
                .then((response) => response.text())
                .then((response) => {
                    props.setTablerowEdit(false);
                    props.fetchSubMenuList(props.menuId, props.serviceName);
                    props.setEditSubServiceModal(false);

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
                    Add Sub Service
                    {/* {props.row.businessInfo.companyName} */}
                </Modal.Header>
            </strong>
            <Modal.Body>
                <Form onSubmit={formikUpdateMenuSubCategories.handleSubmit} className={style.serviceform}>
                    <Row>
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationFormikServicename"
                        >
                            <Form.Label >
                                Name of Sub Service
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                type="text"
                                placeholder=""
                                aria-describedby="inputGroupPrepend"
                                name="menuSubCategories.menuName"
                                value={formikUpdateMenuSubCategories.values.menuSubCategories.menuName}
                                onChange={formikUpdateMenuSubCategories.handleChange}
                                isInvalid={!!formikUpdateMenuSubCategories.errors.menuSubCategories?.menuName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikUpdateMenuSubCategories.errors.menuSubCategories?.menuName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            as={Col}
                            md="2"
                            controlId="validationFormikUsername"
                        >
                            <Form.Label className={`${style.labelcolor}`}>
                                Price
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                as="select"
                                placeholder=""
                                aria-describedby="inputGroupPrepend"
                                name="menuSubCategories.currency"
                                value={formikUpdateMenuSubCategories.values.menuSubCategories.currency}
                                onChange={formikUpdateMenuSubCategories.handleChange}
                            >
                                <option value="$">$</option>
                                <option value="Rs.">Rs.</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationFormikUsername"
                        >
                            <Form.Label className={`${style.labelcolor}`}>
                                &nbsp;
                            </Form.Label>
                            <Form.Control
                                className={`form-control-border`}
                                type="text"
                                placeholder=""
                                aria-describedby="inputGroupPrepend"
                                name="menuSubCategories.price"
                                value={formikUpdateMenuSubCategories.values.menuSubCategories.price}
                                onChange={formikUpdateMenuSubCategories.handleChange}
                                isInvalid={!!formikUpdateMenuSubCategories.errors.menuSubCategories?.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikUpdateMenuSubCategories.errors.menuSubCategories?.price}
                            </Form.Control.Feedback>
                        </Form.Group>


                    </Row>
                    <br/><Row>
                        <Form.Group as={Col}
                            md="12" controlId="ControlTextarea">
                            <Form.Label className={`${style.labelcolor}`}>
                                Details of Service
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                className={style.detailsTextarea}
                                name="menuSubCategories.information"
                                placeholder=""
                                rows={3}
                                value={formikUpdateMenuSubCategories.values.menuSubCategories.information}
                                onChange={formikUpdateMenuSubCategories.handleChange}
                                isInvalid={!!formikUpdateMenuSubCategories.errors.menuSubCategories?.information}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikUpdateMenuSubCategories.errors.menuSubCategories?.information}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row >
                    </Row>
                    <br/>
                    <Form.Group as={Col}
                        md="12" className={`${style.formcontrolbuttonright}`}>
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
                            onClick={() => props.setEditSubServiceModal(false)}
                        >
                            Cancel
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default EditSubService;

