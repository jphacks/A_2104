import "./App.css";
import React, { useState, useRef } from "react";
import { fetchCalendarInfo, fetchLastCalendar, applyOutput } from "./API";
import EventCard from "./components/EventCard";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

function App() {
  const [data, setData] = useState();
  const [needCalendar, setNeedCalendar] = useState(false);
  const inViewNum = useRef(null);
  const [views, setViews] = useState({
    agendaView: {
      type: "timeGrid",
      buttonText: "3 day",
    },
  });
  const [selectEvents, setSelectEvents] = useState(false);
  const [eventsNum, setEventsNum] = useState(0);
  const [result, setResult] = useState([]);
  const [output, setOutput] = useState();
  const [needLastCalendar, setNeedLastCalendar] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const showCalendar = async () => {
    setViews((prev) => ({
      ...prev,
      agendaView: { ...prev.agendaView, dayCount: inViewNum.current.value },
    }));
    const data = await fetchCalendarInfo(inViewNum.current.value);
    setData(JSON.parse(data));
    setNeedCalendar(true);
  };
  const showEvents = () => {
    setSelectEvents(true);
    setEventsNum(data[1].length);
  };
  const showLastCalendar = async () => {
    const output = await fetchLastCalendar(result);
    console.log(output);
    setOutput(JSON.parse(output));
    setNeedLastCalendar(true);
    setSelectEvents(false);
    setNeedCalendar(false);
  };

  const apply = async () => {
    const finishStatus = await applyOutput(result[1]);
    setIsFinish(true);
  };

  const backtostart = () => {
    setIsFinish(false);
    setSelectEvents(false);
    setNeedCalendar(false);
    setNeedLastCalendar(false);
  };
  return (
    <>
      <div>
        {!selectEvents && !needLastCalendar && !needCalendar && !isFinish && (
          <div className="form">
            <label>
              <p>予定を生成する日数を入力してください</p>

              <input
                className="inp"
                type="number"
                id="viewNum"
                ref={inViewNum}
              />
            </label>
            <div>
              <button className="btn2" onClick={showCalendar}>
                OK
              </button>
            </div>
          </div>
        )}
        {needCalendar && !selectEvents && !needLastCalendar && !isFinish && (
          <div>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              views={views}
              events={data[0]}
              locale="ja"
              selectable
              initialView="agendaView"
            />
            <button className="btn2" onClick={showEvents}>
              NEXT
            </button>
          </div>
        )}
      </div>
      {selectEvents && !needLastCalendar && !isFinish && (
        <>
          <h1>行動を伴う予定が{eventsNum}件あります</h1>
          <div className="EventList">
            {data[1].slice().map((event, id) => (
              <EventCard
                time={event.start}
                title={event.title}
                location={event.location}
                key={id}
                selectW={() =>
                  setResult((prev) => [
                    ...prev,
                    {
                      mode: "walking",
                      start: event.start,
                      end: event.end,
                      title: event.title,
                      location: event.location,
                    },
                  ])
                }
                selectC={() =>
                  setResult((prev) => [
                    ...prev,
                    {
                      mode: "driving",
                      start: event.start,
                      end: event.end,
                      title: event.title,
                      location: event.location,
                    },
                  ])
                }
              ></EventCard>
            ))}
          </div>
        </>
      )}
      {selectEvents && !needLastCalendar && !isFinish && (
        <div className="okdiv">
          <button className="ok" onClick={showLastCalendar}>
            選択終了
          </button>
        </div>
      )}
      {needLastCalendar && !selectEvents && !needCalendar && !isFinish && (
        <>
          <div className="lastcalendar header">
            <h1>変更後のカレンダーはこちらです</h1>
          </div>
          <div className="lastcalendar body">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              views={views}
              events={output[0]}
              locale="ja"
              selectable
              initialView="agendaView"
            />
          </div>
          <div className="lastcalendar footer">
            <p>この予定をGoogleカレンダーに反映させます</p>
            <button onClick={apply}>反映</button>
          </div>
        </>
      )}
      {isFinish && (
        <div>
          <p>変更をGoogleカレンダーに反映させました</p>
          <button onClick={backtostart}>最初の画面に戻る</button>
        </div>
      )}
    </>
  );
}

export default App;
