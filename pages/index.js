import { getSession, useSession, signOut } from "next-auth/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllSurat } from "@/lib/helper";
import Link from "next/link";
import Loading from "@/components/Loading";
import { AiFillFilePdf } from "react-icons/ai";

export default function Home({ session }) {
  // const { data: session } = useSession();
  // pagination
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(3);
  const { isLoading, isError, data, error } = useQuery(
    "surat_umum",
    getAllSurat
  );

  // getAllSurat().then((res) => console.log(res));
  console.log(data);

  const onBasicPageChange = (event) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
  };

  // data to dipslay in the table
  const dummyData = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ];

  // data to displat in the chart
  const dummyData2 = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [540, 325, 702, 620],
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

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const tableHeader = (
    <div>
      <h1 className="text-slate-700 text-3xl">Data Surat Masuk dan Keluar</h1>
    </div>
  );

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

  if (isLoading) return <Loading />;

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
              value={data}
              header={tableHeader}
              showGridlines
              responsiveLayout="scroll"
              paginator
              rows={5}
            >
              <Column field="judul" header="Judul"></Column>
              <Column field="surat_dari" header="Surat Dari"></Column>
              <Column field="nomor_surat" header="Nomor Surat"></Column>
              <Column field="perihal" header="Perihal"></Column>
              <Column field="keterangan" header="Keterangan"></Column>
              <Column header="File" body={linkBodyTemplate}></Column>
            </DataTable>
          </div>
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
