import suratUmum from "@/model/surat_umum";
import undangan from "@/model/undangan";
import sk from "@/model/sk";
import staffs from "@/model/staff";

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
// http://localhost:3000/api/data_surat/surat_umum/[id]
export const deleteSuratUmum = async (req, res) => {
  try {
    const response = await suratUmum.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

// UPDATE data surat umum
// http://localhost:3000/api/data_surat/surat_umum/[id]
export const updateSuratUmum = async (req, res) => {
  const {
    keterangan,
    file,
    judul,
    klasifikasi_surat,
    nomor_surat,
    perihal,
    surat_dari,
  } = req.body;
  try {
    const updatedData = await suratUmum.updateOne(
      { _id: req.query.id },
      {
        $set: {
          keterangan,
          file,
          judul,
          klasifikasi_surat,
          nomor_surat,
          perihal,
          surat_dari,
        },
      }
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

// get specific surat undangan
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

// update surat undangan
// http://localhost:3000/api/data_surat/surat_undangan/[id]
export const updateSuratUndangan = async (req, res) => {
  const {
    keterangan,
    file,
    judul,
    acara,
    nomor_surat,
    perihal,
    tanggal,
    jam_pelaksanaan,
    surat_dari,
  } = req.body;
  try {
    const updatedData = await undangan.updateOne(
      { _id: req.query.id },
      {
        $set: {
          keterangan,
          file,
          judul,
          acara,
          nomor_surat,
          perihal,
          tanggal,
          jam_pelaksanaan,
          surat_dari,
        },
      }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(404).json(error);
  }
};

// ----------------------------------------- SK ----------------------------------
// get all surat keterangan
// http://localhost:3000/api/data_surat/surat_keterangan
export const getAllSK = async (req, res) => {
  try {
    const allSurat = await sk.find({});

    if (!allSurat)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// get specific surat keterangan
// http://localhost:3000/api/data_surat/surat_keterangan/[id]
export const getDetailSK = async (req, res) => {
  try {
    const findSurat = await sk.findById(req.query.id);
    res.status(200).json(findSurat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// upload surat
// http://localhost:3000/api/data_surat/surat_keterangan/upload
export const uploadSK = async (req, res) => {
  try {
    const dataSurat = req.body;

    if (!dataSurat) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await sk.create(dataSurat, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// delete surat
// http://localhost:3000/api/data_surat/surat_keterangan/[id]
export const deleteSK = async (req, res) => {
  try {
    const response = await sk.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

// update surat keterangan
// http://localhost:3000/api/data_surat/surat_keterangan/[id]
export const updateSK = async (req, res) => {
  const { keterangan, file, judul, nomor_surat, perihal, nama } = req.body;
  try {
    const updatedData = await sk.updateOne(
      { _id: req.query.id },
      {
        $set: {
          keterangan,
          file,
          judul,
          nomor_surat,
          perihal,
          nama,
        },
      }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(404).json(error);
  }
};

// --------------------------------------------staff-------------------------------------

// get all staffs
export const getAllStaffs = async (req, res) => {
  try {
    const allStaffs = await staffs.find({});

    if (!allStaffs)
      return res.status(404).json({ message: "Tidak ada data ditemukan" });

    res.status(200).json(allStaffs);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// add staff
export const addStaff = async (req, res) => {
  try {
    const dataStaff = req.body;

    if (!dataStaff) {
      return res.status(404).json({ message: "Dont have form data" });
    }

    await staffs.create(dataStaff, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// update staff
export const updateStaff = async (req, res) => {
  const { nama, nip, jabatan, nomor_telepon } = req.body;
  try {
    const updatedData = await staffs.updateOne(
      { _id: req.query.id },
      {
        $set: {
          nama,
          nip,
          jabatan,
          nomor_telepon,
        },
      }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(404).json(error);
  }
};

// delete staff
export const deleteStaff = async (req, res) => {
  try {
    const response = await staffs.deleteOne({ _id: req.query.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
