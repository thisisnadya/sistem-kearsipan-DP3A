const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handler(req, res) {
  try {
    const backupResource = await cloudinary.api.resource(
      "surat_undangan/nfoskhidg4qohqed3eie.pdf",
      { type: "upload", resource_type: "raw" }
    );
    // Construct public URL
    // const publicURL = cloudinary.url(backupResource.public_id, {
    //   version: backupResource.version,
    // });

    res.status(200).json(backupResource);
  } catch (error) {
    console.error("Error retrieving backup document:", error);
    res.status(500).json({ error: "An error occured" });
  }
}

export default handler;
