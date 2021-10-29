import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField'

function App() {
  const [needCalendar, setNeedCalendar] = useState(false);
  const inViewNum = useRef(null);
  const [views, setViews] = useState({
    agendaView: {
      type: "timeGrid",
      buttonText: "3 day",
    },
  });
  const [selectEvents, setSelectEvents] = useState(false);
  const handleClick = () => {
    setNeedCalendar(true);
    setViews((prev) => ({
      ...prev,
      agendaView: { ...prev.agendaView, dayCount: inViewNum.current.value },
    }));
  };
  const style_start = {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    transform: 'translate(0%, 120%)'
  };
  const style_str = {
    fontSize: 60,
    transform: 'translate(0%, -20%)',
  };
  const style_input = {
    lineHeight: "64px"
  };
  const style_button = {
    minWidth: 164,       // 数値は"64px"のように、pxとして扱われます
    lineHeight: "64px",
    borderRadius: 32,
    border: "none",
    padding: "16 16px",
    color: "#fff",
    background: "#2073f8",
    transform: 'translate(0%, 50%)',
    root: {
        justifyContent: 'center'
    }
  };


  return (
    <>
      {!selectEvents && (
        <CardActions style={style_start}>
          <div>
          <form className='kettei'>
            <label style={style_str}>
            予定を生成する日数を入力してください
            </label>
          </form>
          </div>
          <div>
            <TextField variant="standard" style={style_input} type="number" id="viewNum" ref={inViewNum} />
          </div>
          <div>
          <Button style={style_button} onClick={handleClick}>
            決定
          </Button>
          </div>
        </CardActions>
      )}
      {needCalendar && !selectEvents && (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            views={views}
            locale="ja"
            selectable
            initialView="agendaView"
          />
          <Button variant="outlined" color="black" onClick={() => setSelectEvents(true)}>
            完了
          </Button>
        </>
      )}
      {selectEvents && (
        <>
          <h1>行動を伴う予定が三件あります</h1>
        </>
      )}
    </>
  );
}

export default App;
