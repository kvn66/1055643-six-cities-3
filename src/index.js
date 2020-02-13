import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {locations} from "./mocks/offers.js";

ReactDOM.render(
    <App
      locations={locations}
    />,
    document.querySelector(`#root`)
);
