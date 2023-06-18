const { Schema, models, model } = require("mongoose");

const staffSchema = new Schema({
  nama: String,
  nip: String,
  jabatan: String,
  nomor_telepon: String,
});

const staffs = models.staff || model("staff", staffSchema);

export default staffs;
