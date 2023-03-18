import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function agenda() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        {
          title: "event 1",
          date: "2023-03-18",
        },
        {
          title: "event 2",
          date: "2023-03-20",
        },
        {
          title: "event 3",
          date: "2023-03-21",
        },
      ]}
    />
  );
}
