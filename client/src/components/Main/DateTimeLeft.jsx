import React, { useState, useEffect } from "react";
import { format } from "timeago.js";

const DateTimeLeft = ({ date, cretedAt }) => {
  const targetDate = new Date(date).getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <div> {format(cretedAt, "en_US")}</div>;
  }

  return (
    <div className="mt-4">
      <div className="text-sm">
        Publish in
        <div className="badge ">
          {" "}
          <span className="countdown font-mono text-lg">
            <span style={{ "--value": timeLeft.days }}></span>:
            <span style={{ "--value": timeLeft.hours }}></span>:
            <span style={{ "--value": timeLeft.minutes }}></span>:
            <span style={{ "--value": timeLeft.seconds }}></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateTimeLeft;
