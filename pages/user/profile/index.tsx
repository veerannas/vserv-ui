import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import StarRatingComponent from "react-star-rating-component";
import * as yup from "yup";
import Shield from "../../../assets/images/shield.svg";
import BreadCrum from "../../../components/breadcrum/breadcrum";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import styles from "./index.module.css";
import { Cookies } from "react-cookie";
import * as userApi from "../../../components/services/api/user-api";
import Footer from "../../../components/footer/footer";
import moment from "moment";
/**
 * User Account
 *
 * @design Fatima
 * @integrate Nahid
 *
 */
const UserProfile = () => {
  const cookies = new Cookies();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [reviewsList, setReviewsList] = useState([]);
  const [count, setCount] = useState(0);

  const [userData, setUserData] = useState({
    id: cookies.get("id"),
    profile: { about: "", image: { id: "", image: { data: "" } } },
  });

  useEffect(() => {
    if ((cookies.get("id") || "") != "") {
      //api for fetch user data
      fetchUserData(cookies.get("id"));
      setUserName(cookies.get("name"));
      setLastName(cookies.get("lastName"));
      fetchReviewsData();
    } else {
      window.location.href = "/";
    }
  }, [cookies.get("id")]);

  const fetchReviewsData = () => {
    userApi
      .getUserReviewByUserId(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        //set success data in list
        setReviewsList(data);
      });
  };

  const fetchUserData = (id: any) => {
    userApi
      .getUserData(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        // set success data in formik usedata variable
        // console.log("data111111111111===========", JSON.stringify(data));
        if (data.profile != null) {
          formik.values.userData.profile.about = data.profile.about;
        }
        setUserData({ ...data });
      });
  };

  const serviceFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"b_" + rowIndex}>
        <div>
          <StarRatingComponent
            name="rate2"
            editing={false}
            renderStarIcon={() => <span className={styles.starsize}>★</span>}
            starCount={5}
            value={row.rating}
          />
        </div>
        <div className={styles.servicecolor}>
          {row.review}
          {/* {row.review} */}
        </div>
      </div>
    );
  };

  const companyFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"b_" + rowIndex}>
        <div className={styles.companyName}>{row.businessInfo.companyName}</div>
        <div className={styles.reviewtitle}>
          <span>{row.reviewTitle}.</span>
        </div>
      </div>
    );
  };

  const dateFormatter = (rowContent: any, row: any, rowIndex: any) => {
    return (
      <div key={"b_" + rowIndex}>
        <div className={styles.date}>
          <span>{moment(row.reviewDate).format("MM-DD-YYYY HH:mm")} </span>
        </div>
      </div>
    );
  };
  const columns = [
    {
      dataField: "reviewsList.id",

      formatter: companyFormatter,
      formatExtraData: count,
      headerAttrs: {
        hidden: true
      }
    },
    {
      formatter: serviceFormatter,
      dataField: "reviewsList.reviewTitle",
      headerAttrs: {
        hidden: true
      }
    },
    {
      dataField: "date",

      formatter: dateFormatter,
      headerAttrs: {
        hidden: true
      }
    },
  ];
  const editProfileModal = EditProfileModal(
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    cookies.get("id"),
    userData,
    userData.profile.image.id,
    userData.profile.image.image.data
  );

  const handleModalShowHide = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };
  const formik = useFormik({
    initialValues: {
      userData,
    },
    validationSchema: yup.object({
      userData: yup.object().shape({
        profile: yup.object().shape({
          about: yup.string().required("About is Required!"),
        }),
      }),
    }),
    onSubmit: (values) => {
      var user = {
        id: cookies.get("id"),
        profile: { about: values.userData.profile.about },
      };
      userApi
        .updateUserData(user)
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
            userData.profile.about = values.userData.profile.about;
            setIsOpen(!isOpen);
            setVariant("success");
            setMessage("User information updated successfully.");
            setIsFormEdit(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const data = [
    {
      id: "Krown rust",
      review: "service is good and my loan is completed",
      date: "20.2.2021",
    },
    {
      id: "Francesca Amica",
      review: "service is good and my loan is completed",
      date: "20.2.2021",
    },
    {
      id: "Global Finance Service",
      review: "service is good and my loan is completed",
      date: "20.2.2021",
    },
    {
      id: "xyz",
      review: "service is good and my loan is completed",
      date: "20.2.2021",
    },
  ];

  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row: any) => (
      <div className={`${styles.expandedReview}`}>
        <p>{row.review}</p>
      </div>
    ),
  };

  const options = {
    paginationSize: 2,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    // paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "2",
        value: 2,
      },
      {
        text: "5",
        value: 5,
      },
      {
        text: "All",
        value: data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  function indication() {
    return <div className={styles.servicecolor}>No Reviews.</div>;
  }

  const showTextArea = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="div-height" >
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr></hr>
          <div className={`container`}>
            <div className={`footer-fix-height `}>
              <div>
                <div className={`${styles.wrimagecard}`}>
                  <i className="fa fa-calendar" aria-hidden="true"></i> Profile
                </div>
                <div className={`${styles.wrimagecardcontent}`}>
                  <BreadCrum />
                </div>
              </div>
              <br></br>
              <br></br>
              <div className="row">
                {/* profile card and details */}
                <div className="col-md-3">
                  <div className="card">
                    <Row>
                      <Col className="text-center">
                        {userData.profile.image.image.data == "" && (
                          <img
                            src="https://www.freeiconspng.com/uploads/customers-icon-3.png"
                            className={`card-img-top ${styles.imagePlaceHolder}`}
                            alt="..."
                          />
                        )}
                        {userData.profile.image.image.data != "" && (
                          <img
                            // src="https://www.freeiconspng.com/uploads/customers-icon-3.png"
                            src={`data:image/jpeg;base64,${userData.profile.image.image.data}`}
                            className={`card-img-top ${styles.imagePlaceHolder}`}
                            alt="..."
                          />
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className={styles.editProfileDiv}>
                          <Button
                            type="button"
                            onClick={() => handleModalShowHide()}
                            className={` ${styles.btnEdit}`}
                          >
                            <i
                              className={`fa fa-camera ${styles.btnEditCamera}`}
                              aria-hidden="true"
                            ></i>
                            Edit Photo
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    {/* edit profile modal  */}
                    {editProfileModal}
                    <div className="card-body">
                      <Row>
                        <Col>
                          <h5 className={`card-title ${styles.cardtitle}`}>
                            Identity verification
                          </h5>
                          <div
                            className={`${styles.userNameSubheading} ${styles.userNameSubheadingmargintop}`}
                          >
                            Joined in 2021
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <div className={`card-text`}>
                            Show others you are really you with identity verification
                            badge.
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          <div className={styles.badge}>
                            <img
                              className={` ${styles.shield}`}
                              src={Shield.src}
                              alt="Card image cap"
                            />
                            Get the Badge
                          </div>
                        </Col>
                      </Row>

                      <hr />
                      <Row>
                        <Col>
                          <div className={`${styles.emailmsg}`}>
                            <i
                              className={`fa fa-check ${styles.faCheck}`}
                              aria-hidden="true"
                            ></i>
                            Email Confirmed
                          </div>
                        </Col>
                      </Row>

                      <br />
                      <br />
                    </div>
                  </div>
                </div>

                {/* details */}
                <div className="col-md-9">
                  <div className="row">
                    <Col>
                      <div className={styles.userName}>Hi {userName}</div>
                      <div className={styles.userNameSubheading}>
                        <b>About me</b>
                      </div>
                      <div className={styles.userNameSubheading}>
                        {userData.profile.about}
                      </div>

                      <p></p>
                    </Col>
                  </div>
                  <div className="row">
                    <Col>
                      {!isOpen && (
                        <Button
                          className={` ${styles.profileEditButton}`}
                          onClick={showTextArea}
                          type="button"
                          variant="primary"
                        >
                          Edit Profile
                        </Button>
                      )}
                      <Form onSubmit={formik.handleSubmit}>
                        <Row>
                          <Col className={styles.profileTextArea}>
                            <Form.Group controlId="ControlTextarea">
                              <Form.Control
                                as="textarea"
                                name="userData.profile.about"
                                hidden={!isOpen}
                                placeholder="About"
                                rows={3}
                                value={formik.values.userData.profile.about}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.userData?.profile?.about}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.userData?.profile?.about}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <br/>
                        <Row>
                          <Col className="text-right" hidden={!isOpen}>
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
                              onClick={showTextArea}
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </div>
                  {/* reviews section */}

                  <div className="row">
                    <Col>
                      <p className={`${styles.reviewsButton}`}>Reviews</p>
                    </Col>
                  </div>
                  {/* all reviews */}
                  <div>
                    <BootstrapTable
                      keyField="id"
                      data={reviewsList}
                      columns={columns}
                      bordered={false}
                      pagination={paginationFactory(options)}
                      // wrapperClasses="bootstrap-table-border"
                      noDataIndication={indication}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const EditProfileModal = (
  isEditProfileModalOpen: any,
  setIsEditProfileModalOpen: any,
  userId: any,
  userData: any,
  imgId: any,
  profileImg: any
) => {
  const handleModalShowHide = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
    // if(hideError === false)
    setHideError(!hideError);
  };
  const [hideError, setHideError] = useState(false);
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const cookies = new Cookies();
  const [isuploadImage, setIsuploadImage] = useState(false);

  const formikProfile = useFormik({
    initialValues: {
      editprofileImage: profileImg,
    },
    validationSchema: yup.object({
      editprofileImage: yup
        .mixed()
        .required("Choose file")
        // .test(
        //   "fileSize",
        //   "File too large",
        //   (values) => values && values.size <= FILE_SIZE
        // )
        .test(
          "fileFormat",
          "Unsupported Format",
          (values) => values && SUPPORTED_FORMATS.includes(values.type)
        ),
    }),

    onSubmit: (values) => {
      // console.log("==========", values.editprofileImage);
      // alert(JSON.stringify(values.editprofileImage, null, 2));
      let data = new FormData();
      data.append("file", values.editprofileImage);
      data.append("userId", cookies.get("id"));

      // userApi
      // .userUploadProfileImage(data).

      userApi
        .userUploadProfileImage(data)
        .then((response) => response.text())
        .then((response: any) => {
          // fetchUserData(cookies.get("id"));
          // console.log("response====", response);

          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const editImage = (e: any, img: any) => {
    console.log("e.currentTarget.files[0]====", e.currentTarget.files[0]);
    formikProfile.setFieldValue("editprofileImage", e.currentTarget.files[0]);
    setIsuploadImage(true);
  };

  const deleteProfileImg = () => {
    // console.log("imgId======", imgId);
    let images = {
      id: imgId,
    };

    userApi
      .userDeleteProfle(images)
      .then((response) => response.text())
      .then((response: any) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      show={isEditProfileModalOpen}
      centered
      dialogClassName={styles.profiledisplaymodal}
    >
      <div className={styles.modal}>
        <Modal.Header className={styles.modaltitle}>
          <Modal.Title id="contained-modal-title-vcenter">
            <div>
              <strong>Profile</strong>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formikProfile.handleSubmit}>
            <Row>
              <Col className={styles.modalDeleteCol}>
                {/* <button className={`text-right ${styles.modalCamera}`}> */}
                <i
                  className={`fa fa-trash ${styles.modalDeleteIcon}`}
                  aria-hidden="true"
                  onClick={deleteProfileImg}
                ></i>
                <br />
                {/* </button> */}
                <div className={styles.modalDelete}>
                  <strong> Delete</strong>
                </div>
              </Col>
              <Col>
                {!isuploadImage && (
                  <img
                    src={`data:image/jpeg;base64,${profileImg}`}
                    // alt={file.name}
                    height={200}
                    width={200}
                    className={`  ${styles.profileImage}`}
                  />
                )}
                {isuploadImage && (
                  <Thumb file={formikProfile.values.editprofileImage} />
                )}
              </Col>
              <Col className={styles.modalBody}>
                <div className="form-group">
                  <input
                    id="editprofileImage"
                    type="file"
                    name="editprofileImage"
                    onChange={(e) =>
                      editImage(e, formikProfile.values.editprofileImage)
                    }
                    hidden
                    className="form-control"
                  />
                  <label
                    htmlFor="editprofileImage"
                    className={styles.profileLabel}
                  >
                    <i
                      className={`fa fa-camera ${styles.imageEditIcon}`}
                      aria-hidden="true"
                    ></i>
                  </label>
                  <div className={styles.modalAddImage}>
                    <strong>Image</strong>
                  </div>

                  {formikProfile.touched.editprofileImage &&
                    formikProfile.errors.editprofileImage ? (
                    <div className={styles.error}>
                      {formikProfile.errors.editprofileImage.toLocaleString()}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
            <div></div>
            <hr className={styles.modalhr} />
            <div className={styles.modalFooter}>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    type="reset"
                    onClick={() => handleModalShowHide()}
                    className={` ${styles.modalcancelbutton}`}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.modalsavebutton}
                  // onClick={() => handleModalShowHide()}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};
export default UserProfile;

class Thumb extends React.Component<any, any> {
  state = {
    loading: false,
    thumb: undefined,
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return (
        <img
          // src={`data:image/jpeg;base64,${thumb}`}
          src="https://i.stack.imgur.com/7JjU3.jpg"
          height={200}
          width={200}
          className={`  ${styles.profileImage}`}
        />
      );
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        height={200}
        width={200}
        className={`  ${styles.profileImage}`}
      />
    );
  }
}
