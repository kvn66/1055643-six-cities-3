import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetailCard from "../offer-detail-card/offer-detail-card.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/offer/:id">
          <OfferDetailCard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
