import React from "react";

const MyScore = ({ score = 0, leader = 0 }) => {
  return (
    <div className="score">
      <div className="scoreFirst">
        <h2>My Score:</h2>
        <span>{score}</span>
      </div>
      <div className="leader">
        <p>Leader:</p>
        <span>{leader}</span>
      </div>
    </div>
  );
};

export default MyScore;
