// @ts-check
import tmi from 'tmi.js';

import config from './config.js';
import * as twitchAPI from './twitchAPI.js';

// @ts-ignore
const client = new tmi.Client({
  options: {
    // @ts-ignore
    skipMembership: true,
  },
  identity: {
    username: config.BOT_USERNAME,
    password: config.TWITCH_OAUTH_TOKEN,
  },
  channels: [config.CHANNEL_NAME],
});

function initBot(teams) {
  const membersById = teams.reduce((byId, { users, name }) => {
    users
      .forEach((member) => {
        if (!byId.has(member._id)) {
          byId.set(member._id, []);
        }
        byId.get(member._id).push(config.teams[name]);
      });
    return byId;
  }, new Map());
  console.log(membersById);
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
      if (!shoutoutsById.has(userId) || shoutoutsById.get(userId) + Number(config.SHOUTOUT_TIMEOUT_MS) < Date.now()) {
        shoutoutsById.set(userId, Date.now());
        const {
          game,
          status,
        } = await twitchAPI.getChannel(userId);
        let teams = membersById.get(userId);
        if (teams.length > 1) {
          // DO STUFF
          const lastTeam = teams.pop();
          teams = teams.join(', ') + ' and ' + lastTeam;
        } else {
          teams = teams[0];
        }
        client.say(channel, config.sendMessage(name, teams, status, game));
      }
    }
  });
}

Promise.all(
  Object.keys(config.teams)
    .map((teamName) => twitchAPI.getTeam(teamName.trim()))
).then(initBot);
