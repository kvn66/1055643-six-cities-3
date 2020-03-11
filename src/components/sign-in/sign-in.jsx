import React, {createRef} from "react";
import {Operation as UserOperation} from "../../reducers/user/user";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getSelectedCityName} from "../../reducers/cards/selectors";
import {MemoizedHeader} from "../header/header.jsx";

const SignIn = (props) => {
  const {cityName, loginOnServer} = props;
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
              <a className="locations__item-link" href="/">
                <span>{cityName}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

SignIn.propTypes = {
  cityName: PropTypes.string.isRequired,
  loginOnServer: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
  return {
    cityName: getSelectedCityName(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginOnServer: (authData) => dispatch(UserOperation.loginOnServer(authData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
