import React from "react";
import classes from "./contest.module.scss";
import correctcopy from "../../assets/correct-copy-2.svg";
import ContestRulesPopUp from "../ContestRulesPopUp";
import _ from 'underscore';
const data = [
  {
    heading: "The 8 roster positions:",
    teamRoster: [
      {
        count: 1,
        title: "P",
        value: "(Pitcher)",
      },
      {
        count: 1,
        title: "C",
        value: "(Catcher)",
      },
      {
        count: 1,
        title: "SS",
        value: "(Shortstop)",
      },
      {
        count: 2,
        title: "xB",
        value: "(1B, 2B or 3B)",
      },
      {
        count: 2,
        title: "OF",
        value: "(Outfielders)",
      },
      {
        count: 1,
        title: "Team Defense",
        value: "",
      },
    ],
  },
];

const ContestRules = (props) => {
  const { title = "", game_type="", isMobile = false } = props || {};
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(props.game_set_start);
  const groupedPoints = _.groupBy(props.points, 'type');
  const point=props?.points
  return (
    <div className={`
      ${
        props.isMobileGameCenter?classes.__contest_rules_gamecenter:classes.__contest_rules
      }
    `}>
      {props?.isMobileGameCenter && props?.showDateTime && 
        <div className={classes.__point_system_date_time}>
            {props?.game_set_start} | {props?.start_time} ET
        </div>
      }
      {props.isMobileGameCenter?(
        <p className={`${classes.__contest_rules_main_title} ${props?.showDateTime?classes.__contest_rules_main_title_nopadding:''}`}>
          <span>{title}</span>
          <span style={{color: "#fb6e00", fontWeight: "bold"}}> {game_type === "NHL_Fantasy" ? "Fantasy" : "PowerdFS"} </span>
          <span className={classes.subtitle}>Gameplay Rules</span></p>
      ):(
        <p className={classes.__contest_rules_main_title}>Gameplay Rules</p>
      )}
      
      <ul>
          <li><span>${props.prize}</span> Prize Pool</li>
          {game_type === "NHL_Fantasy" ? "" : <li>Live Play <span>Powers</span> included with entry fee</li>}
          <li>Pick players from any teams scheduled to play on <span>{monthNames[d.getUTCMonth()]} {("0" + d.getUTCDate()).slice(-2)}, {d.getUTCFullYear()}</span></li>
      </ul>
      <ContestRulesPopUp
        game_type={game_type}
        points={groupedPoints}
        point={point}
        isMyGameCenter={props?.myGameCenter}
        powers={props.powers}
        component={({ showPopUp }) => (
            <a
            onClick={showPopUp}
            href="#"
            >
                See Full Gameplay Rules
            </a>
        )}
        title={title}
        />
    </div>
  );
};

export default ContestRules;
