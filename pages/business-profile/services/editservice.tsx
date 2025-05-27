import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import { Address } from "../../../components/models/address";
import { BusinessInfo } from "../../../components/models/businessinfo";
import {
    updateMenu
} from "../../../components/services/api/menu-api";
import style from "./index.module.css";


const EditService = (props: any) => {
    const cookies = new Cookies();

    let address = new Address();
    let businessInfo = new BusinessInfo(cookies.get("businessInfoId"), address);
    const [menuCategories, setMenuCategories] = useState({
        id: "",
        categoryName: ""
    })

    useEffect(() => {
        props.setCount(0);
        formikUpdateMenuCategory.values.menuCategories.id = props.editMenu.id;
        formikUpdateMenuCategory.values.menuCategories.categoryName = props.editMenu.categoryName;
    }, [props.count])

    const formikUpdateMenuCategory = useFormik({
        //put fetch data in initialvalue variable
        initialValues: { menuCategories },
        validationSchema: yup.object({
            menuCategories: yup.object().shape({
                categoryName: yup.string().required("Service name is required"),
            }),
        }),

        //form submit call
        onSubmit: (values) => {
            //post call to update user notification
            console.log(values.menuCategories);
            let data = {
                id: values.menuCategories.id,
                categoryName: values.menuCategories.categoryName,
            };
            updateMenu(data)
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
                        props.setMessage("Service updated successfully.");
                        props.fetchMenuList();
                        props.setserviceEdit(false);
                        props.setServiceEditmodalShow(false)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    const closeHandler = () => {
        props.setserviceEdit(false);
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
                    Edit Service
                    {/* {props.row.businessInfo.companyName} */}
                </Modal.Header>
            </strong>
            <Modal.Body>
            <Form onSubmit={formikUpdateMenuCategory.handleSubmit} className={style.servicesform}>
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
                            placeholder=""
                            aria-describedby="inputGroupPrepend"
                            name="menuCategories.categoryName"
                            value={formikUpdateMenuCategory.values.menuCategories.categoryName}
                            onChange={formikUpdateMenuCategory.handleChange}
                            isInvalid={!!formikUpdateMenuCategory.errors.menuCategories?.categoryName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formikUpdateMenuCategory.errors.menuCategories?.categoryName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group
                        as={Col}
                        md="1"
                        controlId="validationFormikServicename"
                    >
                        <Form.Label className={`${style.subservicename}`}>
                            &nbsp;
                        </Form.Label>
                        <i className={`fas fa-times ${style.closecontrol}`} onClick={closeHandler}></i>

                    </Form.Group> */}
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
                                <i className="fas fa-plus-circle"></i> &nbsp; Save
                            </Button>
                            &nbsp;
                            <Button
                                variant="primary"
                                type="reset"
                                className={`${style.formcontrolcancel}`}
                                onClick={() => props.setServiceEditmodalShow(false)}
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
export default EditService;