import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (!files.file) {
      res.status(500).send({ message: "File Upload Failed" });
      return;
    }
    res.status(201).send({ message: "Upload success" });
  });
  console.log(form);
}
