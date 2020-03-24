import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from './reducers/root-reducer';
import createAPI from "./api";
import {Operation as CardsOperation} from "./reducers/cards/cards";
import {Operation as UserOperation, ActionCreator as UserAction, AuthorizationStatus} from "./reducers/user/user";
import {ActionCreator as NetErrorAction} from "./reducers/net-error/net-error";
import {composeWithDevTools} from 'redux-devtools-extension';
import {NetworkError, NetErrorStatus} from "./const";

const onCheckNetError = (errorStatus, errorCode, errorText) => {
  store.dispatch(NetErrorAction.setNetErrorStatus(errorStatus));
  store.dispatch(NetErrorAction.saveNetError(errorText));
  if (errorStatus && errorCode === NetworkError.UNAUTHORIZED) {
    store.dispatch(UserAction.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    store.dispatch(NetErrorAction.setNetErrorStatus(NetErrorStatus.NO_ERROR));
  }
};

const api = createAPI(onCheckNetError);

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
