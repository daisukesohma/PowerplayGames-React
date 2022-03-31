import React from "react";
import classes from "./teamRoster.module.scss";
import { useMediaQuery } from "react-responsive";
const data = [
  {
    type: "MLB",
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
      }
    ]
  },
  {
    type: "NFL",
    heading: "The 8 roster positions:",
    teamRoster: [
      {
        count: 1,
        title: "QB",
        value: "(Quarterback)",
      },
      {
        count: 2,
        title: "RB",
        value: "(Running Backs)",
      },
      {
        count: 2,
        title: "WR",
        value: "(Wide Receivers)",
      },
      {
        count: 1,
        title: "TE",
        value: "(Tight End)",
      },
      {
        count: 1,
        title: "K",
        value: "(Kicker)",
      },
      {
        count: 1,
        title: "Team Defense",
        value: "",
      }
    ]
  },
  {
    type: "NHL",
    heading: "The 8 roster positions:",
    teamRoster: [
      {
        count: 1,
        title: "C",
        value: "(Center)",
      },
      {
        count: 3,
        title: "XW",
        value: "(Wingers)",
      },
      {
        count: 2,
        title: "D",
        value: "(Defensemen)",
      },
      {
        count: 1,
        title: "G",
        value: "(Goalie)",
      },
      {
        count: 1,
        title: "Team Defense",
        value: "",
      }
    ]
  },
  {
    type: "NBA",
    heading: "The 8 roster positions:",
    teamRoster: [
      {
        count: 1,
        title: "C",
        value: "(Center)",
      },
      {
        count: 2,
        title: "PG",
        value: "(Point Guard)",
      },
      {
        count: 2,
        title: "SG",
        value: "(Shooting Guard)",
      },
      {
        count: 2,
        title: "F",
        value: "(Small/Power Forward)",
      },
      {
        count: 1,
        title: "Team Defense",
        value: "",
      }
    ]
  },
];

const TeamRoster = (props) => {
  const { title = "", league = "", game_type } = props || {};
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  let finalData = !isMobile ? data[data.findIndex(x => x.type == league)] : data[data.findIndex(x => x.type == title)];
  
  return (
    <div className={classes.__team_roster}>
      {isMobile ? (
        <>
          <div className={classes.__my_game_center_card_powerdfs}>
            <p className={`text-left`}>
              <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                {title}
              </span>
              <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> {game_type === "NHL_Fantasy" ? "Fantasy" : "PowerdFS"} </span>
              <span className={`${classes.__my_game_center_card_powerdfs_subtitle}`} style={{ fontSize: '14px' }}>
                Team Roster
              </span>
            </p>
          </div>
          <>
                <div className={classes.__team_roster_heading}>{finalData.heading}</div>
                <div className={classes.__team_roster_data2}>
                  <div className={`${classes.__team_roster_data1} text-left`}>
                    {finalData.teamRoster.map((item, index) => {
                      return (
                        finalData.teamRoster.length / 2 <= index && (
                          <div className={`${classes.__team_roster_data}`}>
                            <div className={classes.__team_roster_data_count_div}>
                              <p className={`${classes.__team_roster_data_count}`}>
                                {item.count}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_title_div}>
                              <p className={`${classes.__team_roster_data_title} mr-1`}>
                                {item.title}
                              </p>
                            </div>
                            <div className={classes.__team_roster_data_value_div}>
                              <p className={`${classes.__team_roster_data_value} ml-1`}>
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className={`${classes.__team_roster_data1} text-right`}>
                    {finalData.teamRoster.map((item, index) => {
                      return (
                        finalData.teamRoster.length / 2 > index && (
                          <div className={`${classes.__team_roster_data} ml-4`}>
                            <div
                              className={classes.__team_roster_data_count_div}
                            >
                              <p className={classes.__team_roster_data_count}>
                                {item.count}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_title_div}
                            >
                              <p className={`${classes.__team_roster_data_title}`}>
                                {item.title}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_value_div}
                            >
                              <p className={`${classes.__team_roster_data_value}`}>
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </>
        </>
      ) : (
        <>
          <p className={classes.__team_roster_main_title}>Team Roster</p>
          
            
              <>
                <div className={classes.__team_roster_heading}>{finalData.heading}</div>
                {finalData.teamRoster.map((item, index) => {
                  return (
                    <div className={classes.__team_roster_data}>
                      <div className={classes.__team_roster_data_count_div}>
                        <p className={classes.__team_roster_data_count}>
                          {item.count}
                        </p>
                      </div>
                      <div className={classes.__team_roster_data_title_div}>
                        <p className={classes.__team_roster_data_title}>
                          {item.title}
                        </p>
                      </div>
                      <div className={classes.__team_roster_data_value_div}>
                        <p className={classes.__team_roster_data_value}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            
         
        </>
      )}
    </div>
  );
};

export default TeamRoster;
