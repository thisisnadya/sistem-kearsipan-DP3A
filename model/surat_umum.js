import { model, models, Schema } from "mongoose";

const suratUmumSchema = new Schema({
  judul: String,
  surat_dari: String,
  nomor_surat: String,
  perihal: String,
  tanggal: {
    type: Date,
    default: Date.now,
  },
  keterangan: String,
  file: String,
});

const suratUmum = models.surat_umum || model("surat_umum", suratUmumSchema);
export default suratUmum;
