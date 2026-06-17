import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import BusinessListing from "../../../assets/images/Business-listing.svg";
import BreadCrum from "../../../components/businessbreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import { NameClass } from "../../../components/models/nameclass";
import { Role } from "../../../components/models/roles";
import { User } from "../../../components/models/user";
import { getMangerByVendorId } from "../../../components/services/api/business-api";
import { getAllRole } from "../../../components/services/api/role-api";
import { updateUserData } from "../../../components/services/api/user-api";
import styles from "./index.module.css";
import MessageBox from "../../../components/messagebox/messagebox";
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const GenerelBusinessListing = () => {
  const cookies = new Cookies();
  let name = new NameClass();
  let role = new Role();
  let user = new User("", name, role, "");
  const [manager, setManager] = useState(user);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [roleList, setRoleList] = useState<any[]>([]);
  const [roleArr, setRoleArr] = useState<any[]>([]);
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState<any[]>([]);
  const [defaultOption, setDefaultOption] = useState<any[]>([]);
  const [roleValue, setRoleValue] = useState([]);

  useEffect(() => {
    //call api to find manager data
    if ((cookies.get("id") || "") == "") { window.location.href = "/" } else {
      fetchManager();
      fetchRole();
    };

  }, [isFormEdit]);
  const editHandler = () => {
    if (isFormEdit == false) {
      setIsFormEdit(true);
    } else {
      setIsFormEdit(false);
    }
  };

  //find manger by vendor id
  const fetchManager = () => {
    getMangerByVendorId(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        //set manager data
        manager.id = data.id;
        manager.name.firstName = data.name.firstName;
        if ((data.roles || "") !== "") {
          defaultOption.length = 0;
          roleArr.length = 0;
          data.roles.map((d: any, index: any) => {
            roleArr.push(d.id);
            defaultOption.push(d.id)
          })
          setDefaultValue(defaultOption);
          setRoleValue(data.roles);
        }
        if ((data.ssnNumber || "") !== "") {
          manager.ssnNumber = data.ssnNumber;
        }
        setManager(manager);
      });
  };

  //find Roles
  const fetchRole = () => {
    getAllRole()
      .then((data) => data.json())
      .then((data) => {
        //set Role in List
        let newData = data.map((item: any) => {
          return { key: item.id, text: item.role, value: item.id };
        });
        setOptions(newData);
      });
  };

  const formik = useFormik({
    initialValues: { manager },
    validationSchema: yup.object({
      manager: yup.object().shape({
        name: yup.object().shape({
          firstName: yup.string(), // Removed required validation since field is readOnly
        }),
        // roles: yup.object().shape({
        //   id: yup.string().required("Role is required"),
        // }),
      }),
    }),

    onSubmit: (values) => {
      roleArr.map((d: any, index: any) => {
        roleList.push({ id: d });
      })
      let data = {
        id: values.manager.id,
        name: { firstName: values.manager.name?.firstName },
        roles: roleList,
        ssnNumber: values.manager.ssnNumber,
      };
      updateUserData(data)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          if (
            typeof response == "undefined" ||
            response == null ||
            response == ""
          ) {
            setMessage("Something went wrong!.");
            setVariant("danger");
          } else {
            setVariant("success");
            setMessage("User information updated successfully.");
            fetchManager();
            setIsFormEdit(false);
            roleList.length = 0;
          }
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
                    src={BusinessListing.src}
                    alt="Card image cap"
                  />
                  <span className={`${styles.wrimagecardheading}`}>
                    Business Info
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
                            className={`${styles.labelcolor} ${styles.labledisplay} `}
                          >
                            Business Handle
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {manager.name?.firstName}
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay} `}
                          >
                            Role
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {roleValue.map((d: any, index: any) => {
                              return (
                                <span key={"role_" + index}>
                                  {/* {index + 1}.&nbsp; */}
                                  <Button className={`${styles.rolebutton} `}>
                                    {d.role}
                                  </Button>&nbsp;&nbsp;
                                </span>
                              )
                            })}
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>

                      <br></br>
                      <Row>
                        <Col>
                          <div
                            className={`${styles.labelcolor} ${styles.labledisplay} `}
                          >
                            SSN number
                          </div>
                          <div className="form-control form-control-border control-height ">
                            {manager.ssnNumber}
                            {/* <span className={styles.eyelabelcolor}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </span> */}
                          </div>
                        </Col>
                        <Col></Col>
                      </Row>
                    </div>
                  )}
                  {isFormEdit && (
                    <Form onSubmit={formik.handleSubmit}>
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikFirstName"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            Business Handle
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="text"
                            placeholder="Business Handle"
                            aria-describedby="inputGroupPrepend"
                            name="manager.name.firstName"
                            value={formik.values.manager.name?.firstName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.manager?.name?.firstName}
                            readOnly
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.manager?.name?.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <br></br>
                      <Row>
                        <Form.Group as={Col} md="6" controlId="validationFormikRole">
                          <Form.Label className={`${styles.labelcolor}`}>
                            Role
                          </Form.Label>
                          <Dropdown placeholder='Role' fluid multiple selection
                            options={options}
                            defaultValue={defaultValue}
                            onChange={(event: any, data: any) => {
                              setRoleArr(data.value);
                            }}
                          />
                        </Form.Group>
                      </Row>
                      <br></br>
                      <Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormikssnNumber"
                        >
                          <Form.Label className={`${styles.labelcolor}`}>
                            SSN Number
                          </Form.Label>
                          <Form.Control
                            className={`form-control-border`}
                            type="password"
                            placeholder="SSN Number"
                            aria-describedby="inputGroupPrepend"
                            onChange={formik.handleChange}
                            name="manager.ssnNumber"
                            value={formik.values.manager.ssnNumber}
                          />
                        </Form.Group>
                      </Row>
                      <br></br>
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
                          src={BusinessListing.src}
                          alt="Card image cap"
                        />
                      </div>
                      <hr></hr>
                      <h5 className="card-title">Business Info..</h5>
                      <p className="card-text">
                        While you are setting your password you must be more confident
                        about your password strength.
                      </p>
                      <p className="card-text">
                        Make password strong with alphanumeric key some characters,
                        numbers, and some special letters.
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
export default GenerelBusinessListing;
