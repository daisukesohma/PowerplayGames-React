import React from "react";

const GameCountDown = ({ state, selectedTeam = {} }) => {
  function duration(t0, t1){
    let d = (t1) - (t0);
    let weekdays     = Math.floor(d/1000/60/60/24/7);
    let days         = Math.floor(d/1000/60/60/24 - weekdays*7);
    let hours        = Math.floor(d/1000/60/60    - weekdays*7*24            - days*24);
    let minutes      = Math.floor(d/1000/60       - weekdays*7*24*60         - days*24*60         - hours*60);
    let seconds      = Math.floor(d/1000          - weekdays*7*24*60*60      - days*24*60*60      - hours*60*60      - minutes*60);
    let milliseconds = Math.floor(d               - weekdays*7*24*60*60*1000 - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000 - seconds*1000);
    let t = {};
    ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach(q=>{ if (eval(q)>0) { t[q] = eval(q); } });
    return t;
  }
  const getDateStringValue = () => {
    let  date1 = new Date(selectedTeam?.game?.game_set_start + " " + selectedTeam?.game?.start_time);
    let  date3 = new Date(selectedTeam?.game?.game_set_end + " 00:00:00");
    let timeOffsetInMS = date1.getTimezoneOffset() * 60000;
    date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset())
    let  date2 = new Date();
    if(date1 < date2 && date2 > date3)
    {
      return {
        "status": 1,
        "message": "IN PROGRESS"
      }
    }
    let diffInSeconds = Math.abs(date1 - date2) / 1000;
    let days = Math.floor(diffInSeconds / 60 / 60 / 24);
    let hours = Math.floor(diffInSeconds / 60 / 60 % 24);
    let minutes = Math.floor(diffInSeconds / 60 % 60);
    let seconds = Math.floor(diffInSeconds % 60);
    let milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
    let txt = (days?(days + "d "):"")+(hours?(hours + "h "):"") + minutes + "min";
    return {
      "status": 0,
      "message": txt
    }
  }
  return (
    <>
      <h4 className="pt-3 mt-1 mb-2">Live Game Starts in</h4>
      <h2
        className="color"
        style={state && state !== 0 && ((getDateStringValue().status) == 1)? { color: "#3f9946" } : null}
      >
        {state && state !== 0 && ((getDateStringValue().status) == 1) && (
          <span
            className="box"
            style={{
              width: 12,
              height: 12,
              display: "inline-block",
              background: "#3f9946",
              borderRadius: "50%",
            }}
          ></span>
        )}{" "}
        {state && state !== 0 ? getDateStringValue().message : "IN PROGRESS"}
      </h2>
    </>
  );
};

export default GameCountDown;
