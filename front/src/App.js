import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

function App() {
  const [needCalendar, setNeedCalendar] = useState(false);
  const inViewNum = useRef(null);
  const [views, setViews] = useState({
    agendaView: {
      type: "timeGrid",
      buttonText: "3 day",
    },
  });
  const handleClick = () => {
    setNeedCalendar(true);
    setViews((prev) => ({
      ...prev,
      agendaView: { ...prev.agendaView, dayCount: inViewNum.current.value },
    }));
  };

  return (
    <>
      <form>
        <label>
          予定を生成する日数を入力してください:
          <input type="number" id="viewNum" ref={inViewNum} />
        </label>
        <button type="button" onClick={handleClick}>
          決定
        </button>
      </form>
      {needCalendar && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          views={views}
          locale='ja'
          selectable
          initialView="agendaView"
        />
      )}
    </>
  );
}

export default App;
