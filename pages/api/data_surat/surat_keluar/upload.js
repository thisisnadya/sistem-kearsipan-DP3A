import connectMongo from "@/database/conn";
import { uploadSuratKeluar } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  uploadSuratKeluar(req, res);
}
