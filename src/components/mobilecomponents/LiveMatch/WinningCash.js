import React from "react";

const WinningCash = (props) => {
  const {
    currentWinnings = 0
  } = props || {};
  return (
    <div className="cash">
      <p>
        Currently Winning
      </p>
      <h2>${currentWinnings}</h2>
    </div>
  );
};

export default WinningCash;
