import "./App.css";
import React, { useState } from "react";
import { fetchCalendarInfo, fetchLastCalendar, applyOutput } from "./API";
import EventCard from "./components/EventCard";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

function App() {
  const [data, setData] = useState();
  const [isAddress, setIsAddress] = useState(false);
  const [needCalendar, setNeedCalendar] = useState(false);
  const [inViewNum, setInViewNum] = useState("");
  const [address, setAddress] = useState("");
  const [views, setViews] = useState({
    agendaView: {
      type: "timeGrid",
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
      agendaView: { ...prev.agendaView, dayCount: inViewNum },
    }));
    const data = await fetchCalendarInfo(inViewNum, address);
    setData(JSON.parse(data));
    setNeedCalendar(true);
  };

  const showEvents = () => {
    setSelectEvents(true);
    setEventsNum(data[1].length);
  };

  const showLastCalendar = async () => {
    const output = await fetchLastCalendar(result);
    setOutput(JSON.parse(output));
    setNeedLastCalendar(true);
    setSelectEvents(false);
    setNeedCalendar(false);
  };

  const apply = async () => {
    await applyOutput(output[1], address);
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
        {!isAddress &&
          !selectEvents &&
          !needLastCalendar &&
          !needCalendar &&
          !isFinish && (
            <>
              <div className="welcome">
                <h1>Wellcome To Flow !!</h1>
              </div>
              <div className="login">
                <label>
                  <div>
                    <p>?????????????????????</p>
                    <input
                      className="mail"
                      type="password"
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                  <div>
                    <p>???????????????</p>
                    <input className="pass" type="password" />
                  </div>
                </label>
                <div>
                  <button className="btn2" onClick={() => setIsAddress(true)}>
                    ??????
                  </button>
                </div>
              </div>
            </>
          )}
        {isAddress &&
          !selectEvents &&
          !needLastCalendar &&
          !needCalendar &&
          !isFinish && (
            <div className="form">
              <label>
                <p>????????????????????????????????????????????????</p>
                <input
                  className="inp"
                  type="number"
                  onChange={(event) => setInViewNum(event.target.value)}
                />
              </label>
              <div>
                <button className="btn2" onClick={showCalendar}>
                  ??????
                </button>
              </div>
            </div>
          )}
        {needCalendar && !selectEvents && !needLastCalendar && !isFinish && (
          <div className="origin_calendar">
            <h1>????????????{inViewNum}?????????????????????????????????????????????</h1>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              views={views}
              events={data[0]}
              locale="ja"
              selectable
              initialView="agendaView"
            />
            <button className="btn2" onClick={showEvents}>
              ??????
            </button>
          </div>
        )}
      </div>
      {selectEvents && !needLastCalendar && !isFinish && (
        <>
          <h1>???????????????????????????{eventsNum}???????????????</h1>
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
            ????????????
          </button>
        </div>
      )}
      {needLastCalendar && !selectEvents && !needCalendar && !isFinish && (
        <>
          <div>
            <h1>??????????????????????????????????????????????????????</h1>
          </div>
          <div className="origin_calendar">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              views={views}
              events={output[0]}
              locale="ja"
              selectable
              initialView="agendaView"
            />
          </div>
          <div className="lastcalendar_footer">
            <p>???????????????Google????????????????????????????????????</p>
            <button className="reflection" onClick={apply}>
              ??????
            </button>
          </div>
        </>
      )}
      {isFinish && (
        <div className="final">
          <p>?????????Google???????????????????????????????????????</p>
          <button className="tostart" onClick={backtostart}>
            ????????????????????????
          </button>
        </div>
      )}
    </>
  );
}

export default App;
