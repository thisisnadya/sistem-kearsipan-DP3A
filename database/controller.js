import suratUmum from "@/model/surat_umum";
import suratUndangan from "@/model/surat_undangan";

// ----------------------------------SURAT MASUK------------------------------------

// GET all surat
// http://localhost:3000/api/data_surat/surat_masuk
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
// http://localhost:3000/api/data_surat/surat_masuk/[id]
export const getDetailSuratUmum = async (req, res) => {
  try {
    const findSurat = await suratUmum.findById(req.query.id);
    res.status(200).json(findSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// POST data surat
// http://localhost:3000/api/data_surat/surat_masuk/upload
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

// -------------------------------------SURAT KELUAR------------------------------------------------------

// GET All Surat Keluar
// http://localhost:3000/api/data_surat/surat_keluar/
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

// get specific surat keluar
// http://localhost:3000/api/data_surat/surat_keluar/[id]
export const getDetailSuratKeluar = async (req, res) => {
  try {
    const findSurat = await suratKeluar.findById(req.query.id);
    res.status(200).json(findSurat);
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

// delete surat
// http://localhost:3000/api/data_surat/surat_keluar/[id]
export const deleteSuratKeluar = async (req, res) => {
  try {
    const response = await suratKeluar.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

//---------------------------------------- KEPEGAWAIAN --------------------------------------

// get All Surat
// http://localhost:3000/api/data_surat/kepegawaian/
export const getAllSuratUndangan = async (req, res) => {
  try {
    const allSurat = await suratUndangan.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// get specific surat kepegawaian
// http://localhost:3000/api/data_surat/kepegawaian/[id]
export const getDetailSuratUndangan = async (req, res) => {
  try {
    const findSurat = await suratUndangan.findById(req.query.id);
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

    await suratUndangan.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// delete surat
// http://localhost:3000/api/data_surat/kepegawaian/[id]
export const deleteSuratUndangan = async (req, res) => {
  try {
    const response = await suratUndangan.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
