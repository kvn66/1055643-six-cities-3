import * as React from "react";
import Cities from "../cities/cities.tsx";
import {MemoizedHeader} from "../header/header.tsx";

const Main = () => {
  return (
    <div className="page page--gray page--main">
      <MemoizedHeader />

      <Cities />

    </div>
  );
};

export default Main;
