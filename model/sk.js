import { model, models, Schema } from "mongoose";

const skSchema = new Schema({
  judul: String,
  nama: String,
  nomor_surat: String,
  perihal: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  keterangan: String,
  file: String,
  public_id: String,
});

const sk = models.sk || model("sk", skSchema);
export default sk;
