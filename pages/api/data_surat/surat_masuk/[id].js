import connectMongo from "@/database/conn";
import { getDetailSuratMasuk } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  const { id } = req.query;
  return res.status(200).json({ params: req.query });
}
