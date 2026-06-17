import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import BusinessActive from "../../assets/images/BusinessProfile_Active.svg";
import BusinessDashboard from "../../assets/images/BusinessProfile_Dashbaord.svg";
import BusinessInfo from "../../assets/images/BusinessProfile_Info.svg";
import BusinessRating from "../../assets/images/BusinessProfile_Raating.svg";
import BusinessProfile from "../../assets/images/Business_Profile.svg";
import Footer from "../../components/footer/footer";
import HeaderNavbar from "../../components/header-navbar/header-navbar";
import styles from "./index.module.css";

/**
 * User Account
 *
 * @author Nahid
 *
 */
const UserAccount = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const userId = cookies.get("id");
    if (!userId) {
      // router.push("/"); // Uncomment when ready
    } else {
      // set user name
      setUserName(cookies.get("name") || "");
      setLastName(cookies.get("lastName") || "");
      setBusinessName(cookies.get("businessName") || "");
    }
  }, []);

  // Prevent SSR rendering of client-side content
  if (!isMounted) {
    return (
      <div className="div-height">
        <main>
          <div className={`container-fluid`}>
            <HeaderNavbar />
            <hr />
            <div className="container">
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const navigationItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      description: "It contains data visualization and summery of your activity.",
      image: BusinessDashboard,
      href: "/business-profile/dashboard"
    },
    {
      id: "business-profile",
      title: "Business Profile",
      description: "It contains business introduction, address and contact information.",
      image: BusinessProfile,
      href: "/business-profile/businessprofile"
    },
    {
      id: "reviews-rating",
      title: "Rating And Reviews",
      description: "Honest response a customer gives to a service.",
      image: BusinessRating,
      href: "/business-profile/reviews-rating"
    },
    {
      id: "ask-me",
      title: "Ask Me",
      description: "Questions intended to help customer understand your service.",
      image: null,
      icon: "fa-question-circle",
      href: "/business-profile/askme"
    },
    {
      id: "appointment",
      title: "Business Reservation",
      description: "Status of your Reservation.",
      image: BusinessActive,
      href: "/business-profile/appointment"
    },
    {
      id: "info",
      title: "Business Profile Info",
      description: "Business profile info-official details of a business.",
      image: BusinessInfo,
      href: "/business-profile/info"
    }
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="div-height">
      <main>
        <div className={`container-fluid`}>
          {/* Header Menu */}
          <HeaderNavbar />
          <hr />
          <div className="container">
            <div>
              <div className={`${styles.wrimagecard}`}>
                <i className="fa fa-home"></i> {businessName || "Loading..."}
              </div>
              <div className={`${styles.wrimagecardcontent}`}>
                {userName} {lastName}
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              {navigationItems.map((item) => (
                <div
                  key={item.id}
                  className="col-md-4 col-sm-4"
                  onClick={() => handleNavigation(item.href)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="wrimagecard wrimagecard-topimage">
                    <div className="wrimagecard-topimage_title">
                      <div className={`${styles.wrimagecardtitle}`}>
                        {item.image && (
                          <img
                            className={`card-img-top ${styles.cardimg}`}
                            src={item.image.src}
                            alt={item.title}
                          />
                        )}
                        {item.icon && (
                          <i className={`fa ${item.icon}`}></i>
                        )}
                        <span className={`${styles.wrimagecardheading}`}>
                          {item.title}
                        </span>
                      </div>
                      <div className={`${styles.wrimagecardtext}`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <div className={`${styles.wrimagecardcontent}`}>
              End my journey here.
              <span
                className={`${styles.wrimagecardtextcolor}`}
                onClick={() => router.push("/business-profile/deactivation")}
                style={{ cursor: "pointer" }}
              >
                &nbsp;Deactivate / Delete
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserAccount;
