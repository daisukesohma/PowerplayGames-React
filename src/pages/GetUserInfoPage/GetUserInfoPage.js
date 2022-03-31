import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import {
  redirectTo,
  printLog,
} from "../../utility/shared";
//store
import { useDispatch, useSelector } from "react-redux";
import {
  removePersonaUserId,
  savePersonaUserId,
} from "../../actions/personaActions";
//lodash
import { isEmpty } from "lodash";
//ui component imports
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import CheckBox from "../../ui/CheckBox/CheckBox";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Alert from "../../components/Alert";
//imgs
import powerplayicon from "../../assets/powerplay-icon.png";
import img1 from "../../assets/group-141.png";
import img2 from "../../assets/group-14.png";
//css
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";
import formStyles from "../../scss/formstyles.module.scss";
import styles from "./styles.module.scss";
import { getDBCountries } from "../../actions/userActions";

const INITIAL_STATE = {
  //from step 1
  username: "",
  email: "",
  password: "",

  firstName: "",
  lastName: "",

  country: 0,
  stateOrProvince: "",
  dateOfBirth: "",

  termsAndConditions: false,
  promotionsCheck: false,
  updatesCheck: false,
  ageCheck: false,

  isLoading: false,
  isSuccess: false,
  isFailed: false,

  errorMsg: "",
  message: "",
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const GetUserInfoPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cont = useSelector((state) => state?.user?.countries);
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );
  const [user, setUser] = useState({
    ...INITIAL_STATE,
    username: props.location.state.username,
    email: props.location.state.email,
    password: props.location.state.password,
    country: "Canada",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    dispatch(getDBCountries());
  }, []);

  useEffect(() => {
    if (user.isSuccess || isEmpty(props.location.state.email)) {
      // redirectTo(props, { path: "login" });
      redirectTo(props, { path: "verify-your-identity" });
    }
  }, [user]);

  useEffect(() => {
    setUser({ ...user, stateOrProvince: "" });
  }, [user.country]);

  useEffect(() => {
    // it will remove the id of any previous user before the registeration of new one.
    removePersonaUserId();
  }, []);

  useEffect(() => {
    setCountries(cont);
  }, [cont])

  const addressChnageHandler = (e) => {
    const { target: { value = "", name = "" } = {} } = e || {};
    setUser({ ...user, [name]: value });
  };
  const dateOfBirthChangeHandler = (e) => {
    const { target: { value = "", name = "" } = {} } = e || {};
    setUser({ ...user, [name]: value });
  };
  const handleCheckBox = (e) => {
    const { target: { checked = false, name = "" } = {} } = e || {};

    setUser({ ...user, [name]: checked });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    printLog("User", user);
    const {
      username = "",
      email = "",
      password = "",

      firstName = "",
      lastName = "",

      country = 0,
      stateOrProvince = "",

      dateOfBirth = "",

      termsAndConditions = false,
      promotionsCheck = false,
      updatesCheck = false,
      ageCheck = false,
    } = user || {};
    setUser({ ...user, isLoading: true });

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(country) ||
      isEmpty(stateOrProvince) ||
      isEmpty(dateOfBirth)
    ) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "All fields are required",
      });
    }
    if (!ageCheck) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "Please Confirm that you are above the age of Majority",
      });
    }
    if (!termsAndConditions) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "Please agree to terms and conditions",
      });
    }
    if (!updatesCheck) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "Please agree to receive email about games status",
      });
    }

    const data = {
      username,
      firstName,
      lastName,
      email,
      password,
      country,
      stateOrProvince,
      dateOfBirth,
      updatesCheck,
      promotionsCheck,
    };

    const response = await http.post(URLS.AUTH.REGISTER, data);
    if (response.data.status === false) {
      return setUser({
        ...user,
        isLoading: false,
        isFailed: true,
        errorMsg: response.data.message,
      });
    } else {
      savePersonaUserId(response?.data?.user?.user_id);
    }

    setUser({
      ...user,
      isLoading: false,
      isSuccess: true,
      errorMsg: response.data.message,
    });

    redirectTo(
      { history },
      { path: "verify-your-identity", state: props.data }
    );
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    setUser({
      ...user,
      isLoading: false,
    });
  }, [])

  return (
    <>
      <Header isStick={true} />
      <HeroSection
        isBlack={true}
        title={
          <>
            Get Ready <br /> to Power-Up!
          </>
        }
        subTitle={
          <>
            {/* Complete the fields below to create your PowerPlay Account. <br />{" "}
            As a bonus you can receive up to{" "}
            <span style={{color: '#fb6e00'}}>
              30 <img src={powerplayicon} alt="" align="center" /> Powerplay
              tokens!
            </span> */}
            Provide a few more details to finish creating your Defy Games
            account
          </>
        }
      />
      <main className={styles.root}>
        <section className={`${styles.leftSection}`}>
          <div className={styles.titleWrapper}>
            <h3 className="fw-bold mb-2">10 Power Tokens</h3>
            <h4>will be added to your account</h4>
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
              Receive up to 10 Power Tokens
            </h2>
            <h6 className={styles.formSubTitle} style={{ fontWeight: "500" }}>
              at this step
            </h6>
          </div>
          {!user?.isFailed && !isEmpty(user.errorMsg) && (
            <Alert renderMsg={() => <p>{user.errorMsg}</p>} danger />
          )}
          {user.isFailed && !isEmpty(user.errorMsg) && (
            <Alert renderMsg={() => <p>{user.errorMsg}</p>} danger />
          )}

          {user.isSuccess && !isEmpty(user.errorMsg) && (
            <Alert renderMsg={() => <p>{user.errorMsg}</p>} success />
          )}
          <Input
            type="text"
            title="First Name"
            id="firstName"
            value={user.firstName}
            onChange={(e) => {
              setUser({ ...user, firstName: e?.target?.value });
            }}
          />
          <Input
            type="text"
            title="Last Name"
            id="lastName"
            value={user.lastName}
            onChange={(e) => {
              setUser({ ...user, lastName: e?.target?.value });
            }}
          />
          <div className={formStyles.row}>
            <Select
              id="country"
              name="country"
              className="w-100"
              title="Country"
              value={user.country}
              onChange={addressChnageHandler}
            >
              <option hidden disabled value="">
                Country
              </option>
              {countries && countries.map((item, index) => {
                return (
                  <option key={index} value={item.name}>{item?.name}</option>
                )
              })}
            </Select>
            <Select
              id="stateOrProvince"
              name="stateOrProvince"
              className="w-100"
              title="State/Province"
              value={user.stateOrProvince}
              onChange={addressChnageHandler}
            >
              <option hidden disabled value="">
                State/Province
              </option>
              {countries && countries.map((item, index) => {
                return (
                  item.name == user.country && (
                    item.country_state_provs.map((sp, index) => {
                      return (
                        <option key={index} value={sp?.name}>{sp?.name}</option>
                      )
                    })
                  )
                )
              })}
            </Select>
          </div>
          <div>
            <Input
              type="date"
              title="Date Of Birth"
              id="dateOfBirth"
              value={user.dateOfBirth}
              onChange={(e) => {
                setUser({ ...user, dateOfBirth: e?.target?.value });
              }}
              extraclass={styles.dob}
              // extra={
              //   <div className={styles.bonus}>
              //     <p>+ 5 bonus tokens</p>
              //     <img src={powerplayicon} alt="" />
              //   </div>
              // }
            />
          </div>
          <br />
          <CheckBox
            checked={user.ageCheck}
            onChange={handleCheckBox}
            name="ageCheck"
            title="I am over the age of majority in the state or province where currently reside."
          />
          <CheckBox
            checked={user.termsAndConditions}
            onChange={handleCheckBox}
            name="termsAndConditions"
            title={
              <>
                I have read agree to the
                <Link to="/terms" target="_blank"> terms and conditions </Link>for using this
                website.
              </>
            }
          />
          <CheckBox
            checked={user.updatesCheck}
            onChange={handleCheckBox}
            name="updatesCheck"
            title="I agree to receive email communications regarding status of games that I enter."
          />
          <CheckBox
            checked={user.promotionsCheck}
            onChange={handleCheckBox}
            name="promotionsCheck"
            title={
              <>
                I agree to receive marketing email communications from Powerplay
                Systems and or their partners.{" "}
                <span className={styles.blogSection}>
                  + 5 bonus tokens{" "}
                  <img src={powerplayicon} alt="" align="center" />
                </span>
              </>
            }
          />
          <button className={formStyles.button} disabled={
            (user.ageCheck && user.termsAndConditions && user.updatesCheck) === true ? false : true
          } style={{
            backgroundColor: (user.ageCheck && user.termsAndConditions && user.updatesCheck) === true && !(
              isEmpty(user.firstName) ||
              isEmpty(user.lastName) ||
              isEmpty(user.country) ||
              isEmpty(user.stateOrProvince) ||
              isEmpty(user.dateOfBirth)
            ) ? "#fb6e00" : "#FDC79C",
          }}>
            {user?.isLoading ? "LOADING..." : "NEXT"}
          </button>
        </form>
      </main>
      <Footer isBlack={true} />
    </>
  );
};

export default GetUserInfoPage;
