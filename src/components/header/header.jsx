import React from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus, getUserInfo} from "../../reducers/user/selectors";
import {connect} from "react-redux";
import {AppRoute} from "../../const";

const Header = (props) => {
  const {isAuthorized, userInfo} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="/">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href={isAuthorized ? AppRoute.FAVORITES : AppRoute.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {isAuthorized ?
                    (
                      <span className="header__user-name user__name">{userInfo.email}</span>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )
                  }
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired
  }).isRequired,
};

const mapStateToProps = (store) => {
  return {
    isAuthorized: getAuthorizationStatus(store),
    userInfo: getUserInfo(store),
  };
};

export const MemoizedHeader = React.memo(connect(mapStateToProps)(Header));

export default connect(mapStateToProps)(Header);
