import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useRouter } from "next/router";
import styles from "./breadcrum.module.css";
import { Cookies, useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function handleClick(event: any) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrum(props:any) {
  const classes = useStyles();
  const router = useRouter();
  const cookies = new Cookies();

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          href="/business/account"
          className={styles.breadcrumblinkcolor}
        >
          Business Account
        </Link>
        <Link
          color="inherit"
          href="/business-profile/"
          className={styles.breadcrumblinkcolor}
        >
          {cookies.get("businessName")}

        </Link>

        {router.pathname == "/business-profile/dashboard" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Dashboard
          </Typography>
        )}
        {props.link == "overview" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Overview
          </Typography>
        )}
        {props.link == "address" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Address
          </Typography>
        )}
        {props.link == "contact" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Contact
          </Typography>
        )}

        {props.link == "services" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Services
          </Typography>
        )}
        {props.link == "photos" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Photos
          </Typography>
        )}
        {props.link == "status" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Status
          </Typography>
        )}
        {router.pathname == "/business-profile/reviews-rating" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Rating and Review
          </Typography>
        )}
        {router.pathname == "/business-profile/askme" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            AskMe
          </Typography>
        )}
        {router.pathname == "/business-profile/appointment" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Business Appointment
          </Typography>
        )}
        {router.pathname == "/business-profile/info" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Business Info
          </Typography>
        )}
        {router.pathname == "/business-profile/notifications" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Notifications
          </Typography>
        )}
        {router.pathname == "/business-profile/deactivation" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Deactivate / Delete
          </Typography>
        )}
        {props.link == "hours" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Hours
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
