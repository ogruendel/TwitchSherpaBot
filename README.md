# Tarkov Sherpa Twitch Bot

## Description

A Twitch Bot that allows Twitch streamers to organize their helping queue, mainly intended for Escape from Tarkov.

## Commands

+ `!joinq username`
+ `!leaveq` or `!lq`
+ `!queue` or `!q`
+ `!pick` *(Mod / Streamer only)*

## Using the Bot / Setting up Developing Environment

1. Go to the [release page](https://github.com/ogruendel/TwitchSherpaBot/releases/tag/Release) of the bot or clone the repository.
2. Install [Node.js](https://nodejs.org/en/)
3. Install **tmi.js** using `npm install tmi.js`
4. Install **dotenv** using `npm install dotenv`
5. Using a website like [twitchtokengenerator.com](https://twitchtokengenerator.com/) generate a Bot Chat Token for the account you want to function as the bot.
6. Enter the appropriate information into the .env file
7. Run the bot using `node server.js`

# License

This project uses the MIT License. More infos [here](LICENSE)