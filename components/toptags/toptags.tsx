import React, { Component, useState } from "react";
import styles from "./toptags.module.css";
import { Button } from "semantic-ui-react";

const TopTags = (props: any) => {
  return (
    <div className="row">
      <div className="col-md-12">
        {props.data.map((d: any, index: any) => {
          return (
            <span key={"a_" + index}>
              <Button
                className={`btn btn-warning btn-sm  ${styles.buttonlook}`}
                type="button"
              >
                {d}
              </Button>
              &nbsp; &nbsp;
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default TopTags;
