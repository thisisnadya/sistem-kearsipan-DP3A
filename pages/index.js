import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import {
  deleteFileCloudinary,
  deleteSuratUmum,
  getAllSK,
  getAllSuratUmum,
  getAllSuratUndangan,
  getSuratUmumChartData,
} from "@/lib/helper";
import Link from "next/link";
import Loading from "@/components/Loading";
import { AiFillFilePdf } from "react-icons/ai";
import { MdPageview } from "react-icons/md";
import { useRouter } from "next/router";
import ToastMessage from "@/components/Toast";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import moment from "moment/moment";

export default function Home() {
  const queryClient = useQueryClient();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [chartData, setChartData] = useState();
  // const { data: session } = useSession();
  const session = useSession();
  const router = useRouter();
  // console.log(session);

  useEffect(() => {
    if (session.status == "unauthenticated") router.replace("/auth/login");
  }, [session.status]);

  useEffect(async () => {
    setChartData(await getSuratUmumChartData());
  }, []);

  // filters
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    klasifikasi_surat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    createdAt: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // get Data
  const queries = [
    {
      queryKey: "surat_umum",
      queryFn: getAllSuratUmum,
    },
    {
      queryKey: "surat_undangan",
      queryFn: getAllSuratUndangan,
    },
    {
      queryKey: "surat_keterangan",
      queryFn: getAllSK,
    },
  ];
  const results = useQueries(queries);

  const isError = results.some((result) => result.isError);
  const isLoading = results.every((result) => result.isLoading);

  const suratUmumData = results[0].data;
  const suratUndanganData = results[1].data;
  const suratKeteranganData = results[2].data;

  // handle delete button
  const addMutation = useMutation(deleteSuratUmum, {
    onSuccess: () => {
      console.log("Data Deleted");
      queryClient.prefetchQuery("surat_masuk", getAllSuratUmum);
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

  // data to displat in the chart
  const dummyData2 = {
    labels: chartData?.map((item) => item.bulan),
    datasets: [
      {
        label: "Surat Umum",
        data: chartData?.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log(chartData);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            max: 50,
          },
        },
      ],
    },
  };

  const tableHeader = (
    <div>
      <h1 className="text-slate-700 text-3xl">Data Surat Umum</h1>
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

  const showDate = (rowData) => {
    return moment(rowData.createdAt).utc().format("DD-MM-YYYY");
  };

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
        <Link href={`/pages/surat_umum/update/${rowData._id}`}>
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

  if (isLoading) return <Loading />;
  if (isError) return <div>Failed to fetch data</div>;

  return (
    <>
      <div>
        <div className="title mb-5">
          <h1 className="text-4xl font-bold text-slate-800">
            Selamat Datang Admin!
          </h1>
        </div>
        {/* summary report starts */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          <div>
            <div className="card mb-0">
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Surat Umum
                  </span>
                  <div className="text-900 font-medium text-xl">
                    {suratUmumData?.length}
                  </div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card mb-0">
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Undangan
                  </span>
                  <div className="text-900 font-medium text-xl">
                    {suratUndanganData?.length}
                  </div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card mb-0">
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Surat Keterangan
                  </span>
                  <div className="text-900 font-medium text-xl">
                    {suratKeteranganData?.length}
                  </div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card mb-0">
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Orders
                  </span>
                  <div className="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Summary report end */}

        {/* Data table starts */}
        <div className="my-4">
          <div className="card">
            <DataTable
              value={suratUmumData}
              header={tableHeader}
              filters={filters}
              filterDisplay="row"
              globalFilterFields={["judul", "klasifikasi_surat", "createdAt"]}
              showGridlines
              responsiveLayout="scroll"
              paginator
              rows={10}
            >
              <Column
                field="klasifikasi_surat"
                header="Kode"
                style={{ width: "20%" }}
                filter
                filterPlaceholder="Cari"
              ></Column>
              <Column field="judul" header="Judul"></Column>
              <Column
                header="Tanggal Diarsipkan"
                body={showDate}
                sortable
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
            </DataTable>
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
        {/* Data table ends */}

        {/* Chart starts */}
        <div className="card">
          <Chart type="bar" data={dummyData2} options={options} />
        </div>
        {/* Chart ends */}
      </div>
    </>
  );
}

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
