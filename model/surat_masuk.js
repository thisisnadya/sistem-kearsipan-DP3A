import { model, models, Schema } from "mongoose";

const suratMasukSchema = new Schema({
  judul: String,
  surat_dari: String,
  nomor_surat: String,
  perihal: String,
  tanggal: {
    type: Date,
    // default: Date.now,
  },
  keterangan: String,
  file: String,
  public_id: String,
});

const suratMasuk = models.surat_masuk || model("surat_masuk", suratMasukSchema);
export default suratMasuk;
