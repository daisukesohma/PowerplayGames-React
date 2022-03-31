import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import classes from "./MyGameCenter.module.scss";
import Header from "../../components/Header/Header";
import "./MyGameCenter.scss";
import "./table.scss";
import Footer from "../../components/Footer/Footer";
import InteractiveContests from "./InteractiveContests";
import MyGameCenterTable from "./MyGameCenterTable";
import { getLocalStorage, printLog } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import Balance from "../../components/Balance";
import MobileBalance from "../../components/MobileBalance";
import { showDepositForm } from "../../actions/uiActions";
import LiveStandings from "../../components/LiveStandings";

const MyGameCenter = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
  const { url } = props.match;
  const { auth: { user: { token = "" } } = {} } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showModal, setModalState] = useState(false);

  const setShowDepositModal = () => dispatch(showDepositForm());

  return (
    <Fragment>
      <Header style={{maxWidth: 1240}}/>
      <div className="__my_game_center">
        <div className="__my_game_center_banner">
          <div className="__my_game_center_banner_left __container" style={{maxWidth: 1240}}>
            <div className="__my_game_center_banner_left_title_main">
              My Game Center
            </div>
          </div>
        </div>
        {isMobile ? (
            <MobileBalance depositClicked={setShowDepositModal} />
        ) : (
            <div style={{backgroundColor: "#000"}}>
              <Balance depositClicked={setShowDepositModal} style={{maxWidth: 1240, margin: "0 auto"}}/>
            </div>
        )}
        <div className={classes.container} style={{maxWidth: 1240}}>
          <Route exact path={url} component={InteractiveContests} />
          <Route path={`${url}/contests`} component={MyGameCenterTable} />
        </div>
      </div>
      <Footer isBlack={true} />
      {/* <LiveStandings visible={showModal} onClose={setModalState(false)} /> */}
    </Fragment>
  );
};

export default MyGameCenter;
