import { useState, useEffect } from "react";
import { getServiceOfAppointment } from "../services/api/user-api";
import styles from "./serviceformatter.module.css";

const ServiceFormatter = (props:any) => {
    const [menuCategory, setMenuCategory] = useState("");
    const [menuSubCategory, setMenuSubCategory] = useState("");
  
    useEffect(() => {
      //api for fetch service price
      fetchServicePrice();
    }, []);
  
    const fetchServicePrice = () => {
      getServiceOfAppointment(props.data, props.category)
        .then((data) => data.json())
        .then((data) => {
          //set success data in list
          setMenuCategory(data.service.menuCategories.categoryName);
          setMenuSubCategory(data.service.menuName);
        });
    };
    return (
      <span>
        <div>
          <div className={styles.servicetextcolor}>{menuCategory}</div>
          <div>{menuSubCategory}</div>
        </div>
      </span>
    );
  };

  export default ServiceFormatter;