import { Calendar } from "react-big-calendar";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../components";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";

// Los únicos campos obligatorios son el título, el start y el end

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
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
  const [LastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const onDoubleClick = (event) => {
    openDateModal();
    console.log({ doubleClick: event });
  };
  const onSelectEvent = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
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
      <FabAddNew />
      <FabDelete />
    </>
  );
};
