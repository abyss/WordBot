/**
 * @typedef {Discord.Client} SharpCore
 * @prop {Object} logger The bot's logger
 */


'use strict';
const Managers = require('./managers');

const Discord = require('discord.js');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const stripIndents = require('common-tags').stripIndents;

const bot = exports.client = new Discord.Client();

const logger = bot.logger = new Managers.Logger(bot);
logger.inject();

try {
    bot.config = fse.readJsonSync(path.join(__dirname, '../config.json'));
} catch (err) {
    if (err.name === 'SyntaxError') {
        logger.severe('Configuration file is not valid JSON. Please verify it\'s contents.');
    } else if (err.code === 'ENOENT') {
        logger.severe('Configuration not found. Make sure you copy config.json.example to config.json and fill it out.');
    } else {
        logger.severe('Unknown error loading configuration file:');
        logger.severe(err);
    }
    process.exit(1);
}

const config = bot.config;

if (!config.botToken || !/^[A-Za-z0-9\._\-]+$/.test(config.botToken)) {
    logger.severe('Config is missing a valid bot token! Please acquire one at https://discordapp.com/developers/applications/me');
    process.exit(1);
}

let invite_template = 'https://discordapp.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=402664450';

bot.on('ready', () => {
    (title => {
        process.title = title;
        process.stdout.write(`\u001B]0;${title}\u0007`);
    })(`WordBot - ${bot.user.username} - ${config.word}`);

    logger.info(stripIndents`Stats:
        - User: ${bot.user.username}#${bot.user.discriminator} <ID: ${bot.user.id}>
        - Users: ${bot.users.filter(user => !user.bot).size}
        - Bots: ${bot.users.filter(user => user.bot).size}
        - Channels: ${bot.channels.size}
        - Guilds: ${bot.guilds.size}`
    );

    bot.user.setGame(`${config.word}`);

    logger.info('Bot loaded');
    logger.info(`Use the following link to invite ${bot.user.username} to your server:\n` + chalk.blue(invite_template.replace('YOUR_CLIENT_ID', bot.user.id)));

});

bot.on('message', msg => {
    // FEATURE: If you want it to change nicks for everyone, always: uncomment this
    
    // if (msg.member.nickname !== bot.config.word) {
    //     msg.member.setNickname(bot.config.word).catch(() => {
    //         return;
    //     });
    // }

    if (msg.content !== bot.config.word) {
        if (msg.deletable) {
            // FEATURE: If you want to only change nickname for people that don't post the word, uncomment this
            
            msg.member.setNickname(bot.config.word).catch(() => {
                return;
            });

            msg.channel.send(bot.config.word);
            msg.delete();
        }
    }
});

bot.on('messageUpdate', (oldMsg, newMsg) => {
    if (newMsg.deletable) {
        newMsg.channel.send(bot.config.word);
        newMsg.delete();
    }
});

bot.on('error', console.error);
bot.on('warn', console.warn);
bot.on('disconnect', console.warn);

bot.login(config.botToken);

process.on('uncaughtException', (err) => {
    let errorMsg = (err.stack || err || '').toString().replace(new RegExp(`${__dirname}\/`, 'g'), './');
    logger.severe(errorMsg);
});

process.on('unhandledRejection', err => {
    logger.severe('Uncaught Promise error: \n' + err.stack);
});
