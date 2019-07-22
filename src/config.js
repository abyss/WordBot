require('dotenv').config();

const token = process.env.TOKEN;
const word = process.env.WORD;

const nicknames = (() => {
    const value = process.env.CHANGE_NICKNAMES.toLowerCase();
    if (value === 'true' || value === '1' || value === 'on' || value === 'yes') return true;
    else return false;
})();

if (!token || !/^[A-Za-z0-9._-]+$/.test(token)) {
    console.error('Missing or Invalid Environment Variable TOKEN! Please acquire one at https://discordapp.com/developers/applications/');
    process.exit(1);
}

if (!word) {
    console.error('Missing or Invalid Environment Variable WORD!');
    process.exit(1);
}

module.exports = {
    token, word, nicknames
};
