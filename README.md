# WordBot
WordBot is a memebot for [Discord](http://discordapp.com) with [discord.js](https://discord.js.org). It deletes all posts that don't match the word setup in the config.

It's made to be relatively slim in features, there is one choice around line 66 and 76 of `src/bot.js` involving nicknames.

If you like this project, please consider starring it, or star my the repo that this is based on: [SharpCore](https://github.com/abyssvi/SharpCore).

#### Table of contents
- [Requirements](#requirements)
- [Installing](#installing)
- [Running](#running)
- [Credits](#credits)
- [Pull Requests](#pull-requests)
- [License](#license)

## Usage
### Requirements
- [`node`](https://nodejs.org)
- [`yarn`](https://yarnpkg.com/docs/install) (Recommended)

If you have `npm` but not `yarn`, you'll want to check it out. If not, it is up to you to figure out the appropriate `npm` commands.

> "Yarn is faster and more reliable." - [Rayzr522](https://github.com/Rayzr522)

### Installing

```bash
git clone https://github.com/abyssvi/WordBot.git
cd WordBot
yarn
```

- Rename `config.json.example` in the `src` folder to `config.json`
- Edit `config.json` and enter your user-token (Obtain one [here](https://discordapp.com/developers/applications/me))

### Running
Assuming you have set up the config file with the user-token, just do `yarn start` to run the bot.

To invite the bot to your server, you will need to visit the following link: `https://discordapp.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=402664450`

`YOUR_CLIENT_ID` should be your bot's Client ID, and `PERMISSIONS` number can be calculated [here](https://discordapi.com/permissions.html).

## Credits
[SharpBot](https://github.com/Rayzr522/SharpBot) was originally a modified version of [eslachance's djs-selfbot-v9](https://github.com/eslachance/djs-selfbot-v9), but over time Rayzr completely rewrote it. 

I took SharpBot and stripped all of the self-bot specific code, and modified it for UserBots to make [SharpCore](https://github.com/abyssvi/SharpCore). This bot is an even more stripped down version of SharpCore.

## Pull Requests
If you want to submit a pull request, feel free. Please make sure your code passes ESLint with no extra warnings or errors, and understand I reserve the right to ask you to resubmit with changes.

## License
Continuing the tradition of all ancestor bots, this code is released under the MIT license. You can find a copy in the [LICENSE](LICENSE) file.
