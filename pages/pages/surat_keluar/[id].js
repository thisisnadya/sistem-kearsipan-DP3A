import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getDetailSuratKeluar } from "@/lib/helper";
import { useState } from "react";
import Link from "next/link";

export default function detail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailSurat, setDetailSurat] = useState();

  //   const { data, error, isLoading, isError } = useQuery(
  //     ["detail", { id }],
  //     (id) => getDetailSuratMasuk(id)
  //   );

  const { isLoading, isError, data, error } = useQuery(
    ["surat_keluar", id],
    () => getDetailSuratKeluar(id)
  );

  if (isLoading) return <h1>Loading..</h1>;

  return (
    <div>
      <div className="title">
        <h1 className="text-3xl font-semibold pb-3">Detail Page</h1>
      </div>
      <div className="detail">
        <h1 className="font-normal text-xl py-3">Judul : {data.judul}</h1>
        <h1 className="font-normal text-xl py-3">
          Surat Untuk :{" "}
          {data.surat_kepada ? data.surat_kepada : "Tidak ada keterangan"}
        </h1>
        <h1 className="font-normal text-xl py-3">
          Nomor Surat : {data.nomor_surat}
        </h1>
        <h1 className="font-normal text-xl py-3">Perihal : {data.perihal}</h1>
        <h1 className="font-normal text-xl py-3">Tanggal : {data.tanggal}</h1>
        <h1 className="font-normal text-xl py-3">
          Keterangan :{" "}
          {data.keterangan ? data.keterangan : "Tidak ada keterangan"}
        </h1>
        <object
          data={data.file}
          type="application/pdf"
          width="100%"
          height="700"
        >
          <p>
            Alternative: Klik <Link href={data.file}>disini</Link> untuk lihat
            file
          </p>
        </object>
      </div>
    </div>
  );
}
