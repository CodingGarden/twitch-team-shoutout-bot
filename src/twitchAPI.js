// @ts-check
import axios from 'axios';

import config from './config.js';

// TODO: cache things reasonably...

const twitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
  headers: {
    Authorization: `OAuth ${config.TWITCH_OAUTH_TOKEN}`,
    'Client-ID': config.TWITCH_CLIENT_ID,
    Accept: 'application/vnd.twitchtv.v5+json',
  },
});

export async function getChannel(channelId) {
  const { data } = await twitchAPI.get(`/channels/${channelId}`);
  return data;
}

export async function getTeam(teamName) {
  const { data: { users, name } } = await twitchAPI.get(`/teams/${teamName}`);
  return { name, users};
}

export async function getStream(channelId) {
  const { data: { stream } } = await twitchAPI.get(`/streams/${channelId}`);
  return stream;
}
