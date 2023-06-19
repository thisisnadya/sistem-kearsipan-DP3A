import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { judul, tanggal, jam, file, nama, nomor_telepon } = JSON.parse(
      req.body
    );
    try {
      await client.messages
        .create({
          body: `Kepada Yth Bapak/Ibu ${nama} \n\nPemberitahuan Surat Undangan ${judul} yang akan dilaksanakan pada: 
          \ntanggal: ${tanggal} 
          \njam: ${jam}. 
          \nBerikut lampiran surat ${file}`,
          from: "whatsapp:+14155238886",
          to: `whatsapp:+62${nomor_telepon.substr(1)}`,
        })
        .then((message) => console.log(message.sid))
        .catch((error) => console.error(error));
      console.log("WhatsApp message sent successfully");
      res.status(200).json({ message: "whatsapp message sent successfully" });
    } catch (error) {
      console.error("Failed to send WhatsApp message:", error);
      res.status(500).json({ message: "error sending message" });
    }
  }
}
