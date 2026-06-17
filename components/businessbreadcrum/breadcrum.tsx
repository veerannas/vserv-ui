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

function handleClick(event: any) {
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
          href="/business/account"
          className={styles.breadcrumblinkcolor}
        >
          Business Account
        </Link>

        {router.pathname == "/business/business-info" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Business Info
          </Typography>
        )}
        {router.pathname == "/business/listing" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Business Listing
          </Typography>
        )}
        {router.pathname == "/business/notifications" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Notifications
          </Typography>
        )}
        {router.pathname == "/business/deactivation" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Deactivate / Delete
          </Typography>
        )}
         {router.pathname == "/business/dashboard" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
           Dashboard
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
