import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "semantic-ui-react";
import styles from "./header-navbar.module.css";
import nameImg from "./NewLogo.svg";
import Signin from "../signin/signin";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import { MDBIcon } from "mdb-react-ui-kit";
import { useRouter } from "next/router";
import {
  getBusinessByVendorId,
  getCountBusinessByVendorId,
  getIsVendor,
  getVendorId,
} from "../../components/services/api/business-api";
import { useCookies } from "react-cookie";
import { Dropdown } from 'react-bootstrap';
import Title from "../../components/Tab-title/title";
import { getUserIsAdmin } from "../services/api/admin-api";
import Image from "next/image";

const HeaderNavbar = (props: any) => {
  const [modalShow, setModalShow] = useState(false);
  const [signIN, setSignIN] = useState(false);
  const [userName, setUserName] = useState("");
  const [isVendorCount, setIsVendorCount] = useState("0");
  const router = useRouter();
  //using cookie to set user name
  const cookies = new Cookies();
  const [vendorCookies, setVendorCookies] = useCookies(["vendorId"]);
  const [businessList, setBusinessList] = useState([]);
  const [cookiesSet, setCookie] = useCookies(["user", "businessInfoId", "businessName", "service"]);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userId = cookies.get("id");
    const userName = cookies.get("name");
    
    if (!userId) {
      setSignIN(false);
    } else {
      setUserName(userName);
      setSignIN(true);
      isVendor();
      isAdminFunc();
    }
  }, []);

  const RemoveCookies = () => {
    //remove cookie
    cookies.remove("id", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("businessInfoId", { path: "/" });
    router.reload();
    if (router.pathname == "/user") {
      router.push("/");
    }
    setSignIN(false);
  };

  const businessFunc = () => {
    router.push("/business/business-activate");
  };

  const isVendor = () => {
    getIsVendor(cookies.get("id"))
      .then((response) => response.text())
      .then((response) => {
        if (response == "1") {
          setIsVendorCount(response);
          fetchVendor();
          fetchBusinessData();
          fetchCountBusiness();
        } else {
          setIsVendorCount("0");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isAdminFunc = () => {
    getUserIsAdmin(cookies.get("id"))
      .then((data) => data.json())
      .then((data) => {
        setIsAdmin(data);
      });
  };

  const fetchVendor = () => {
    getVendorId(cookies.get("id"))
      .then((response) => response.text())
      .then((response) => {
        setVendorCookies("vendorId", response, { path: "/" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBusinessData = () => {
    //fetch all business data acc vendorId
    getBusinessByVendorId(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        setBusinessList(data);
      });
  };

  const fetchCountBusiness = () => {
    //fetch all business data acc vendorId
    getCountBusinessByVendorId(cookies.get("vendorId"))
      .then((data) => data.json())
      .then((data) => {
        setTotalBusiness(data);
      });
  };

  const setBusinessCookies = (row: any) => {
    setCookie("businessInfoId", row.id, { path: "/" });
    setCookie("businessName", row.companyName, { path: "/" });
    setCookie("service", row.serviceId.id, { path: "/" });
    router.push("/business-profile/");
  };

  // Prevent SSR rendering issues
  if (!isMounted) {
    return (
      <div>
        <Title />
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="white"
          variant="light"
          className={styles.navbarheight}
        >
          <Navbar.Brand>
            <Link href="/">
              <a className={styles.navlink}>
                <Image
                  src={nameImg}
                  alt="Reserve Hubs Logo"
                  width={150}
                  height={40}
                  priority
                />
              </a>
            </Link>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }

  return (
    <div>
      <Title />
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="light"
        className={styles.navbarheight}
      >
        <Navbar.Brand>
          <Link href="/">
            <a className={styles.navlink}>
              <Image
                src={nameImg}
                alt="Reserve Hubs Logo"
                width={150}
                height={40}
                priority
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {signIN ? (
              <div className={`${styles.dropdown}`}>
                <button className={`${styles.dropdownbutton}`}>
                  <MDBIcon icon="user-circle" /> {userName}
                </button>
                <div className={`${styles.dropdownmenu}`}>
                  <Link href="/user/profile">
                    <a className={`dropdown-item ${styles.dropdownitem}`}>
                      Profile
                    </a>
                  </Link>
                  <Link href="/user/">
                    <a className={`dropdown-item ${styles.dropdownitem}`}>
                      Account
                    </a>
                  </Link>

                  {isVendorCount == "1" && (
                    <div>
                      <a
                        className={`dropdown-item ${styles.dropdownitem}`}
                        onClick={() => router.push("/business/account")}
                      >
                        Business Account
                      </a>

                      {totalBusiness != 0 && (
                        <div className={`${styles.profiledropdown}`}>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="secondary btn-sm"
                              className={styles.dropdowntext}
                              id="dropdown-basic">
                              Business Profile
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={`${styles.dropdownmenuitem}`} style={{ backgroundColor: '#73a47' }}>
                              {businessList.map((d: any, index: any) => (
                                <Dropdown.Item onClick={() => setBusinessCookies(d)} className={styles.menutextcolor} key={"drop" + index}>{d.companyName}</Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  )}
                  <Link href="/user/setting">
                    <a className={`dropdown-item ${styles.dropdownitem}`}>
                      Setting
                    </a>
                  </Link>
                  <a className={`dropdown-item ${styles.dropdownitem}`}>Help</a>
                  <hr></hr>
                  <a
                    className={`dropdown-item ${styles.dropdownitemlogout}`}
                    onClick={RemoveCookies}
                  >
                    Logout
                  </a>
                  <br></br>
                </div>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/signin")}
                  id="btnLogin"
                  className={`  ${styles.signbtnLogin}`}
                  type="button"
                  style={{ color: "#fff", width: "" }}
                >
                  Sign In
                </Button>
                &nbsp; &nbsp;&nbsp;
              </>
            )}
            <Nav>
              {isAdmin && (
                <>
                  <Button
                    id="btnLogin"
                    className={`  ${styles.businessaccount}`}
                    type="button"
                    style={{ color: "#fff", width: "", backgroundColor: "#921C00" }}
                    onClick={() => router.push("/admin")}
                  >
                    Admin Account
                  </Button>
                  &nbsp; &nbsp;&nbsp;
                </>
              )}

              {!isAdmin && !signIN && (
                <>
                  <Button
                    id="btnLogin"
                    className={`  ${styles.businessaccount}`}
                    type="button"
                    style={{ color: "#fff", width: "", backgroundColor: "#921C00" }}
                    onClick={() => router.push("/signin")}
                  >
                    Admin Sign In
                  </Button>
                  &nbsp; &nbsp;&nbsp;
                </>
              )}

              {isVendorCount == "1" && (
                <Button
                  id="btnLogin"
                  className={`  ${styles.businessaccount}`}
                  type="button"
                  style={{ color: "#fff", width: "", backgroundColor: "#02827f" }}
                  onClick={() => router.push("/business/account")}
                >
                  Business Account
                </Button>
              )}
              {isVendorCount != "1" && (
                <Button
                  id="btnLogin"
                  className={`  ${styles.btnLogin}`}
                  type="button"
                  style={{ color: "#fff", width: "" }}
                  onClick={businessFunc}
                >
                  Business
                </Button>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Signin show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};
export default HeaderNavbar;
