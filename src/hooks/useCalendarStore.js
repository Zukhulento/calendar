import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };
  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Update event
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Add new event
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al guardar",
        error.response.data.msg || "Error al guardar el evento",
        "error"
      );
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (activeEvent.id) {
        // Update event
        await calendarApi.delete(`/events/${activeEvent.id}`);
        // Delete event
        dispatch(onDeleteEvent());
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al eliminar",
        error.response.data.msg || "No se logró eliminar el evento",
        "error"
      );
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };
  return {
    // Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    // Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
