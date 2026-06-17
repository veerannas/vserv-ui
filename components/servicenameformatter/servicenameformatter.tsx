import React, { useEffect, useState } from "react";
import styles from "./servicenameformatter.module.css";
import {
    Button,
    Col,
    Form,
    Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Cookies } from "react-cookie";
import { getBusinessByBusinessInfoId, postUpdateBusiness } from "../services/api/business-api";
import { updateMenu } from "../services/api/menu-api";

const ServiceNameFormatter = (props: any) => {

    const cookies = new Cookies();
    const [isEditHandler, setIsEditHandler] = useState(false);
    const [serviceName, setServiceName] = useState(props.row.categoryName);
    const [menuCategories, setMenuCategories] = useState({
        id: "",
        categoryName: ""
    })

    useEffect(() => {
        formikUpdateMenuCategory.values.menuCategories.id = props.row.id;
        formikUpdateMenuCategory.values.menuCategories.categoryName = serviceName;
    }, [isEditHandler, serviceName])


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
                    // props.setIsMessage(true);
                    setIsEditHandler(false);
                    setServiceName(values.menuCategories.categoryName);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    const edithandler = () => {
        { isEditHandler ? setIsEditHandler(false) : setIsEditHandler(true) }

    }

    return (
        <>
            {!isEditHandler && (
                <Row>
                    <Col md={10}
                        className={styles.servicetypetextcolor}
                    >
                        {serviceName}
                    </Col>
                    <Col
                        md={2}
                        className={styles.servicetypetextcolor}
                    >
                        <i className="fas fa-edit" onClick={() => edithandler()}></i>
                    </Col>
                </Row>
            )}
            {isEditHandler && (
                <Form onSubmit={formikUpdateMenuCategory.handleSubmit} className={styles.servicesform}>
                    <Row>
                        <Form.Group
                            as={Col}
                            md="9"
                            controlId="validationFormikServicename"
                        >
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
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationFormikServicename"
                            className={`${styles.textright}`}
                        >
                            <Button
                                // variant="primary"
                                type="submit"
                                className={` ${styles.formcontrolbutton}`}
                            >
                                &#10004;
                            </Button>
                            {/* <span >&#10004;</span> */}
                            &nbsp;
                            <Button
                                className={` ${styles.formcontrolbutton}`}
                                onClick={() => edithandler()}
                            >
                                &#10006;
                            </Button>
                            {/* <span >&#10006;</span> */}
                            {/* <i  className={`fas fa-times ${styles.closecontrol}`} onClick={() => edithandler()}></i>
                          
                            <i className={`fas fa-times ${styles.closecontrol}`} onClick={() => edithandler()}></i> */}
                        </Form.Group>
                    </Row>

                </Form>

            )}
        </>
    );
};
export default ServiceNameFormatter;