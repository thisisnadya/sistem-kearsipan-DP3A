import connectMongo from "@/database/conn";
import { addStaff } from "@/database/controller";

export default async function handler(req, res) {
  try {
    await connectMongo();
    return addStaff(req, res);
  } catch (error) {
    return res.status(405).json({ error: "Mongo connection error" });
  }
}
