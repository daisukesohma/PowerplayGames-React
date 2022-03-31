import React from "react";
import "./price_pool.scss";
const headings = [
  {
    value: "#",
  },
  {
    value: "Display name",
  },
  {
    value: "Winning",
  },
  {
    value: "Action",
  },
];

const players = [
  {
    number: "12",
    name: "dart_winner",
    price: "$150.00",
    value: "Team",
  },
  {
    number: "12",
    name: "dart_winner",
    price: "$150.00",
    value: "Team",
  },
  {
    number: "12",
    name: "dart_winner",
    price: "$150.00",
    value: "Team",
  },
  {
    number: "12",
    name: "dart_winner",
    price: "$150.00",
    value: "Team",
  },
];

const PlayerCard = () => {
  return (
    <div className="card__wrapper">
      <div className="heading">
        {headings &&
          headings.map(name => {
            return <p>{name && name.value}</p>;
          })}
      </div>
      {players &&
        players.map((player, index) => {
          return (
            <div className={`players ${index === 0 && "active"} `} key={index}>
              <p>{player.number}</p>
              <p>{player.name}</p>
              <p>{player.price}</p>
              <button>{player.value}</button>
            </div>
          );
        })}
    </div>
  );
};

export default PlayerCard;
