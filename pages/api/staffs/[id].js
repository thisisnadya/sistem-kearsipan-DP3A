import connectMongo from "@/database/conn";
import {
  deleteStaff,
  updateStaff,
  getDetailStaff,
} from "@/database/controller";

export default function handler(req, res) {
  connectMongo().catch(() => {
    res.status(405).json({ error: "Mongo connection error" });
  });

  const { method } = req;

  switch (method) {
    case "GET":
      getDetailStaff(req, res);
      break;
    case "PUT":
      updateStaff(req, res);
      break;
    case "DELETE":
      deleteStaff(req, res);
      break;
  }
}
