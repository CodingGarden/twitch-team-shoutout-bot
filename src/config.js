import env from './env.js';

const config = {
  ...env,
  SHOUTOUT_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes,
  /**
   * The message to be sent when a team member is detected.
   *
   * @param {string} name The team members name
   * @param {string} status The title of the team members last live stream
   * @param {string} game The game / category the team member was last streaming in
   * @returns string
   */
  getMessage(name, status, game) {
    return `Livecoders 🗣⚙️ team member detected! 👋 Welcome @${name}! Checkout their channel here: https://twitch.tv/${name} They were last seen streaming - ${status} in ${game}`;
  },
};

export default config;
