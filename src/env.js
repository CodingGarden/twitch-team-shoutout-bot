import dotenv from 'dotenv';

dotenv.config();

const {
  TWITCH_OAUTH_TOKEN,
  TWITCH_CLIENT_ID,
  BOT_USERNAME,
  CHANNEL_NAME,
  CHANNEL_ID,
} = process.env;

const env = {
  TWITCH_OAUTH_TOKEN,
  TWITCH_CLIENT_ID,
  BOT_USERNAME,
  CHANNEL_NAME,
  CHANNEL_ID,
};

Object
  .entries(env)
  .forEach(([name, value]) => {
    if (!value) {
      throw new Error(`${name} is not specified in the .env file!`);
    }
  });

export default env;
