import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetailCard from "../offer-detail-card/offer-detail-card.jsx";

const App = (props) => {
  const {locations} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            locations={locations}
          />
        </Route>
        <Route exact path="/offer/:id">
          <OfferDetailCard
            locations={locations}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  locations: PropTypes.arrayOf(
      PropTypes.exact({
        city: PropTypes.string.isRequired,
        cityCoordinates: PropTypes.array.isRequired,
        places: PropTypes.array.isRequired
      }).isRequired
  ).isRequired
};


export default App;
