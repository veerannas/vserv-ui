import "bootstrap/dist/css/bootstrap.min.css";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import styles from "./favorite.module.css";
import {
  userFavorite,
  userFavoriteByUserIdBusinessId,
  deleteFavouriteBusiness,
} from "../services/api/user-api";
 
const Favorite = (props: any) => {
  const cookies = new Cookies();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");
 
  useEffect(() => {
    if ((cookies.get("id") || "") != "") {
      userFavoriteBussiness();
    }
  }, []);
 
  const userFavoriteBussiness = () => {
    userFavoriteByUserIdBusinessId(cookies.get("id"), props.data)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        if (!text) return null;
        return JSON.parse(text);
      })
      .then((data) => {
        if (data != null && data != undefined) {
          setIsFavorite(true);
          setFavoriteId(data.id);
        } else {
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching favorite data:", error);
      });
  };
 
  const favoriteColor = () => {
    if ((cookies.get("id") || "") != "") {
      if (isFavorite == false) {
        let favorite = {
          userId: { id: cookies.get("id") },
          businessInfo: { id: props.data },
        };
 
        userFavorite(favorite)
          .then((response) => response.text())
          .then((response) => {
            setIsFavorite(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let favourite = {
          id: favoriteId,
        };
        deleteFavouriteBusiness(favourite)
          .then((response) => response.text())
          .then((response) => {
            setIsFavorite(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
 
  return (
    <b className={`${styles.favoritecolor}`}>
      {isFavorite && <MDBIcon icon="heart" onClick={favoriteColor} />}
      {!isFavorite && <MDBIcon far icon="heart" onClick={favoriteColor} />}
    </b>
  );
};
 
export default Favorite;