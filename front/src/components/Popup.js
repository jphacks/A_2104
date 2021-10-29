import React from "react";

const Popup = (selectW, selectC, selectP) => {
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

export default Popup;
