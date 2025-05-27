import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import Switch from "react-switch";
import { getActiveBusiness, getBusinessByBusinessInfoId, getBusinessProfilePercent, postBusinessActivateDeactivate, postBusinessPublish } from "../../../components/services/api/business-api";
import styles from "./index.module.css";
import MessageBox from "../../../components/messagebox/messagebox";

const Businessprofile = (props: any) => {
  const cookies = new Cookies();
  const [isPublish, setIsPublish] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPercent, setIsPercent] = useState(true);

  const [businessdata, setbusinessdata] = useState({
    messagestatus: false,
  })

  useEffect(() => {
    // fetchbusinessInfo();
    fetchBusinessProfilePercent();
    fetchActiveBusiness();
  }, []);

  const fetchbusinessInfo = () => {
    getBusinessByBusinessInfoId(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        if (data.status != "500") {
          setIsPublish(data.publish);
        }
      });
  };



  const isPublishFunc = (e: any) => {
    if (isPublish == true) {
      setIsPublish(false);
    } else {
      setIsPublish(true);
    }
    var businessInfo = {
      id: cookies.get("businessInfoId"),
      publish: e,
    };
    postBusinessPublish(businessInfo)
      .then((response) => response.text())
      .then((response) => { })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchActiveBusiness = () => {
    getActiveBusiness(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setIsActive(data);
      });
  };

  //set status active or inactive in business
  const activateDeactivate = (e: any) => {
    if (isActive == true) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
    let businessInfo = {
      id: cookies.get("businessInfoId"),
      active: e,
    };
    postBusinessActivateDeactivate(businessInfo)
      .then((response) => response.text())
      .then((response) => {
      })
      .catch((err) => {
        console.log(err);
      });

  };

  //fetch business completion status percent
  const fetchBusinessProfilePercent = () => {
    getBusinessProfilePercent(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        if (data == "100") {
          setIsPercent(false);
        }
      });
  };

  return (

    <div className="row">
      {/* Left Panel */}
      <div className="col-md-12">
        {/* <Row>
            <BusinessNavbar />
          </Row> */}
        <Row>
          <Col>
            <div className={`${styles.statustitle}`}>
              {/* Status */}
            </div>
          </Col>
        </Row>
        {isPercent ?
          <Row>
            <Col>
              <div className={`${styles.error}`}>
                <MessageBox variant={"danger"} message={"Please complete business profile."} />
              </div>
            </Col>
          </Row>
          :
          ""
        }
        <Row>
          <Col>
            <div className={`${styles.substatustitle}`}>
              Activate Business
            </div>
          </Col>
        </Row>

        <div className="not1">
          <Row>
            <Col>
              <Form.Label className={`${styles.labeltext}`}>
                Make this business available for customers
              </Form.Label>
            </Col>
            <Col>
              <div className={styles.notficationright}>
                <Switch
                  onChange={(e) => activateDeactivate(e)}
                  checked={isActive}
                  onColor="#007bff"
                  height={20}
                  width={40}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  disabled={isPercent}
                />
              </div>
            </Col>
          </Row>
        </div>

        <br></br>
        <br></br>
        {/* <Row>
              <Col>
                <Form.Group className={`${styles.formcontrolbuttonright}`}>
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
                    className={`${styles.formcontrolcancel}`}>
                    Cancel
                        </Button>
                </Form.Group>
              </Col>
            </Row> */}

        {/* <BackNext/> */}

      </div>

      {/* <div className="col-md-1"></div>
          <br />
          <div className="col-md-3">
          <div className={styles.rightimagecard}>
            <ProgressBarComponent rowId={cookies.get("businessInfoId")} />
              <br></br>
              <div className="card">
                <div className="card-body">
                  <div className={`${styles.cardimgcenter}`}>
                    <img
                      className={`card-img-top ${styles.cardimg}`}
                      src={Status}
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
export default Businessprofile;

