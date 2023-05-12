import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getDetailSK } from "@/lib/helper";
import Link from "next/link";
import Loading from "@/components/Loading";
import moment from "moment/moment";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, data, error } = useQuery(["sk", id], () =>
    getDetailSK(id)
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="title">
        <h1 className="text-3xl font-semibold pb-3">Detail Page</h1>
      </div>
      <div className="detail">
        <h1 className="font-normal text-xl py-3">Judul : {data?.judul}</h1>
        <h1 className="font-normal text-xl py-3">
          Nama : {data?.nama ? data.nama : "Tidak ada keterangan"}
        </h1>
        <h1 className="font-normal text-xl py-3">
          Nomor Surat : {data?.nomor_surat}
        </h1>
        <h1 className="font-normal text-xl py-3">Perihal : {data?.perihal}</h1>
        <h1 className="font-normal text-xl py-3">
          Tanggal Diarsipkan:{" "}
          {moment(data?.createdAt).utc().format("DD-MM-YYYY")}
        </h1>
        <h1 className="font-normal text-xl py-3">
          Keterangan :{" "}
          {data?.keterangan ? data.keterangan : "Tidak ada keterangan"}
        </h1>
        <object
          data={data?.file}
          type="application/pdf"
          width="100%"
          height="700"
        >
          <p>
            Alternative: Klik{" "}
            <Link
              href={data?.file}
              className="text-zinc-900 font-bold"
              target="_blank"
            >
              disini
            </Link>{" "}
            untuk lihat file
          </p>
        </object>
      </div>
    </div>
  );
}
