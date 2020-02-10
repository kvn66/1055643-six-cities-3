import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Mock = {
  locations: [
    {
      city: `Amsterdam`,
      places: [
        {
          image: `img/apartment-01.jpg`,
          priceValue: 120,
          priceText: `night`,
          name: `Beautiful &amp; luxurious apartment at great location`,
          type: `Apartment`
        },
        {
          image: `img/room.jpg`,
          priceValue: 80,
          priceText: `night`,
          name: `Wood and stone place`,
          type: `Private room`
        },
        {
          image: `img/apartment-02.jpg`,
          priceValue: 132,
          priceText: `night`,
          name: `Canal View Prinsengracht`,
          type: `Apartment`
        },
        {
          image: `img/apartment-03.jpg`,
          priceValue: 180,
          priceText: `night`,
          name: `Nice, cozy, warm big bed apartment`,
          type: `Apartment`
        },
        {
          image: `img/room.jpg`,
          priceValue: 80,
          priceText: `night`,
          name: `Wood and stone place`,
          type: `Private room`
        }
      ]
    }
  ]
};

ReactDOM.render(
    <App
      fullData={Mock}
    />,
    document.querySelector(`#root`)
);
