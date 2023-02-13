import connectMongo from "@/database/conn";
import { uploadSuratKepegawaian } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  uploadSuratKepegawaian(req, res);
}
