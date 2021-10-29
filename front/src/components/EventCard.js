import React from "react";
import Button from '@material-ui/core/Button';
import "./EventCard.css";

const style_box = {
  alignItems: 'center',
}

const style_button = {
  minWidth: 164,       // 数値は"64px"のように、pxとして扱われます
  lineHeight: "64px",
  borderRadius: 32,
  border: "none",
  padding: "16 16px",
  color: "#fff",
  
  fontSize: 25,
  root: {
      justifyContent: 'center'
  }
};

const EventCard = ({ time, summary, location, callback}) => {
  return (
    <div className = 'box' style={style_box}>
      <label className = 'infomation'>
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
      <span className = 'button'>
        <Button className='btn' onClick={callback}>
          Select
        </Button>
      </span>
    </div>
  );
};

export default EventCard;
