# Twitch Team Shoutout Bot

A bot that detects when a team member has entered the chat and sends a shout out message.

### Prerequisites

* Node.js version 12.0.0 or higher is required. This bot was tested against Node.js version 14.0.0
  * [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) can be used to install / manage Node.js versions

### Setup

Install dependencies:

```sh
npm i
```

### Environment Config

Copy the `.env.sample` file into a file named `.env` and update the variables accordingly.

```sh
cp .env.sample .env
```

Variable | Description
--- | ---
BOT_USERNAME | The twitch username of the bot that will be used to send the messages.
TWITCH_OAUTH_TOKEN | Twitch OAuth token for the given BOT_USERNAME - can be obtained here: https://twitchapps.com/tmi/
TWITCH_CLIENT_ID | Twitch Client ID used to generate the above token, if using the above service to generate a token, use this Client ID: `q6batx0epp608isickayubi39itsckt`
CHANNEL_NAME | The twitch channel name to send the messages in.
CHANNEL_ID | The channel ID of the above CHANNEL_NAME, used to prevent shouting out yourself.

### Messaging Config

The `src/config.js` file contains some values that can be updated to your liking:
  * The timeout in milliseconds to wait between shoutouts for the same team member
  * An object `teams` where you can list any number of teams to shout out. The value of each key will be the team name display in the chat message.
  * A `getMessage` function that is used to format the message to be sent when a team member is detected.

### Running

After installing dependencies, creating the `.env` file and updating the `src/config.js` file, run the bot:

```sh
npm start
```
