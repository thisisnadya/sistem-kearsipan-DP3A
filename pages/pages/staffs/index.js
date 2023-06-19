import React, { useRef, useState } from "react";
import Loading from "@/components/Loading";
import {
  addStaff,
  deleteStaff,
  getAllStaffs,
  getDetailStaff,
} from "@/lib/helper";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Link from "next/link";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ToastMessage from "@/components/Toast";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { exportToExcel } from "@/lib/helper";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { staff_validation } from "@/lib/validation";

const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://sistem-kearsipan-dp-3-a.vercel.app/sakai-react/"
    : "http://localhost:3000";

export default function HomeSuratUmum() {
  const queryClient = useQueryClient();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const {
    isLoading: isLoadingAllStaffs,
    isError: isErrorAllStaffs,
    data: allStaffsData,
    error: errorAllStaffs,
  } = useQuery("staffs", getAllStaffs);
  // const {
  //   isLoading: isLoadingStaff,
  //   isError: isErrorStaff,
  //   data: staffData,
  //   error: errorStaff,
  // } = useQuery(["staffs", id], () => getDetailStaff(id));

  const addStaffMutation = useMutation(addStaff, {
    onSuccess: () => {
      console.log("Data Inserted");
      queryClient.prefetchQuery("staffs", getAllStaffs);
    },
  });

  const addMutation = useMutation(deleteStaff, {
    onSuccess: () => {
      console.log("Data Deleted");
      queryClient.prefetchQuery("staffs", getAllStaffs);
    },
  });

  const formik = useFormik({
    initialValues: {
      nama: "",
      nip: "",
      jabatan: "",
      nomor_telepon: "",
    },
    validate: staff_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    if (Object.keys(formik.errors).length == 0) {
      addStaffMutation.mutate(values);
      setLoading(false);
      formik.resetForm();
    }

    console.log(values);
  }

  // filters
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nip: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    jabatan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  async function handleDelete(id) {
    addMutation.mutate(id);
    // const res = await deleteStaff(id);

    // console.log(res);
    return;
  }

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const tableHeader = (
    <div>
      <h1 className="text-slate-700 text-3xl">Data Pegawai</h1>
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
      <Button
        label="Export to excel"
        onClick={() => exportToExcel("staffs")}
      ></Button>
      <Button
        className="ml-5"
        label="Tambah Data"
        onClick={() => setVisible(true)}
      ></Button>
      <Dialog
        header="Tambah Data Pegawai"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div>
          {addStaffMutation.isSuccess ? (
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
                          formik.errors.nip && formik.touched.nip
                            ? "p-invalid"
                            : ""
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
      </Dialog>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Link href={`${BASE_URL}/pages/staffs/update/${rowData._id}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
          />
        </Link>
        <>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            // onClick={() => setVisible(true)}
            onClick={() => handleDelete(rowData._id)}
          />
        </>
      </div>
    );
  };

  if (isLoadingAllStaffs) return <Loading />;
  if (errorAllStaffs) return "An error occured";

  return (
    <div>
      {/* Data Table Starts */}
      <div className="my-4">
        <div className="card">
          <DataTable
            value={allStaffsData}
            header={tableHeader}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={["nama", "jabatan", "nip"]}
            showGridlines
            responsiveLayout="scroll"
            paginator
            rows={10}
          >
            <Column
              field="nama"
              header="Nama"
              // style={{ width: "10%" }}
              // filter
              // filterPlaceholder="Cari"
            ></Column>
            <Column field="nip" header="NIP"></Column>
            <Column header="Jabatan" field="jabatan"></Column>
            <Column header="Nomor Telepon" field="nomor_telepon"></Column>
            <Column
              header="Action"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
      {addMutation.isSuccess ? (
        <ToastMessage
          severity={"success"}
          summary={"Success!"}
          detail={"Data berhasil dihapus"}
        />
      ) : (
        <></>
      )}
    </div>
    // Data table ends
  );
}
