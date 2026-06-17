import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  getBusinessProfilePercent
} from "../../components/services/api/business-api";
import styles from "./progressbar.module.css";


const ProgressBarComponent = (props: any) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    //fetcch business profile completeion status in percent
    fetchBusinessProfilePercent();
  }, [props.link]);
  const fetchBusinessProfilePercent = () => {
    getBusinessProfilePercent(props.rowId)
      .then((data) => data.json())
      .then((data) => {
        //set percent value in percent variable
        setPercent(data);
      });
  };
  return (
    <div>
      {percent >= 0 && percent <= 20 && (
        <div className={`${styles.progressbar}`}>
          <div>{percent}% completed</div>
          <ProgressBar variant="danger" now={percent} />
        </div>
      )}
      {percent > 20 && percent <= 40 && (
        <div className={`${styles.progressbar}`}>
          <div>{percent}% completed</div>
          <ProgressBar variant="warning" now={percent} />
        </div>
      )}
      {percent > 40 && percent <= 70 && (
        <div className={`${styles.progressbar}`}>
          <div>{percent}% completed</div>
          <ProgressBar variant="info" now={percent} />
        </div>
      )}
      {percent > 70 && percent <= 100 && (
        <div className={`${styles.progressbar}`}>
          <div>{percent}% completed</div>
          <ProgressBar variant="success" now={percent} />
        </div>
      )}
    </div>
  );
};

export default ProgressBarComponent;