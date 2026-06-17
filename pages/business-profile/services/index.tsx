import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Cookies } from "react-cookie";
import MessageBox from "../../../components/messagebox/messagebox";
import ServiceNameFormatter from "../../../components/servicenameformatter/servicenameformatter";
import { getActiveMenuList, getInActiveMenuList, getTotalActivateMenu, getTotalDeActivateMenu, getTotalMenu, postMenuActivateDeactivate } from "../../../components/services/api/business-api";
import {
  deactivateSubMenu,
  deleteMenu, getCountSubCategoryBymenuCategoryId, getMenuList,
  getSubMenuList
} from "../../../components/services/api/menu-api";
import AddService from "./addservice";
import AddSubService from "./addsubservice";
import EditService from "./editservice";
import EditSubService from "./editsubservice";
import style from "./index.module.css";

const BusinessProfileServices = (props: any) => {
  const [count, setCount] = useState(0);
  const [countSubService, setCountSubService] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [serviceEditmodalShow, setServiceEditmodalShow] = useState(false);
  const [addSubServiceModal, setAddSubServiceModal] = useState(false);
  const [editSubServiceModal, setEditSubServiceModal] = useState(false);
  const cookies = new Cookies();
  const [menuList, setMenuList] = useState([]);
  const [tablerowEdit, setTablerowEdit] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [serviceType, setserviceType] = useState(false);
  const [serviceEdit, setserviceEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [menuSubList, setSubMenuList] = useState([]);
  const [menuId, setMenuId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [eachExpandRow, setEachExpandRow] = useState(true);
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalActivateMenu, setTotalActivateMenu] = useState(0);
  const [totalDeActivateMenu, setTotalDeActivateMenu] = useState(0);

  const [editMenu, setEditMenu] = useState({
    id: "",
    categoryName: ""
  });

  const [editSubMenu, setEditSubMenu] = useState({
    id: "",
    menuName: "",
    currency: "",
    price: "",
    categoryName: "",
    information: ""
  });

  const fetchSubMenuList = (menuCategoryId: string, menuName: string) => {
    setMenuId(menuCategoryId);
    setEachExpandRow(false);
    setEachExpandRow(true);
    getSubMenuList(menuCategoryId)
      .then((data) => data.json())
      .then((data) => {
        setSubMenuList(data);
        setServiceName(menuName);
      });
  };

  useEffect(() => {
    //call api to find m data
    fetchMenuList();
    allTOtalMenuButton();
  }, []);

  const allTOtalMenuButton = () => {
    fetchTotalMenu();
    fetchTotalActivateMenu();
    fetchTotalDeActivateMenu();
  }


  const fetchTotalMenu = () => {
    getTotalMenu(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalMenu(data);
      });
  }


  const fetchTotalActivateMenu = () => {

    getTotalActivateMenu(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalActivateMenu(data);
      });
  }

  const fetchTotalDeActivateMenu = () => {
    getTotalDeActivateMenu(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalDeActivateMenu(data);
      });
  }

  const fetchMenuList = () => {
    setMenuList([]);
    getMenuList(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        //console.log(JSON.stringify(data));
        setMenuList(data);
      });
  };

  const fetchActiveMenuList = () => {
    setMenuList([]);
    getActiveMenuList(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setMenuList(data);
      });
  };

  const fetchInActiveMenuList = () => {
    setMenuList([]);
    getInActiveMenuList(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        setMenuList(data);
      });
  };

  const servicetypeHandler = (rowId: string, menuName: string) => {
    fetchSubMenuList(rowId, menuName);
    if (serviceType == false) {
      setserviceType(true);
    } else {
      setserviceType(false);
    }
  };

  const deactivateHandler = (rowId: string) => {
    let data = {
      menuCategories: { id: rowId },
    };

    deactivateSubMenu(data)
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
          setMessage("Deleted successfully.");

          fetchMenuList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const activateDeactivateMenu = (rowId: string, status: boolean) => {
    let data = {
      id: rowId,
      deactivated: status
    };

    postMenuActivateDeactivate(data)
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
          if (status == true) {
            setMessage("Deactivated successfully.");
          } else {
            setMessage("Activated successfully.");
          }

          fetchMenuList();
          allTOtalMenuButton();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (rowId: string) => {
    let data = {
      id: rowId
    };
    deleteMenu(data)
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
          setMessage("Deleted successfully.");
          fetchMenuList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const serviceEditHandler = (row: any) => {
    setServiceEditmodalShow(true);
    setCount(1);
    setEditMenu({
      id: row.id,
      categoryName: row.categoryName
    })
    setserviceEdit(true);
  };


  const serviceFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <i>
          <div className={style.servicetextcolor}>{row.menuName}</div>
        </i>
      </div>
    );
  };
  const serviceDetailsFormatter = (
    rowContent: any,
    row: any,
    rowIndex: any
  ) => {
    return (
      <div>
        <i>
          <div className={style.subservicetextcolor}> {row.information} </div>
        </i>
      </div>
    );
  };
  const moneyFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <i>
          <div className={style.tablemoneytextcolor}>
            {row.currency} {row.price}
          </div>
        </i>
      </div>
    );
  };


  const activationFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <i>
          {/* { activate && ( */}
          <div className={style.activationcolor}>
            <span onClick={() => deactivateHandler(row.id)}>
              {row.deactivated}
            </span>
          </div>
          {/* )} */}
        </i>
        {/* <i>
          <div className={style.activationcolor}>
            <span>{row.Activate}</span>
          </div>
        </i> */}
      </div>
    );
  };

  const editbuttonFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <i>
          <div>
            <span
              className={style.editbuttontextcolor}
              onClick={() => editsubserviceHandler(row)}
            >
              Edit
            </span>
          </div>
        </i>
      </div>
    );
  };

  const editsubserviceHandler = (row: any) => {
    setCountSubService(1);
    setFormEdit(false);
    setTablerowEdit(false);
    setEditSubMenu({
      id: row.id,
      menuName: row.menuName,
      currency: row.currency,
      price: row.price,
      categoryName: row.categoryName,
      information: row.information
    });
    setEditSubServiceModal(true);

  };

  const columns = [
    {
      text: "Sub Service Name",
      formatter: serviceFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "40%" };
      },
    },
    {
      text: "Detail",
      formatter: serviceDetailsFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "40%" };
      },
    },
    {
      text: "Price",
      formatter: moneyFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "10%" };
      },
    },
    {
      dataField: "subserviceName",
      text: "Action",
      formatter: editbuttonFormatter,
      formatExtraData: count,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "10%" };
      },
    },

  ];

  const servicetypeFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <div
          className={style.servicetypetextcolor}
        // onClick={() => servicetypeHandler(row.id, row.categoryName)}
        >
          {row.categoryName}
        </div>
      </div>
    );
  };
  const DetailsFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <TotalSubService rowId={row.id} />
    );
  };
  const editFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div>
        <Button
          variant="primary"
          type="button"
          className={`btn-sm btn-outline-primary ${style.listingButton}`}
          onClick={() => serviceEditHandler(row)}
        >
          Edit

        </Button>
        &nbsp;
        <Button
          variant="primary"
          type="button"
          className={`btn-sm btn-outline-primary ${style.listingButton}`}
          onClick={() => servicetypeHandler(row.id, row.categoryName)}
        >
          Sub Service

        </Button>
        &nbsp;
        {!row.deactivated && (
          <Button
            variant="primary"
            type="button"
            className={`btn-sm btn-outline-primary ${style.listingButton}`}
            onClick={() => activateDeactivateMenu(row.id, true)}       >
            Deactivate
          </Button>
        )}
        {row.deactivated && (
          <Button
            variant="primary"
            type="button"
            className={`btn-sm btn-outline-primary ${style.listingButton}`}
            onClick={() => activateDeactivateMenu(row.id, false)}       >
            Activate
          </Button>
        )}
        &nbsp;
        <Button
          variant="primary"
          type="button"
          className={`btn-sm btn-outline-primary ${style.listingButton}`}
          onClick={() => deleteHandler(row.id)}        >
          Delete
        </Button>

      </div>
    );
  };

  const servicecolumns = [
    {
      dataField: "id",
      text: "Service Name",
      formatter: servicetypeFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "35%" };
      },
    },
    {
      dataField: "id",
      text: "Sub Services",
      formatter: DetailsFormatter,
      formatExtraData: count,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "20%" };
      },
    },
    {
      dataField: "categoryName",
      text: "Action",
      align: "left",
      formatter: editFormatter,
      formatExtraData: count,
      editable: false,
      headerStyle: (colum: any, colIndex: any) => {
        return { width: "45%", textAlign: "center" };
      },
    },
  ];

  const openServiceSection = () => {
    setserviceType(false);
  }

  return (
    <div className="row">
      {/* Left Panel */}
      <div className="col-md-12">
        {isMessage ? (
          <MessageBox variant={variant} message={message} />
        ) : (
          ""
        )}
        {/* onclick Services Form Open Starts here */}
        {cookies.get("service") == 'restaurant' && (
          <Row>
            <Col>
              {/* <Numberofpeople /> */}
            </Col>
          </Row>
        )}
        {!serviceType && (
          <div>
            <br></br>
            <Row>
              <Col md="9">
                <div>
                  <Button
                    variant="primary"
                    type="button"
                    className={`btn-sm btn-outline-primary ${style.addBusiness}`}
                    onClick={() => setModalShow(true)}
                  >
                    <i
                      className={`fa fa-plus-circle ${style.facircle}`}
                      aria-hidden="true"
                    ></i>
                    Add Service
                  </Button>
                  &nbsp;
                  <Button
                    variant="primary"
                    type="button"
                    className={`btn-sm btn-outline-primary ${style.listingButton}`}
                    onClick={() => fetchActiveMenuList()}
                  >
                    Active Listing
                    <span className={style.listingNumber}>
                      {totalActivateMenu}
                    </span>
                  </Button>
                  &nbsp;
                  <Button
                    variant="primary"
                    type="button"
                    className={`btn-sm btn-outline-primary ${style.listingButton}`}
                    onClick={() => fetchInActiveMenuList()}
                  >
                    InActive Listing
                    <span className={style.listingNumber}>
                      {totalDeActivateMenu}
                    </span>
                  </Button>
                  &nbsp;
                  <Button
                    variant="primary"
                    type="button"
                    className={`btn-sm btn-outline-primary ${style.listingButton}`}
                    onClick={() => fetchMenuList()}
                  >
                    All List
                    <span className={style.listingNumber}>
                      {totalMenu}
                    </span>
                  </Button>
                </div>
              </Col>
              <Col>
                {/* <SearchBar {...props.searchProps} /> */}
              </Col>
            </Row>
            <hr />
            <ToolkitProvider
              keyField="id"
              data={menuList}
              columns={servicecolumns}
            >
              {(props: any) => (
                <div>
                  <BootstrapTable
                    {...props.baseProps}
                    tabIndexCell
                    pagination={paginationFactory()}
                    bordered={false}
                    wrapperClasses="bootstrap-table-border"

                  />
                </div>
              )}
            </ToolkitProvider>
            <br/>
          </div>
        )}
        {serviceType && (
          <>
            <br></br>
            <Row>
              <Col onClick={openServiceSection}>
                <i className='far fa-arrow-alt-circle-left'></i> <span className={`${style.basicservicestitle}`}>{serviceName}</span>
              </Col>
            </Row>
            <br></br>
            <div>
              <Row>
                <Col md="9">
                  <div>
                    <Button
                      variant="primary"
                      type="button"
                      className={`btn-sm btn-outline-primary ${style.addBusiness}`}
                      onClick={() => setAddSubServiceModal(true)}
                    >
                      <i
                        className={`fa fa-plus-circle ${style.facircle}`}
                        aria-hidden="true"
                      ></i>
                      Add Sub Service
                    </Button>
                  </div>
                </Col>
                <Col>
                  {/* <SearchBar {...props.searchProps} /> */}
                </Col>
              </Row>
              <hr />
              <ToolkitProvider
                keyField="id"
                data={menuSubList}
                columns={columns}
              >
                {(props: any) => (
                  <div>
                    <BootstrapTable
                      {...props.baseProps}
                      tabIndexCell
                      pagination={paginationFactory()}
                      bordered={false}
                      wrapperClasses="bootstrap-table-border"
                    // expandRow={expandRow}
                    />
                  </div>
                )}
              </ToolkitProvider>
              <br/>
            </div>
          </>
        )}
        <AddService show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)} fetchMenuList={fetchMenuList} setIsMessage={setIsMessage} setMessage={setMessage} setVariant={setVariant} allTOtalMenuButton={allTOtalMenuButton} />
        <EditService show={serviceEditmodalShow}
          setServiceEditmodalShow={setServiceEditmodalShow}
          onHide={() => setServiceEditmodalShow(false)} count={count} setCount={setCount} setserviceEdit={setserviceEdit} editMenu={editMenu} fetchMenuList={fetchMenuList} setIsMessage={setIsMessage} setMessage={setMessage} setVariant={setVariant} />
        <AddSubService show={addSubServiceModal}
          setAddSubServiceModal={setAddSubServiceModal}
          onHide={() => setAddSubServiceModal(false)} serviceName={serviceName} fetchSubMenuList={fetchSubMenuList} setFormEdit={setFormEdit} setIsMessage={setIsMessage} setMessage={setMessage} setVariant={setVariant} menuId={menuId} />
        <EditSubService show={editSubServiceModal}
          setEditSubServiceModal={setEditSubServiceModal}
          onHide={() => setEditSubServiceModal(false)} serviceName={serviceName} setVariant={setVariant} setMessage={setMessage} setIsMessage={setIsMessage} fetchSubMenuList={fetchSubMenuList} editSubMenu={editSubMenu} setCountSubService={setCountSubService} countSubService={countSubService} menuId={menuId} setTablerowEdit={setTablerowEdit} />
      </div>
    </div>

  );
};
export default BusinessProfileServices;

const TotalSubService = (props: any) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    totalSubServiceFunc(props.rowId);
  })
  const totalSubServiceFunc = (menuCategoriesId: string) => {
    getCountSubCategoryBymenuCategoryId(menuCategoriesId)
      .then((data) => data.json())
      .then((data) => {
        setCount(data);
      });
  }
  return (
    <div>
      <i>
        <div
          className={style.subservicetextcolor}
        >
          {count} Sub Services
        </div>
      </i>
    </div>
  )
}

const ActionComponent = (props: any) => {
  return (
    <div >
      {!props.isExpanded.expanded && (
        <span
          className={style.editbuttontextcolor}
        >
          Edit
        </span>
      )}
      {props.isExpanded.expanded && (
        <span
          className={style.editbuttontextcolor}
        >
          Cancel
        </span>
      )}

    </div>
  )
}