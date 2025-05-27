import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import * as yup from "yup";
import MessageBox from "../../../components/messagebox/messagebox";
import {
  getBusinessByBusinessInfoId, postUpdateBusiness
} from "../../../components/services/api/business-api";
import { getCountry } from "../../../components/services/api/country-api";
import styles from "./index.module.css";

const BusinessAddress = (props: any) => {
  const cookies = new Cookies();
  const [googleMapUrl, setGoogleMapUrl] = useState(
    "<iframe  width='100%' height='100%'  frameborder='0' src='https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Chicago United States+(Your%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' aria-hidden='false' ></iframe>"
  );
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");


  const [businessInfo, setBusinessInfo] = useState({
    id: cookies.get("businessInfoId"),
    address: {
      addressLineOne: "",
      // city: "",
      // state: "",
      postalCode: "",
      // country: ""
    },
    cityId: {
      id: ""
    },
    stateId: {
      id: ""
    },
    countryId: {
      id: ""
    }

  });

  const [value, setValue] = useState('');

  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  // const [country, setCountry] = useState('');
  // const selectCountry = (val: any) => {
  //   setCountry(val);
  //   setRegion("");

  // }
  const [region, setRegion] = useState('');
  const selectRegion = (val: any) => {
    setRegion(val);
  }

  const [isFormEdit, setIsFormEdit] = useState(false);

  useEffect(() => {
    if (cookies.get("businessInfoId") !== "") {
      fetchCountry();
      fetchBusinessData();
      // setCountry("United States");
    }
  }, [isFormEdit]);

  //fetch country data
  const fetchCountry = () => {
    getCountry()
      .then((data) => data.json())
      .then((data) => {
        setCountryData(data);
        console.log("==========", JSON.stringify(data))
      }
      );
  }

  // fetch all business data acc vendorId
  const fetchBusinessData = () => {
    getBusinessByBusinessInfoId(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        // console.log(JSON.stringify(data));
        if (data.status != "500") {

          if ((data.address || "") !== "" && (data.address.addressLineOne || "") !== "") {
            formik.values.businessInfo.address.addressLineOne = data.address.addressLineOne;
            setAddress(data.address.addressLineOne);
          }
          if ((data.countryId || "") !== "") {
            if ((data.countryId.id || "") !== "") {
              formik.values.businessInfo.countryId.id = data.countryId.id;

            }
            if ((data.countryId.country || "") !== "") {
              setCountry(data.countryId.country);
              if ((data.stateId || "") !== "") {
                if ((data.stateId.id || "") !== "") {
                  // let filterData: any;
                  // filterData = countryData.find((obj: any) => obj.id == data.countryId.id);
                  // setStateData(filterData.state);
                  formik.values.businessInfo.stateId.id = data.stateId.id;

                }
                if ((data.stateId.state || "") !== "") {
                  setState(data.stateId.state);
                  if ((data.cityId || "") !== "") {
                    if ((data.cityId.id || "") !== "") {

                      formik.values.businessInfo.cityId.id = data.cityId.id;
                    }
                    if ((data.cityId.city || "") !== "") {
                      setCity(data.cityId.city);
                    }
                  }
                }

              }
            }

          }

          if ((data.address || "") !== "" && (data.address.postalCode || "") !== "") {
            formik.values.businessInfo.address.postalCode = data.address.postalCode;
            setPostalCode(data.address.postalCode);
          }
          var fullAddress =
            data.companyName +
            " " +
            city +
            " " +
            address;
          let _mapUrl =
            "<iframe width='100%' height='100%' frameborder='0' src='https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=" +
            fullAddress +
            "&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' aria-hidden='false' ></iframe>";
          setGoogleMapUrl(_mapUrl);
          // setBusinessInfo(data);
        }
      });
  };


  const formik = useFormik({
    initialValues: { businessInfo },
    validationSchema: yup.object().shape({
      businessInfo: yup.object().shape({
        address: yup.object().shape({
          addressLineOne: yup.string().required("Address is required."),
          // city: yup.string().required("City is required."),
          // state: yup.string().required("State is required."),
          // country: yup.string().required("Country is required."),
          postalCode: yup.string().required("Zip-Code is required."),
        }),
        cityId: yup.object().shape({
          id: yup.string().required("City is required."),
        }),
        stateId: yup.object().shape({
          id: yup.string().required("State is required."),
        }),
        countryId: yup.object().shape({
          id: yup.string().required("Country is required."),
        }),
      }),
    }),
    onSubmit: (values) => {
      // if (region == "") {
      //   setIsMessage(true);
      //   setMessage("State is required.");
      //   setVariant("danger");
      // } else if (country == "") {
      //   setIsMessage(true);
      //   setMessage("Country is required.");
      //   setVariant("danger");
      // }
      // else {
      //   setIsMessage(false);
      //   var data = {
      //     id: values.businessInfo.id,
      //     address: {
      //       addressLineOne: values.businessInfo.address.addressLineOne,
      //       // city: values.businessInfo.address.city,
      //       // state: region,
      //       // country: country,
      //       postalCode: values.businessInfo.address.postalCode

      //     },
      //   };

      console.log("values.businessInfo==========", values.businessInfo);
      postUpdateBusiness(values.businessInfo)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          setVariant("success");
          setMessage("Updated successfully.");
          fetchBusinessData();
          setIsFormEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
      // }

    },
  });

  const googleMapIframe = () => {
    return {
      __html: googleMapUrl,
    };
  };

  const countryHandleChange = (e: any) => {
    formik.setFieldValue(
      "businessInfo.countryId.id",
      e.target.value
    )

    if ((e.target.value || "") == "") {
      setStateData([]);
      setCityData([]);
      formik.values.businessInfo.stateId.id = "";
      formik.values.businessInfo.cityId.id = "";

    } else {
      setStateData([]);
      setCityData([]);
      formik.values.businessInfo.stateId.id = "";
      formik.values.businessInfo.cityId.id = "";
      let filterData: any;
      filterData = countryData.find((obj: any) => obj.id == e.target.value);
      // console.log("filterData=====", JSON.stringify(filterData.state))
      setStateData(filterData.state);
    }
  }


  const stateHandleChange = (e: any) => {
    formik.setFieldValue(
      "businessInfo.stateId.id",
      e.target.value
    )
    if ((e.target.value || "") == "") {
      setCityData([]);
      formik.values.businessInfo.cityId.id = "";
    } else {
      setCityData([]);
      formik.values.businessInfo.cityId.id = "";
      let filterData: any;
      filterData = stateData.find((obj: any) => obj.id == e.target.value);
      // console.log("filterData=====", JSON.stringify(filterData.city))
      setCityData(filterData.city);
    }
  }




  useEffect(() => {
    if (formik.values.businessInfo.countryId.id != "") {
      let filterData: any;
      filterData = countryData.find((obj: any) => obj.id == formik.values.businessInfo.countryId.id);
      setStateData(filterData.state);
    }
  }, [formik.values.businessInfo.countryId.id])

  useEffect(() => {
    if (formik.values.businessInfo.stateId.id != "") {
      let filterData: any;
      filterData = stateData.find((obj: any) => obj.id == formik.values.businessInfo.stateId.id);
      setCityData(filterData.city);
    }
  }, [formik.values.businessInfo.stateId.id])

  const editHandler = () => {
    if (isFormEdit == false) {
      setIsFormEdit(true);

      // let filterData1: any;
      // filterData1 = stateData.find((obj: any) => obj.id == formik.values.businessInfo.stateId.id);
      // // console.log("filterData=====", JSON.stringify(filterData.city))
      // setCityData(filterData1.city);
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
            <br/> */}

        <Row>
          <Col md={6}>
            {/* <div className={styles.address}>Address</div> */}
          </Col>
          <Col md={6} className={styles.editCol}>
            <div
              className={styles.leftPanelEdit}
              onClick={editHandler}
              hidden={isFormEdit}
            >
              <span>Edit</span>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col className={styles.getAddPara}>Select map to get Address</Col>
        </Row> */}
        {/* <br />
        <Row>
          <Col>
            <Button
              onClick={googleMapIframe}
              className={`btn ${styles.locationbtn}`}
            >
              <i className="fa fa-map-marker" aria-hidden="true"></i> Use
              Current Location
            </Button>
          </Col>
        </Row> */}
        <br />
        {isMessage ? (
          <MessageBox variant={variant} message={message} />
        ) : (
          ""
        )}

        {!isFormEdit && (
          <div className="wrapper-display">
            <Row>
              <Col>
                <Row>
                  <Col>
                    <div className={`${styles.editDiv} `}>Address</div>
                    <div className={`form-control form-control-border control-height`}>
                      {address}
                    </div>
                  </Col>
                </Row>
                <br></br>
                <Row>

                  <Col>
                    <div className={`${styles.editDiv} `}>Country</div>
                    <div className={`form-control form-control-border control-height`}>
                      {/* {formik.values.userData.mobileNumber.number} */}
                      {country}
                    </div>
                  </Col>
                  <Col>
                    <div className={`${styles.editDiv} `}>State</div>
                    <div className={`form-control form-control-border control-height`}>
                      {state}
                    </div>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>
                    <div className={`${styles.editDiv}`}>City</div>
                    <div className={`form-control form-control-border control-height`}>
                      {city}
                    </div>
                  </Col>

                  <Col>
                    <div className={`${styles.editDiv} `}>ZipCode</div>
                    <div className={`form-control form-control-border control-height`}>
                      {postalCode}
                    </div>
                  </Col>
                </Row>
                <br></br>
              </Col>
              <Col>
                <div className={`${styles.mapheight} `}
                  dangerouslySetInnerHTML={googleMapIframe()}>

                </div>

              </Col>
            </Row>
          </div>
        )}

        {isFormEdit && (
          <Form noValidate onSubmit={formik.handleSubmit}>
           <br/><Row>
              <Col
              // as={Col}
              // md="6"
              // controlId="validationFormikUsername"
              >
                <Form.Label className={`${styles.labelcolor}`}>
                  Address
                </Form.Label>
                <Form.Control
                  className={`form-control-border ${styles.formControlPlaceHolder}`}
                  type="text"
                  placeholder="Address"
                  aria-describedby="inputGroupPrepend"
                  name="businessInfo.address.addressLineOne"
                  value={formik.values.businessInfo.address.addressLineOne}
                  onChange={formik.handleChange}
                  isInvalid={
                    !!formik.errors.businessInfo?.address?.addressLineOne
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.address?.addressLineOne}
                </Form.Control.Feedback>
                {/* </Form.Group> */}
              </Col>
            </Row>
            <br />
           <br/><Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikUsername"
              >
                <Form.Label
                  className={`${styles.labelcolor} ${styles.labelcolormargin}`}
                >
                  Country
                </Form.Label>
                <Form.Control
                  className={`form-control-border`}
                  as="select"
                  placeholder="Industry Type"
                  aria-describedby="inputGroupPrepend"
                  name="businessInfo.countryId.id"
                  onChange={(e) =>
                    countryHandleChange(e)
                  }
                  value={formik.values.businessInfo.countryId.id}
                  // onChange={formik.handleChange}
                  isInvalid={!!formik.errors.businessInfo?.countryId?.id}
                >
                  <option value="" >
                    Select Country
                  </option>
                  {countryData.map((d: any, index: any) => {
                    return (
                      <option value={d.id} key={"cat_" + index}>
                        {d.country}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.countryId?.id}
                </Form.Control.Feedback>
                {/* <CountryDropdown
                  // defaultOptionLabel="United States"
                  classes={`form-control-border ${styles.formControlPlaceHolder} ${styles.countrycontrol}`}
                  value={country}
                  onChange={(val) => selectCountry(val)}
                /> */}

                {/* <Form.Control
                      className={`form-control-border ${styles.formControlPlaceHolder}`}
                      type="text"
                      placeholder="State"
                      aria-describedby="inputGroupPrepend"
                      name="businessInfo.address.state"
                      value={formik.values.businessInfo.address.state}
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.businessInfo?.address?.state}
                    ></Form.Control> */}
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikUsername"
              >
                <Form.Label className={`${styles.labelcolor}`}>
                  State
                </Form.Label>
                {/* <RegionDropdown
                  country={country}
                  value={region}
                  // countryValueType="short"
                  onChange={(val) => selectRegion(val)}
                  classes={`form-control-border ${styles.formControlPlaceHolder} ${styles.statecontrol}`}
                /> */}

                <Form.Control
                  className={`form-control-border ${styles.formControlPlaceHolder}`}
                  as="select"
                  placeholder="State"
                  aria-describedby="inputGroupPrepend"
                  name="businessInfo.stateId.id"
                  value={formik.values.businessInfo.stateId.id}
                  onChange={(e) =>
                    stateHandleChange(e)
                  }
                  isInvalid={!!formik.errors.businessInfo?.stateId?.id}
                >
                  <option value="" >
                    Select State
                  </option>
                  {stateData && stateData.map((d: any, index: any) => {
                    return (
                      <option value={d.id} key={"cat_" + index}>
                        {d.state}
                      </option>
                    );
                  })}

                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.stateId?.id}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
           <br/><Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikUsername"
              >
                <Form.Label className={`${styles.labelcolor}`}>
                  City
                </Form.Label>
                <Form.Control
                  className={`form-control-border ${styles.formControlPlaceHolder}`}
                  as="select"
                  placeholder="City"
                  aria-describedby="inputGroupPrepend"
                  name="businessInfo.cityId.id"
                  value={formik.values.businessInfo.cityId.id}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.businessInfo?.cityId?.id}
                >
                  <option value="" >
                    Select City
                  </option>
                  {cityData && cityData.map((d: any, index: any) => {
                    return (
                      <option value={d.id} key={"city_" + index}>
                        {d.city}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.cityId?.id}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikUsername"
              >
                <Form.Label className={`${styles.labelcolor}`}>
                  ZipCode
                </Form.Label>
                <Form.Control
                  className={`form-control-border ${styles.formControlPlaceHolder}`}
                  type="text"
                  placeholder="ZipCode"
                  aria-describedby="inputGroupPrepend"
                  name="businessInfo.address.postalCode"
                  value={formik.values.businessInfo.address.postalCode}
                  onChange={formik.handleChange}
                  isInvalid={
                    !!formik.errors.businessInfo?.address?.postalCode
                  }
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.businessInfo?.address?.postalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <br />
            <Row className={`${styles.formcontrolbuttonright}`}>
              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className={`${styles.btnSave}`}
                >
                  Save
                </Button>
                &nbsp;
                <Button
                  variant="primary"
                  type="reset"
                  className={`${styles.btnCancel}`}
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
      {/* <div className="col-md-1"></div>
          <br />
          <div className="col-md-3">
            <div className={styles.rightimagecard}>
              <ProgressBarComponent rowId={cookies.get("businessInfoId")} />
              <br />
              <div className="card">
                <div className="card-body">
                  <div className={`${styles.cardimgcenter}`}>
                    <img
                      className={`card-img-top ${styles.cardimg}`}
                      src={AddressImage}
                      alt="Card image cap"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
    </div>
  );
};
export default BusinessAddress;
