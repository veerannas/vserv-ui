import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Cookies } from "react-cookie";
// import { GoPlus } from 'react-icons/Go';
import ImageUploading from "react-images-uploading";
import { getBusinessByBusinessInfoId, postBusinessWallPaper, postDeleteBusinessWallPaper } from "../../../components/services/api/business-api";
import styles from "./index.module.css";
// import BackNext from "../../../components/backnext-button/backnext";

const Businessprofile = (props: any) => {
  const cookies = new Cookies();
  const [images, setImages] = useState([]);
  const [wallPaper, setWallPaper] = useState([]);
  const [maxNumber, setMaxNumber] = useState(5);

  //in onchange file set image value
  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  useEffect(() => {
    //get data of business info
    fetchbusinessInfo();
  }, [])


  //get data of business info for wallpaper
  const fetchbusinessInfo = () => {
    getBusinessByBusinessInfoId(cookies.get("businessInfoId"))
      .then((data) => data.json())
      .then((data) => {
        if (data.status != "500") {
          if ((data.wallPaper || "") !== "") {
            let number = 5 - data.wallPaper.length;
            if (number > 5 && number < 0) {
              setMaxNumber(0);
            } else {
              setMaxNumber(number);
            }
            setWallPaper(data.wallPaper);
          }

        }
      });
  };

  //save image in database
  const uploadImage = (images: any) => {
    let data = new FormData();
    for (var index = 0; index < images.length; index++) {
      data.append("files", images[index].file);
    }
    data.append("businessInfoId", cookies.get("businessInfoId"));
    postBusinessWallPaper(data)
      .then((response) => response.text())
      .then((response) => { setImages([]); fetchbusinessInfo(); console.log(JSON.stringify(response)) })
      .catch((err) => {
        console.log(err);
      });
  }

  //delete image in database
  const deleteWallpaper = (imageId: string, index: number) => {
    let businessWallpaper = {
      businessInfo: { id: cookies.get("businessInfoId") },
      images: { id: imageId },
      index: index
    }
    postDeleteBusinessWallPaper(businessWallpaper)
      .then((response) => response.text())
      .then((response) => { fetchbusinessInfo(); })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="row">
      {/* Left Panel */}
      <div className="col-md-12">
        {/* <Row>
            <BusinessNavbar />
          </Row>
          <br /> */}
        {/* <Row>
          <Col>
            <div className={`${styles.statustitle}`}>
              Photos
            </div>
          </Col>
        </Row> */}
        <br></br>
        <Row>
          <Col>
            <div className={`${styles.substatustitle}`}>
              Cover Photos
            </div>
          </Col>
        </Row>

        <label className={`${styles.photostitle}`}>
          Best photos which speaks about your business (Only 5 photos allow)
        </label>
        <div className="App">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              dragProps
            }:any) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <Button
                  type="button"
                  className={`${styles.addfile}`}
                  onClick={onImageUpload}
                  {...dragProps}>
                  {/* <GoPlus />  */}
                  Upload file
                </Button>
                <br></br>
                {imageList && imageList.map((image:any, index:any) => (
                  <div key={index} className={`image-item ${styles.imagecard}`}>
                    <img src={image.data_url} alt="" width="110" height="70" />
                    <i className={`fas fa-trash-alt ${styles.deleteicon}`}
                      onClick={() => onImageRemove(index)}></i>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>

        </div>
        {images.length > 0 && (
          <Row>
            <Col>
              <Form.Group className={`${styles.formcontrolbuttonright}`}>
                <Button
                  variant="primary"
                  type="submit"
                  className={`${styles.formcontrolsave}`}
                  onClick={() => uploadImage(images)}
                >
                  Save
                </Button>
                &nbsp;
                <Button
                  variant="primary"
                  type="reset"
                  className={`${styles.formcontrolcancel}`}>
                  Cancel
                </Button>
              </Form.Group>
            </Col>
          </Row>
        )}
        <hr></hr>
        <Row>
          <Col>
            <table>
              <tbody>
                <tr>
                  {wallPaper && wallPaper.map((d: any, index) => (
                    <td key={index} className={`image-item ${styles.imagecard}`}>
                      <img src={`data:image/jpeg;base64,${d.image.data}`} width="110" height="70" />

                      {wallPaper.length != 1 && (
                        <i className={`fas fa-trash-alt ${styles.deleteicon}`}
                          onClick={() => deleteWallpaper(d.id, index)}
                        ></i>
                      )}
                      {/* <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div> */}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <br></br>
      </div>
    </div>
  );
};
export default Businessprofile;

