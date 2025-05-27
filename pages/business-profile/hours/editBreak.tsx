import React, { useState} from "react";
import styles from "./index.module.css";
import {
  Button,
  Col,
  Form,
  Row,
  Modal,
  FormControl,
} from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import BootstrapTable from "react-bootstrap-table-next";
interface BreakDetail  {
    label: string;
    startTime:string;
    endTime:string;
  };

const EditBreak = (props: BreakDetail) => {
    // console.log("customHours",props.customHours)
    const [breakDetails,setBreakDetails]=useState([props]);
   
    console.log("breakDetails",breakDetails)
    // const showBreakModal = () => {
    //   props.setEditBreak(!props.editBreak);
    // };
    
     const formik1 = useFormik({
      initialValues: {
       breakDetails,
      },
      // enableReinitialize: true,
      validationSchema: yup.object({
        breakDetails: yup.object().shape({
          label: yup.string().required("required"),
        //   startTime: yup.string().required("required"),
        //   endTime: yup.string().required("required"),
        }),
      }),
     
      onSubmit: (values) => {
        console.log(values);
      },
    });
  
    if (breakDetails.length > 0){
        return(
            <div>
                <Form>
                    <br/><Row>
                    <Col>
                 <Form.Label>Break Name</Form.Label>
                 <FormControl
                 className={`form-control-border`}
                 type="text"
                 placeholder="Add Break"
                 name="breakDetails.label"
                //  value={formik1.values.breakDetails?.label || ''}
                 onChange={formik1.handleChange}
                //  isInvalid={!!formik1.errors.breakDetails?.label}
                 />
                 <Form.Control.Feedback type="invalid">
                 {/* {formik1.errors.breakDetails?.label} */}
                 </Form.Control.Feedback>
                </Col>
                    </Row>
                </Form>
            </div>
        )
    };
      
  
    //  return (
    //   <Modal
    //     show={props.editBreak}
    //     onHide={showBreakModal}
    //     centered
    //     dialogClassName={styles.displayBusinessModal}
    //   >
    //     <div className={styles.businessModal}>
    //       <Modal.Header closeButton>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <Form noValidate onSubmit={formik1.handleSubmit}>
    //           <br/><Row>
    //             <Col>
    //             <Form.Label>Break Name</Form.Label>
    //             <FormControl
    //             className={`form-control-border`}
    //             type="text"
    //             placeholder="Add Break"
    //             name="breakDetails.label"
    //             value={formik1.values.breakDetails.label}
    //             onChange={formik1.handleChange}
    //             isInvalid={!!formik1.errors.breakDetails?.label}
    //             />
    //             <Form.Control.Feedback type="invalid">
    //             {formik1.errors.breakDetails?.label}
    //             </Form.Control.Feedback>
    //             </Col>
    //           </Row>
    //           <br/><Row>
    //             <Col>
    //               <Form.Label>Start Time</Form.Label>
    //               <Form.Control
    //                 className={`form-control-border`}
    //                 type="time"
    //                 placeholder="--:--"
    //                 name="breakDetails.startTime"
    //                 value={formik1.values.breakDetails.startTime}
    //                 onChange={formik1.handleChange}
    //                 isInvalid={!!formik1.errors.breakDetails?.startTime}
    //               />
  
    //               <Form.Control.Feedback type="invalid">
    //                 {formik1.errors.breakDetails?.startTime}
    //               </Form.Control.Feedback>
    //             </Col>
    //             <Col>
    //               <Form.Label>End Time</Form.Label>
    //               <Form.Control
    //                 className={`form-control-border`}
    //                 type="time"
    //                 placeholder="--:--"
    //                 name="breakDetails.endTime"
    //                 value={formik1.values.breakDetails.endTime}
    //                 onChange={formik1.handleChange}
    //                 isInvalid={!!formik1.errors.breakDetails?.endTime}
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 {formik1.errors.breakDetails?.endTime}
    //               </Form.Control.Feedback>
    //             </Col>
    //           </Row>
    //           <br />
    //           <br/><Row>
    //             <Col>
    //               <Form.Group className={`${styles.formcontrolbuttonright}`}>
    //                 <Button
    //                   variant="primary"
    //                   type="submit"
    //                   className={`${styles.formcontrolsave}`}
    //                 >
    //                   Save
    //                 </Button>
    //                 &nbsp;
    //                 <Button
    //                   variant="primary"
    //                   type="reset"
    //                   className={`${styles.formcontrolcancel}`}
    //                   onClick={showBreakModal}
    //                 >
    //                   Cancel
    //                 </Button>
    //               </Form.Group>
    //             </Col>
    //           </Row>
    //         </Form>
    //       </Modal.Body>
    //     </div>
    //   </Modal>
    // );
          }
    export default EditBreak;