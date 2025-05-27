import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Footer from "../../components/footer/footer";
import HeaderNavbar from "../../components/header-navbar/header-navbar";
import SearchResults from "../../components/search-results/search-results";
import Searchbox from "../../components/searchbox/searchbox";
import { getBusinessSearchResult } from "../../components/services/api/business-api";
import styles from "./search.module.css";


const Search = (props: any) => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const checkValue = router.query.service;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query != null && Object.keys(router.query).length != 0) {
      fetchData();
    }
  }, [router.query.service, router.query.location, router.query.date]);

  const fetchData = () => {
    setLoading(false);
    //fetching data for Business
    getBusinessSearchResult(router.query.service, router.query.location, router.query.date)
      .then((data) => data.json())
      .then((data) => {
        //set data in list variable
        setList(data);
        //set for page loading and to avoid maultiple call
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
      });
  };
  return (
    <div className="div-height" >
      <main>
        <div className="child1" style={{ minHeight: "100%" }}>
          {/*1. Show Navbar  */}
          <HeaderNavbar data={{ currentaPage: "searchpage" }} />
          {/* 2. Search widget  */}
          <div className="col-md-12 search-ribbon-color">
            <Searchbox data={JSON.stringify(router.query)} />
          </div>
          {/*  3. Search Results + Geolocation */}
          <br></br>
          {loading ? (
            <SearchResults
              data={list}
              queryString={JSON.stringify(router.query)}
            />
          ) : (
            // <div>Loading...</div>
            <div className={`container ${styles.loading}`} style={{ minHeight: "350px" }}>
              <ReactLoading type="spokes" className="loading" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Search;
