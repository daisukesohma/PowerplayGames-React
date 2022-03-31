import React, { useState } from "react";
import PropTypes from "prop-types";
import Accordian from "../Accordian";
import Power from "../../assets/power-play-sidebar-icon.png";
import Token from "../../assets/points-collected.png";
import Bitcoin from "../../assets/bitcoin.png";
import Ethereum from "../../assets/ethereum-grey.svg";
import { printLog } from "../../utility/shared";

const data = [
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "USD Cash Prizes",
    type: "cashBalance",
    balanceType: "USD",
    iconWithTitle: Token,
  },
  {
    cashTitle: "Total : ",
    cash: "5,000",
    dataTitle: "Power Token Prizes",
    type: "tokenBalance",
    balanceType: "PWRS",
    iconWithTitle: Power,
  },
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "Bitcoin Prizes",
    type: "btcBalance",
    balanceType: "ETH",
    iconWithTitle: Bitcoin,
  },
  {
    cashTitle: "Total: ",
    cash: "$4500",
    dataTitle: "Ethereum Prizes",
    type: "ethBalance",
    balanceType: "BTC",
    iconWithTitle: Ethereum,
  },
];

function ResultsInfoComponent(props) {
  const [activeTab, setActiveTab] = useState(null);
  const { isMobile = false, balance = {}, userWinnigs = [] } = props || {};
  const onClickAccordian = (index) => {
    setActiveTab(activeTab === null ? index : null);
    printLog(balance);
  };

  return (
    <>
      {data.map((v, ind) => (
        <>
          <Accordian
            title={v.dataTitle}
            visible={ind === activeTab}
            onClick={() => onClickAccordian(ind)}
            cashTitle={v.cashTitle}
            cash={balance[v.type]}
            key={ind.toString()}
            isMobile={isMobile}
            transactions={userWinnigs?.filter(
              (transaction) =>
                transaction.currency === v.balanceType
            )}
            iconWithTitle={v.iconWithTitle}
            getLiveStandings={props.getLiveStandings}
            getNHLLiveStandings={props.getNHLLiveStandings}
          />
        </>
      ))}

    </>
  );
}

ResultsInfoComponent.propTypes = {
  isMobile: PropTypes.bool,
};

export default ResultsInfoComponent;
