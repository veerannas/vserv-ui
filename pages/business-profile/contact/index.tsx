import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-number-input/style.css';
import 'react-select2-wrapper/css/select2.css';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown } from 'semantic-ui-react';
import * as yup from "yup";
import MessageBox from "../../../components/messagebox/messagebox";
import { getBusinessByBusinessInfoId, getLocation, postUpdateBusiness } from "../../../components/services/api/business-api";
import styles from "./index.module.css";

const Businessprofile = (props: any) => {
    const cookies = new Cookies();
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");
    const [isFormEdit, setIsFormEdit] = useState(false);
    const [companyName, setcompanyName] = useState("");
    const [locationId, setlocationId] = useState("");
    const [tags, setTags] = useState<any[]>([]);
    const [about, setAbout] = useState("");
    const [categories, setLocation] = useState([]);
    const [options, setOptions] = useState<any[]>([]);
    const [defaultOption, setDefaultValue] = useState([]);
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");


    const [businessInfo, setBusinessInfo] = useState({
        id: cookies.get("businessInfoId"),
        companyName: companyName,
        locationId: { id: locationId },
        tags: tags,
        profile: {
            websiteUrl: websiteUrl
        },
        email: email,
        telephone: { countryCode: "", number: "" }
    });

    useEffect(() => {
        fetchbusinessInfo();
        fetchCategory();
    }, [businessInfo])

    //fetch category
    const fetchCategory = () => {
        getLocation()
            .then((data) => data.json())
            .then((data) => {
                setLocation(data);
            });
    };
    const fetchbusinessInfo = () => {
        getBusinessByBusinessInfoId(cookies.get("businessInfoId"))
            .then((data) => data.json())
            .then((data) => {
                if (data.status != "500") {
                    if ((data.profile || "") !== "" && (data.profile.websiteUrl || "") !== "") {
                        setWebsiteUrl(data.profile.websiteUrl);
                        businessInfo.profile.websiteUrl = data.profile.websiteUrl;
                    }
                    if ((data.email || "") !== "") {
                        setEmail(data.email);
                        businessInfo.email = data.email;
                    }
                    if ((data.telephone || "") !== "" && (data.telephone.number || "") !== "") {
                        setPhoneNumber(data.telephone.number);
                        setValue(data.telephone.countryCode + data.telephone.number);
                        setPhoneCode(data.telephone.countryCode);
                        setCountryCode(data.telephone.countryCode);
                        formik.setFieldValue("businessInfo.telephone.countryCode", data.telephone.countryCode); formik.setFieldValue("businessInfo.telephone.number", data.telephone.number)

                    }

                }
            });
    };

    const formik = useFormik({
        //put fetch data in initialvalue variable
        initialValues: { businessInfo },
        //it is used for validation
        validationSchema: yup.object({
            businessInfo: yup.object().shape({
                email: yup.string().email("Invalid email.").required("Email is required."),
                telephone: yup.object().shape({
                    countryCode: yup.string().required("Country code is required."),
                    number: yup.string().required("Mobile number is required.")
                }),
            }),
        }),
        //form submit call
        onSubmit: (values) => {

            let data = {
                id: cookies.get("businessInfoId"),
                profile: {
                    websiteUrl: values.businessInfo.profile.websiteUrl
                },
                email: values.businessInfo.email,
                telephone: { countryCode: countryCode, number: value.slice(countryCode.length) }
            };
            postUpdateBusiness(data)
                .then((response) => response.text())
                .then((response) => {
                    setIsMessage(true);
                    setVariant("success");
                    setMessage("Updated successfully.");
                    fetchbusinessInfo();
                    setIsFormEdit(false);
                })
                .catch((err) => {
                    console.log(err);
                });

        },
    });

    // edit show and hide
    const editHandler = () => {
        if (isFormEdit == false) {
            setIsFormEdit(true);
        } else {
            setIsFormEdit(false);
        }
    };

    useEffect(() => {
        formik.setFieldValue("businessInfo.telephone.countryCode", countryCode);
        formik.setFieldValue("businessInfo.telephone.number", value.slice(countryCode.length));
    }, [value])

    return (
        <div className="row">
            <div className="col-md-12">
                {/* <Row>
              <BusinessNavbar />
            </Row>
            <br /> */}

                {isMessage ? (
                    <MessageBox variant={variant} message={message} />
                ) : (
                    ""
                )}

                {!isFormEdit && (
                    <div className="wrapper-display">
                        <div className="row">
                            <Col>
                                {/* <Row>
                                    <Col md={6}>
                                        <div className={`${styles.overview}`}>Overview</div>
                                    </Col>
                                    <Col md={6}>
                                        <div
                                            onClick={editHandler}
                                            className={`${styles.formcontroledit}`}
                                        >
                                            <span>Edit</span>
                                        </div>
                                    </Col>
                                </Row> */}
                                <br></br>
                                <Row>
                                    <Col md={6}>
                                        <div
                                            className={`${styles.labelfont}`}
                                        >
                                            Website
                                        </div>
                                        <div className="form-control form-control-border control-height">
                                            {websiteUrl}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div
                                            onClick={editHandler}
                                            className={`${styles.formcontroledit}`}
                                        >
                                            <span>Edit</span>
                                        </div>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col md={6}>
                                        <div
                                            className={`${styles.labelfont}`}
                                        >
                                            Email
                                        </div>
                                        <div className="form-control form-control-border control-height">
                                            {email}
                                        </div>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col md={6}>
                                        <div
                                            className={`${styles.labelfont}`}
                                        >
                                            Phone Number
                                        </div>
                                        <div className="form-control form-control-border control-height">
                                            (+ {phoneCode}) {phoneNumber}
                                        </div>
                                    </Col>
                                </Row>

                                <br></br>
                            </Col>
                        </div>
                    </div>
                )}
                <br />
                {isFormEdit && (
                    <Form noValidate onSubmit={formik.handleSubmit}>

                        <br/><Row>
                            <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormikAabout"
                            >
                                <Form.Label className={`${styles.labelfont}`}>
                                    Website
                                </Form.Label>
                                <Form.Control
                                    className={`form-control-border`}
                                    type="text"
                                    placeholder="www.mybusiness.com"
                                    name="businessInfo.profile.websiteUrl"
                                    value={formik.values.businessInfo.profile.websiteUrl}
                                    onChange={formik.handleChange}
                                />

                            </Form.Group>
                        </Row>
                        <br/><Row>
                            <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormikAabout"
                            >
                                <Form.Label className={`${styles.labelfont}`}>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    className={`form-control-border`}
                                    type="text"
                                    name="businessInfo.email"
                                    placeholder="Email"
                                    value={formik.values.businessInfo.email}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.businessInfo?.email}

                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.businessInfo?.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <br/><Row>
                            <Form.Group as={Col} md="6" controlId="validationFormik106">
                                <Form.Label className={`${styles.labelfont}`}>
                                    Phone Number
                                </Form.Label>
                                <PhoneInput
                                    country={'us'}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true
                                    }}
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={(e: any, country: any) => {
                                        setCountryCode(country.dialCode);
                                        setValue(e);
                                    }}
                                    autoFormat={false}
                                />
                                <div className="formik-error">
                                    {formik.errors.businessInfo?.telephone?.number}
                                </div>
                            </Form.Group>
                        </Row>
                        <br/><Row>
                            <Form.Group as={Col} md="6" className={` ${styles.formcontrolbuttonright}`}>
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
                                    className={`${styles.formcontrolcancel}`}
                                    onClick={editHandler}
                                >
                                    Cancel
                                </Button>
                            </Form.Group>
                        </Row>
                    </Form>
                )}

                {/* <BackNext /> */}

            </div>
        </div>

    );
};

export default Businessprofile;
