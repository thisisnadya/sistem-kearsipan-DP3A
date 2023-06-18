export const login_validation = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      "Password must be 8 characters long and less than 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain empty space";
  }
  return errors;
};

export const surat_umum_validation = (values) => {
  const errors = {};

  if (!values.judul) {
    errors.judul = "Required";
  }
  if (!values.surat_dari) {
    errors.surat_dari = "Required";
  }
  if (!values.nomor_surat) {
    errors.nomor_surat = "Required";
  }
  if (!values.klasifikasi_surat) {
    errors.klasifikasi_surat = "Required";
  }
  if (!values.perihal) {
    errors.perihal = "Required";
  }
  // if (!values.file) {
  //   errors.file = "Min upload 1 file";
  // }
  return errors;
};

export const surat_keterangan_validation = (values) => {
  const errors = {};

  if (!values.judul) {
    errors.judul = "Required";
  }
  if (!values.nama) {
    errors.nama = "Required";
  }
  if (!values.nomor_surat) {
    errors.nomor_surat = "Required";
  }

  if (!values.perihal) {
    errors.perihal = "Required";
  }
  // if (!values.file) {
  //   errors.file = "Min upload 1 file";
  // }
  return errors;
};

export const surat_undangan_validation = (values) => {
  const errors = {};

  if (!values.judul) {
    errors.judul = "Required";
  }
  if (!values.acara) {
    errors.acara = "Required";
  }
  if (!values.surat_dari) {
    errors.surat_dari = "Required";
  }
  if (!values.nomor_surat) {
    errors.nomor_surat = "Required";
  }
  if (!values.perihal) {
    errors.perihal = "Required";
  }
  if (!values.tanggal) {
    errors.tanggal = "Required";
  }
  if (!values.jam_pelaksanaan) {
    errors.jam_pelaksanaan = "Required";
  }
  return errors;
};

export const staff_validation = (values) => {
  const errors = {};

  if (!values.nama) {
    errors.nama = "Required";
  }
  if (!values.nip) {
    errors.nip = "Required";
  }
  if (!values.jabatan) {
    errors.jabatan = "Required";
  }
  if (!values.nomor_telepon) {
    errors.nomor_telepon = "Required";
  }

  return errors;
};
