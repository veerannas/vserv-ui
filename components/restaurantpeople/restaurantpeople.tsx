import { useState, useEffect } from "react";
import { getNumberOfPeopleOfAppointment } from "../services/api/user-api";
import styles from "./restaurantpeople.module.css";

const RestaurantPeople = (props:any) => {
    const [numberOfPeople, setNumberOfPeople] = useState("");
    useEffect(() => {
      //api for fetch service price
      fetchNumberOfPeople();
    }, []);
  
    const fetchNumberOfPeople = () => {
      getNumberOfPeopleOfAppointment(props.data)
        .then((data) => data.json())
        .then((data) => {
          //set success data in list
          setNumberOfPeople(data.seatingCapacity);
        });
    };
    return (
      <span>
        <div>
          <div className={styles.servicemenucolor}>Dininng</div>
          <div>Booked For {numberOfPeople}</div>
        </div>
      </span>
    );
  };

  export default RestaurantPeople;