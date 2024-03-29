import React, { useRef, useState } from "react";
import Loading from "@/components/Loading";
import { deleteFileCloudinary, deleteSK, getAllSK } from "@/lib/helper";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Link from "next/link";
import { AiFillFilePdf } from "react-icons/ai";
import { MdPageview } from "react-icons/md";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ToastMessage from "@/components/Toast";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import moment from "moment/moment";
import { exportToExcel } from "@/lib/helper";

const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://sistem-kearsipan-dp-3-a.vercel.app/sakai-react/"
    : "http://localhost:3000";

export default function HomeSuratKeterangan() {
  const queryClient = useQueryClient();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const { isLoading, isError, data, error } = useQuery("sk", getAllSK);

  const addMutation = useMutation(deleteSK, {
    onSuccess: () => {
      console.log("Data Deleted");
      queryClient.prefetchQuery("sk", getAllSK);
    },
  });

  // filters
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  async function handleDelete(public_id, id) {
    addMutation.mutate(id);
    const res = await deleteFileCloudinary(public_id);

    console.log(res);
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
      <h1 className="text-slate-700 text-3xl">Data Surat Keterangan</h1>
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
        onClick={() => exportToExcel("surat_keterangan")}
      ></Button>
    </div>
  );

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };
  const viewBodyTemplate = (rowData) => {
    return (
      <Link href={`${BASE_URL}/pages/surat_keterangan/detail/${rowData._id}`}>
        <MdPageview
          size={24}
          className={`text-indigo-500 hover:text-indigo-300`}
        />
        <span className="text-slate-800">Lihat Detail</span>
      </Link>
    );
  };

  const linkBodyTemplate = (rowData) => {
    return (
      <Link href={rowData.file} target="_blank">
        <AiFillFilePdf
          size={24}
          className={`text-indigo-500 hover:text-indigo-300`}
        />
      </Link>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Link href={`${BASE_URL}/pages/surat_keterangan/update/${rowData._id}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
          />
        </Link>
        {/* <Toast ref={toast} />
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Apakah Anda yakin ingin menghapus?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => handleDelete(rowData.public_id, rowData._id)}
          reject={reject}
        /> */}
        <>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            // onClick={() => setVisible(true)}
            onClick={() => handleDelete(rowData.public_id, rowData._id)}
          />
        </>
      </div>
    );
  };

  const historyBodyTemplate = (rowData) => {
    return (
      <Link href={`${BASE_URL}/pages/surat_keterangan/riwayat/${rowData._id}`}>
        <i
          className="pi pi-history text-indigo-500 hover:text-indigo-300"
          size={24}
        ></i>
      </Link>
    );
  };
  if (isLoading) return <Loading />;

  return (
    <div>
      {/* Data Table Starts */}
      <div className="my-4">
        <div className="card">
          <DataTable
            value={data}
            header={tableHeader}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={["judul", "nama"]}
            showGridlines
            responsiveLayout="scroll"
            paginator
            rows={10}
          >
            <Column field="judul" header="Judul"></Column>
            <Column field="nama" header="Nama" sortable></Column>
            <Column
              field="createdAt"
              header="Tanggal Diarsipkan"
              body={dateBodyTemplate}
              sortable
              dataType="date"
              style={{ width: "20%" }}
            ></Column>
            <Column header="Detail" body={viewBodyTemplate}></Column>
            <Column header="File" body={linkBodyTemplate}></Column>
            <Column
              header="Action"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              header="Riwayat"
              body={historyBodyTemplate}
              exportable={false}
              // style={{ minWidth: "8rem" }}
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
