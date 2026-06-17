import "bootstrap/dist/css/bootstrap.min.css";
import { MDBIcon } from "mdb-react-ui-kit";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Button } from "semantic-ui-react";
import Favorite from "../favorite/favorite";
import Reviews from "../reviews/reviews";
import { getCityName } from "../services/api/business-api";
import styles from "./search-results.module.css";

const SearchResults = (props: any) => {
  const [category, setcategory] = useState("");
  const [url, setUrl] = useState("/");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    setDefaultValue();
  }, []);

  const setDefaultValue = () => {
    let _url = "";
    if (typeof props.queryString == "undefined") _url = "/";
    //top tags button value
    if (JSON.parse(props.queryString).service == "restaurant") {
      setcategory("Restaurant");
      _url = "/restaurant";
    } else if (JSON.parse(props.queryString).service == "finance") {
      setcategory("Finance");
      _url = "/finance";
    } else if (JSON.parse(props.queryString).service == "automotive") {
      setcategory("Automotive");
      _url = "/automative";
    } else if (JSON.parse(props.queryString).service == "health") {
      setcategory("Health");
      _url = "/health";
    }
    setUrl(_url);
  };
  const [googleMapUrl, setGoogleMapUrl] = useState(
    "<iframe  width='100%' height='100%'  frameborder='0' src='https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Chicago United States+(Your%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' aria-hidden='false' ></iframe>"
  );
  const mapChangeEvent = (d: any) => () => {
    var fullAddress =
      d.companyName + " " + d.cityId.city + " " + d.address.addressLineOne;
    let _mapUrl =
      "<iframe width='100%' height='100%' frameborder='0' src='https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=" +
      fullAddress +
      "&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' aria-hidden='false' ></iframe>";
    setGoogleMapUrl(_mapUrl);
  };
  const googleMapIframe = () => {
    return {
      __html: googleMapUrl,
    };
  };
  const loct = JSON.parse(props.queryString).location;

  useEffect(() => {
    if (loct != "") {
      getCityName(loct)
        .then((data) => data.text())
        .then((data) => {
          setCityName(data);
        })
        .catch((error) => {
        });
    }
  }, [loct])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={` col-md-6`}>
            <h4>
              <b className={`${styles.category}`}>{category}</b>
              <b className={`${styles.location}`}>
                &nbsp;{cityName /* &nbsp;{loct[0].toUpperCase() + loct.substring(1)} */}
              </b>
              <b className={`${styles.resultcount}`}>
                &nbsp;{props.data.length} results
              </b>
            </h4>
            <div>
              {props.data && props.data.map((d: any, index: any) => {
                return (
                  <div className={`py-3 ${styles.cardbox}`} key={"a_" + index}>
                    <div
                      className={`card ${styles.cardborder}`}
                      onClick={mapChangeEvent(d)}
                    >
                      <div className="row ">
                        <div className="col-md-5">
                          <img
                            src={`data:image/jpeg;base64,${d.wallPaper[0].image.data}`}
                            className={`w-100 ${styles.cardimage}`}
                          />
                          <div className={`${styles.cssribbon}`}>
                            <span className={`${styles.bookmarkdesign}`}>
                              <Favorite data={d.id} />
                            </span>
                          </div>
                        </div>
                        <div className="col-md-7 px-3">
                          <div className="card-block px-3">
                            <h4 className={`card-title ${styles.cardtitle}`}>
                              {d.companyName}
                            </h4>
                            <div className={`row `}>
                              <div className="col-md-12">
                                {d.tags && d.tags.map((d: any, index: any) => {
                                  return (
                                    <>
                                      <Button
                                        className={`  ${styles.buttonlook}`}
                                        type="button"
                                      >
                                        {d}
                                      </Button>
                                      &nbsp;
                                    </>
                                  )
                                })}
                              </div>
                            </div>
                            <div className={`row ${styles.sizebetween}`}>
                              <Reviews data={d.id} service={d.serviceId.id} />
                            </div>
                            <div className={`row ${styles.sizebetween}`}>
                              <div className="col-md-12">
                                <p className={`${styles.addressstl}`}>
                                  {d.address.addressLineOne}
                                </p>
                              </div>
                            </div>
                            <div className={`row ${styles.sizebetween}`}>
                              <div
                                className={` col-md-12 ${styles.viewmargin}`}
                              >
                                <Link
                                  href={{
                                    pathname: url,
                                    query: { id: `${d.id}` },
                                  }}
                                >
                                  <button
                                    value="View"
                                    className={`${styles.viewbutton}`}
                                  >
                                    View
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Displaying Google Maps with iframe using this dangerouslySetInnerHTML */}
          <div
            className="col-md-6"
            style={{ height: "400px" }}
            dangerouslySetInnerHTML={googleMapIframe()}
          ></div>
        </div>
      </div>
    </>
  );
};
export default SearchResults;


