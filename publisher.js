const redis = require('redis');
const readline = require('readline');

const publisher = redis.createClient();
publisher.connect();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📝 Type a message and press Enter to send notification:');

rl.on('line', async (message) => {
  await publisher.publish('notifications', message);
  console.log(`✅ Sent: ${message}`);
});
