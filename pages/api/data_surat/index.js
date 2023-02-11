import connectMongo from "@/database/conn";
import { getAllSurat, uploadSurat } from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  const { method } = req;

  switch (method) {
    case "GET":
      getAllSurat(req, res);
      break;
    case "POST":
      uploadSurat(req, res);
      break;
    case "PUT":
      res.send("PUT request");
      break;
    case "DELETE":
      res.send("DELETE request");
      break;

    default:
      res.send("Method not allowed");
      break;
  }
}