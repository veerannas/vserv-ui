import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Cookies, useCookies } from "react-cookie";
import * as yup from "yup";
import ProgressBarComponent from "../progress-bar/progressbar";
import {
  getActiveBusiness,
  getActiveBusinessList,
  getBusinessByVendorId,
  getBusinessProfilePercent,
  getCategories,
  getDeletedBusinessByVendorId,
  getInactiveBusinessList,
  getTotalBusiness,
  postBusinessActivateDeactivate,
  postDeleteBusiness,
  postRegisterBusiness,
  postRestoreBusiness,
  postUpdateBusiness
} from "../services/api/business-api";
import styles from "./index.module.css";

const BusinessListing = (props: any) => {
  const cookies = new Cookies();
  const [cookiesSet, setCookie] = useCookies(["user", "businessInfoId", "businessName", "service"]);
  const [addBusiness, setAddBusiness] = useState(false);
  const [action, setAction] = useState("");
  const [data, setData] = useState([]);
  const [totalBusiness, setTotalBusiness] = useState({
    totalBusiness: 0,
    activeBusiness: 0,
    inactiveBusiness: 0,
    deltedBusiness: 0
  });
  const [pageValue, setPageValue] = useState(props.pageValue);

  useEffect(() => {
    //fetch all business data acc vendorId
    fetchBusinessData();
    //count number of acitve business, inactive business and total business
    fetchTotalBusiness();
  }, []);

  const fetchBusinessData = () => {
    //fetch all business data acc vendorId
    getBusinessByVendorId(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  const fetchTotalBusiness = () => {
    //count number of acitve business, inactive business and total business
    getTotalBusiness(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
      });
  };

  //open modal to register business
  const showBusinessModal = () => {
    setAddBusiness(!addBusiness);
  };

  const setBusinessCookies = (row: any) => {
    setCookie("businessInfoId", row.id, { path: "/" });
    setCookie("businessName", row.companyName, { path: "/" });
    setCookie("service", row.serviceId.id, { path: "/" });
    window.location.href = "/business-profile/";
  };

  //progress formatter of column
  const progressFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <ProgressBarComponent rowId={row.id} />
      </div>
    );
  };

  //status formatter of column
  const statusFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {row.active && <div className={styles.activestatus}>Active</div>}
        {!row.active && <div className={styles.inactivecompany}>Inactive</div>}
      </div>
    );
  };

  //conmpany formatter of column
  const conmpanyFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {row.active && (
          <>
            {pageValue == "business-listing" ?
              <div
                className={styles.activecompany}
                onClick={() => {
                  setBusinessCookies(row);
                }}
              >
                {row.companyName}
              </div> :
              <div
                className={styles.activecompany}
              >
                {row.companyName}
              </div>
            }
          </>
        )}
        {!row.active && (
          <div
            className={styles.inactivecompany}
            onClick={() => {
              setBusinessCookies(row);
            }}
          >
            {row.companyName}
          </div>
        )}
      </div>
    );
  };

  //service formatter of column
  const serviceFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        {row.active && (
          <div className={styles.activeservice}>{row.serviceId.category}</div>
        )}
        {!row.active && (
          <div className={styles.inactivecompany}>{row.serviceId.category}</div>
        )}
      </div>
    );
  };


  const actionFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <ActionComponent
        row={row}
        rowIndex={rowIndex}
        data={data}
        setData={setData}
        setTotalBusiness={setTotalBusiness}
        vendorId={props.vendorId}
      />
    )
  }

  //column of table
  const columns = [
    {
      dataField: "companyName",
      text: "Business Name",
      formatter: conmpanyFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "25%" };
      },
    },
    {
      dataField: "serviceId.category",
      text: "Industry type",
      formatter: serviceFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%" };
      },
    },
    {
      dataField: "row.active",
      text: "Status",
      formatter: statusFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "15%" };
      },
    },
    {
      dataField: "progress",
      text: "Business Profile",
      formatter: progressFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "25%" };
      },
    },
    {
      dataField: "progress",
      text: "Action",
      formatter: actionFormatter,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "25%", paddingLeft: "20px" };
      },
    },
  ];

  //Active Listing button click function call
  const filterActiveList = () => {
    getActiveBusinessList(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  //InActive Listing button click function call
  const filterInactiveList = () => {
    getInactiveBusinessList(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  //Deleted Listing button click function call
  const filterDeletedBusinessList = () => {
    getDeletedBusinessByVendorId(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  //All List Listing button click function call
  const getAllList = () => {
    getBusinessByVendorId(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
  };

  const { SearchBar } = Search;

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <div className={`container`}>
            <div className={`footer-fix-height `}>
              <div className="row">
                <div className="col-md-12">
                  <ToolkitProvider keyField="id" data={data}   columns={columns} search>
                    {(props: any) => (
                      <div>
                        <Row>
                          <Col md="7">
                            <div>
                              {pageValue == "business-listing" && (
                                <Button
                                  variant="primary"
                                  type="button"
                                  className={`btn-sm btn-outline-primary ${styles.addBusiness}`}
                                  onClick={showBusinessModal}
                                >
                                  <i
                                    className={`fa fa-plus-circle ${styles.facircle}`}
                                    aria-hidden="true"
                                  ></i>
                                  Add Business
                                </Button>
                              )}
                              &nbsp;
                              <Button
                                variant="primary"
                                type="button"
                                className={`btn-sm btn-outline-primary ${styles.listingButton}`}
                                onClick={filterActiveList}
                              >
                                Active Listing
                                <span className={styles.listingNumber}>
                                  {totalBusiness.activeBusiness}
                                </span>
                              </Button>
                              &nbsp;
                              <Button
                                variant="primary"
                                type="button"
                                className={`btn-sm btn-outline-primary ${styles.listingButton}`}
                                onClick={filterInactiveList}
                              >
                                InActive Listing
                                <span className={styles.listingNumber}>
                                  {totalBusiness.inactiveBusiness}
                                </span>
                              </Button>
                              &nbsp;
                              <Button
                                variant="primary"
                                type="button"
                                className={`btn-sm btn-outline-primary ${styles.listingButton}`}
                                onClick={getAllList}
                              >
                                All List
                                <span className={styles.listingNumber}>
                                  {totalBusiness.totalBusiness}
                                </span>
                              </Button>
                              &nbsp;
                              {pageValue == "admin-listing" && (
                                <Button
                                  variant="primary"
                                  type="button"
                                  className={`btn-sm btn-outline-primary ${styles.listingButton}`}
                                  onClick={filterDeletedBusinessList}
                                >
                                  Deleted Listing
                                  <span className={styles.listingNumber}>
                                    {totalBusiness.deltedBusiness}
                                  </span>
                                </Button>
                              )}
                            </div>
                          </Col>
                          <Col>
                            <SearchBar {...props.searchProps} />
                          </Col>
                        </Row>
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          pagination={paginationFactory()}
                          bordered={false}
                          wrapperClasses="bootstrap-table-border"
                        // expandRow={expandRow}
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </div>
              </div>
              {addBusiness ? (
                <AddBusinessModal
                  show={addBusiness}
                  onHide={() => setAddBusiness(false)}
                  setAddBusiness={setAddBusiness}
                  setData={setData}
                  setTotalBusiness={setTotalBusiness}
                  vendorId={props.vendorId}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

//@@@@@@@@@@@@@@ component @@@@@@@@@@@@@@@//

//business modal component
const AddBusinessModal = (props: any) => {
  const cookies = new Cookies();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //getting data Categories
    fetchCategory();
  }, []);

  //fetch category
  const fetchCategory = () => {
    getCategories()
      .then((data) => data.json())
      .then((data) => {
        setCategories(data);
      });
  };

  //close modal to register business
  const showBusinessModal = () => {
    props.setAddBusiness(false);
  };

  //form to submit data of business registration
  const formik = useFormik({
    initialValues: {
      companyName: "",
      vendor: { id: props.vendorId },
      serviceId: { id: "" },
    },
    validationSchema: yup.object().shape({
      companyName: yup.string().required("Give the name of Your Organisation"),
      serviceId: yup.object().shape({
        id: yup.string().required("Service is required"),
      }),
    }),
    onSubmit: (values) => {
      postRegisterBusiness(values)
        .then((response) => response.text())
        .then((response) => {
          props.setAddBusiness(false);
          fetchBusinessData();
          fetchTotalBusiness();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  //fetch all business data acc vendorId
  const fetchBusinessData = () => {
    getBusinessByVendorId(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        props.setData(data);
      });
  };

  //count number of acitve business, inactive business and total business
  const fetchTotalBusiness = () => {
    getTotalBusiness(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        props.setTotalBusiness(data);
      });
  };

  return (
    <Modal {...props} centered dialogClassName={styles.displayBusinessModal}>
      <div>
        <Modal.Header closeButton>
          <Modal.Title className={styles.addBusinessHeading}>
            Add Business Listing
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  className={`form-control-border`}
                  type="text"
                  placeholder="Organisation Name"
                  name="companyName"
                  aria-describedby="inputGroupPrepend"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.companyName}
                  autoComplete="off"
                />

                <Form.Control.Feedback type="invalid">
                  {formik.errors.companyName}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  className={`form-control-border`}
                  as="select"
                  placeholder="Industry Type"
                  aria-describedby="inputGroupPrepend"
                  name="serviceId.id"
                  value={formik.values.serviceId.id}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.serviceId?.id}
                >
                  <option value="">Select Service</option>
                  {categories.map((d: any, index: any) => {
                    return (
                      <option value={d.id} key={"cat_" + index}>
                        {d.category}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.serviceId?.id}
                </Form.Control.Feedback>
              </Col>
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
                    className={`${styles.formcontrolcancel}`}
                    onClick={showBusinessModal}
                  >
                    Cancel
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

//ExpandRowEdit component
const ExpandRowEdit = (props: any) => {
  // console.log("props============", JSON.stringify(props.row));
  const cookies = new Cookies();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (props.row != undefined) {
      // props.action(props.row.action);
    }
  }, []);

  //update data of business row
  const formikEdit = useFormik({
    initialValues: {
      id: props.row.id,
      companyName: props.row.companyName as string,
    },
    validationSchema: yup.object().shape({
      companyName: yup.string().required("Give the name of Your Organisation"),
    }),
    onSubmit: (values) => {
      setIsMessage(false);
      postUpdateBusiness(values)
        .then((response) => response.text())
        .then((response) => {
          setIsMessage(true);
          setVariant("success");
          setMessage("Updated successfully.");
          fetchBusinessData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  //fetch all business data acc vendorId
  const fetchBusinessData = () => {
    getBusinessByVendorId(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        props.setData(data);
        props.setModalShow(false);
      });
  };
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >
      <strong className={`${styles.modalheader}`}>
        <Modal.Header closeButton>
          {props.row.companyName}
        </Modal.Header>
      </strong>
      <Modal.Body>
        <Row>
          <Col>
            <Form
              noValidate
              onSubmit={formikEdit.handleSubmit}
              className={styles.businessmodal}
            >
              <Row>
                <Col md="12">
                  <Form.Control
                    className={`form-control-border`}
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    aria-describedby="inputGroupPrepend"
                    value={formikEdit.values.companyName}
                    onChange={formikEdit.handleChange}
                    isInvalid={!!formikEdit.errors.companyName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {formikEdit.errors.companyName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md="8">
                </Col>
                <Col md="4">
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
                      className={`${styles.formcontrolcancel}`}
                      onClick={() => { props.setModalShow(false) }}
                    >
                      Cancel
                    </Button>
                  </Form.Group>
                </Col>
                {/* <Col md="2">
                  <Form.Group className={`${styles.formcontrolbuttonright}`}>
                    <Button
                      variant="primary"
                      className={`${styles.formcontrolsave}`}
                      onClick={() => { props.setModalShow(false) }}
                    >
                      Cancel
                    </Button>
                    &nbsp;
                  </Form.Group>
                </Col> */}
                {/* <Col>
                  {isMessage ? (
                    <MessageBox variant={variant} message={message} />
                  ) : (
                    ""
                  )}
                </Col> */}
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

//ActionComponent modal component
const ActionComponent = (props: any) => {
  const cookies = new Cookies();
  const [isActive, setIsActive] = useState(false);
  const [isPercent, setIsPercent] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // console.log("props.row============", JSON.stringify(props.row));

  useEffect(() => {
    if (props.row != undefined) {
      //fetch business status is it acitve or inactive
      fetchActiveBusiness();
      //fetch business completion status percent
      fetchBusinessProfilePercent();
    }
  }, []);

  //fetch business completion status percent
  const fetchBusinessProfilePercent = () => {
    getBusinessProfilePercent(props.row.id)
      .then((data) => data.json())
      .then((data) => {
        if (data == "100") {
          setIsPercent(true);
        }
      });
  };

  //set status active or inactive in business
  const activateDeactivate = (e: any, rowId: any, status: boolean) => {
    e.stopPropagation();
    let businessInfo = {
      id: rowId,
      active: status,
    };
    postBusinessActivateDeactivate(businessInfo)
      .then((response) => response.text())
      .then((response) => {
        setIsActive(status);
        fetchBusinessData();
        fetchTotalBusiness();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //fetch business status is it acitve or inactive
  const fetchActiveBusiness = () => {
    getActiveBusiness(props.row.id)
      .then((data) => data.json())
      .then((data) => {
        setIsActive(data);
      });
  };
  //fetch all business data acc vendorId
  const fetchBusinessData = () => {
    getBusinessByVendorId(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        props.setData(data);
      });
  };

  //count number of acitve business, inactive business and total business
  const fetchTotalBusiness = () => {
    getTotalBusiness(props.vendorId)
      .then((data) => data.json())
      .then((data) => {
        props.setTotalBusiness(data);
      });
  };

  const deletedFunc = (e: any, rowId: any) => {
    e.stopPropagation();
    let businessInfo = {
      id: rowId
    };
    postDeleteBusiness(businessInfo)
      .then((response) => response.text())
      .then((response) => {
        fetchBusinessData();
        fetchTotalBusiness();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const restoreBusiness = (e: any, rowId: any) => {
    e.stopPropagation();
    let businessInfo = {
      id: rowId
    };
    postRestoreBusiness(businessInfo)
      .then((response) => response.text())
      .then((response) => {
        fetchBusinessData();
        fetchTotalBusiness();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {!isActive && !props.row.deleted && (
        <>
          {!isPercent && (
            <input
              type="button"
              className={styles.actionFormatterEdit}
              value="Activate"
              onClick={(e) =>
                activateDeactivate(e, props.row.id, true)
              }
              style={{ color: "#5c6063" }}
              disabled={true}
            />
          )}
          {isPercent && (
            <input
              type="button"
              className={styles.actionFormatterEdit}
              value="Activate"
              onClick={(e) =>
                activateDeactivate(e, props.row.id, true)
              }
            />
          )}
        </>
      )}
      {isActive && !props.row.deleted && (
        <input
          type="button"
          className={styles.actionFormatterEdit}
          value="Deactivate"
          onClick={(e) => activateDeactivate(e, props.row.id, false)}
        />
      )}
      {!props.row.deleted && (
        <>
          <input
            type="button"
            className={styles.actionFormatterEdit}
            value="Edit"
            onClick={() => setModalShow(true)}
          />
          <input
            type="button"
            className={styles.actionFormatterEdit}
            value="Delete"
            onClick={(e) => deletedFunc(e, props.row.id)}
          />
        </>
      )}
      {props.row.deleted && (

        <input
          type="button"
          className={styles.actionFormatterEdit}
          value="Restore"
          onClick={(e: any) => restoreBusiness(e, props.row.id)}
        />
      )}
      {modalShow ?
        <ExpandRowEdit show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
          row={props.row}
          setData={props.setData}
          vendorId={props.vendorId}
        /> : null}
    </div>
  );
};
export default BusinessListing;