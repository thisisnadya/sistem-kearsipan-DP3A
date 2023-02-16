import connectMongo from "@/database/conn";
import { getDetailSuratKeluar } from "@/database/controller";

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
      getDetailSuratKeluar(req, res);
      break;
    case "PUT":
      res.status(200).json("PUT REQUEST");
      break;
    case "DELETE":
      res.status(200).json("DELETE REQUEST");
      break;
  }
}
