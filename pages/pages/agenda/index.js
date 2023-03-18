import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "react-query";
import { getAllSuratUndangan } from "@/lib/helper";
import Loading from "@/components/Loading";
import moment from "moment/moment";

export default function agenda() {
  const [events, setEvents] = useState([]);
  const { isLoading, isError, data, error } = useQuery(
    "surat_undangan",
    getAllSuratUndangan
  );

  const getEvents = (data) => {
    if (data && !isLoading && !isError) {
      return data.map((item) => ({
        title: item.judul,
        date: moment(item.tanggal).format("YYYY-MM-DD"),
        jam: item.jam_pelaksanaan,
      }));
    }
    return [];
  };

  useEffect(() => {
    const transformedData = getEvents(data);
    setEvents(transformedData);
  }, [data]);

  console.log(events);
  if (isLoading) return <Loading />;
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </>
  );
}
