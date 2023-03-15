import { model, models, Schema } from "mongoose";

const suratUndanganSchema = new Schema({
  judul: String,
  surat_dari: String,
  nomor_surat: String,
  perihal: String,
  tanggal_pelaksanaan: {
    type: Date,
  },
  jam_pelaksanaan: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString,
  },
  keterangan: String,
  file: String,
  public_id: String,
});

const suratUndangan =
  models.surat_undangan || model("surat_undangan", suratUndanganSchema);
export default suratUndangan;
