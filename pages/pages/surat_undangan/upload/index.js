import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { surat_undangan_validation } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";
import {
  getAllSuratUndangan,
  uploadFileToCloudinary,
  uploadSuratUndangan,
} from "@/lib/helper";

import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import ToastMessage from "@/components/Toast";
import moment from "moment-timezone";

export default function Upload() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [fileSrc, setFileSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [loading, setLoading] = useState(false);
  const addMutation = useMutation(uploadSuratUndangan, {
    onSuccess: () => {
      console.log("Data Inserted");
      queryClient.prefetchQuery("surat_undangan", getAllSuratUndangan);
    },
  });

  const formik = useFormik({
    initialValues: {
      judul: "",
      acara: "",
      surat_dari: "",
      nomor_surat: "",
      perihal: "",
      tanggal: "",
      jam_pelaksanaan: "",
      keterangan: "",
      file: null,
    },
    validate: surat_undangan_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    if (Object.keys(formik.errors).length == 0) {
      const fileUploaded = await uploadFileToCloudinary(
        fileSrc,
        "surat_undangan"
      );

      setUploadData(fileUploaded);

      if (!fileUploaded)
        return (
          <ToastMessage
            severity={"error"}
            summary={"Error"}
            message={"Terjadi kesalahan!"}
          />
        );

      let model = {
        ...values,
        tanggal: moment.utc(values.tanggal).tz("Asia/Jakarta").format(),
        file: fileUploaded.url,
        public_id: fileUploaded.public_id,
      };
      console.log(model);
      addMutation.mutate(model);
      setLoading(false);
      formik.resetForm();
      setFileSrc(null);
      // console.log(uploadData);
    }
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setFileSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  if (addMutation.isLoading) return <Loading />;
  if (addMutation.isError)
    return (
      <ToastMessage
        severity={"error"}
        summary={"Error!"}
        detail={"Terjadi kesalahan!"}
      />
    );

  return (
    <div>
      <h1 className="text-3xl font-semibold pb-3">Upload Surat Undangan</h1>
      {addMutation.isSuccess ? (
        // <Success message={"Data berhasil ditambahkan"} />
        <ToastMessage
          severity={"success"}
          summary={"Sukses!"}
          detail={"Data Berhasil ditambahkan"}
        />
      ) : (
        <></>
      )}
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
                    name="judul"
                    className={
                      formik.errors.judul && formik.touched.judul
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("judul")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Acara</h5>
                  <InputText
                    type="text"
                    placeholder="Contoh: Upacara Kemerdekaan"
                    name="acara"
                    className={
                      formik.errors.acara && formik.touched.acara
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("acara")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Surat dari</h5>
                  <InputText
                    type="text"
                    placeholder="Surat dari"
                    name="surat_dari"
                    className={
                      formik.errors.surat_dari && formik.touched.surat_dari
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
                      formik.errors.nomor_surat && formik.touched.nomor_surat
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
                      formik.errors.perihal && formik.touched.perihal
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("perihal")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Tanggal Pelaksanaan</h5>
                  <Calendar
                    showIcon
                    showButtonBar
                    name="tanggal"
                    className={
                      formik.errors.tanggal && formik.touched.tanggal
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("tanggal")}
                  />
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Jam pelaksanaan</h5>
                  <InputText
                    type="text"
                    placeholder="ex 08.00"
                    name="jam_pelaksanaan"
                    className={
                      formik.errors.jam_pelaksanaan &&
                      formik.touched.jam_pelaksanaan
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("jam_pelaksanaan")}
                  ></InputText>
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
                  <h5 className="font-semibold mb-2">
                    Upload File (Ukuran file maksimum 10 MB)
                  </h5>{" "}
                  <div>
                    <input
                      type="file"
                      name="file"
                      accept=".pdf"
                      required
                      onChange={handleOnChange}
                    />
                    <iframe
                      src={fileSrc}
                      // frameBorder="0"
                      id="preview-pdf"
                      className="mt-2"
                    ></iframe>
                  </div>
                </div>
                <Button
                  label={loading ? "Mengunggah.." : "Simpan"}
                  className="p-button-outlined"
                  type="submit"
                />
              </form>
            </div>
            {uploadData && (
              <code>
                <pre>{JSON.stringify(uploadData, null, 2)}</pre>
              </code>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
