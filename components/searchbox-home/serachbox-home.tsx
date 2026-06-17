import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import "moment-timezone";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import calenderImage from "../searchbox/images/calendar.png";
import { getCategories, getLocation } from "../services/api/business-api";
import styles from "./searchbox.module.css";

const SearchboxHome = (props: any) => {
  const [selctdServiceVal, setServiceSelectedValue] = useState("restaurant");
  const [selctdLocationVal, setLocationSelectedValue] = useState("chicago");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [dataService, setDataService] = useState<any[]>([]);
  const [dataLocation, setDataLocation] = useState<any[]>([]);

  useEffect(() => {
    console.log("search-box");
    //getting data from category api
    fetchDataCategory();
  }, []); // <-- See the change here

  //JSON.parse(props.data).location,JSON.parse(props.data).service,JSON.parse(props.data).date
  const fetchDataCategory = () => {
    //fetching data for service
    getCategories()
      .then((data) => data.json())
      .then((data) => {
        //transform data as per ui requrement
        let newData = data.map((item: any) => {
          return { value: item.id, label: item.category };
        });
        setDataService(newData);
        console.log("category loaded");
        //set values to the category dropdown
        if (typeof props.data == "undefined") {
          setServiceSelectedValue("restaurant");
          // setStartDate(new Date());
          // setSelectedDate(moment(new Date()).format("YYYY-MM-DD"));
        }
        //this is for search result page, query string
        else {
          setServiceSelectedValue(JSON.parse(props.data).service);
          // setStartDate(new Date(JSON.parse(props.data).date));
          // setSelectedDate(JSON.parse(props.data).date);
        }
        //we are using function chaining 1st level
        //getting data from location api
        fetchDataCity();
      });
  };

  const fetchDataCity = () => {
    //fetching data for cities
    getLocation()
      .then((data) => data.json())
      .then((data) => {
        //transform data as per ui requrement
        let newData = data.map((item: any) => {
          return { value: item.id, label: item.majorCity };
        });
        setDataLocation(newData);
        console.log("city loaded");
        //set values to the location dropdown
        if (typeof props.data == "undefined") {
          setLocationSelectedValue("60f508cfa49b9844903d4349");
        }
        //this is for search result page, query string
        else {
          setLocationSelectedValue(JSON.parse(props.data).location);
        }
      });
  };

  // handle onChange event of the dropdown
  const handleChangeService = (e: any) => {
    setServiceSelectedValue(e.value);
  };
  // handle onChange event of the dropdown
  const handleChangeLocation = (e: any) => {
    setLocationSelectedValue(e.value);
  };
  // date sepcific
  const handleChangeDate = (date: any) => {
    setStartDate(date);
    setSelectedDate(moment(new Date(date)).format("YYYY-MM-DD"));
  };
  return (
    <div className={`container ${styles.searchbox}`}>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <div className={styles.searchboxspacing}>
            <Select
              instanceId="selService"
              options={dataService} // set list of the data
              onChange={handleChangeService}
              value={dataService.find((obj) => obj.value == selctdServiceVal)} // set selected value
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className={styles.searchboxspacing}>
            <Select
              instanceId="selLocation"
              options={dataLocation} // set list of the data
              onChange={handleChangeLocation}
              value={dataLocation.find((obj) => obj.value == selctdLocationVal)} // set selected value
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className={styles.searchboxspacing}>
            <DatePicker
              selected={startDate}
              onChange={handleChangeDate}
              placeholderText="mm/dd/yyyy"
              dateFormat="MM-dd-yyyy"
              className={`form-control  ${styles.inputdate}`}
            />
            <img src={calenderImage.src} className={` ${styles.calendarimage}`} />
          </div>
        </div>
        <div className="col-md-2">
          <div className={`${styles.searchboxspacing} ${styles.searchboxpadding}`}>
            <Link
              href={{
                pathname: "/search",
                query: {
                  service: `${selctdServiceVal}`,
                  location: `${selctdLocationVal}`,
                  date: `${selectedDate}`,
                },
              }}
            >
              <a
                style={{ borderRadius: "5px" }}
                className={`btn btn-md btn-warning ${styles.searchbutton}`}
                id="btnSearch"
              >
                Search
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchboxHome;
