import React from "react";

const EventCard = ({ time, summary, location, callback}) => {
  return (
    <div>
      <div>
        <p>{time}</p>
      </div>
      <div>
        <p>{summary}</p>
      </div>
      <div>
        <p>{location}</p>
      </div>
      <button type="" onClick={callback}>
        Select
      </button>
    </div>
  );
};

export default EventCard;
