const BASE_URL = "http://localhost:3000";

// get all surat
export const getAllSuratMasuk = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/surat_masuk`);
    const data = await response.json();
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
