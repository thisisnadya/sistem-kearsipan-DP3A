import connectMongo from "@/database/conn";
import {
  deleteSuratUndangan,
  getDetailSuratUndangan,
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
      getDetailSuratUndangan(req, res);
      break;
    case "PUT":
      res.status(200).json("PUT REQUEST");
      break;
    case "DELETE":
      deleteSuratUndangan(req, res);
      break;
  }
}