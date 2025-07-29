import axios from "axios";

const config = {
  name: "ai",
  aliases: ["ask", "aria"],
  permissions: [0],
  usage: "[question]",
  cooldown: 10,
  description: "Interact with Alex AI",
  credits: "rapido"
};

async function onCall({ message: m, args: ar }) {
  const q = ar.join(" ");
  if (!q) return m.reply("🤖𝗞𝗘𝗜𝗝𝗢 𝗙𝗕𝗕𝗢𝗧: Please provide a question first.");

  try {
    m.react("⏳");
    const res = await axios.get(`https://rapido.zetsu.xyz/api/aria?prompt=${encodeURIComponent(q)}`);
    m.react("✅");
    await m.reply(res.data.response);
  } catch (e) {
    m.react("❌");
    m.reply(e);
  }
}

export default { config, onCall };
