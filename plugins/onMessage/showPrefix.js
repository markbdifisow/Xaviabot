import axios from 'axios';

const langData = {
    "en_US": {
        "prefix": `${global.config.NAME} 𝚙𝚛𝚎𝚏𝚒𝚡 𝚒𝚜: {prefix}`
    }
};

async function onCall({ message, getLang, data }) {
    const messageBody = message.body.toLowerCase().trim();
    const prefixTriggers = [
        "prefix",
        "prefix?",
        "Prefix"

        ];

    if (prefixTriggers.includes(messageBody) && message.senderID !== global.botID) {
        const prefix = data?.thread?.data?.prefix || global.config.PREFIX;
        

        try {
            const { data: gif } = await axios.get(`https://i.ibb.co/rKXxCQwJ/rapido.jpg`);
            const response = await axios.get(gif, { responseType: 'stream' });
            await message.reply({
                body: getLang("prefix", { prefix }),
                attachment: response.data
            });
        } catch (error) {
            console.error(error);
            await message.reply(getLang("prefix", { prefix }));
        }
    }
}

export default {
    langData,
    onCall
};