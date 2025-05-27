import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { postVendorActivateDeactivate, postVendorDelete } from "../services/api/admin-api";
import { postUserActivateDeactivate, postUserDelete, postUserRestore } from "../services/api/user-api";
import styles from "./actioncomponent.module.css";

// @@@@@@@@@@@admin action component @@@@@@@@@@@@
const ActionComponent = (props: any) => {
  const [modalShow, setModalShow] = useState(false);
  const [actDeact, setactDeact] = useState(false);
  const [businessDel, setBusinessDel] = useState(false);
  const [Activate, setActivate] = useState("");
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [funcValue, setFuncValue] = useState("");


  const onViewAction = () => {
    props.setBusinessView(true);
    props.setUserId(props.row.id)
  }

  const onDeleteAction = (value: string) => {
    setModalShow(!modalShow);
    setBusinessDel(!businessDel);
    setFuncValue(value);

  }

  const onActivateDeacitivate = (value: boolean, funcValue: string) => {
    setIsDeactivated(value);
    setFuncValue(funcValue);
    setModalShow(!modalShow);
    setactDeact(!actDeact);
    if (funcValue == "Activate") {
      setActivate("acitvate");
    } else {
      setActivate("deacitvate");
    }
  }


  const restoreUser = () => {

    let user = {
      id: props.row.id,
    }
    postUserRestore(user)
      .then((response) => response.text())
      .then((response) => {
        props.fetchAllUserData();
        props.onHide();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <div>
      {!props.isDeleted && (
        <>
          <Button className={`btn-sm btn-outline-danger ${styles.listingButton}`}
            variant="default"
            onClick={onViewAction}
          >{props.actionValue}</Button>
          {!props.row.active &&
            <Button className={`btn-sm btn-outline-danger ${styles.listingButton}`}
              variant="default"
              onClick={() => onActivateDeacitivate(true, "Activate")}
            >Activate</Button>}
          {props.row.active && <Button className={`btn-sm btn-outline-danger ${styles.listingButton}`}
            variant="default"
            onClick={() => onActivateDeacitivate(false, "Deactivate")}
          >Deactivate</Button>
          }
          <Button className={`btn-sm btn-outline-danger ${styles.listingButton}`}
            variant="default"
            onClick={() => onDeleteAction("Delete Account")}
          >Delete</Button>
          <ConfirmationBox
            show={modalShow}
            onHide={() => { setModalShow(false); setactDeact(false); setBusinessDel(false); }}
            actDeact={actDeact}
            businessDel={businessDel}
            setActivate={Activate}
            row={props.row}
            isDeactivated={isDeactivated}
            funcValue={funcValue}
            fetchAllUserData={props.fetchAllUserData}
          />
        </>
      )}
      {props.isDeleted && (
        <Button className={`btn-sm btn-outline-danger ${styles.listingButton}`}
          variant="default"
          onClick={restoreUser}
        >Restore</Button>
      )}
    </div>
  )
}


// @@@@@@@@@@@@@ Delete Deactivate/activate Confirmation Box @@@@@@@@@@@@@ 

const ConfirmationBox = (props: any) => {

  const onActivateDeacitivate = () => {

    if (props.funcValue == "Delete Account") {

      let vendorDelete = {
        id: props.row.id,
      }
      postUserDelete(vendorDelete)
        .then((response) => response.text())
        .then((response) => {
          props.fetchAllUserData();
          props.onHide();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

      let vendorDeactivateDelete = {
        id: props.row.id,
        active: props.isDeactivated
      }
      postUserActivateDeactivate(vendorDeactivateDelete)
        .then((response) => response.text())
        .then((response) => {
          props.fetchAllUserData();
          props.onHide();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={`${styles.modalheading}`}>
        <h4>Confirmation Box</h4>
      </Modal.Header>
      <Modal.Body>
        {props.actDeact ? <h5 className={`${styles.modalbody}`}>Are you sure you want to {props.setActivate} this account</h5>
          : <h5 className={`${styles.modalbody}`}>Are you sure you want to delete this account</h5>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => onActivateDeacitivate()}
          variant="default"
          className={`${styles.modalButton}`}
        >Yes</Button>
        <Button onClick={props.onHide}
          variant="default"
          className={`${styles.modalButton}`}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ActionComponent;