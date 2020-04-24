// @ts-check
import tmi from 'tmi.js';

import config from './config.js';
import * as twitchAPI from './twitchAPI.js';

// @ts-ignore
const client = new tmi.Client({
  options: {
    debug: true,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: config.BOT_USERNAME,
    password: config.TWITCH_OAUTH_TOKEN,
  },
  channels: [config.CHANNEL_NAME],
});

function initBot(teamMembers) {
  const membersById = teamMembers
    .reduce((byId, member) => {
      byId.set(member._id, member);
      return byId;
    }, new Map());
  const shoutoutsById = new Map();

  client.connect();
  client.on('message', async (channel, tags, message, self) => {
    if (self) return;
    const {
      'message-type': messageType,
      'user-id': userId,
      'display-name': displayName,
      username,
    } = tags;
    const name = displayName ?? username;
    if (messageType === 'whisper') return;
    if (userId !== config.CHANNEL_ID && membersById.has(userId)) {
      if (!shoutoutsById.has(userId) || shoutoutsById.get(userId) + +config.SHOUTOUT_TIMEOUT_MS < Date.now()) {
        shoutoutsById.set(userId, Date.now());
        const {
          game,
          status,
        } = await twitchAPI.getChannel(userId);
        client.say(channel, config.getMessage(name, status, game));
      }
    }
  });
}

twitchAPI.getTeam(config.TEAM_NAME).then(initBot);
