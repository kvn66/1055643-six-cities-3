import * as React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main";
import OfferDetailCard from "../offer-detail-card/offer-detail-card";
import Favorites from "../favorites/favorites";
import {AppRoute} from "../../const";
import RedirectRoute from "../redirect-route/redirect-route";
import SignIn from "../sign-in/sign-in";
import {AuthorizationStatus} from "../../reducers/user/user";

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <Route exact path={`${AppRoute.OFFER}/:id`}>
          <OfferDetailCard />
        </Route>
        <RedirectRoute
          exact
          path={AppRoute.LOGIN}
          redirectTo={AppRoute.ROOT}
          statusForRedirect={AuthorizationStatus.AUTH}
          render={() => {
            return (
              <SignIn />
            );
          }}
        />
        <RedirectRoute
          exact
          path={AppRoute.FAVORITES}
          redirectTo={AppRoute.LOGIN}
          statusForRedirect={AuthorizationStatus.NO_AUTH}
          render={() => {
            return (
              <Favorites />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
