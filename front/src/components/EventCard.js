import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import "./EventCard.css";

const style_box = {
  alignItems: "center",
};

const EventCard = ({ time, summary, location, selectW, selectC }) => {
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

  const Popup = ({ selectW, selectC }) => {
    return (
      <div className="popup">
        <span class="box-title">移動手段の選択</span>
        <button
          className="btn-t"
          onClick={() => {
            selectW();
            inVisible();
          }}
        >
          徒歩
        </button>
        <button
          className="btn-t"
          onClick={() => {
            selectC();
            inVisible();
          }}
        >
          自家用車
        </button>
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
