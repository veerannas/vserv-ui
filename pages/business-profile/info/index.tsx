import { useFormik } from "formik";
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import BusinessProfile from "../../../assets/images/businessprofileinfo.svg";
import BreadCrum from "../../../components/businessprofilebreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import MessageBox from "../../../components/messagebox/messagebox";
import { getBusinessByBusinessInfoId, postUpdateBusiness } from "../../../components/services/api/business-api";
// import { NameClass } from "../../../components/models/nameclass";
// import { User } from "../../../components/models/user";
// import { getMangerByVendorId } from "../../../components/services/api/business-api";
// import { updateUserData } from "../../../components/services/api/user-api";
import styles from "./index.module.css";

const BusinessProfileInfo = () => {
  const cookies = new Cookies();
  // let name = new NameClass();
  // let user = new User("", name, "");
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    id: cookies.get("businessInfoId"),
    companyName: "",
    federalId: "",
    taxId: "",
    manager: {
      name: {
        firstName: ""
      }

    }

  });

  useEffect(() => {
    if ((cookies.get("id") || "") == "") {
      window.location.href = "/";
    }
  }, [isFormEdit, cookies.get("id")]);
  // useEffect(() => {
  //   //call api to find businessInfo data
  //   // fetchbusinessInfo();
  // }, [isFormEdit]);
  const editHandler = () => {
    if (isFormEdit == false) {
      setIsFormEdit(true);
    } else {
      setIsFormEdit(false);
    }
  };

  useEffect(() => {
    fetchbusinessInfo();
  }, [])


  const fetchbusinessInfo = () => {
    getBusinessByBusinessInfoId(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        // setTags([]);
        //console.log(JSON.stringify(data));

        if (data.status != "500") {
          if ((data.companyName || "") !== "") {
            businessInfo.companyName = data.companyName;
          }
          if ((data.federalId || "") !== "") {
            businessInfo.federalId = data.federalId;
          }
          if ((data.taxId || "") !== "") {
            businessInfo.taxId = data.taxId;
          }
          if ((data.manager || "") !== "" && (data.manager.name || "") !== "" && (data.manager.name.firstName || "") !== "") {
            businessInfo.manager.name.firstName = data.manager.name.firstName;
          }
          setBusinessInfo({
            id: data.id,
            companyName: businessInfo.companyName,
            federalId: businessInfo.federalId,
            taxId: businessInfo.taxId,
            manager: {
              name: {
                firstName: businessInfo.manager.name.firstName
              }
            }
          })

        }


      });
  };

  //find manger by vendor id
  // const fetchbusinessInfo = () => {
  //   getMangerByVendorId(cookies.get("vendorId"))
  //     .then((data) => data.json())
  //     .then((data) => {
  //       //set businessInfo data
  //       businessInfo.id = data.id;
  //       businessInfo.companyName = data.companyName;
  //       if ((data.federalid || "") !== "") {
  //         businessInfo.federalid = data.federalid;
  //       }
  //       if ((data.taxid || "") !== "") {
  //         businessInfo.taxid = data.taxid;
  //       }
  //       businessInfo.businessInfoName = data.businessInfoName;
  //       businessInfo.employeeName = data.employeeName;
  //       setbusinessInfo(businessInfo);
  //     });
  // };


  const formik = useFormik({
    initialValues: { businessInfo },
    validationSchema: yup.object({
      businessInfo: yup.object().shape({
        companyName: yup.string().required("Business Name is required"),
        // federalId: yup.string().required("Federal Id is required"),
        // taxId: yup.string().required("Tax Id is required"),
        manager: yup.object().shape({
          name: yup.object().shape({
            firstName: yup.string().required("manager is required"),
          }),
        }),
      }),
    }),

    onSubmit: (values) => {
      //post call to update business data
      setIsMessage(false);
      postUpdateBusiness(values.businessInfo)
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

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          {/* End Header Menu */}
          <hr></hr>
          <div className="container">
            <div className={`footer-fix-height `}>
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <img
                    className={`card-img-top ${styles.cardimg}`}
                    src={BusinessProfile.src}
                    alt="Card image cap"
                  />
                  <span className={`${styles.wrimagecardheading}`}>
                    Business Profile Info
                  </span>
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  {/* BreadCrum */}
                  <BreadCrum />
                  {/* End BreadCrum */}
                </div>
              </div>
              <br></br>
              <br></br>
              <div></div>
              <div className="row">
                {/* Left Panel */}
                <div className="col-md-8">
                  {isMessage ? (
                    <MessageBox variant={variant} message={message} />
                  ) : (
                    ""
                  )}
                  {!isFormEdit && (
                    <div className="wrapper-display">
                      <Row>
                        <Col>
                          <div
                            onClick={editHandler}
                            className={`${styles.formcontroledit}`}
                          >
                            <span>Edit</span>
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>

                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Business Name
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {businessInfo.companyName}
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>

                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Federal Id
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {businessInfo.federalId}
                            <span className={styles.eyelabelcolor}>
                              {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
                            </span>
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Tax Id
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {businessInfo.taxId}
                            <span className={styles.eyelabelcolor}>
                              {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
                            </span>
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay}`}
                          >
                            Manager Name
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {businessInfo.manager.name.firstName}
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>
                      <br></br>
                      {/* <Row>
                  <Col>
                    <div
                      className={`${styles.labelcolor} ${styles.labledisplay}`}
                    >
                      Employeee Name
                    </div>
                    <div className="form-control form-control-border">
                    </div>
                  </Col>
                  <Col></Col>
                </Row> */}
                    </div>
                  )}
                  {isFormEdit && (
                    <Form onSubmit={formik.handleSubmit}>
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikcompanyName"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Business Name
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Business Name"
                            aria-describedby="inputGroupPrepend"
                            name="businessInfo.companyName"
                            value={formik.values.businessInfo.companyName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.businessInfo?.companyName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.businessInfo?.companyName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikfederalid"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Federal Id
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="password"
                            placeholder="Federal Id"
                            aria-describedby="inputGroupPrepend"
                            onChange={formik.handleChange}
                            name="businessInfo.federalId"
                            value={formik.values.businessInfo.federalId}
                          />
                        </Form.Group>
                      </Row>
                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikfederalid"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Tax Id
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="password"
                            placeholder="Tax Id"
                            aria-describedby="inputGroupPrepend"
                            onChange={formik.handleChange}
                            name="businessInfo.taxId"
                            value={formik.values.businessInfo.taxId}
                          />
                        </Form.Group>
                      </Row>
                      <br/><Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikbusinessInfoName"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Manager  Name
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="businessInfo Name"
                            aria-describedby="inputGroupPrepend"
                            name="businessInfo.manager.name.firstName"
                            value={formik.values.businessInfo.manager.name.firstName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.businessInfo?.manager?.name?.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.businessInfo?.manager?.name?.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <br/>
                      <Form.Group
                        as={Col}
                        md="6"
                        className={`${styles.formcontrolbuttonright}`}
                      >
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
                    </Form>
                  )}
                  <br></br>
                  <br></br>
                </div>
                {/* End Left Panel */}
                {/* Right Panel */}
                <div className="col-md-1"></div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className={`${styles.cardimgcenter}`}>
                        <img
                          className={`card-img-top ${styles.cardimg}`}
                          src={BusinessProfile.src}
                          alt="Card image cap"
                        />
                      </div>
                      <hr></hr>
                      <h5 className="card-title">Business Info..</h5>
                      <p className="card-text">
                        Allowing notification helps you to get notification about your booking and new updates for you.
                      </p>
                      <p className="card-text">
                        Set appointment time so that you can receive notification ahead of the time of appointment.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Left Panel */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default BusinessProfileInfo;
