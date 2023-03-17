import { model, models, Schema } from "mongoose";

const suratUndanganSchema = new Schema({
  judul: String,
  surat_dari: String,
  nomor_surat: String,
  perihal: String,
  jam_pelaksanaan: String,
  keterangan: String,
  file: String,
  public_id: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const suratUndangan =
  models.surat_undangan || model("surat_undangan", suratUndanganSchema);
export default suratUndangan;
