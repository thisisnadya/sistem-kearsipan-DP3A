import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "react-query";
import { getAllSuratUndangan } from "@/lib/helper";
import Loading from "@/components/Loading";
import moment from "moment/moment";
import { Dialog } from "primereact/dialog";

export default function agenda() {
  const [events, setEvents] = useState([]);
  const [detailEvent, setDetailEvent] = useState();
  const [visible, setVisible] = useState(false);
  const { isLoading, isError, data, error } = useQuery(
    "surat_undangan",
    getAllSuratUndangan
  );

  const getEvents = (data) => {
    if (data && !isLoading && !isError) {
      return data.map((item) => ({
        title: item.acara,
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

  const showEventDetail = (info) => {
    setVisible(true);
    setDetailEvent(info.event);
  };

  console.log(events);
  console.log(detailEvent);
  if (isLoading) return <Loading />;
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => showEventDetail(info)}
      />
      <Dialog
        header="Detail Acara"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <h1 className="m-0">Kegiatan: {detailEvent?.title}</h1>
        <br />
        <h1>Tanggal pelaksanaan: {detailEvent?.startStr}</h1>
      </Dialog>
    </>
  );
}
