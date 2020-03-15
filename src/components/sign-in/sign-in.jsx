import React, {createRef} from "react";
import {Link, Redirect} from "react-router-dom";
import {Operation as UserOperation} from "../../reducers/user/user";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {MemoizedHeader} from "../header/header.jsx";
import {AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../reducers/user/selectors";

const SignIn = (props) => {
  const {isAuthorized, loginOnServer} = props;
  const loginRef = createRef();
  const passwordRef = createRef();

  const submitHandler = (evt) => {
    evt.preventDefault();

    loginOnServer({
      email: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    isAuthorized ?
      (
        <Redirect to={AppRoute.ROOT} />
      ) : (
        <div className="page page--gray page--login">
          <MemoizedHeader />

          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form onSubmit={submitHandler} className="login__form form" action="#" method="post">
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required=""/>
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input
                      ref={passwordRef}
                      className="login__input form__input" type="password" name="password" placeholder="Password"
                      required=""
                    />
                  </div>
                  <button className="login__submit form__submit button" type="submit">Sign in</button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to={AppRoute.ROOT}>
                    <span>Amsterdam</span>
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      )
  );
};

SignIn.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  loginOnServer: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
  return {
    isAuthorized: getAuthorizationStatus(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginOnServer: (authData) => dispatch(UserOperation.loginOnServer(authData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
