import React from "react";
import { useState } from "react";
import Popup from "./Popup";
import "./EventCard.css";

const style_box = {
  alignItems: "center",
};

const EventCard = ({ time, title, location, selectW, selectC }) => {
  const [showEvent, setShowEvent] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const viewChange = () => {
    setShowEvent(false);
    setShowPopup(true);
  };
  const inVisible = () => {
    setShowEvent(true);
    setShowPopup(false);
  };

  return (
    <>
      {showEvent && (
        <div className="box" style={style_box}>
          <label className="infomation">
            <div>
              <p>開始時間：{time}</p>
            </div>
            <div>
              <p>予定名：{title}</p>
            </div>
            <div>
              <p>場所：{location}</p>
            </div>
          </label>
          <button className="btn" onClick={viewChange}>
            Select
          </button>
        </div>
      )}
      {showPopup && (
        <Popup
          selectW={selectW}
          selectC={selectC}
          inVisible={inVisible}
        ></Popup>
      )}
    </>
  );
};

export default EventCard;
