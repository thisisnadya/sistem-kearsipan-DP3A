import React, { useCallback, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { form_validation } from "@/lib/validation";
import { useMutation, useQueryClient } from "react-query";
import { getAllSurat, uploadFileToCloudinary, uploadSurat } from "@/lib/helper";
import Success from "@/components/Success";
import Bug from "@/components/Bug";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

export default function upload() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [fileSrc, setFileSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [loading, setLoading] = useState(false);
  const addMutation = useMutation(uploadSurat, {
    onSuccess: () => {
      console.log("Data Inserted");
      queryClient.prefetchQuery("surat_umum", getAllSurat);
    },
  });

  const formik = useFormik({
    initialValues: {
      judul: "",
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
    setLoading(true);
    if (Object.keys(formik.errors).length == 0) {
      // const fileUploaded = await uploadFileToCloudinary(fileSrc);

      // setUploadData(fileUploaded);

      // const data = {
      //   ...values,
      //   file: fileUploaded.url,
      // };
      // console.log(data);

      const fileUploaded = await uploadFileToCloudinary(fileSrc);
      console.log(fileSrc);

      setUploadData(fileUploaded);
      let model = {
        ...values,
        file: fileUploaded.url,
      };
      console.log(model);
      addMutation.mutate(model);
      setLoading(false);
      formik.resetForm();
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
  if (addMutation.isError) return <Bug message={addMutation.error.message} />;

  return (
    <div>
      <h1 className="text-3xl font-semibold pb-3">Upload Surat</h1>
      {addMutation.isSuccess ? (
        <Success message={"Data berhasil ditambahkan"} />
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
                  <h5 className="mb-2 font-semibold">Surat Masuk dari</h5>
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
                  <h5 className="mb-2 font-semibold">Tanggal</h5>
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
                  <div>
                    <input type="file" name="file" onChange={handleOnChange} />
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
