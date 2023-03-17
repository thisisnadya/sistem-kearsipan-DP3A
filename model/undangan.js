import { model, models, Schema } from "mongoose";

const undanganSchema = new Schema({
  judul: String,
  surat_dari: String,
  nomor_surat: String,
  perihal: String,
  tanggal: {
    type: Date,
  },
  jam_pelaksanaan: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  keterangan: String,
  file: String,
  public_id: String,
});

const undangan = models.undangan || model("undangan", undanganSchema);
export default undangan;
