import axios from "axios";

/**
 * ======================================
 * SEND WHATSAPP MESSAGE (CLOUD API)
 * ======================================
 * @param {string} mobile - 10 digit Indian mobile number (without +91)
 * @param {string} message - Text message to send
 */
export const sendWhatsAppMessage = async (mobile, message) => {
  try {
    if (!mobile || !message) return;

    // ✅ Ensure India country code
    const phoneNumber = mobile.startsWith("91")
      ? mobile
      : `91${mobile}`;

    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp sent to:", phoneNumber);
  } catch (error) {
    console.error(
      "❌ WhatsApp Send Error:",
      error.response?.data || error.message
    );
  }
};
