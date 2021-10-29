import React from "react";

const Popup = (props, callback) => {
  return (props.needPopup) ? (
    <div className="popup">
      <div className="transportation">
        <button className="btn-walk" onClick={callback}>
          徒歩
        </button>
        <button className="btn-car" onClick={callback}>
          自家用車
        </button>
        <button className="btn-public" onClick={callback}>
          公共交通機関
        </button>
      </div>
      <button className="btn-close">完了</button>
    </div>
  ) : "";
};

export default Popup;
