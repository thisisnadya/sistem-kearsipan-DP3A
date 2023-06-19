import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "react-query";
import { getAllSuratUndangan } from "@/lib/helper";
import Loading from "@/components/Loading";
import moment from "moment/moment";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { sendWhatsappMessage } from "@/lib/helper";
import { getAllStaffs } from "@/lib/helper";

export default function Agenda() {
  const [events, setEvents] = useState([]);
  const [detailEvent, setDetailEvent] = useState();
  const [visible, setVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { isLoading, isError, data, error } = useQuery(
    "surat_undangan",
    getAllSuratUndangan
  );

  const {
    isLoading: isLoadingAllStaffs,
    isError: isErrorAllStaffs,
    data: allStaffsData,
    error: errorAllStaffs,
  } = useQuery("staffs", getAllStaffs);

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

  const handleWhatsappClick = () => {
    let data = {
      judul: detailEvent?.title,
      tanggal: detailEvent?.startStr,
      jam: detailEvent?._def.extendedProps.jam,
      file: detailEvent?._def.extendedProps.linkFile,
      nama: selectedStaff.label,
      nomor_telepon: selectedStaff.nomor,
    };
    sendWhatsappMessage(data);
  };

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
        <div className="my-3">
          <h1 className="text-lg pb-2 text-green-600 font-bold">
            Kirim ke whatsapp{" "}
            <i className="pi pi-whatsapp font-bold" size={26}></i>
          </h1>
          <Dropdown
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.value)}
            options={
              allStaffsData?.map((item, id) => ({
                label: item.nama,
                id,
                nomor: item.nomor_telepon,
              })) || []
            }
            optionLabel="label"
            placeholder="Pilih Staff"
            className="w-full md:w-14rem"
          />

          <Button
            label="Kirim"
            className="ml-3"
            onClick={() => handleWhatsappClick()}
          >
            <i className="pi pi-send pl-2" size={24}></i>
          </Button>
        </div>

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
