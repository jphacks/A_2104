import React from "react";
import { useState } from "react";

const EventCard = ({ time, summary, location, selectW, selectC, selectP }) => {
  const [needPopup, setNeedPopup] = useState(false);

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
        <button className="btn-close">完了</button>
        </div>
    );
  };

  return (
    <>
      <div>
        <div className="mizu">
          <p>{time}</p>
        </div>
        <div>
          <p>{summary}</p>
        </div>
        <div>
          <p>{location}</p>
        </div>
        <button onClick={() => setNeedPopup(true)}>Select</button>
      </div>
      {needPopup && <Popup selectW selectC selectP></Popup>}
    </>
  );
};

export default EventCard;
