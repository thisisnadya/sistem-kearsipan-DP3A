import connectMongo from "@/database/conn";
import suratUmum from "@/model/surat_umum";
import { Readable } from "stream";
import ExcelJS from "exceljs";

export default async function handler(req, res) {
  try {
    connectMongo().catch(() => {
      res.status(405).json({ error: "Mongo connection error" });
    });

    const allSurat = await suratUmum.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    worksheet.addRow([
      "Judul",
      "Surat Dari",
      "Kategori Surat",
      "Link File",
      "Keterangan",
    ]);

    // Add data rows
    allSurat?.forEach((item) => {
      worksheet.addRow([
        item.judul,
        item.surat_dari,
        item.klasifikasi_surat,
        item.file,
        item.keterangan,
      ]);
    });

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Set the response headers
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    // Pipe the stream to the response
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
