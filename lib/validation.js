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

export const form_validation = (values) => {
  const errors = {};

  if (!values.judul) {
    errors.judul = "Required";
  }
  if (!values.surat_dari) {
    errors.surat_dari = "Required";
  }

  if (!values.nomor_surat) {
    errors.nomor_surat = "Required";
  } else if (!/^\d+$/.test(values.nomor_surat)) {
    errors.nomor_surat = "Hanya masukkan angka";
  }

  if (!values.perihal) {
    errors.perihal = "Required";
  }
  if (!values.tanggal) {
    errors.tanggal = "Required";
  }
  // if (!values.file) {
  //   errors.file = "Min upload 1 file";
  // }
  return errors;
};
