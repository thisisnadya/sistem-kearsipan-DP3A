import connectMongo from "@/database/conn";
import Users from "@/model/admin";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) =>
    res.json({ message: "Mongo Connection Failed" })
  );

  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ message: "Dont have form data" });

    const { username, password } = req.body;

    //  check if username already exist
    const isUsernameAlreadyExist = await Users.findOne({ username });
    if (isUsernameAlreadyExist)
      return res.status(422).json({ message: "User Already Exist" });

    // hash password
    Users.create(
      { username, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        return res.status(201).json({ status: true, data });
      }
    );
  }
  return res.status(404).json({ message: "Only Post method accepted" });
}
