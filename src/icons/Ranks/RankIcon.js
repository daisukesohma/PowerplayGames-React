import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function RankIcon(props) {
  const { rank } = props || {};

  const [colors, setColors] = useState([
    "#F2F2F2",
    "#F2F2F2",
    "#F2F2F2",
    "#F2F2F2",
    "#F2F2F2",
    "#F2F2F2",
  ]);
  const primary = "#FB6E00";
  const normal = "#F2F2F2";

  useEffect(() => {
    setRankColors();
  }, [rank]);

  useEffect(() => {}, [colors]);

  const setRankColors = () => {
    const _colors = [...colors];

    for (let i = 0; i <= 5; i++) {
      if (i <= rank) {
        _colors[i] = primary;
      } else if (i > rank) _colors[i] = normal;
    }

    setColors(_colors);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.size || "90"}
      height={props?.size - 38 || "52"}
      viewBox="0 0 90 52"
      style={{ height: "auto" }}
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g transform="translate(-150.000000, -202.000000) translate(150.000000, 202.000000)">
            <rect
              width="10"
              height="4"
              y="48"
              fill={colors[0]}
              opacity={colors[0] === primary ? "1" : "0.3"}
              rx="1"
            />
            <rect
              width="10"
              height="8"
              x="16"
              y="44"
              fill={colors[1]}
              opacity={colors[1] === primary ? "1" : "0.3"}
              rx="2"
            />
            <rect
              width="10"
              height="12"
              x="32"
              y="40"
              fill={colors[2]}
              opacity={colors[2] === primary ? "1" : "0.3"}
              rx="2"
            />
            <rect
              width="10"
              height="20"
              x="48"
              y="32"
              fill={colors[3]}
              opacity={colors[3] === primary ? "1" : "0.3"}
              rx="2"
            />
            <rect
              width="10"
              height="32"
              x="64"
              y="20"
              fill={colors[4]}
              opacity={colors[4] === primary ? "1" : "0.3"}
              rx="2"
            />
            <rect
              width="10"
              height="52"
              x="80"
              fill={colors[5]}
              opacity={colors[5] === primary ? "1" : "0.3"}
              rx="2"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

RankIcon.propTypes = {
  size: PropTypes.number,
  rank: PropTypes.number,
};

export default RankIcon;
