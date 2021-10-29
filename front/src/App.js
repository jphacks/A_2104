import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { fetchCalendarInfo } from "./API";
import EventCard from "./components/EventCard";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

function App() {
  const events = [
    { eventnum: 3 },
    {
      kind: "calendar#event",
      etag: '"3270265666396000"',
      id: "42k0afo45u5n7tehav40m80qul",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NDJrMGFmbzQ1dTVuN3RlaGF2NDBtODBxdWwgd2l3aWpvaG5zb25AbQ",
      created: "2021-10-25T03:33:53.000Z",
      updated: "2021-10-25T03:33:53.198Z",
      summary: "お寝んねする",
      creator: { email: "wiwijohnson@gmail.com", self: true },
      organizer: { email: "wiwijohnson@gmail.com", self: true },
      start: { dateTime: "2021-10-27T21:00:00+09:00", timeZone: "Asia/Tokyo" },
      end: { dateTime: "2021-10-27T22:00:00+09:00", timeZone: "Asia/Tokyo" },
      iCalUID: "42k0afo45u5n7tehav40m80qul@google.com",
      sequence: 0,
      reminders: { useDefault: true },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3270281670420000"',
      id: "0iivs2dlcr7slscpt03t899o3g",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=MGlpdnMyZGxjcjdzbHNjcHQwM3Q4OTlvM2cgd2l3aWpvaG5zb25AbQ",
      created: "2021-10-25T04:57:11.000Z",
      updated: "2021-10-25T05:47:15.210Z",
      summary: "勉強をしたいです",
      location: "東北大学, 日本、〒980-8577 宮城県仙台市青葉区片平２丁目１−１",
      creator: { email: "wiwijohnson@gmail.com", self: true },
      organizer: { email: "wiwijohnson@gmail.com", self: true },
      start: { dateTime: "2021-10-28T14:30:00+09:00", timeZone: "Asia/Tokyo" },
      end: { dateTime: "2021-10-28T15:30:00+09:00", timeZone: "Asia/Tokyo" },
      iCalUID: "0iivs2dlcr7slscpt03t899o3g@google.com",
      sequence: 0,
      reminders: { useDefault: true },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3270281775166000"',
      id: "561to8bb1v14ld3acfjf90o1sv",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NTYxdG84YmIxdjE0bGQzYWNmamY5MG8xc3Ygd2l3aWpvaG5zb25AbQ",
      created: "2021-10-25T04:57:25.000Z",
      updated: "2021-10-25T05:48:07.583Z",
      summary: "スポンジボブ",
      location:
        "仙台駅, 日本、〒980-0021 宮城県仙台市青葉区中央１丁目１０−１０",
      creator: { email: "wiwijohnson@gmail.com", self: true },
      organizer: { email: "wiwijohnson@gmail.com", self: true },
      start: { dateTime: "2021-10-29T09:00:00+09:00", timeZone: "Asia/Tokyo" },
      end: { dateTime: "2021-10-29T10:00:00+09:00", timeZone: "Asia/Tokyo" },
      iCalUID: "561to8bb1v14ld3acfjf90o1sv@google.com",
      sequence: 0,
      reminders: { useDefault: true },
      eventType: "default",
    },
  ];

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
  const [byList, setByList] = useState([]);
  const [needPopup, setNeedPopup] = useState(false);
  const [needLastCalendar, setNeedLastCalendar] = useState(false);

  const showCalendar = async () => {
    setNeedCalendar(true);
    setViews((prev) => ({
      ...prev,
      agendaView: { ...prev.agendaView, dayCount: inViewNum.current.value },
    }));
    /*const events = await fetchCalendarInfo(inViewNum.current.value);
        console.log(events);*/
  };
  const showEvents = () => {
    setSelectEvents(true);
    setEventsNum(events[0].eventnum);
  };

  const openPopup = () => {
    setNeedPopup(true);
  };

  const showLastCalendar = () => {
    setNeedLastCalendar(true);
    setSelectEvents(false);
  };
  return (
    <>
      {!selectEvents && (
        <form>
          <label>
            予定を生成する日数を入力してください:
            <input type="number" id="viewNum" ref={inViewNum} />
          </label>
          <button type="button" onClick={showCalendar}>
            決定
          </button>
        </form>
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
          <button onClick={showEvents}>次へ</button>
        </>
      )}
      {selectEvents && !needLastCalendar && (
        <>
          <h1>行動を伴う予定が{eventsNum}件あります</h1>
          <div className="EventList">
            {events.slice(1).map((event, id) => (
              <EventCard
                time={event.start["dateTime"]}
                summary={event.summary}
                location={event.location}
                callback={openPopup}
                key={id}
                selectW={() =>
                  setByList((prev) => [
                    ...prev,
                    {
                      by: "walk",
                      time: event.start["dateTime"],
                      summary: event.summary,
                    },
                  ])
                }
                selectC={() =>
                  setByList((prev) => [
                    ...prev,
                    {
                      by: "car",
                      time: event.start["dateTime"],
                      summary: event.summary,
                    },
                  ])
                }
              ></EventCard>
            ))}
          </div>
        </>
      )}
      {selectEvents && !needLastCalendar && (
        <div className="okdiv">
          <button className='ok' onClick={showLastCalendar}>完了</button>
        </div>
      )}
    </>
  );
}

export default App;
