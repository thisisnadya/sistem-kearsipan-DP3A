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

  const detail = data.find((item) => item._id == id);
  console.log(detail);

  if (isLoading) return <Loading />;
  return (
    <>
      <h1>Detail Page</h1>
      <h1>Judul : {detail.judul}</h1>
    </>
  );
}
