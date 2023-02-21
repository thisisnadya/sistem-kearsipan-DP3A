import React, { useRef, useState } from "react";
import Loading from "@/components/Loading";
import {
  deleteFileCloudinary,
  deleteSuratMasuk,
  getAllSuratMasuk,
} from "@/lib/helper";
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

export default function homeSuratMasuk() {
  const queryClient = useQueryClient();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);

  const { isLoading, isError, data, error } = useQuery(
    "surat_masuk",
    getAllSuratMasuk
  );

  const addMutation = useMutation(deleteSuratMasuk, {
    onSuccess: () => {
      console.log("Data Deleted");
      queryClient.prefetchQuery("surat_masuk", getAllSuratMasuk);
    },
  });

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
      <div>
        <Toast ref={toast} />
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Apakah Anda yakin ingin menghapus?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => handleDelete(rowData.public_id, rowData._id)}
          reject={reject}
        />
        <>
          <Link href={`/pages/surat_masuk/update/${rowData._id}`}>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success mr-2"
              // onClick={() => setVisible(true)}
            />
          </Link>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => setVisible(true)}
          />
        </>
      </div>
    );
  };

  if (isLoading) return <Loading />;
  if (addMutation.isSuccess)
    return (
      <ToastMessage
        severity={"success"}
        summary={"Success!"}
        detail={"Data berhasil dihapus"}
      />
    );
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
