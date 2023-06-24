import connectMongo from "@/database/conn";
import { deleteSK, getDetailSK, updateSK } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  // const { id } = req.query;
  // return res.status(200).json({ params: req.query });
  // getDetailSuratMasuk(req, res);

  const { method } = req;

  switch (method) {
    case "GET":
      getDetailSK(req, res);
      break;
    case "PUT":
      updateSK(req, res);
      break;
    case "DELETE":
      deleteSK(req, res);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
  }
}
