import React from "react";
import { Modal } from "reactstrap";
import ThreeBoxes from "../ThreeBoxes";
import SingleBooster from "./SingleBooster";
import "./menu.scss";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN STYLE.SCSS FILE.
//********************************************************************************
//********************************************************************************
const MyPowersMenu = ({
  modal,
  toggle,
  boostModal,
  priceModal,
  swapModal,
  setModal,
  counts,
  gameID,
  gameType
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} className="popUpModal">
      <div className="modal_header">
        <div>
          <p>Powers</p>
          <h2>15,000</h2>
        </div>
        <span style={{ color: "#292a2e" }}>|</span>
        <div>
          <p>Cash</p>
          <h2>$36</h2>
        </div>
        <span style={{ color: "#292a2e" }}>|</span>
        <div>
          <h2>DEPOSIT</h2>
        </div>
      </div>

      <section className="modal_footer">
        <div className="heading">
          <h1>
            <span>MY</span> POWERS
          </h1>
        </div>
        {gameType === "NHL_Fantasy" ? <>
        <p style={{textAlign:"center"}}>Powers will not be available for this contest.</p>
        </> : 
        <>
        <div className="modal_footer__booster">
          <SingleBooster
            unlock={true}
            src="xpLocked.svg"
            heading="Point Booster"
            number={counts.pointMultiplierCounts}
          />
          <SingleBooster
            unlock={true}
            src="repeat.svg"
            heading="Swap player"
            number={counts.swapCounts}
          />
          <SingleBooster
            unlock={true}
            src="challenge-power.svg"
            heading="Challenge"
            number="2"
            number={counts.challengeCounts}
          />
        </div>
        <div className="modal_footer__booster">
          <SingleBooster src="sheilds.svg" heading="D-Wall" unlock={true} number={counts.dwallCounts}/>{" "}
          <SingleBooster
            unlock={true}
            src="retro-boostBig.svg"
            heading="Retro Boost"
            number={counts.retroBoostCounts}
          />
          <SingleBooster
            unlock={true}
            src="power-star.svg"
            heading="Power Up"
            number={counts.powerUpCounts}
          />
        </div>
        </>
        }
        <ThreeBoxes
          gameID={gameID}
          showTime={false}
          priceModal={priceModal}
          setModal={setModal}
        />
        <div className="close__box" onClick={toggle}>
          x
        </div>
      </section>
    </Modal>
  );
};

export default MyPowersMenu;
