import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducers/user/selectors";


type Props = {
  isAuthorized: boolean;
  statusForRedirect: boolean;
  exact: boolean;
  path: string;
  redirectTo: string;
  render: () => void;
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
