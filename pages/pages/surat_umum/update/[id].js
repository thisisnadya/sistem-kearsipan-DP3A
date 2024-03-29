import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { surat_umum_validation } from "@/lib/validation";
import { categories } from "@/lib/data";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  getAllSuratUmum,
  uploadFileToCloudinary,
  uploadSuratUmum,
  getDetailSuratUmum,
  updateSuratUmum,
  updateFileCloudinary,
} from "@/lib/helper";

import Loading from "@/components/Loading";
import ToastMessage from "@/components/Toast";
import { Dropdown } from "primereact/dropdown";

export default function UpdatePage() {
  const router = useRouter();
  const [id, setId] = useState();
  // const [dataSurat, setDataSurat] = useState();
  const queryClient = useQueryClient();
  const [fileSrc, setFileSrc] = useState();
  const [newFileSrc, setNewFileSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { isLoading, isError, data, error } = useQuery(["surat_umum", id], () =>
    getDetailSuratUmum(id)
  );

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setId(id);
    }
  }, [router.query]);

  useEffect(() => {
    setSelectedCategory(
      categories.find((item) => item.code === data?.klasifikasi_surat)
    );
  }, []);

  const updateMutation = useMutation(
    (newData) => updateSuratUmum(id, newData),
    {
      onSuccess: async (data) => {
        console.log("data updated");
      },
    }
  );

  const [initialValues, setInitialValues] = useState({
    judul: "",
    surat_dari: "",
    nomor_surat: "",
    klasifikasi_surat: "",
    perihal: "",
    keterangan: "",
    file: null,
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        judul: data?.judul,
        surat_dari: data?.surat_dari,
        nomor_surat: data?.nomor_surat,
        klasifikasi_surat: data?.klasifikasi_surat,
        perihal: data?.perihal,
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
    validate: surat_umum_validation,
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
                        <h5 className="mb-2 font-semibold">
                          Klasifikasi Surat
                        </h5>
                        <Dropdown
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.value)}
                          name="klasifikasi_surat"
                          options={categories}
                          optionLabel="name"
                          optionValue="code"
                          placeholder="Pilih kode dan kategori"
                          // keyField="code"
                          // className="w-full"
                          {...formik.getFieldProps("klasifikasi_surat")}
                        />
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
                          Upload File (Ukuran File Maksimum 10MB)
                        </h5>
                        <div>
                          <input
                            type="file"
                            name="file"
                            accept=".pdf"
                            // required
                            onChange={handleOnChange}
                          />
                          <iframe
                            src={newFileSrc ? newFileSrc : initialValues.file}
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
