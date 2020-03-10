import React, {createRef} from "react";
import {Operation as UserOperation} from "../../reducers/user/user";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getReviews} from "../../reducers/reviews/selectors";

const SignIn = (props) => {
  const {login} = props;
  const loginRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
  return {
    reviews: getReviews(store),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (authData) => dispatch(UserOperation.login(authData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
