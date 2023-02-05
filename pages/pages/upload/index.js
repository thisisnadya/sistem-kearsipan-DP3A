import React, { useCallback, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { form_validation } from "@/lib/validation";

export default function upload() {
  // const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

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
    validate: form_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    if (Object.keys(formik.errors).length == 0) {
      const formData = new FormData();

      formData.append("file", values.file);

      formData.append("upload_preset", "sistem-kearsipan");

      const fileData = await fetch(
        "https://api.cloudinary.com/v1_1/dhjvokhqm/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());

      // console.log(values);

      const data = {
        ...values,
        file: fileData.url,
      };
      console.log(data);
      // console.log(formik.errors);
    }
  }

  const previewFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleChange = (e) => {
    formik.setFieldValue("file", e.currentTarget.files[0]);
    previewFile(e.currentTarget.files[0]);
  };

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
                    className={
                      formik.errors.judul_surat && formik.touched.judul_surat
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("judul_surat")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Surat Masuk dari</h5>
                  <InputText
                    type="text"
                    placeholder="Surat dari"
                    name="surat_dari"
                    className={
                      formik.errors.judul_surat && formik.touched.judul_surat
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("surat_dari")}
                  ></InputText>
                </div>

                <div className="field">
                  <h5 className="mb-2 font-semibold">Nomor Surat</h5>
                  <InputText
                    type="text"
                    placeholder="Nomor Surat"
                    name="nomor_surat"
                    className={
                      formik.errors.judul_surat && formik.touched.judul_surat
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("nomor_surat")}
                  ></InputText>
                </div>

                <div className="field">
                  <h5 className="mb-2 font-semibold">Perihal</h5>
                  <InputText
                    type="text"
                    placeholder="Perihal"
                    name="perihal"
                    className={
                      formik.errors.judul_surat && formik.touched.judul_surat
                        ? "p-invalid"
                        : ""
                    }
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
                    className={
                      formik.errors.judul_surat && formik.touched.judul_surat
                        ? "p-invalid"
                        : ""
                    }
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
                  <div>
                    <input type="file" name="file" onChange={handleChange} />
                    <iframe
                      src={preview}
                      // frameBorder="0"
                      id="preview-pdf"
                      className="mt-2"
                    ></iframe>
                  </div>
                </div>
                <Button
                  label="Save"
                  className="p-button-outlined"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
