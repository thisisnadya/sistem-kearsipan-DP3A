import connectMongo from "@/database/conn";
import sk from "@/model/sk";
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
  "Okt",
  "Nov",
  "Des",
];

export default async function handler(req, res) {
  await connectMongo();

  const resultUmum = await suratUmum.aggregate([
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

  const resultKeterangan = await sk.aggregate([
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

  const dataUmum = [];
  const dataKeterangan = [];

  for (let i = 0; i < months.length; i++) {
    const month = i + 1;
    const umumCount = resultUmum.find((item) => item._id === month)?.count || 0;
    const keteranganCount =
      resultKeterangan.find((item) => item._id === month)?.count || 0;

    if (umumCount > 0) {
      dataUmum.push(umumCount);
    } else {
      dataUmum.push(null);
    }

    if (keteranganCount > 0) {
      dataKeterangan.push(keteranganCount);
    } else {
      dataKeterangan.push(null);
    }
  }

  res.status(200).json({ umum: dataUmum, keterangan: dataKeterangan });
}
