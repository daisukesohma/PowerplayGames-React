import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isEmpty, isEqual } from "lodash";

import Input, { PasswordInput } from "../../ui/Input/Input";
import Alert from "../../components/Alert";
import { redirectTo } from "../../utility/shared";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import img1 from "../../assets/group-141.png";
import img2 from "../../assets/group-14.png";
import styles from "./styles.module.scss";
import formStyles from "../../scss/formstyles.module.scss";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const CreateAccount = (props) => {
  const history = useHistory();
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      username = "",
      email = "",
      password = "",
      cPassword = "",
    } = props.user || {};
    props.setUser({ ...props.user, isLoading: true });
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(cPassword)
    ) {
      return props.setUser({
        ...props.user,
        isLoading: false,
        isFailed: true,
        errorMsg: "All fields are required",
      });
    }

    if (!isEqual(password, cPassword)) {
      return props.setUser({
        ...props.user,
        isLoading: false,
        isFailed: true,
        errorMsg: "Password did not match",
      });
    }
    if (!passwordPattern.test(password)){
      return props.setUser({
        ...props.user,
        isLoading: false,
        isFailed: true,
        errorMsg: "Passwords should contain 8-20 characters with at least one letter and one number",
      });
    }

    const data = {
      email,
      password,
      username,
    };
    const response = await http.post(URLS.AUTH.VERIFY_EMAIL, data);
    if (response.data.status === false) {
      return props.setUser({
        ...props.user,
        isLoading: false,
        isFailed: true,
        errorMsg: response.data.message,
      });
    }

    redirectTo({ history }, { path: "email-verification", state: data });
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    props.setUser({
      ...props.user,
      isLoading: false,
    });
  }, []);

  return (
    <main className={styles.root101}>
      <section className={`${styles.leftSection}`}>
        <div className={styles.titleWrapper}>
          {windowDimensions.width <= 550 ? (
            <h3 className="fw-bold mb-2" style={{ whiteSpace: "nowrap" }}>
              Earn up to <br /> 130 Power Tokens
            </h3>
          ) : (
            <h3 className="fw-bold mb-2">Earn up to 130 Power Tokens</h3>
          )}
          <h4>during Sign-up!</h4>
        </div>
        {windowDimensions.width <= 550 ? (
          <img alt="" src={img1} />
        ) : (
          <img alt="" src={img2} />
        )}
      </section>

      <form
        className={`${formStyles.root2} pt-4`}
        action={null}
        onSubmit={onSubmit}
      >
        <div
          className={`${formStyles.header} text-center d-block my-sm-0 my-3`}
        >
          <h2 className={`${styles.formTitle} fw-bold`}>
            Earn 20 Power Tokens
          </h2>
          <h6 className={styles.formSubTitle} style={{ fontWeight: "500" }}>
            just for signing up
          </h6>
        </div>
        {!props.user?.isFailed && !isEmpty(props.user.errorMsg) && (
          <Alert renderMsg={() => <p>{props.user.errorMsg}</p>} danger />
        )}
        {props.user.isFailed && !isEmpty(props.user.errorMsg) && (
          <Alert renderMsg={() => <p>{props.user.errorMsg}</p>} danger />
        )}

        {props.user.isSuccess && !isEmpty(props.user.errorMsg) && (
          <Alert renderMsg={() => <p>{props.user.errorMsg}</p>} success />
        )}

        <Input
          type="text"
          title="Display Name"
          id="username"
          value={props.user.username}
          onChange={(e) => {
            props.setUser({ ...props.user, username: e?.target?.value });
          }}
        />
        <Input
          type="email"
          title="E-mail"
          id="email"
          value={props.user.email}
          onChange={(e) => {
            props.setUser({ ...props.user, email: e?.target?.value });
          }}
        />
        <PasswordInput
          title="Create-a-password"
          id="password"
          value={props.user.password}
          onChange={(e) => {
            props.setUser({ ...props.user, password: e?.target?.value });
          }}
        />
        <PasswordInput
          title="Confirm your password"
          id="confirmpassword"
          value={props.user.cPassword}
          onChange={(e) => {
            props.setUser({ ...props.user, cPassword: e?.target?.value });
          }}
        />
        <button className={formStyles.button} disabled={props.user.isLoading}>
          {props.user.isLoading ? "Loading..." : "Next"}
        </button>
        <p
          className="position-absolute"
          style={{ left: "25%", bottom: "-12%" }}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-underline">
            Log in!
          </Link>
        </p>
      </form>
    </main>
  );
};

export default CreateAccount;
