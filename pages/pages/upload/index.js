import React, { useCallback, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";

export default function upload() {
  const formik = useFormik({
    initialValues: {
      judul_surat: "",
      surat_dari: "",
      nomor_surat: "",
      perihal: "",
      tanggal: "",
      keterangan: "",
      file: null,
    },
    // validate: login_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  const handleChange = useCallback(
    (event) => {
      formik.setFieldValue("file", event.currentTarget.files[0]);
    },
    [formik]
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold pb-3">Upload Surat</h1>
      <div className="grid p-fluid">
        <div className="col-12 lg:col-8">
          <div className="card">
            <div className="grid formgrid">
              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Judul Surat</h5>
                  <InputText
                    type="text"
                    placeholder="Judul Surat"
                    name="judul_surat"
                    {...formik.getFieldProps("judul_surat")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Surat Masuk dari</h5>
                  <InputText
                    type="text"
                    placeholder="Surat dari"
                    name="surat_dari"
                    {...formik.getFieldProps("surat_dari")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Nomor Surat</h5>
                  <InputText
                    type="text"
                    placeholder="Nomor Surat"
                    name="nomor_surat"
                    {...formik.getFieldProps("nomor_surat")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Perihal</h5>
                  <InputText
                    type="text"
                    placeholder="Perihal"
                    name="perihal"
                    {...formik.getFieldProps("perihal")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Tanggal</h5>
                  <Calendar
                    showIcon
                    showButtonBar
                    name="tanggal"
                    {...formik.getFieldProps("tanggal")}
                  />
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Keterangan</h5>
                  <InputTextarea
                    placeholder="Your Message"
                    autoResize
                    rows="3"
                    cols="30"
                    name="keterangan"
                    {...formik.getFieldProps("keterangan")}
                  />
                </div>
                <div className="field">
                  <h5 className="font-semibold mb-2">Upload File</h5>
                  {/* <FileUpload
                    mode="basic"
                    name="file"
                    // url="/api/upload"
                    accept=".pdf"
                    maxFileSize={1000000}
                    // onUpload={onUpload}
                    id="file"
                    type="file"
                    auto={true}
                    onChange={handleChange}
                  /> */}
                  <input type="file" name="file" onChange={handleChange} />
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
