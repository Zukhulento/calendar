import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import { CalendarEvent, CalendarModal, Navbar } from "../components";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";

// Los únicos campos obligatorios son el título, el start y el end

const events = [
  {
    title: "Brother's birthday",
    notes: "Buy a gift",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Luis",
    },
  },
];

export const CalendarPage = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return style;
  };
  const [LastView, setLastView] = useState(localStorage.getItem("lastView") || "week");
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };
  const onSelectEvent = (event) => {
    console.log({ click: event });
  };
  const onViewChanged = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };
  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        defaultView={LastView}
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
