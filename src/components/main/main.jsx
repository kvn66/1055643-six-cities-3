import React from "react";
import Cities from "../cities/cities.jsx";
import {MemoizedHeader} from "../header/header.jsx";

const Main = () => {
  return (
    <div className="page page--gray page--main">
      <MemoizedHeader />

      <Cities />

    </div>
  );
};

export default Main;
