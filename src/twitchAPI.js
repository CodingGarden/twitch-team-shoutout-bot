// @ts-check
import axios from 'axios';

import config from './config.js';

// TODO: cache things reasonably...

const helixAPI = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    'Client-ID': config.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${config.TWITCH_OAUTH_TOKEN}`,
  },
});

export async function getChannel(channelId) {
  const { data: { data: [channel] } } = await helixAPI.get(`/channels?broadcaster_id=${channelId}`);
  return channel;
}

export async function getTeam(teamName) {
  const { data: { data: [team] } } = await helixAPI.get(`/teams?name=${teamName}`);
  team.users = team.users || [];
  return team;
}

async function getUsers(...usernames) {
  const url = `/users?login=${usernames.map((u) => encodeURIComponent(u)).join('&login=')}`;
  const { data: { data: users } } = await helixAPI.get(url);
  return users.map((u) => {
    u.name = u.login;
    return u;
  });
}

export async function getChannelByUsername(username) {
  const [user] = await getUsers(username);
  if (user) {
    return getChannel(user.id);
  }
  throw new Error('Not Found!');
}
