import suratUmum from "@/model/surat_umum";

// GET all surat
// http://localhost:3000/api/data_surat
export const getAllSurat = async (req, res) => {
  try {
    const allSurat = await suratUmum.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};
// POST data surat
// http://localhost:3000/api/data_surat
export const uploadSurat = async (req, res) => {
  try {
    const dataSurat = req.body;

    if (!dataSurat) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await suratUmum.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// UPDATE data surat
