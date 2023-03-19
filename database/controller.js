import suratUmum from "@/model/surat_umum";
import undangan from "@/model/undangan";

// ----------------------------------SURAT UMUM------------------------------------

// GET all surat
// http://localhost:3000/api/data_surat/surat_umum
export const getAllSuratUmum = async (req, res) => {
  try {
    const allSurat = await suratUmum.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// GET SPECIFIC SURAT
// http://localhost:3000/api/data_surat/surat_umum/[id]
export const getDetailSuratUmum = async (req, res) => {
  try {
    const findSurat = await suratUmum.findById(req.query.id);
    res.status(200).json(findSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// POST data surat
// http://localhost:3000/api/data_surat/surat_umum/upload
export const uploadSuratUmum = async (req, res) => {
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

// DELETE SURAT
// http://localhost:3000/api/data_surat/surat_masuk/[id]
export const deleteSuratUmum = async (req, res) => {
  try {
    const response = await suratUmum.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

// UPDATE data surat masuk
// http://localhost:3000/api/data_surat/surat_masuk/[id]
export const updateSuratUmum = async (req, res) => {
  const { keterangan } = req.body;
  try {
    const updatedData = await suratUmum.updateOne(
      { _id: req.query.id },
      { $set: { keterangan: keterangan } }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(404).json(error);
  }
};

//---------------------------------------- UNDANGAN --------------------------------------

// get All Surat
// http://localhost:3000/api/data_surat/surat_undangan/
export const getAllSuratUndangan = async (req, res) => {
  try {
    const allSurat = await undangan.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// get specific surat kepegawaian
// http://localhost:3000/api/data_surat/surat_undangan/[id]
export const getDetailSuratUndangan = async (req, res) => {
  try {
    const findSurat = await undangan.findById(req.query.id);
    res.status(200).json(findSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// upload surat
// http://localhost:3000/api/data_surat/surat_undangan/upload
export const uploadSuratUndangan = async (req, res) => {
  try {
    const dataSurat = req.body;

    if (!dataSurat) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await undangan.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// delete surat
// http://localhost:3000/api/data_surat/surat_undangan/[id]
export const deleteSuratUndangan = async (req, res) => {
  try {
    const response = await undangan.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
