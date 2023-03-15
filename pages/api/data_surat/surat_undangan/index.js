import connectMongo from "@/database/conn";
import { getAllSuratUndangan } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  getAllSuratUndangan(req, res);
}
