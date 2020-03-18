import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from './reducers/root-reducer';
import createAPI from "./api.js";
import {Operation as CardsOperation} from "./reducers/cards/cards.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducers/user/user.js";
import {composeWithDevTools} from 'redux-devtools-extension';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(CardsOperation.loadCards());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />,
    </Provider>,
    document.querySelector(`#root`)
);
