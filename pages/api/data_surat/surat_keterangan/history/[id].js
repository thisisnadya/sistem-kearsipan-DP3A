import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("surat_keterangan_history");
    const originId = ObjectId(req.query.id);
    // const documents = await collection.find().toArray();

    const documents = await collection.find({ originId }).toArray();

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
