const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const { file } = JSON.parse(req.body);
  const { type } = req.query;
  const result = await cloudinary.uploader.upload(file, {
    folder: type,
    resource_type: "raw",
    format: "pdf",
  });
  res.status(200).json(result);
}
