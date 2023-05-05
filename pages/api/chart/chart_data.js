import connectMongo from "@/database/conn";
import suratUmum from "@/model/surat_umum";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agust",
  "Sept",
];

export default async function handler(req, res) {
  await connectMongo();

  const result = await suratUmum.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        data: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        month: "$_id",
        count: { $size: "$data" },
        bulan: { $arrayElemAt: [months, { $subtract: ["$_id", 1] }] },
      },
    },
  ]);

  res.status(200).json(result);
}
