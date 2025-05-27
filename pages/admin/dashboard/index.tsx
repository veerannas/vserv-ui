//import HighchartsReact from "./HighchartsReact.js";
import { default as HighchartsReact, default as PieChart } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
import BreadCrum from "../../../components/adminbreadcrum/breadcrum";
import Footer from "../../../components/footer/footer";
import HeaderNavbar from "../../../components/header-navbar/header-navbar";
import { getTotalBusiness, getTotalCategories, getTotalCustomer, getTotalLocation, getTotalMonthlyAppointment } from "../../../components/services/api/admin-api";
import styles from "./index.module.css";


const Dashboard = () => {
  const cookies = new Cookies();

const [totalCustomer,setTotalCustomer]=useState(0);
const [totalBusiness,setTotalBusiness]=useState(0);
const [totalCategories,setTotalCategories]=useState(0);
const [totalLocation,setTotalLocation]=useState(0);
const [totalMonthlyAppoinment,setTotalMonthlyAppoinment]=useState(0);

useEffect(()=>{
  if ((cookies.get("id") || "") == "") { window.location.href = "/" } 
  else {
    fetchTotalCustomer();
    fetchTotalBusiness();
    fetchTotalCategories();
    fetchTotalLocation();
    fetchTotalMonthlyAppoinment();
  };

  

},[])


const fetchTotalCustomer = () => {
  //fetch all business data acc vendorId
  getTotalCustomer()
    .then((data) => data.json())
    .then((data) => {
      setTotalCustomer(data);
    });
};

const fetchTotalBusiness = () => {
  //fetch all business data acc vendorId
  getTotalBusiness()
    .then((data) => data.json())
    .then((data) => {
      setTotalBusiness(data);
    });
};

const fetchTotalCategories = () => {
  //fetch all business data acc vendorId
  getTotalCategories()
    .then((data) => data.json())
    .then((data) => {
      setTotalCategories(data);
    });
};

const fetchTotalLocation = () => {
  //fetch all business data acc vendorId
  getTotalLocation()
    .then((data) => data.json())
    .then((data) => {
      setTotalLocation(data);
    });
};

const fetchTotalMonthlyAppoinment = () => {
  //fetch all business data acc vendorId
  getTotalMonthlyAppointment()
    .then((data) => data.json())
    .then((data) => {
      setTotalMonthlyAppoinment(data);
    });
};

// Column chart code

const baroptions= {
  chart: {
    type: 'column'
},
title: {
    text: ''
},
xAxis: {
  categories:[7, 14, 21, 28, 35],
  title: {
      text: 'Days'
  },
    crosshair: true
},
yAxis: {
    title: {
        text: 'No. of Appointments'
    }
},
tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
},
plotOptions: {
    column: {
        pointPadding: 0.2,
        borderWidth: 0
    }
},
series: [{
    name: 'Total Appointments',
    data: [90, 150, 106, 129, 130]

}, {
    name: 'Total Cancelled',
    data: [40, 50, 45, 65, 55]
}]

};
          

// Pie chart code

