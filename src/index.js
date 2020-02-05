import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  PLACES: 220
};

ReactDOM.render(
    <App
      placesCount={Settings.PLACES}
    />,
    document.querySelector(`#root`)
);
