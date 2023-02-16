import connectMongo from "@/database/conn";
import { deleteSuratMasuk, getDetailSuratMasuk } from "@/database/controller";

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
      getDetailSuratMasuk(req, res);
      break;
    case "PUT":
      res.status(200).json("PUT REQUEST");
      break;
    case "DELETE":
      deleteSuratMasuk(req, res);
      break;
  }
}
