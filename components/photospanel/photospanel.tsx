import React from "react";
import "react-awesome-slider/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./photospanel.module.css";

const PhotosPanel = (props: any) => {
  const slideImages = [
    "images/slide_2.jpg",
    "images/slide_3.jpg",
    "images/slide_4.jpg",
  ];

  return (
    <div className="slide-container">
      <Slide>
        {props.data.map((d: any) => {
          return (
            <div className={`${styles.eachslide}`} key={d.id}>
              <div
                style={{
                  backgroundImage: `url(data:image/png;base64,${d.image.data})`,
                }}
              ></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};
export default PhotosPanel;
