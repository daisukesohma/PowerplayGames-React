import React, { useState, useEffect, Fragment } from "react";
import Billards from "../../icons/Billards";
import CasinoChips from "../../icons/CasinoChips";
import Stadium from "../../icons/Stadium";
import PowerPlayGridRow from "./PowerPlayGridRow";
import "./table.scss";
import { Link } from "react-router-dom";
import Scrollbar from "../../utility/Scrollbar";

const LivePowerPlay = (props) => {
  const [isMobileDevice, setMobileDevice] = useState(false);
  const responsiveHandler = (maxWidth) => setMobileDevice(maxWidth.matches);
  useEffect(() => {
    const maxWidth = window.matchMedia("(max-width: 1200px)");
    responsiveHandler(maxWidth);
    maxWidth.addEventListener("change", responsiveHandler);
    return () => maxWidth.removeEventListener("change", responsiveHandler);
  }, []);
  return (
    <div className="__table-wrapper __mb-6">
      <div className="__flex">
        <div className="__badges-wrapper __live-power-play-badges-wrapper __ml-a __text-in-one-line __mediam">
          <Link to="/" className="__outline-badge __active __f1">
            <Stadium />
            Live sports
          </Link>
          <Link to="/" className="__outline-badge __f1">
            <Billards />
            Power Match
          </Link>
          <Link to="/" className="__outline-badge __f1">
            <CasinoChips />
            Parlay Games
          </Link>
          <Link to="/" className="__outline-badge __f1">
            Show All
          </Link>
        </div>
      </div>

      <div className="__h6 __mt-2 __mb-1">Most Popular</div>
      <Scrollbar className="__power-center-scrollbar">
        <div className="__table __block-on-large">
          {!isMobileDevice && (
            <Fragment>
              <div className="__h6">Sport</div>
              <div className="__h6">Contest</div>
              <div className="__h6">Entries (min)</div>
              <div className="__h6">Total Prize</div>
              <div className="__h6"></div>
            </Fragment>
          )}
          <PowerPlayGridRow
            type="Chase The Ace"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="58589"
            totalEntries="200000"
            prize="800"
            entryFee="1000"
            isMobileDevice={isMobileDevice}
            link="/card-game"
          />
          <PowerPlayGridRow
            type="Power Poker"
            Icon={Billards}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="15395"
            totalEntries="19161"
            prize="$1K in Bonus Cash"
            isMobileDevice={isMobileDevice}
            link="/power-poker"
          />
          <PowerPlayGridRow
            type="Bingo"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="1497"
            totalEntries="150000"
            prize="3000"
            entryFee="10,000"
            isMobileDevice={isMobileDevice}
            link="/bingo-pre-game"
          />
          <PowerPlayGridRow
            type="21’s"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="27433"
            totalEntries="71856"
            prize="$3K in Bonus Cash"
            isMobileDevice={isMobileDevice}
          />
          <PowerPlayGridRow
            type="747"
            Icon={Billards}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="32795"
            totalEntries="250000"
            prize="3000"
            isMobileDevice={isMobileDevice}
          />
          <PowerPlayGridRow
            type="Elite 8"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="18699"
            totalEntries="247904"
            prize="10,0000"
            isMobileDevice={isMobileDevice}
            link="/elite8"
          />
          <PowerPlayGridRow
            type="Elite 8"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="21183"
            totalEntries="59523"
            prize="300,000"
            isMobileDevice={isMobileDevice}
            link="/elite8"
          />
          <PowerPlayGridRow
            type="Power Royals"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="27433"
            totalEntries="71856"
            prize="$3K in Bonus Cash"
            isMobileDevice={isMobileDevice}
            link="/power-royals"
          />
          <PowerPlayGridRow
            type="747"
            Icon={Billards}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="32795"
            totalEntries="250000"
            prize="3000"
            isMobileDevice={isMobileDevice}
          />
          <PowerPlayGridRow
            type="Power Royals"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="18699"
            totalEntries="247904"
            prize="10,0000"
            isMobileDevice={isMobileDevice}
            link="/power-royals"
          />
          <PowerPlayGridRow
            type="Elite 8"
            Icon={CasinoChips}
            date="Oct 24, 2020"
            time="8:00PM ET"
            contest="TDB"
            entries="21183"
            totalEntries="59523"
            prize="300,000"
            isMobileDevice={isMobileDevice}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

export default LivePowerPlay;
