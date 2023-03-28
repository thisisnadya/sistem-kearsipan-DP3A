import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { form_validation } from "@/lib/validation";
import { categories } from "@/lib/data";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  getAllSuratUmum,
  uploadFileToCloudinary,
  uploadSuratUmum,
  getDetailSuratUmum,
  updateFileCloudinary,
  updateSuratUndangan,
  getDetailSuratUndangan,
} from "@/lib/helper";

import Loading from "@/components/Loading";
import ToastMessage from "@/components/Toast";
import { Dropdown } from "primereact/dropdown";

export default function updatePage() {
  const router = useRouter();
  const [id, setId] = useState();
  // const [dataSurat, setDataSurat] = useState();
  const queryClient = useQueryClient();
  const [fileSrc, setFileSrc] = useState();
  const [newFileSrc, setNewFileSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setId(id);
    }
  }, [router.query]);

  const { isLoading, isError, data, error } = useQuery(
    ["surat_undangan", id],
    () => getDetailSuratUndangan(id)
  );
  const updateMutation = useMutation(
    (newData) => updateSuratUndangan(id, newData),
    {
      onSuccess: async (data) => {
        console.log("data updated");
      },
    }
  );

  const [initialValues, setInitialValues] = useState({
    judul: "",
    acara: "",
    surat_dari: "",
    nomor_surat: "",
    perihal: "",
    tanggal: "",
    jam_pelaksanaan: "",
    keterangan: "",
    file: null,
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        judul: data?.judul,
        surat_dari: data?.surat_dari,
        nomor_surat: data?.nomor_surat,
        perihal: data?.perihal,
        tanggal: data?.tanggal,
        jam_pelaksanaan: data?.jam_pelaksanaan,
        keterangan: data?.keterangan,
        file: data?.file,
        public_id: data?.public_id,
      });
    }
    setFileSrc(data?.file);
  }, [data]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validate: form_validation,
    onSubmit,
  });
  console.log("data: ", data);
  console.log("formik.values", formik.values);

  async function onSubmit(values) {
    setLoading(true);
    if (Object.keys(formik.errors).length == 0) {
      let model = {
        ...values,
      };
      if (newFileSrc) {
        const fileUploaded = await updateFileCloudinary(
          data?.public_id,
          newFileSrc
        );
        setUploadData(fileUploaded);
        model = {
          ...model,
          file: fileUploaded.url,
          public_id: fileUploaded.public_id,
        };
        // addMutation.mutate(model);
        setLoading(false);
        // formik.resetForm();
        console.log("model:", model);
      }
      console.log("model created:", model);
      await updateMutation.mutate(model);
      // addMutation.mutate(id, model);
      setLoading(false);

      // formik.resetForm();

      // console.log(uploadData);
    }
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setNewFileSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <>
      {!isLoading && !isError && data ? (
        <>
          <h1 className="text-3xl font-semibold pb-3">Update Page</h1>
          {updateMutation.isSuccess ? (
            // <Success message={"Data berhasil ditambahkan"} />
            <ToastMessage
              severity={"success"}
              summary={"Sukses!"}
              detail={"Data Berhasil diupdate"}
            />
          ) : (
            <></>
          )}
          <div>
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
                          // className={
                          //   formik.errors.judul && formik.touched.judul
                          //     ? "p-invalid"
                          //     : ""
                          // }
                          {...formik.getFieldProps("acara")}
                        ></InputText>
                      </div>
                      <div className="field">
                        <h5 className="mb-2 font-semibold">Surat dari</h5>
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
                          className={
                            formik.errors.nomor_surat &&
                            formik.touched.nomor_surat
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
                        <h5 className="mb-2 font-semibold">
                          Tanggal Pelaksanaan
                        </h5>
                        <Calendar
                          showIcon
                          showButtonBar
                          name="tanggal"
                          {...formik.getFieldProps("tanggal")}
                        />
                      </div>
                      <div className="field">
                        <h5 className="mb-2 font-semibold">Jam pelaksanaan</h5>
                        <InputText
                          type="text"
                          placeholder="ex 08.00"
                          name="jam_pelaksanaan"
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
                        <h5 className="font-semibold mb-2">Upload File</h5>
                        <div>
                          <input
                            type="file"
                            name="file"
                            accept=".pdf"
                            onChange={handleOnChange}
                          />
                          <iframe
                            src={newFileSrc ? newFileSrc : initialValues.file} // frameBorder="0"
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
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
