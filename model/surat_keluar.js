import { model, models, Schema } from "mongoose";

const suratKeluarSchema = new Schema({
  judul: String,
  surat_kepada: String,
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

const suratKeluar =
  models.surat_keluar || model("surat_keluar", suratKeluarSchema);
export default suratKeluar;
