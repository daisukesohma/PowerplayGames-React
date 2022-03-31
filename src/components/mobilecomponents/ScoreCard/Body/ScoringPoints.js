import React from "react";

const ScoringPoints = ({ title, totalPts, image, bgClr, clr, myScore, hasPlay = false }) => {
  return (
    <div className="play">
      <h2>{title}</h2>

      {totalPts !== undefined ? (
        <p style={bgClr ? { color: clr, backgroundColor: bgClr } : null}>
          {totalPts ? totalPts?totalPts:0 : 0}
        </p>
      ) : null}

      {myScore !== undefined ? (
        <p style={bgClr ? { color: clr, backgroundColor: bgClr } : null}>
          {myScore ? myScore?myScore:0 : 0}
        </p>
      ) : null}

      {title == "Powers" ? (image && hasPlay) ? (
        <p>
          <img
            src={image}
            alt="file"
            style={{ width: "23px", height: "23px", objectFit: "cover" }}
          />
        </p>
      ):(<p>-</p>) : ""}


      {image === false && <p></p>}
    </div>
  );
};

export default ScoringPoints;
