import React, { useEffect, useState } from "react";
import styles from "./hours.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { MDBIcon } from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import moment from "moment";
import { getBusinessHourAndCustomHOur } from "../services/api/business-api";

const Hours = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");
  const [array, setarray] = useState<any[]>([]);
  const [isDay, setIsDay] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getBusinessHourAndCustomHOur(props.data)
      .then((data) => data.json())
      .then((data) => {
        setList(data.workingDaysCalendar);
        setLoading(true);
        data.workingDaysCalendar.map((d: any, index: any) => {
          d.workingDay.map((e: any, index: any) => {
            if (e.breakStartTime != null) {
              setBreakStartTime(e.breakStartTime);
              setBreakEndTime(e.breakEndTime);
            }
            // console.log("break start time ============" + e.breakStartTime);
          })

        })
        let arr: any[];
        let starttime = "";
        let endtime = "";
        let startday = "MONDAY";
        let endday = "";
        let off = "";
        data.workingDaysCalendar.map((d: any, index: any) => {
          d.workingDay.map((e: any, index: any) => {
            if (starttime == e.workStartTime && endtime == e.workEndTime) {

              endday = e.dayOfWeek;
              // console.log("break start time ============"+index+"============" + e.workStartTime);
              if (index == 6) {
                if (index != 0) {
                  let object = {
                    startday: startday,
                    endday: endday,
                    starttime: starttime,
                    endtime: endtime,
                    off: off
                  }
                  array.push(object);
                }
              }
            } else {
              // console.log("starttime ============" + starttime + "=====" + endtime + "=======" + startday + "=========" + endday);
              // console.log("loop============" + index + "============" + e.dayOfWeek);

              if (index != 0) {
                let object = {
                  startday: startday,
                  endday: endday,
                  starttime: starttime,
                  endtime: endtime,
                  off: off
                }
                array.push(object);
              }
              startday = e.dayOfWeek;
              endday = "";
              starttime = e.workStartTime;
              endtime = e.workEndTime;
              off = e.off;
              if (index == 6) {
                if (index != 0) {
                  let object = {
                    startday: startday,
                    endday: endday,
                    starttime: starttime,
                    endtime: endtime,
                    off: off
                  }
                  array.push(object);
                }
              }

            }



          })

          setarray(array);
          setIsDay(true);
        })
        // console.log("arr========", JSON.stringify(array));

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className={`col-md-12 ${styles.box}`}>
      <div className={`${styles.boxtitle}`}>
        <h4>
          <b>
            <MDBIcon far icon="clock" /> Hours
          </b>
        </h4>
      </div>
      <hr></hr>
      <div className={``}>
        {/* <div>Mon - Thu 12:00pm - 9:00pm</div>
        <div>Fri, Sat 12:00pm - 10:00pm</div> */}


        {isDay==true && array.map((e: any, index: any) => {
          return (
            <div key={"b_" + index}>
              {!e.off ? (
                <div className="text-lowercase">
                  <span> {e.startday} {e.endday != "" ? <span>-&nbsp;{e.endday}&nbsp;</span> : ""}</span>: 
                  &nbsp;{moment(e.starttime, "HH:mm").format("hh:mm A")} -&nbsp;
                  {moment(e.endtime, "HH:mm").format("hh:mm A")}
                </div>
              ) : (
                <div className="text-lowercase"><span> {e.startday} {e.endday != "" ? <span>-&nbsp;{e.endday}</span>:  ""}</span> : Closed</div>
              )}
              {/* {index == 5 && (
                      <div className="text-lowercase">
                        Break-hours -
                        {moment(e.breakStartTime, "HH:mm").format("hh:mm A")} - 
                        {moment(e.breakEndTime, "HH:mm").format("hh:mm A")}</div>
                    )} */}
            </div>
          );
        })}
        {list && list.map((d: any, index: any) => {
          return (
            <div key={"a_" + index}>

              {breakStartTime != "" && (
                <div className="text-lowercase">
                  Break-hours :
                  &nbsp; {moment(breakStartTime, "HH:mm").format("hh:mm A")} -&nbsp;
                  {moment(breakEndTime, "HH:mm").format("hh:mm A")}</div>
              )}
              {/* <div style={{ textTransform: "capitalize" }}>
                Monday-Friday - 9am-6pm
              </div>
              <div style={{ textTransform: "capitalize" }}>
                Saturday - 9am-2pm
              </div>
              <div style={{ textTransform: "capitalize" }}>Sunday - Closed</div> */}
              {d.customHours && d.customHours.map((e: any, index: any) => {
                return (
                  <div key={"c_" + index}>
                    <b> {e.label} </b>
                    {moment(e.startTime, "HH:mm").format("hh:mm A")} -&nbsp;
                    {moment(e.endTime, "HH:mm").format("hh:mm A")}
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* <div>
          <b>Lunch Daily</b> 12:00pm - 2:00pm
        </div>
        <div>
          <b>Dinner Daily</b> 8:00pm - 10:00pm
        </div> */}
      </div>
      <br></br>
    </div>
  );
};
export default Hours;
