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
          <button className="btn-walk" onClick={selectW}>
            徒歩
          </button>
          <button className="btn-car" onClick={selectC}>
            自家用車
          </button>
          <button className="btn-public" onClick={selectP}>
            公共交通機関
          </button>
        </div>
        <button className="btn-close" onClick={inVisible}>完了</button>
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
