import suratMasuk from "@/model/surat_masuk";
import suratKeluar from "@/model/surat_keluar";
import suratKepegawaian from "@/model/surat_kepegawaian";

// SURAT MASUK

// GET all surat
// http://localhost:3000/api/data_surat/surat_masuk
export const getAllSuratMasuk = async (req, res) => {
  try {
    const allSurat = await suratMasuk.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// GET SPECIFIC SURAT
// http://localhost:3000/api/data_surat/surat_masuk/[id]
// export const getDetailSuratMasuk = async (req, res) => {
//   try {
//     res.send(req.query);
//     console.log(req.query);
//     // res.status(200).json(findSurat);
//   } catch (error) {
//     res.status(404).json({ error });
//   }
// };

// POST data surat
// http://localhost:3000/api/data_surat/surat_masuk/upload
export const uploadSuratMasuk = async (req, res) => {
  try {
    const dataSurat = req.body;

    if (!dataSurat) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await suratMasuk.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// UPDATE data surat

// SURAT KELUAR
// get All Surat Keluar
export const getAllSuratKeluar = async (req, res) => {
  try {
    const allSurat = await suratKeluar.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// upload surat
// http://localhost:3000/api/data_surat/surat_keluar/upload
export const uploadSuratKeluar = async (req, res) => {
  try {
    const dataSurat = req.body;

    if (!dataSurat) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await suratKeluar.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// KEPEGAWAIAN

// get All Surat
// http://localhost:3000/api/data_surat/kepegawaian/
export const getAllSuratKepegawaian = async (req, res) => {
  try {
    const allSurat = await suratKepegawaian.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// upload surat
// http://localhost:3000/api/data_surat/kepegawaian/upload
export const uploadSuratKepegawaian = async (req, res) => {
  try {
    const dataSurat = req.body;

    if (!dataSurat) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await suratKepegawaian.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};
