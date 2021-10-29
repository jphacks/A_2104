import EventCard from "./EventCard";
import React, { useState } from "react";
import Popup from "./Popup";

const EventList = (props, callback) => {
  const [needPopup, setNeedPopup] = useState(false);
  const openPopup = () => {
    setNeedPopup(true);
    /*return <Popup needPopup callback={()=> console.log("a")}></Popup>;*/
  };
  const closePopup = () => {
    setNeedPopup(false);
  };
  const defineBy = (event) => {};

  const eventNodes = props.events.map((event, id) => (
    <EventCard
      time={event.start["dateTime"]}
      summary={event.summary}
      location={event.location}
      callback={openPopup}
      key={id}
    ></EventCard>
  ));
  return <div className="EventList">{eventNodes}</div>;
};

export default EventList;
