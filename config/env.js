const dotenv = require('dotenv')
const path = require('path');

const envPath = path.join(__dirname, '..', '.myenv');
const env = dotenv.config({ path: envPath})

if (env.error) {
  console.error(env.error)
  process.exit(1);
}


module.exports = env.parsed;
