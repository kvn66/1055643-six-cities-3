import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducers/user/selectors";


type Props = RouteProps & {
  isAuthorized: boolean;
  statusForRedirect: boolean;
  redirectTo: string;
  render: () => React.ReactNode;
}

const RedirectRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, redirectTo, statusForRedirect, exact, isAuthorized} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          isAuthorized === statusForRedirect
            ? <Redirect to={redirectTo} />
            : render()
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(RedirectRoute);
