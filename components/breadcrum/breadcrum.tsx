import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useRouter } from "next/router";
import styles from "./breadcrum.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function handleClick(event:any) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrum() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          href="/user"
          className={styles.breadcrumblinkcolor}
        >
          Account
        </Link>

        {router.pathname == "/user/dashboard" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Dashboard
          </Typography>
        )}
        {router.pathname == "/user/active-appointment" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
           Appointment
          </Typography>
        )}
        {router.pathname == "/user/past-appointment" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Past Appointment
          </Typography>
        )}
        {router.pathname == "/user/personal-info" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Personal Info
          </Typography>
        )}

        {router.pathname == "/user/setting" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Setting
          </Typography>
        )}
        {router.pathname == "/user/notifications" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Notification
          </Typography>
        )}
        {router.pathname == "/user/deactivation" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Deactivate / Delete
          </Typography>
        )}
        {router.pathname == "/user/profile" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Profile
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
