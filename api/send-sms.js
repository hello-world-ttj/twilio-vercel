const twilio = require("twilio");
const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

  try {
    const sms = await client.messages.create({
      body: message,
      messagingServiceSid: TWILIO_SERVICE_SID,
      to: to,
    });

    return res.status(200).json({ message: "SMS Sent!", sms });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
