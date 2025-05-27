import React, { useState } from "react";
import {
  Col,
  Row
} from "react-bootstrap";
import { Cookies } from "react-cookie";
import styles from "./index.module.css";
import NonEditreservationWorkingHour from "./nonedit-reservation-workinghour";
import NonEditForm from "./nonedit-workingday";
import ReservationWorkingHour from "./reservation-workinghour";
import WokingDay from "./workingday";
import BreakHours from "./breakhours";



const BusinessHour = (props: any) => {

  const cookies = new Cookies();

  const [isFormEdit, setIsFormEdit] = useState(false);
  const [isReservationFormEdit, setIsReservationFormEdit] = useState(false);


  // const editHandler = () => {
  //   if (isFormEdit == false) {
  //     setIsFormEdit(!isFormEdit);
  //   } else {
  //     setIsFormEdit(false);
  //   }
  // };

  return (

    <div className="row">
      <div className={`col-md-12`}>
        {/* <Row>
              <BusinessNavbar />
            </Row>
            <br /> */}
        {/* <Row>
          <Col>
            <div className={styles.address}>
              Hours
            </div>
          </Col>
          <Col className={styles.editCol}>
                <Button
                  className={styles.leftPanelEdit}
                  onClick={editHandler}
                  hidden={isFormEdit}
                >
                  Edit
                </Button>
              </Col>
        </Row> */}

        <br></br>
        <Row>
          <Col md="12">
            {!isFormEdit && <NonEditForm setIsFormEdit={setIsFormEdit}
              isFormEdit={isFormEdit} />}
            {isFormEdit &&
              <WokingDay
                setIsFormEdit={setIsFormEdit}
                isFormEdit={isFormEdit}
              />
            }

          </Col>
        </Row>
        <Row>
          <Col md="12">
            {/* <ReservationDuration /> */}
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            {!isReservationFormEdit && <NonEditreservationWorkingHour setIsReservationFormEdit={setIsReservationFormEdit}
              isReservationFormEdit={isReservationFormEdit} />}
            {isReservationFormEdit &&
              <ReservationWorkingHour
                setIsReservationFormEdit={setIsReservationFormEdit}
                isReservationFormEdit={isReservationFormEdit}
              />

            }
          </Col>
        </Row> */}
        <br />
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
                      src={Hours_Img}
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

export default BusinessHour;
