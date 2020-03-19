import * as React from "react";
import Cities from "../cities/cities";
import {MemoizedHeader} from "../header/header";

const Main: React.FunctionComponent = () => {
  return (
    <div className="page page--gray page--main">
      <MemoizedHeader />

      <Cities />

    </div>
  );
};

export default Main;
