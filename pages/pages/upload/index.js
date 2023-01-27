import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function upload() {
  const toast = useRef(null);
  const [calendarValue, setCalendarValue] = useState(null);

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold pb-3">Upload Surat</h1>
      <div className="grid p-fluid">
        <div className="col-12 lg:col-8">
          <div className="card">
            <div className="grid formgrid">
              <form action="">
                <div className="field">
                  <h5 className="mb-2 font-semibold">Judul Surat</h5>
                  <InputText type="text" placeholder="Judul Surat"></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Surat Masuk dari</h5>
                  <InputText type="text" placeholder="Surat dari"></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Nomor Surat</h5>
                  <InputText type="text" placeholder="Nomor Surat"></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Perihal</h5>
                  <InputText type="text" placeholder="Perihal"></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Tanggal</h5>
                  <Calendar
                    showIcon
                    showButtonBar
                    value={calendarValue}
                    onChange={(e) => setCalendarValue(e.value)}
                  />
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Keterangan</h5>
                  <InputTextarea
                    placeholder="Your Message"
                    autoResize
                    rows="3"
                    cols="30"
                  />
                </div>
                <div className="field">
                  <h5 className="font-semibold mb-2">Upload File</h5>
                  <FileUpload
                    mode="basic"
                    name="demo[]"
                    url="./upload.php"
                    accept=".pdf"
                    maxFileSize={1000000}
                    onUpload={onUpload}
                  />
                </div>
                <Button label="Save" className="p-button-outlined" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
