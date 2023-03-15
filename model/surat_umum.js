import { model, models, Schema } from "mongoose";

const suratUmumSchema = new Schema({
  judul: String,
  surat_dari: String,
  nomor_surat: String,
  klasifikasi_surat: String,
  perihal: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  keterangan: String,
  file: String,
  public_id: String,
});

const suratUmum = models.surat_umum || model("surat_umum", suratUmumSchema);
export default suratUmum;
