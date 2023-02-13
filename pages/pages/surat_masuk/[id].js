import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getDetailSuratMasuk } from "@/lib/helper";

export default function detail() {
  const router = useRouter();
  const { id } = router.query;

  //   const { data, error, isLoading, isError } = useQuery(
  //     ["detail", { id }],
  //     (id) => getDetailSuratMasuk(id)
  //   );

  //   if (isLoading) return <h1>Loading..</h1>;
  return (
    <div>
      <h1>Detail Page</h1>
    </div>
  );
}
