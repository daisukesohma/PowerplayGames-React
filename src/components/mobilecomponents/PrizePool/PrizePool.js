import React from "react";
import { Link } from "react-router-dom";
import { SearchFields } from "../SwapStarter/style";
import PlayerCard from "./PlayerCard";
import "./price_pool.scss";
const PrizePool = () => {
  return (
    <section className="pool__wrapper ">
      <div className="wrap">
        <div>
          <h1>$10,000</h1>
          <p>Prize Pool</p>
        </div>
      </div>

      <Link to="/mobile" style={{ textDecoration: "none" }}>
        <div className="liveGame">
          <img src="/images/backArrow.svg" alt="arrow" />
          <h3>Back to Live play</h3>
        </div>
      </Link>

      <SearchFields space={true}>
        <div className="input__search">
          <input type="text" placeholder="Search By Player Name" />
          <img src="/images/searchIcon.svg" alt="icon" />
        </div>
        <div className="select__feilds">
          <select>
            <option>All Teams</option>
            <option>All Teams</option>
            <option>All Teams</option>
            <option>All Teams</option>
          </select>

          <img src="/images/arrow-right.svg" alt="arrow" />
        </div>
      </SearchFields>
      <PlayerCard />
    </section>
  );
};

export default PrizePool;
