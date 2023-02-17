import { model, models, Schema } from "mongoose";

const suratKepegawaianSchema = new Schema({
  judul: String,
  nomor_surat: String,
  perihal: String,
  tanggal: {
    type: Date,
    default: Date.now,
  },
  keterangan: String,
  file: String,
  public_id: String,
});

const suratKepegawaian =
  models.surat_kepegawaian ||
  model("surat_kepegawaian", suratKepegawaianSchema);
export default suratKepegawaian;
