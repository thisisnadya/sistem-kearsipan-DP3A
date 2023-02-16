import React from "react";
import Loading from "@/components/Loading";
import { getAllSuratMasuk } from "@/lib/helper";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useQuery } from "react-query";
import Link from "next/link";
import { AiFillFilePdf } from "react-icons/ai";
import { MdPageview } from "react-icons/md";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function homeSuratMasuk() {
  const toast = useRef(null);
  const { isLoading, isError, data, error } = useQuery(
    "surat_masuk",
    getAllSuratMasuk
  );

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Yakin ingin menghapus?",
      header: "Konfirmasi Penghapusan",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  const tableHeader = (
    <div>
      <h1 className="text-slate-700 text-3xl">Data Surat Masuk</h1>
    </div>
  );
  const viewBodyTemplate = (rowData) => {
    return (
      <Link href={`/pages/surat_masuk/${rowData._id}`}>
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
      <React.Fragment>
        <Toast ref={toast} />
        <ConfirmDialog />
        <div>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
            onClick={() => editProduct(rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={confirmDelete}
          />
        </div>
      </React.Fragment>
    );
  };

  if (isLoading) return <Loading />;
  return (
    // Data Table Starts
    <>
      <div className="my-4">
        <div className="card">
          <DataTable
            value={data}
            header={tableHeader}
            showGridlines
            responsiveLayout="scroll"
            paginator
            rows={5}
          >
            <Column field="judul" header="Judul"></Column>
            <Column field="surat_dari" header="Surat Dari"></Column>
            <Column header="Detail" body={viewBodyTemplate}></Column>
            <Column header="File" body={linkBodyTemplate}></Column>
            <Column
              header="Action"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
    // Data table ends
  );
}
