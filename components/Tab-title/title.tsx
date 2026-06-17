import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styles from "./backnext.module.css";
import { useRouter } from "next/router";
import {Helmet} from "react-helmet";

const useDocTitle = () => {

  const router = useRouter();
  
  return(
  <Row>
    <Col>

      {router.pathname == "/business-profile" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Account </title>
        <meta name="description" content="In Rhubs full details show on this page.It is very easy to handle it " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}


      {router.pathname == "/business-profile/overview" && (  
        <Helmet>
        <title>  RHubs | Business-profile </title>
        <meta name="description" content="In Rhubs this page is all about our business profile overview" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {/* {router.pathname == "/business-profile/address" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Address </title>
        <meta name="description" content="Rhubs store full data about company & This page store business address" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/contact" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Contact </title>
        <meta name="description" content="In Rhubs contact page is use to store a contact Data for connected with us" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/services" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Services </title>
        <meta name="description" content="In Rhubs services we can provide diffierent type of service is shown on this" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/photos" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Photos </title>
        <meta name="description" content="In Rhubs store some photo  " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/hours" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Hours </title>
        <meta name="description" content="In Rhubs hours page store the detail about hours of working" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}
      
      {router.pathname == "/business-profile/status" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Status  </title>
        <meta name="description" content="There we show staus about our business in Rhubs" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )} */}

      {router.pathname == "/business-profile/appointment" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Appointment  </title>
        <meta name="description" content="In Rhubs Appointment show all details about  Today & Upcoming Appointment  " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/askme" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Ask Me  </title>
        <meta name="description" content="In Rhubs customer can also ask whatever they get issue in Rhubs " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/dashboard" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Dashboard  </title>
        <meta name="description" content="Shows the full detail about business how much we get this month 
        how much we get profit & show how  much cancel the appointment this month.... " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/deactivation" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Deactivation  </title>
        <meta name="description" content="In Rhubs deactivation page is use to delete our business or deactivation 
        our business" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/profile" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Profile  </title>
        <meta name="description" content="In Rhubs we can store full data about business" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/reviews-rating" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Reviews-Rating  </title>
        <meta name="description" content="In Rhubs there is review & rating page to customer feedback" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/business-profile/info" && (  
        <Helmet>
        <title>  RHubs | Business-profile | Info  </title>
        <meta name="description" content="In Rhubs we can store full information about business " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/user/dashboard" && (  
        <Helmet>
        <title>  RHubs | User | Dashboard  </title>
        <meta name="description" content="In Rhubs it is very easy to handle for customer In this customer get
        best expericence with us It was the best Hub of our country" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/user/deactivation" && (  
        <Helmet>
        <title>  RHubs | User | Deactivation  </title>
        <meta name="description" content="In Rhubs deactivation page is use to delete our business or deactivation 
        our business" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/user/notification" && (  
        <Helmet>
        <title>  RHubs | User | Notification  </title>
        <meta name="description" content="In Notification RHub is a component which is used for sending push 
        notifications to any platform ..." />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/user/personal-info" && (  
        <Helmet>
        <title>  RHubs | User| Personal-Info  </title>
        <meta name="description" content="" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/user/profile" && (  
        <Helmet>
        <title>  RHubs | User | Profile  </title>
        <meta name="description" content="In Rhubs the customer full details show on this profile page" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/user/setting" && (  
        <Helmet>
        <title>  RHubs | User | Setting  </title>
        <meta name="description" content="In Rhubs setting page is use to set the Email, Password & Mobile number" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/user/active-appointment" && (  
        <Helmet>
        <title>  RHubs | User | Active-Appointment  </title>
        <meta name="description" content="In Rhubs the active appointment show that the customer can get 
        appointment for services" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}
        
        {router.pathname == "/user/past-appointment" && (  
          <Helmet>
          <title>  RHubs | User | Past-Appointment  </title>
          <meta name="description" content="In Rhubs the past Appointment the customer can see our past service
          details" />
          <meta name="keywords" content=" "/>
          </Helmet>
          )}
        




        {router.pathname == "/business/account" && (  
        <Helmet>
        <title>  RHubs | Business Account  </title>
        <meta name="description" content=" In Rhubs business Account page get ful data about business " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/business/business-activate" && (  
        <Helmet>
        <title>  RHubs | Business | Business Activate</title>
        <meta name="description" content="In Rhubs business activate is usse to actied our account on our hubs" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

        {router.pathname == "/business/business-info" && (  
        <Helmet>
        <title>  RHubs | Business | Business-Info </title>
        <meta name="description" content="" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}
  
        {router.pathname == "/business/dashboard" && (  
        <Helmet>
        <title>  RHubs | Business | Dashboard </title>
        <meta name="description" content="In Rhubs there we get full detail about our business it was the main page" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}
        
        {router.pathname == "/business/deactivation" && (  
        <Helmet>
        <title>  RHubs | Business | Deactivation </title>
        <meta name="description" content="In Rhubs Here we have to deactivate or delete our account of hubs" />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}
      
        {router.pathname == "/business/listing" && (  
        <Helmet>
        <title>  RHubs | Business | Listing </title>
        <meta name="description" content="In Rhubs business listing page there is show the details " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}
      
        {router.pathname == "/business/notifications" && (  
        <Helmet>
        <title>  RHubs | Business | Notification </title>
        <meta name="description" content="In Rhubs we have to provide notification about our business " />
        <meta name="keywords" content=" "/>
        </Helmet>
        )}

      {router.pathname == "/restaurant" && (  
      <Helmet>
      <title>  RHubs | Restaurant </title>
      <meta name="description" content="" />
      <meta name="keywords" content=" "/>
      </Helmet>
      )}

      {router.pathname == "/search" && (  
      <Helmet>
      <title>  RHubs | Search </title>
      <meta name="description" content="" />
      <meta name="keywords" content=" "/>
      </Helmet>
      )}

      {router.pathname == "/finance" && (  
      <Helmet>
      <title>  RHubs | Finance </title>
      <meta name="description" content="" />
      <meta name="keywords" content=" "/>
      </Helmet>
      )}

      {router.pathname == "/automotive" && (  
      <Helmet>
      <title>  RHubs | Automotive </title>
      <meta name="description" content="" />
      <meta name="keywords" content=" "/>
      </Helmet>
      )}

      {router.pathname == "/health" && (  
      <Helmet>
      <title>  RHubs | Health </title>
      <meta name="description" content="" />
      <meta name="keywords" content=" "/>
      </Helmet>
      )}

      {router.pathname == "/signin" && (  
      <Helmet>
      <title>  RHubs | Sign In </title>
      <meta name="description" content="" />
      <meta name="keywords" content=" "/>
      </Helmet>
      )}

    </Col>
  </Row>
  );  
};
export default useDocTitle; 

