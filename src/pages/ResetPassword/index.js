import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Verification from "../PowerUpPage/Verification";
import ChangePassword from '../PowerUpPage/ChangePassword';
import Input from "../../ui/Input/Input";
import {
  verifyRegistredEmail
} from "../../actions/authActions";

import Alert from "../../components/Alert";
import { isEmpty } from "lodash";
import formStyles from "../../scss/formstyles.module.scss";
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";

function ResetPasswordPage(props) {
  const [userEmail, setUserEmail] = useState("");
  const [isInvalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoadingState] = useState(false);
  const [isVerificationScreen, setIsVerificationScreen] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();


  if (history?.location?.state?.isUserEmailValid && !isEmailValid) {
    setIsEmailValid(true);
  }

  const onSendEmailSubmit = async (e) => {
    e?.preventDefault();

    if (isEmpty(userEmail)) {
      //error message
      return;
    }

    setLoadingState(true);

    const res = await dispatch(verifyRegistredEmail({ email: userEmail }));
    if (res && `${res?.data}`.match(/email not registered with us/g)) {
      setInvalidEmail(true);
    } else if (res && `${res?.data?.message}`.match(/Email Verification Sent/g)) {
      setIsVerificationScreen(true);
    }
    setLoadingState(false);
  };

  const subTitle = (
    <>
      Let’s start your new experience our ground-breaking live-play <br /> games
      where you have the Power to control your destiny!
    </>
  );
  const title = (
    <>ALL SET!</>
  );

  return (
    <div className={styles.root}>
      <Header isStick={true} />

      {
        isEmailValid ? (
          <>
            <HeroSection />
            <ChangePassword email={history?.location?.state?.email} />
          </>
        ) : (
          <>
            <HeroSection title={title} subTitle={subTitle} />
            {!isVerificationScreen ? (
              <div className={styles.container}>
                <form onSubmit={onSendEmailSubmit} className={formStyles.root}>
                  {isInvalidEmail && (
                    <>
                      <Alert
                        renderMsg={() => (
                          <p>
                            EMail address is not registered with us. Please create account.
                          </p>
                        )}
                        danger
                      />
                      <br />
                    </>
                  )}
                  <Input
                    type="text"
                    title="E-mail"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e?.target?.value)}
                  />

                  <button
                    className={formStyles.button}
                    type="submit"
                    disabled={loading || isEmpty(userEmail)}
                  >
                    {loading ? "Loading..." : "Send Email"}
                  </button>
                </form>
                <p className={`${styles.blogSection}`}>
                  Don't have an account?{" "}
                  <Link to="/power-up">Click here to Power-up!</Link>
                </p>
                <p className={`${styles.blogSection1}`}>
                  Remember Password? <Link to="/login">Click here to Login!</Link>
                </p>
              </div>

            ) : (
              <>
                <Verification data={{ email: userEmail }} page={'reset-password'} />
              </>
            )}
          </>
        )
      }

      <Footer isBlack />
    </div >
  );
}

export default ResetPasswordPage;
