import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ResheduleModel from "../reshedulemodel/reshedulemodel";
import { remainderOnOffApi, cancelAppointment } from "../services/api/reservation-api";
import styles from './actioncomponent.module.css';

const ActionComponent = (props: any) => {
    const [remainder, setRemainder] = useState(props.row.remainder);
    const [cancel, setcancel] = useState(props.row.cancel);
    const [modalShow, setModalShow] = useState(false);

    // useEffect(() => {
    //     props.fetchAppointment();
    //     setRemainder(false);
    // }, [modalShow])

    //remiander on off
    const remainderOnOff = (row: any, e: any) => {
        e.target.classList.toggle("fared");
        {
            remainder ? setRemainder(false) : setRemainder(true);
        }
        let reservation = {
            id: row.id,
            remainder: !row.remainder,
        };

        //api to set on off
        remainderOnOffApi(reservation)
            .then((response) => response.text())
            .then((response) => { })
            .catch((err) => {
                console.log(err);
            });
    };

    //cancel appointment
    const cancelAppointmentFunc = (row: any, e: any) => {
        let reservation = {
            id: row.id,
            isCancel: true,
        };

        cancelAppointment(reservation)
            .then((response) => response.text())
            .then((response) => {
                setcancel(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div
                className={`row ${styles.fabellcenter}`}
                key={"remainder_" + props.rowIndex}
            >
                {!cancel && (
                    <Row>
                        <Col>
                            <button
                                className={` btn-sm btn-outline-primary ${styles.actionbutton}`}
                                onClick={() => setModalShow(true)}
                            >
                                Reschedule
                            </button>
                        </Col>
                        {/* &nbsp;&nbsp; &nbsp; */}
                        <Col onClick={(e:any) => cancelAppointmentFunc(props.row, e)} className={` ${styles.remaindermargin}`}>
                            <button
                                className={`btn-sm btn-outline-primary ${styles.actionbutton}`}
                            >
                                Cancel
                            </button>
                        </Col>
                        {/* &nbsp;&nbsp; */}
                        {props.row.remainder == false && (
                            <Col className={` ${styles.remaindermargin}`}>
                                <i
                                    onClick={(e) => remainderOnOff(props.row, e)}
                                    className={`fa fa-bell facustom ${styles.fabellsize}`}
                                ></i>
                                {remainder ? (
                                    <div className={`${styles.remainderbell}`}>Reminder On</div>
                                ) : (
                                    <div className={`${styles.remainderbell}`}>Reminder Off</div>
                                )}
                            </Col>
                        )}
                       
                            {props.row.remainder == true && (
                                <Col className={` ${styles.remaindermargin}`}>
                                    <i
                                        onClick={(e) => remainderOnOff(props.row, e)}
                                        className={`fa fa-bell facustom fared ${styles.fabellsize}`}
                                    ></i>
                                    {remainder ? (
                                        <div className={`${styles.remainderbell}`}>
                                            Reminder On
                                        </div>
                                    ) : (
                                        <div className={`${styles.remainderbell}`}>
                                            Reminder Off
                                        </div>
                                    )}
                                </Col>
                            )}
                        
                    </Row>
                )}
                {cancel && (
                    <div className={styles.cancelcolor}>
                        <span>Cancelled </span>
                    </div>
                )}
            </div>
            {modalShow ? (
                <ResheduleModel
                    row={props.row}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                    fetchAppointment={props.fetchAppointment}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default ActionComponent;