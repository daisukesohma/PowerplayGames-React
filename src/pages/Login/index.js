import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SignInImage from "../../assets/signin-background.png";
import Input, { PasswordInput } from "../../ui/Input/Input";
import { CONSTANTS } from "../../utility/constants";
import {
  authenticate,
  disableAuthLoading,
  showAuthLoading,
} from "../../actions/authActions";
import {
  getPersonaUserId,
  removePersonaUserId,
} from "../../actions/personaActions";
import { showToast } from "../../actions/uiActions";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import Alert from "../../components/Alert";
import { isEmpty } from "lodash";
import { getLocalStorage, redirectTo } from "../../utility/shared";
import formStyles from "../../scss/formstyles.module.scss";
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";
import ErrorIcon from "../../icons/ErrorIcon";

function LoginPage(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSignedUp, setSignedUp] = useState();
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
  const [loading, setLoadingState] = useState(false);

  let iis = false;

  const dispatch = useDispatch();
  const { /*loading = false,*/ user: authUser = {} } = useSelector(
    (state) => state.auth
  );
  const { token = "", status: loggedIn = false, message = "" } = authUser || {};

  useEffect(() => {
    if (loggedIn === true && !isEmpty(authUser)) {
      redirectTo(props, { path: "/my-game-center" });
    }
  }, [loggedIn, authUser]);

  useEffect(() => {
    let params = new URLSearchParams(props.location.search);
    let signedUp = params.get("signup");
    setSignedUp(signedUp);
  }, []);

  const onLoginSubmit = async (e) => {
    e?.preventDefault();
    setIsUserNotFound(false);
    setIsIncorrectPassword(false);
    if (isEmpty(user.email) || isEmpty(user.password)) {
      //error message
      return;
    }

    // dispatch(showAuthLoading());

    setLoadingState(true);
    const res = await dispatch(authenticate(user));

    if (res && `${res.message}`.match(/User Not Found/g)) {
      setIsUserNotFound(true);
    }

    if (res && `${res.message}`.match(/Password Invalid/g)) {
      setIsIncorrectPassword(true);
    }
    setLoadingState(false);
    // dispatch(disableAuthLoading());
  };

  useEffect(() => {
    // console.log("isIncorrectPassword: ", isIncorrectPassword);
  }, [isIncorrectPassword]);

  const redirect = () => {
    if (
      !isEmpty(token) ||
      !isEmpty(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER))
    ) {
      const { location: { state = {} } = {} } = props || {};

      return <Redirect to={!isEmpty(state) ? state?.from : "/"} />;
    }
  };

  const subTitle = isSignedUp ? (
    <>
      Your account has been created. Please log in using your e-mail and
      password
    </>
  ) : (
    <>
      Let’s start your new experience our ground-breaking live-play <br /> games
      where you have the Power to control your destiny!
    </>
  );
  const title = isSignedUp ? (
    <>ALL SET!</>
  ) : (
    <>
      Get Ready <br /> to Power-Up!
    </>
  );

  useEffect(() => {
    let params = new URLSearchParams(props.location.search);
    let inquiryId = params.get("inquiry-id");
    if (inquiryId) {
      let personaUserId = getPersonaUserId();
      if (!personaUserId) {
        dispatch(
          showToast(
            "There's is some error during verification. Please try again.",
            "error"
          )
        );
      } else {
        console.log("You can go with the verification endpoint.");
        let obj = { user_id: personaUserId, inquiry_id: inquiryId };

        http
          .post(URLS.USER.PERSONA_VERIFICATION, obj)
          .then((res) => {
            if (res.data.status === true) {
              dispatch(showToast("Verification successfull.", "success"));
              removePersonaUserId();
              redirectTo(props, { path: "login?signup=true" });
            } else {
              dispatch(showToast(res.data?.message, "error"));
            }
          })
          .catch((err) => {
            console.log(err.response);
            dispatch(
              showToast(
                err?.response?.data?.message ||
                "Verification failed. Please try again.",
                "error"
              )
            );
          });
      }
    }
  }, [dispatch, props]);

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("re.test(String(email).toLowerCase())", re.test(String(email).toLowerCase()));
    return !re.test(String(email).toLowerCase());
  };

  return (
    <div className={styles.root}>
      <Header isStick={true} />
      <HeroSection title={title} subTitle={subTitle} />
      <div className={styles.container}>
        <form onSubmit={onLoginSubmit} className={formStyles.root}>
          {!isEmpty(authUser) && !loggedIn && (
            <>
              <Alert
                renderMsg={() => (
                  <p>
                    The entered email and password combination does not match
                    our records. Please try again.
                  </p>
                )}
                danger
              />
              <br />
            </>
          )}
          {!isEmpty(authUser) && loggedIn && (
            <>
              <Alert renderMsg={() => <p>Login Success</p>} success />
              <br />
            </>
          )}
          <Input
            type="text"
            title="E-mail"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e?.target?.value })}
            extraclass={styles.extra}
            extra={
              isUserNotFound && (
                <div className={styles.extra_text}>
                  User Not Found <ErrorIcon />
                </div>
              )
            }
            className={isUserNotFound ? styles.password_err : {}}
          />
          <PasswordInput
            title="Password"
            required
            value={user.password}
            extraclass={styles.extra}
            extra={
              isIncorrectPassword && (
                <div className={styles.extra_text}>
                  Incorrect <ErrorIcon />
                </div>
              )
            }
            className={isIncorrectPassword ? styles.password_err : {}}
            onChange={(e) => setUser({ ...user, password: e?.target?.value })}
          />
          <button
            className={formStyles.button}
            type="submit"
            disabled={loading || isEmpty(user.email) || isValidEmail(user.email) || isEmpty(user.password)}
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
        <p className={`${styles.blogSection}`}>
          Don't have an account?{" "}
          <Link to="/power-up">Click here to Power-up!</Link>
        </p>
        <p className={`${styles.blogSection1}`}>
          Forgot Password? <Link to="/reset-password">Click here to reset!</Link>
        </p>
      </div>
      <Footer isBlack />
      {redirect()}
    </div>
  );
}

export default LoginPage;
