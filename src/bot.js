const discordjs = require('discord.js');
const chalk = require('chalk');
const config = require('./config');

const bot = new discordjs.Client();

bot.on('ready', () => {
    console.log(chalk.yellow(`WordBot v${process.env.npm_package_version}`));
    console.log(chalk.green('Bot Ready!'));

    bot.generateInvite(['READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'MANAGE_NICKNAMES'])
        .then((invite_link) => {
            console.log(`Invite Link: ${chalk.blue.underline(invite_link)}`);
        })
        .catch(() => {
            console.error(chalk.red('Unable to generate invite link'));
        });
});

const deleteMsg = (msg) => {
    if (msg.deletable) {
        if (config.nicknames) msg.member.setNickname(config.word).catch(() => {});
        msg.channel.send(config.word).catch(() => {});
        msg.delete().catch(() => {});
    }
};

bot.on('message', msg => {
    if (msg.content !== config.word) deleteMsg(msg);
});

bot.on('messageUpdate', (old, msg) => deleteMsg(msg));

bot.on('error', console.error);

module.exports = bot;
