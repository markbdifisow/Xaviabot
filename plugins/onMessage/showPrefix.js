import axios from 'axios';

const langData = {
    "en_US": {
        "prefix": `${global.config.PREFIX} 𝚙𝚛𝚎𝚏𝚒𝚡 𝚒𝚜: [ {prefix} ]`
    }
};

async function onCall({ message, getLang, data }) {
    const message_body = message.body.trim();
    const tigger = ["prefix"];
    
    if (tigger.includes(message_body.toLowerCase())) {
        const prefix = data?.thread?.data?.prefix || global.config.PREFIX;
        
        try {
            const response = await axios.get('https://i.imgur.com/4NkWpSF.jpg', { responseType: 'stream' });
            await message.reply({
                body: getLang("prefix", { prefix: prefix }),
                attachment: response.data
            });
        } catch {
            await message.reply(getLang("prefix", { prefix: prefix }));
        }
    }
}

export default {
    langData,
    onCall
};