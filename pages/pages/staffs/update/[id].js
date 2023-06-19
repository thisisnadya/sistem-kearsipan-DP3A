import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { staff_validation } from "@/lib/validation";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  updateFileCloudinary,
  updateStaff,
  getDetailStaff,
} from "@/lib/helper";

import Loading from "@/components/Loading";
import ToastMessage from "@/components/Toast";

export default function UpdateStaff() {
  const router = useRouter();
  const [id, setId] = useState();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { isLoading, isError, data, error } = useQuery(["staffs", id], () =>
    getDetailStaff(id)
  );

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setId(id);
    }
  }, [router.query]);

  const updateMutation = useMutation((newData) => updateStaff(id, newData), {
    onSuccess: async (data) => {
      console.log("data updated");
    },
  });

  const [initialValues, setInitialValues] = useState({
    nama: "",
    nip: "",
    jabatan: "",
    nomor_telepon: "",
  });

  useEffect(() => {
    if (data) {
      setInitialValues({
        nama: data?.nama,
        nip: data?.nip,
        jabatan: data?.jabatan,
        nomor_telepon: data?.nomor_telepon,
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validate: staff_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    if (Object.keys(formik.errors).length == 0) {
      await updateMutation.mutate(values);
      setLoading(false);
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return "An error occured";
  return (
    <div>
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
      <div className="grid p-fluid">
        <div className="col-12 lg:col-8">
          <div className="card">
            <div className="grid formgrid">
              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Nama</h5>
                  <InputText
                    type="text"
                    placeholder="Nama"
                    name="nama"
                    className={
                      formik.errors.nama && formik.touched.nama
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("nama")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">NIP</h5>
                  <InputText
                    type="text"
                    placeholder="NIP"
                    name="nip"
                    className={
                      formik.errors.nip && formik.touched.nip ? "p-invalid" : ""
                    }
                    {...formik.getFieldProps("nip")}
                  ></InputText>
                </div>

                <div className="field">
                  <h5 className="mb-2 font-semibold">Jabatan</h5>
                  <InputText
                    type="text"
                    placeholder="Jabatan"
                    name="jabatan"
                    className={
                      formik.errors.jabatan && formik.touched.jabatan
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("jabatan")}
                  ></InputText>
                </div>
                <div className="field">
                  <h5 className="mb-2 font-semibold">Nomor Telepon</h5>
                  <InputText
                    type="text"
                    placeholder="Nomor Telepon"
                    name="nomor_telepon"
                    className={
                      formik.errors.nomor_telepon &&
                      formik.touched.nomor_telepon
                        ? "p-invalid"
                        : ""
                    }
                    {...formik.getFieldProps("nomor_telepon")}
                  ></InputText>
                </div>
                <Button
                  label={loading ? "Menyimpan.." : "Update"}
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
