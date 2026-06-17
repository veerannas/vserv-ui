import { useState, useEffect } from "react";
import { getServiceOfAppointment } from "../services/api/user-api";

const MenuPriceFormatter = (props: any) => {
    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState("");
  
    useEffect(() => {
      //api for fetch user favorite Busisnesss
      fetchServicePrice();
    }, []);
    const fetchServicePrice = () => {
      getServiceOfAppointment(props.row.id, props.row.businessInfo.serviceId.id)
        .then((data) => data.json())
        .then((data) => {
          //set success data in list
          setCurrency(data.service.currency);
          setPrice(data.service.price);
        });
    };
    return (
      <div>
        {currency} {price}
      </div>
    );
  };

  export default MenuPriceFormatter;