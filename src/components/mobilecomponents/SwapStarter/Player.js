import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";
import "./starter.scss";
// const items = [
//   {
//     plyerName: "Chris Carpenter",
//     rank: "SP",
//     points: [
//       {
//         name: "2.7",
//       },
//       {
//         name: "8-4",
//       },
//       {
//         name: "99",
//       },
//       {
//         name: "0.97",
//       },
//       {
//         name: "25.2",
//       },
//     ],
//     firstTeam: "Arizona Diamondbacks",
//     secondTeam: "Baltimore Orioles",
//     time: "01:07 PM",
//     calender: "2020-09-28",
//     stadium: "Empower Field",
//   },
//   {
//     plyerName: "Chris Carpenter",
//     rank: "SP",
//     points: [
//       {
//         name: "2.7",
//       },
//       {
//         name: "8-4",
//       },
//       {
//         name: "99",
//       },
//       {
//         name: "0.97",
//       },
//       {
//         name: "25.2",
//       },
//     ],
//     firstTeam: "Arizona Diamondbacks",
//     secondTeam: "Baltimore Orioles",
//     time: "01:07 PM",
//     calender: "2020-09-28",
//     stadium: "Empower Field",
//   },
//   {
//     plyerName: "Chris Carpenter",
//     rank: "SP",
//     points: [
//       {
//         name: "2.7",
//       },
//       {
//         name: "8-4",
//       },
//       {
//         name: "99",
//       },
//       {
//         name: "0.97",
//       },
//       {
//         name: "25.2",
//       },
//     ],
//     firstTeam: "Arizona Diamondbacks",
//     secondTeam: "Baltimore Orioles",
//     time: "01:07 PM",
//     calender: "2020-09-28",
//     stadium: "Empower Field",
//   },
//   {
//     plyerName: "Chris Carpenter",
//     rank: "SP",
//     points: [
//       {
//         name: "2.7",
//       },
//       {
//         name: "8-4",
//       },
//       {
//         name: "99",
//       },
//       {
//         name: "0.97",
//       },
//       {
//         name: "25.2",
//       },
//     ],
//     firstTeam: "Arizona Diamondbacks",
//     secondTeam: "Baltimore Orioles",
//     time: "01:07 PM",
//     calender: "2020-09-28",
//     stadium: "Empower Field",
//   },
// ];

const Player = ({items, onSwap}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => {
    return (
      // <CarouselItem
      //   onExiting={() => setAnimating(true)}
      //   onExited={() => setAnimating(false)}
      //   key={index}
      // >
        
      // </CarouselItem>
      <div className="swap__wrapper__playerWrapper ">
          <div className="heading">
            <h2>
              <span>{item.type}</span> {item.playerName}
            </h2>
          </div>

          <table>
            <thead>
              <th>ERA</th>
              <th>W-L</th>
              <th>K</th>
              <th>WHIP</th>
            </thead>
            <tbody>
              <tr>
                <td>{item?.playerStats?.earned_runs_average}</td>
                <td>{item?.playerStats?.wins}-{item?.playerStats?.losses}</td>
                <td>{item?.playerStats?.strike_outs}</td>
                <td>{item?.playerStats?.walks_hits_per_innings_pitched}</td>
              </tr>
            </tbody>
          </table>

          <p>
            {item.homeTeam} <span> VS {item.awayTeam} </span>{" "}
          </p>
          <div className="swap__wrapper__playerWrapper__icons">
            <div>
              <img src="/images/time.svg" alt="time" />
              <p>{item.time}</p>
            </div>
            <div>
              <img src="/images/calendar.svg" alt="time" />
              <p>{item.date}</p>
            </div>
            <div>
              <img src="/images/stadium.svg" alt="time" />
              <p>{item.stadium}</p>
            </div>
          </div>

          <button onClick={() => {
            onSwap(item.playerId, item.match_id)
          }}>
            <img src="/images/switch.svg" alt="icon" /> Swap
          </button>
        </div>
    );
  });

  return (
    // <Carousel
    //   activeIndex={activeIndex}
    //   next={next}
    //   previous={previous}
    //   className="swap"
    // >
    //   {/* <CarouselIndicators
    //     className="dots"
    //     items={items}
    //     activeIndex={activeIndex}
    //     onClickHandler={goToIndex}
    //   /> */}
    //   {slides}
    // </Carousel>
    <>
    {slides}
    </>
    
  );
};

export default Player;
