import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classes from "./index.module.scss";

function ResultCard(props) {
  const { isMobile = false } = props || {};
  const { transactions = [] } = props || [];
  const getLiveStandingsButton =  (game_id) => {
    props.getNHLLiveStandings(game_id);
  };
  function TableRow(props) {
    const { transaction = {}, isMobile = false } = props || {};
    const getDate = (timestamp) => {
      return moment(timestamp).format("MMM D");
    };
    const getTime = (timestamp) => {
      return moment(timestamp).format("hh:mm A");
    };
    return (
      <div className={classes.row}>
        {isMobile ? (
          <>
            <div className={classes.row_m}>
              <div className={classes.row_m1}>
                <span>Date</span>
                <span>{getDate(transaction.startTimeStamp)}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Time</span>
                <span>{getTime(transaction.startTimeStamp)}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game League</span>
                <span>{transaction?.league || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game Type</span>
                <span>{transaction?.gameType || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game ID</span>
                <span>{transaction?.gameID || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Points</span>
                <span>{transaction?.result || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Rank</span>
                <span>{transaction?.rank || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Amount Won</span>
                <span>{transaction.winning_amount || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Results</span>
                <span>Verfied</span>
              </div>
            </div>
            <div className={classes.row_m_footer}>
              <button onClick={() => {
                  getLiveStandingsButton(transaction?.gameID || 0);
                }}>View Results</button>{" "}
            </div>
          </>
        ) : (
          <>
            <div>{getDate(transaction.startTimeStamp)} </div>
            <div>{getTime(transaction.startTimeStamp)} </div>
            <div>{transaction?.league || "--"} </div>
            <div>{transaction?.gameType || "--"} </div>
            <div>{transaction?.gameID || "--"} </div>
            <div>{transaction?.result || "--"}</div>
            <div>{transaction?.rank || "--"}</div>
            <div>{transaction?.winning_amount || "--"}</div>
            <div>Verfied</div>
            <div>
              <button onClick={() => {
                  getLiveStandingsButton(transaction?.gameID || 0);
                }}>View Results</button>{" "}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={classes.table_wrapper}>
      <div className={classes.table_header}>
        <div className={classes.row}>
          <div>Date</div>
          <div>Time</div>
          <div>League</div>
          <div>Game Type</div>
          <div>Game ID</div>
          <div>Points</div>
          <div>Rank</div>
          <div>Amount Won</div>
          <div>Results</div>
          <div>Actions</div>
        </div>
      </div>

      <div className={classes.table_body}>
        {transactions.map(function (row, index) {
          return <TableRow transaction={row} isMobile={isMobile} />;
        })}
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  isMobile: PropTypes.bool,
};

export default ResultCard;
