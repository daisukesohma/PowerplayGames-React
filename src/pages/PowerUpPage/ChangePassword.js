import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import Footer from "../../components/Footer/Footer";
import { PasswordInput } from "../../ui/Input/Input";

import http from "../../config/http";
import { URLS } from "../../config/urls";
import Alert from "../../components/Alert";
import { isEmpty, isEqual } from "lodash";
import { redirectTo } from "../../utility/shared";
import formStyles from "../../scss/formstyles.module.scss";

function ChangePassword(props) {
  const [user, setUser] = useState({ email: "", password: "", cPassword: "" });
  const [loading, setLoadingState] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const onSubmit = async (e) => {
    setLoadingState(true)
    e.preventDefault();

    const u = user;
    u['email'] = props.email;
    setUser(u);

    if (
      isEmpty(user.email) ||
      isEmpty(user.password) ||
      isEmpty(user.cPassword)
    ) {
      setLoadingState(false);
      setIsError(true)
      setErrorMessage("All fields are required")
    }

    if (!isEqual(user.password, user.cPassword)) {
      setIsError(true)
      setLoadingState(false);
      setErrorMessage("Password did not match")
    }

    const data = {
      email: user.email,
      password: user.password,
    };

    const response = await http.post(URLS.AUTH.RESET_PASSWORD, data);
    if (response.data.status === true) {
      redirectTo({ history }, { path: "login" });
    }
    setLoadingState(false);
  };

  return (
    <div className={styles.root}>

      <div className={styles.container}>
        <form onSubmit={onSubmit} className={formStyles.root}>
          {isError && (
            <>
              <Alert
                renderMsg={() => (
                  <p>
                    {errorMessage}
                  </p>
                )}
                danger
              />
              <br />
            </>
          )}

          <PasswordInput
            title="Create-a-password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e?.target?.value });
            }}
          />
          <PasswordInput
            title="Confirm your password"
            id="confirmpassword"
            value={user.cPassword}
            onChange={(e) => {
              setUser({ ...user, cPassword: e?.target?.value });
            }}
          />
          <button
            className={formStyles.button}
            type="submit"
            disabled={loading || isEmpty(user.password)}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

      </div>
      <Footer isBlack />
    </div>
  );
}

export default ChangePassword;
