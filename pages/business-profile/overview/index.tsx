import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
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


  const [businessInfo, setBusinessInfo] = useState({
    id: cookies.get("businessInfoId"),
    companyName: companyName,
    locationId: { id: locationId },
    profile: { about: about },
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
          if ((data.companyName || "") !== "") {
            setcompanyName(data.companyName);
            businessInfo.companyName = data.companyName;
          }
          if ((data.locationId || "") !== "") {
            if ((data.locationId.id || "") !== "") {
              setlocationId(data.locationId.majorCity);
              businessInfo.locationId.id = data.locationId.id;
            }
          }
          if ((data.profile || "") !== "" && (data.profile.about || "") !== "") {
            setAbout(data.profile.about);
            businessInfo.profile.about = data.profile.about;
          }

          if ((data.tags || "") !== "") {
            setDefaultValue(data.tags);
            options.length = 0;
            tags.length = 0;
            data.tags.map((d: any, index: any) => {
              options.push({ key: d, text: d, value: d });
              tags.push(d);
            })
          }


        }
      });
  };

  const formik = useFormik({
    //put fetch data in initialvalue variable
    initialValues: { businessInfo, tagsLength: 0 },
    //it is used for validation
    validationSchema: yup.object({
      businessInfo: yup.object().shape({
        companyName: yup.string().required("Business name is required"),
        // locationId: yup.object().shape({
        //   id: yup
        //     .string()
        //     .required("Industry is required"),
        // }),
        profile: yup.object().shape({
          about: yup
            .string()
            .required("About is required"),
        }),
      }),

      tagsLength: yup.number()
        .required()
        .min(1, 'Minimum one tag is required.')
      // tagsLength: Yup.number().test('len', 'Must be exactly 5 characters', val => val.toString().length === 5)
      // tagsLength: yup.number().min(1, "Tags is required"),

    }),
    //form submit call
    onSubmit: (values) => {

      let data = {
        id: cookies.get("businessInfoId"),
        companyName: values.businessInfo.companyName,
        // locationId: { id: values.businessInfo.locationId.id },
        tags: tags,
        profile: { about: values.businessInfo.profile.about },
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
                      Business Name
                    </div>
                    <div className="form-control form-control-border control-height">
                      {companyName}
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
                {/* <Row>
                  <Col md={6}>
                    <div
                      className={`${styles.labelfont}`}
                    >
                      City
                    </div>
                    <div className="form-control form-control-border control-height">
                      {locationId}
                    </div>
                  </Col>
                </Row>
                <br></br> */}
                <Row>
                  <Col md={6}>
                    <div
                      className={`${styles.labelfont}`}
                    >
                      Business tags
                    </div>
                    <div className="form-control form-control-border control-height">
                      {defaultOption.map((d: any, index: any) => {
                        return (
                          // <span>{index + 1}.&nbsp;{d}&nbsp;&nbsp;</span>
                          <>
                            <Button
                              className={`btn btn-warning btn-sm  ${styles.buttonlook}`}
                              type="button"
                            >
                              {d}
                            </Button>&nbsp;
                          </>
                        )
                      })}
                    </div>
                  </Col>
                </Row>
                <br></br>

                <Row>
                  <Col md={6}>
                    <div
                      className={`${styles.labelfont}`}
                    >
                      About
                    </div>
                    <div className="form-control form-control-border control-height">
                      {about}
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
                controlId="validationFormikcompanyName"
              >
                <Form.Label className={`${styles.labelfont}`}>
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
            {/* <br/><Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikcompanyName"
              >
                <Form.Label className={`${styles.labelfont}`}>
                  City
                </Form.Label>
                <Form.Control
                  className={`form-control-border`}
                  as="select"
                  placeholder="Industry Type"
                  aria-describedby="inputGroupPrepend"
                  name="businessInfo.locationId.id"
                  value={formik.values.businessInfo.locationId.id}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.businessInfo?.locationId?.id}
                >
                  <option value="" >
                    Select City
                  </option>
                  {categories.map((d: any, index: any) => {
                    return (
                      <option value={d.id} key={"cat_" + index}>
                        {d.majorCity}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.locationId?.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Row> */}

            <br/><Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikAabout"
              >
                <Form.Label className={`${styles.labelfont}`}>
                  Business tags
                </Form.Label>
                <Dropdown placeholder='Skills' fluid multiple selection
                  search
                  allowAdditions
                  options={options}
                  defaultValue={defaultOption}
                  onChange={(event: any, data: any) => {
                    setTags(data.value);
                    formik.setFieldValue("tagsLength", data.value.length);
                  }}
                  onAddItem={(event: any, data: any) => {
                    options.push({ key: data.value, text: data.value, value: data.value })
                  }}
                />
                <div className="formik-error">
                  {formik.errors.tagsLength}
                </div>
              </Form.Group>
            </Row>

            <br/><Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikAabout"
              >
                <Form.Label className={`${styles.labelfont}`}>
                  About
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="businessInfo.profile.about"
                  placeholder="About"
                  rows={3}
                  maxLength={140}
                  value={formik.values.businessInfo.profile.about}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.businessInfo?.profile?.about}
                />

                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.profile?.about}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br/>
            <Row>
              <Col>
                <Form.Group className={`col-md-6 ${styles.formcontrolbuttonright}`}>
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
              </Col>
            </Row>
          </Form>
        )}

        {/* <BackNext /> */}

      </div>
    </div>

  );
};

export default Businessprofile;
