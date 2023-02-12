import connectMongo from "@/database/conn";
import {
  getAllSurat,
  getDetailSurat,
  uploadSurat,
} from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  const { method, query } = req;
  console.log(req.query);

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
