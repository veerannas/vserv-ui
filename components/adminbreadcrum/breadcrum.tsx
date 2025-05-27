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
          href="/admin"
          className={styles.breadcrumblinkcolor}
        >
          Admin Account
        </Link>
        {router.pathname == "/admin/dashboard" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Dashboard
          </Typography>
        )}

        {router.pathname == "/admin/business-account" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Business Account
          </Typography>
        )}


        {router.pathname == "/admin/business-listing" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Business Listing
          </Typography>
        )}

        {router.pathname == "/admin/customer-account" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            Customer Account
          </Typography>
        )}

        {router.pathname == "/admin/city" && (
          <Typography
            color="textPrimary"
            className={styles.breadcrumbtypographycolor}
          >
            City and Country
          </Typography>
        )}

      </Breadcrumbs>
    </div>
  );
}
