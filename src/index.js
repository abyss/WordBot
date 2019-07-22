const config = require('./config');
const bot = require('./bot');

(title => {
    process.title = title;
    process.stdout.write(`\u001B]0;${title}\u0007`);
})(`WordBot - ${config.word}`);

bot.login(config.token);
