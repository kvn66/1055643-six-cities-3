import * as React from "react";
import {Link, Redirect} from "react-router-dom";
import {Operation as UserOperation} from "../../reducers/user/user";
import {connect} from "react-redux";
import {MemoizedHeader} from "../header/header";
import {AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {AuthDataType} from "../../types";

type Props = {
  isAuthorized: boolean;
  loginOnServer: (authData: AuthDataType) => void;
}

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const {isAuthorized, loginOnServer} = props;
  const loginRef: React.RefObject<HTMLInputElement> = React.createRef();
  const passwordRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleSubmit = (evt: { preventDefault: () => void }) => {
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
                <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required/>
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input
                      ref={passwordRef}
                      className="login__input form__input" type="password" name="password" placeholder="Password"
                      required
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
