import connectMongo from "@/database/conn";
import {
  deleteSuratUmum,
  getDetailSuratUmum,
  updateSuratUmum,
} from "@/database/controller";

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
      getDetailSuratUmum(req, res);
      break;
    case "PUT":
      updateSuratUmum(req, res);
      break;
    case "DELETE":
      deleteSuratUmum(req, res);
      break;
  }
}
