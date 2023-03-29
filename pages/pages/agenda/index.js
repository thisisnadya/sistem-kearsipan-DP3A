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
        linkFile: item.file,
      }));
    }
    return [];
  };

  useEffect(() => {
    const transformedData = getEvents(data);
    setEvents(transformedData);
  }, [data]);

  const showEventDetail = (info, event) => {
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
        <h1 className="mt-1 text-lg">
          Kegiatan: <span>{detailEvent?.title}</span>
        </h1>

        <br />
        <h1 className="text-lg">
          Tanggal pelaksanaan: {detailEvent?.startStr}
        </h1>
        <br />
        <h1 className="text-lg">
          Waktu pelaksanaan: {detailEvent?._def.extendedProps.jam}
        </h1>
        <br />
        <object
          data={detailEvent?._def.extendedProps.linkFile}
          type="application/pdf"
          width="100%"
          height="500"
        ></object>
      </Dialog>
    </>
  );
}
