import React from "react";
import { useState, useEffect } from "react";

const Timer = (props) => {
  // const { initialMinute = 0, initialSeconds = 0 } = props.time;
  const initialMinute = props.minutes ? props.minutes : 0;
  const initialSeconds = props.seconds ? props.seconds : 0;

  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (props.error) {
      setMinutes(0);
      setSeconds(0);
    }
  }, [props.error]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      props.setError(true);
    }
  }, [seconds]);

  return (
    <div className="text-center my-3">
      {minutes === 0 && seconds === 0 ? (
        <>
          <h2
            style={{
              fontWeight: "normal",
              fontFamily: '"Gotthard", san-sarif',
              color: "#fa3800",
            }}
          >
            00:00
          </h2>
          <p
            className="h4 mt-5"
            style={{ fontFamily: '"Gotthard", san-sarif', color: "#fa3800" }}
          >
            Verification Failed
          </p>
        </>
      ) : (
        <h2
          className="text-primary"
          style={{ fontWeight: "normal", fontFamily: '"Gotthard", san-sarif' }}
        >
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      )}
    </div>
  );
};

export default Timer;
