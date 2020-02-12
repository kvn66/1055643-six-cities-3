import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetailCard from "../offer-detail-card/offer-detail-card.jsx";

const openDetail = (id) => {
};

const App = (props) => {
  const {locations} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            location={locations[0]}
            openDetail={openDetail}
          />
        </Route>
        <Route exact path="/offer/:id">
          <OfferDetailCard
            id={0}
            location={locations[0]}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  locations: PropTypes.array.isRequired,
};


export default App;
