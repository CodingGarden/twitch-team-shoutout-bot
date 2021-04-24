import env from './env.js';

const config = {
  ...env,
  SHOUTOUT_TIMEOUT_MS: 60 * 60 * 1000, // 1 hour,
  teams: {
    livecoders: 'Live Coders ⚙️🗣',
    pogrammers: 'POGrammers PogChamp',
    onlydevs: 'Only Devs 🔞🔒',
    rustaceans: 'Rustaceans 🦀',
  },
  sendMessage(name, teams, status, game) {
    return `${teams} team member detected! 👋 Welcome @${name}! Checkout their channel here: https://twitch.tv/${name} They were last seen streaming - ${status} in ${game}`;
  },
};

export default config;
