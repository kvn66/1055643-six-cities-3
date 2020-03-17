import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducers/user/selectors";


const RedirectRoute = (props) => {
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

RedirectRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  statusForRedirect: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(RedirectRoute);
