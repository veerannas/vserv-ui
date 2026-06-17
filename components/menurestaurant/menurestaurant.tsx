import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { getMenuData } from "../services/api/menu-api";
import styles from "./menurestaurant.module.css";

const MenuRestaurant = (props: any) => {
  const checkValue = props.data;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [collapseOptions, setCollapse] = useState({
    collapse: true,
    class: "collapsehide",
    showmore: "View Full Menu",
    showless: "Collapse Full Menu",
    text: "View Full Menu",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getMenuData(checkValue)
      .then((data) => data.json())
      .then((data) => {
        setList(data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const collapseHandler = () => {
    collapseOptions.collapse = collapseOptions.collapse ? false : true;
    collapseOptions.text = collapseOptions.collapse
      ? collapseOptions.showmore
      : collapseOptions.showless;
    collapseOptions.class = collapseOptions.collapse
      ? "collapsehide"
      : "collapseshow";
    setCollapse({ ...collapseOptions }); // object literal use spread operator to rewrite value
  };
  return (
    <div>
      <hr></hr>
      <div className={`${collapseOptions.class}`}>
        <div id="menu1">
          {list.map((d: any, index: any) => {
            return (
              <div key={"a_" + index}>
                <div className={`row `}>
                  <div className={`col-md-12 ${styles.menutitle}`}>
                    {d.menuCategories.categoryName}
                  </div>
                </div>
                {d.menuSubCategoriesList.map(
                  (menuSubCategories: any, index: any) => {
                    return (
                      <div key={"b_" + index}>
                        <div className={`row `}>
                          <div className={`col-md-12 ${styles.menusubtitle}`}>
                            {menuSubCategories.menuName}
                          </div>
                        </div>
                        <div className={`row `}>
                          <div className={`col-md-10`}>
                            {menuSubCategories.information}
                          </div>
                          <div className={`col-md-2 text-right`}>
                            {menuSubCategories.currency}
                            {menuSubCategories.price}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>

      <br></br>
      <div className={styles.buttoncenter}>
        <Button
          className={`btn  btn-sm  ${styles.viewbutton}`}
          type="button"
          onClick={collapseHandler}
        >
          {collapseOptions.text}
        </Button>
      </div>
    </div>
  );
};
export default MenuRestaurant;
