import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { redirectTo } from "../../utility/shared";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import styles from "./styles.module.scss";
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";
import CreateAccount from "./CreateAccount";
import Verification from "./Verification";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  cPassword: "",
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  errorMsg: "",
  message: "",
};

const PowerUpPage = (props) => {
  const [user, setUser] = useState(INITIAL_STATE);

  useEffect(() => {
    if (user.isSuccess) {
      redirectTo(props, { path: "login" });
    }
  }, [user, props]);

  useEffect(() => {
    async function sendVerificationEmail() {
      if (props.verification) {
        const { state } = props?.location;

        if (state?.email) {
          await http.post(URLS.USER.SEND_EMAIL_CONFIRMATION, {
            email: state.email,
          });
        } else {
          redirectTo(props, { path: "/power-up" });
        }
      }
    }

    sendVerificationEmail();
  }, [props, props.verification]);

  return (
    <div className={styles.root}>
      <Header isStick={true} />
      <HeroSection
        title={
          <>
            Get Ready <br />
            to Power-Up!
          </>
        }
        subTitle={
          <>
            Start your new fantasy experience on our live-play platform <br />{" "}
            where you have the Power to control your team's destiny!
          </>
        }
      />
      {props.verification ? (
        <Verification data={props?.location?.state} />
      ) : (
        <CreateAccount user={user} setUser={setUser} />
      )}

      <Footer isBlack={true} />
    </div>
  );
};

export default PowerUpPage;
