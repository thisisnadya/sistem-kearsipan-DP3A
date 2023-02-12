import { useQuery } from "react-query";
import { getAllSurat } from "@/lib/helper";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const initialData = {
    judul: "Surat Pemberitahuan",
  };

  const { isLoading, isError, data, error } = useQuery(
    "surat_umum",
    getAllSurat,
    { initialData }
  );

  console.log(data);

  // const detail = data.find((item) => item._id == id);
  // console.log(detail);

  if (isLoading) return <Loading />;
  return (
    <>
      <h1 className="text-3xl font-semibold pb-3">Detail Page</h1>

      {/* <div className="detail">
        <div className="judul_surat">
          <h1 className="text-2xl font-semibold pb-3">{detail.judul}</h1>
        </div>
        <div className="tanggal">
          <h1 className="text-2xl font-semibold pb-3">
            Tanggal Masuk: {detail.tanggal}
          </h1>
        </div>
        <div className="surat_masuk_dari">
          <h1 className="text-2xl font-semibold pb-3">
            Surat Masuk Dari: {detail.surat_dari}
          </h1>
        </div>
        <div className="perihal">
          <h1 className="text-2xl font-semibold pb-3">
            Perihal: {detail.perihal}
          </h1>
        </div>
        <div className="keterangan">
          <h1 className="text-2xl font-semibold pb-3">
            Keterangan: {detail.keterangan ? detail.keterangan : "-"}
          </h1>
        </div>
      </div> */}
    </>
  );
}
