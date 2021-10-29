import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import "./EventCard.css";

const style_box = {
  alignItems: "center",
};

const EventCard = ({ time, summary, location, selectW, selectC, selectP }) => {
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

  const Popup = ({ selectW, selectC, selectP }) => {
    return (
      <div className="popup">
        <div className="transportation">
          <button
            className="btn-walk"
            onClick={() => {
              selectW();
              inVisible();
            }}
          >
            徒歩
          </button>
          <button
            className="btn-car"
            onClick={() => {
              selectC();
              inVisible();
            }}
          >
            自家用車
          </button>
        </div>
      </div>
    );
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
              <p>予定名：{summary}</p>
            </div>
            <div>
              <p>場所：{location}</p>
            </div>
          </label>
          <span className="button">
            <Button className="btn" onClick={viewChange}>
              Select
            </Button>
          </span>
        </div>
      )}
      {showPopup && (
        <Popup
          selectW={selectW}
          selectC={selectC}
          selectP={selectP}
          inVisible={inVisible}
        ></Popup>
      )}
    </>
  );
};

export default EventCard;
