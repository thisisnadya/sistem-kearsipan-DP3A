const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://sistem-kearsipan-dp-3-a.vercel.app/sakai-react"
    : "http://localhost:3000";

// ------------------------------------------- SURAT MASUK ----------------------------------------------
// get all surat masuk
export const getAllSuratUmum = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/surat_umum`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get specific surat masuk
export const getDetailSuratUmum = async (id) => {
  if (id) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data_surat/surat_umum/${id}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
};

// upload surat
export const uploadSuratUmum = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_umum/upload`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete surat
export const deleteSuratUmum = async (id) => {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_umum/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update surat
export const updateSuratUmum = async (id, formData) => {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_umum/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get history surat umum
export const getHistorySuratUmum = async (id) => {
  if (id) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data_surat/surat_umum/history/${id}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
};

// -------------------------------------------- UNDANGAN ---------------------------------------------
// get all surat
export const getAllSuratUndangan = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/surat_undangan`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get specific surat undangan
export const getDetailSuratUndangan = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_undangan/${id}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// uplaod surat
export const uploadSuratUndangan = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_undangan/upload`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete surat undangan
export const deleteSuratUndangan = async (id) => {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_undangan/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update surat undangan
export const updateSuratUndangan = async (id, formData) => {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_undangan/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get history surat undangan
export const getHistorySuratUndangan = async (id) => {
  if (id) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data_surat/surat_undangan/history/${id}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
};

// -------------------------------------------- SK -------------------------------------------------------
// get all surat
export const getAllSK = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/data_surat/surat_keterangan`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get specific surat keterangan
export const getDetailSK = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_keterangan/${id}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// uplaod surat keterangan
export const uploadSK = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_keterangan/upload`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// delete surat keterangan
export const deleteSK = async (id) => {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_keterangan/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update surat keterangan
export const updateSK = async (id, formData) => {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${BASE_URL}/api/data_surat/surat_keterangan/${id}`,
      Options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get history surat keterangan
export const getHistorySuratKeterangan = async (id) => {
  if (id) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/data_surat/surat_keterangan/history/${id}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
};

// -------------------------------------------- STAFF ----------------------------------------------------
// get all staffs
export const getAllStaffs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/staffs`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// get detail staff
export const getDetailStaff = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/staffs/${id}`);
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// add staff
export const addStaff = async (formData) => {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/staffs/add`, Options);
    const data = await response.json();
    if (response.ok) {
      // Request was successful, return the data
      return data;
    } else {
      // Request was not successful, throw an error with the error message
      throw new Error(data.message);
    }
  } catch (error) {
    // Catch any other errors that occurred
    console.error("Error:", error.message);
    throw error;
  }
};

// delete staff
export const deleteStaff = async (id) => {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${BASE_URL}/api/staffs/${id}`, Options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// update staff
export const updateStaff = async (id, formData) => {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${BASE_URL}/api/staffs/${id}`, Options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// -------------------------------------------- CLOUDINARY ------------------------------------------------
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

export const updateFileCloudinary = async (public_id, file) => {
  try {
    const data = await fetch(`${BASE_URL}/api/cloudinary/update`, {
      method: "PUT",
      body: JSON.stringify({ public_id: public_id, file: file }),
    }).then((r) => r.json());
    return data;
  } catch (error) {
    return error;
  }
};

// ----------------------------------------- FETCH CHART DATA -----------------------------------------
export const getChartData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/chart/chart_data`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// ------------------------------------- EXPORT DATA ---------------------------------------------------
export const exportToExcel = async (coll) => {
  try {
    const response = await fetch(`${BASE_URL}/api/download/excel/${coll}`);

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();

      // Clean up the object URL
      URL.revokeObjectURL(url);
    } else {
      throw new Error("Export failed");
    }
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------- TWILIO -----------------------------------------
export const sendWhatsappMessage = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/twilio`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.json());
    return response;
  } catch (error) {
    return error;
  }
};