const options = {
  chart: {
    type: "pie"
  },
  title: {
    text: ''
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      showInLegend: true,
      dataLabels: {
        enabled: true,
        format: '{point.percentage:.1f} %',
        distance: -50,
        filter: {
          property: 'percentage',
          operator: '>',
          value: 4
        }
      },
    }
  },
  series: [
    {
      name: 'Categories',
      colorByPoint: true,
      data: [
        {
          name: 'Finance',
          y: 10,
        },
        {
          name: 'Restaurant',
          y: 40,
          // sliced: true,
          // selected: true
        },
        {
          name: 'Automotive',
          y: 20
        },
        {
          name: 'Health',
          y: 30
        }
      ]
    }
  ]
};

  return (
    <div className={`container-fluid`}>
      {/* Header Menu */}
      <HeaderNavbar />
      {/* End Header Menu */}
      <hr></hr>
      <div className="container">
        <div className={`${styles.wrimagecard}`}>
          <i className="fa fa-th-large"></i>
          <span className={`${styles.wrimagecarmaindheading}`}>Dashboard</span>
        </div>
        <div className={`${styles.wrimagecardcontent}`}>
          {/* BreadCrum */}
          <BreadCrum />
          {/* End BreadCrum */}
        </div>
        <br />
        <div className="row">
          <div className={`col-md-4 col-sm-4`}>
                <div className={`wrimagecard wrimagecard-topimage`}>
                  <div className={`wrimagecard-topimage_title ${styles.incomewrimagecard}`}>
                    <Row>
                      <Col>
                      <div className={`${styles.wrimagecardtext}`}>
                      Total Customers
                    </div>
                      </Col>
                    <Col>
                    <span className={styles.wrimagecardtextright}>
                        <i className="fa fa-user-tie"></i>
                      </span>
                    </Col>                  
                    </Row>
                    <div className={styles.wrimagecardnumbertext}>{totalCustomer}</div>
                    {/* <br />
                    <span className={styles.subtext}>January, 2021</span> */}
                  </div>
                </div>
            </div>
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <div className={`col-md-4 col-sm-4`}>
                <div className={`wrimagecard wrimagecard-topimage`}>
                  <div className={`wrimagecard-topimage_title ${styles.incomewrimagecard}`}>
                    <Row>
                      <Col>
                        <div className={`${styles.wrimagecardtext}`}>
                        Total Businesses                        
                        </div>                      
                      </Col>
                      <Col>
                      <span className={styles.wrimagecardtextright}>
                        <i className="fa fa-briefcase"></i>
                      </span>
                      </Col>
                    </Row>

                    <div className={styles.wrimagecardnumbertext}>{totalBusiness}</div>
                    {/* <br />
                    <span className={styles.subtext}>January, 2021</span> */}
                  </div>
                </div>              
            </div>
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            {/* <div className={`col-md-2 col-sm-2 col-xs-12 card-box`}>
                <div className={`wrimagecard wrimagecard-topimage ${styles.incomewrimagecard}`}>
                  <div className="wrimagecard-topimage_title">
                    <Row>
                      <Col>
                          <div className={`${styles.wrimagecardtext}`}>
                          Total Categories                        
                          </div>                      
                      </Col>
                      <Col>
                      <span className={styles.wrimagecardtextright}>
                        <i className="fa fa-list-alt"></i>
                      </span>
                      </Col>
                    </Row>

                    <div className={styles.wrimagecardnumbertext}>{totalCategories}</div>
                    <br />
                    <span className={styles.subtext}>January, 2021</span>
                  </div>
                </div>              
            </div>
            
            <div className={`col-md-2 col-sm-2 col-xs-12 card-box`}>
                <div className={`wrimagecard wrimagecard-topimage ${styles.incomewrimagecard}`}>
                  <div className="wrimagecard-topimage_title">
                    <Row>
                      <Col>
                        <div className={`${styles.wrimagecardtext}`}>
                        Total Locations
                        </div>                      
                      </Col>
                      <Col>
                      <span className={styles.wrimagecardtextright}>
                        <i className="fa fa-globe"></i>
                      </span>                      
                      </Col>
                    </Row>

                    <div className={styles.wrimagecardnumbertext}>{totalLocation}</div>
                    <br />
                    <span className={styles.subtext}>January, 2021</span>
                  </div>
                </div>              
            </div> */}
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <div className={`col-md-4 col-sm-4`}>
                <div className={`wrimagecard wrimagecard-topimage`}>
                  <div className={`wrimagecard-topimage_title ${styles.incomewrimagecard}`}>
                    <Row>
                      <Col>
                        <div className={`${styles.wrimagecardtext}`}>
                        Monthly Appointments                        
                        </div>                      
                      </Col>
                      <Col>
                      <span className={styles.wrimagecardtextright}>
                        <i className="fa fa-calendar-alt"></i>
                      </span>
                      </Col>
                    </Row>

                    <div className={styles.wrimagecardnumbertext}>{totalMonthlyAppoinment}</div>
                    {/* <br />
                    <span className={styles.subtext}>January, 2021</span> */}
                  </div>
                </div>              
            </div>
        </div>
        <br />
        <div className="row graph-row">
          
            <div className={`col-md-6 col-sm-6 ${styles.appointmentgraphcol}`}>
              <div className={`graph-header`}>Monthly Appointments</div>
              <br /><br />
              <div> <HighchartsReact highcharts={Highcharts} options={baroptions} /></div>
            </div>

            {/* <div className={`col-md-1`}></div> */}
            
            <div className={`col-md-5 col-sm-5 ${styles.businessgraphcol}`}>
              <div className={`graph-header`}>Registered Businesses</div>
              <br /><br />
              <div><PieChart highcharts={Highcharts} options={options} /></div>
            </div>
        </div>
        

      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;