import connectMongo from "@/database/conn";
import { getAllSuratMasuk } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  getAllSuratMasuk(req, res);
}
