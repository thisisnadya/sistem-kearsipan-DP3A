import { getHistorySuratUmum } from "@/lib/helper";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import moment from "moment/moment";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { exportToExcel } from "@/lib/helper";
import { Button } from "primereact/button";

export default function Riwayat() {
  const router = useRouter();
  const [id, setId] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setId(id);
    }
  }, [router.query]);

  const { isLoading, isError, data, error } = useQuery(
    ["riwayat_surat_umum", id],
    () => getHistorySuratUmum(id)
  );

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    judul: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const tableHeader = (
    <div>
      <h1 className="text-slate-700 text-3xl">Data Riwayat Update</h1>
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
    </div>
  );

  const showLastUpdate = (rowData) => {
    return moment(rowData.validUntil).utc().format("DD-MM-YYYY");
  };

  const showDate = (rowData) => {
    return moment(rowData.createdAt).utc().format("DD-MM-YYYY");
  };

  const historyBodyTemplate = (rowData) => {
    const { updateDescription } = rowData;

    if (updateDescription && updateDescription.updatedFields) {
      const updatedFields = updateDescription.updatedFields;
      const updatedFieldsKeys = Object.keys(updatedFields);

      if (updatedFieldsKeys.length > 0) {
        return (
          <ul>
            {updatedFieldsKeys.map((key) => (
              <li key={key}>
                <strong>{key}:</strong> {updatedFields[key]}
              </li>
            ))}
          </ul>
        );
      }
    }

    return "";
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
            globalFilterFields={["judul", "surat_dari"]}
            showGridlines
            responsiveLayout="scroll"
            paginator
            rows={10}
          >
            <Column
              body={showLastUpdate}
              header="Terakhir diupdate"
              style={{ width: "10%" }}
            ></Column>
            <Column field="judul" header="Judul"></Column>
            <Column
              header="Tanggal Diarsipkan"
              body={showDate}
              style={{ width: "20%" }}
            ></Column>
            <Column
              header="Riwayat"
              body={historyBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
