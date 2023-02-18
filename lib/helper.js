const BASE_URL = "http://localhost:3000";

// SURAT MASUK
// get all surat masuk
export const getAllSuratMasuk = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/surat_masuk`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get specific surat masuk
export const getDetailSuratMasuk = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_masuk/${id}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// upload surat
export const uploadSuratMasuk = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_masuk/upload`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete surat
export const deleteSuratMasuk = async (id) => {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_masuk/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// SURAT KELUAR
// getAllSuratKeluar
export const getAllSuratKeluar = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/surat_keluar`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get specific surat keluar
export const getDetailSuratKeluar = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_keluar/${id}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// upload surat keluar
export const uploadSuratKeluar = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_keluar/upload`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// KEPEGAWAIAN
// get all surat
export const getAllSuratKepegawaian = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/kepegawaian`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get specific surat kepegawaian
export const getDetailSuratKepegawaian = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/data_surat/kepegawaian/${id}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// uplaod surat
export const uploadSuratKepegawaian = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${BASE_URL}/api/data_surat/kepegawaian/upload`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// CLOUDINARY
// upload file to cloudinary
export const uploadFileToCloudinary = async (file, type) => {
  try {
    const data = await fetch(`${BASE_URL}/api/cloudinary/upload/${type}`, {
      method: "POST",
      body: JSON.stringify({ file: file }),
    }).then((r) => r.json());

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteFileCloudinary = async (public_id) => {
  try {
    const data = await fetch(`${BASE_URL}/api/cloudinary/delete`, {
      method: "DELETE",
      body: JSON.stringify({ public_id: public_id }),
    }).then((r) => r.json());
    return data;
  } catch (error) {
    return error;
  }
};
