import axios from "axios";

const config = {
  name: "ai",
  aliases: ["ask", "aria"],
  permissions: [0],
  usage: "[question]",
  cooldown: 10,
  description: "Interact with 𝐊𝐞𝐢𝐣𝐨 𝐀𝐢",
  credits: "rapido"
};

async function onCall({ message: m, args: ar }) {
  const q = ar.join(" ");
  if (!q) return m.reply("Yup, 𝐊𝐞𝐢𝐣𝐨 𝐀𝐢 ako! 😎 Nandito ako para tulungan ka sa mga tanong, gawain, o kahit na pag-uusap lang. Anong gusto mo gawin o pag-usapan?🥰");

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
