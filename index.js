const mineflayer = require('mineflayer');
const express = require('express');

// Express server required by Render free tier
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot is running continuous!');
});

app.listen(PORT, () => {
  console.log(`Web server active on port ${PORT}`);
});

// Bot connection config
const botArgs = {
  host: 'goated1.mcsh.gg', // Your MCServerHost IP
  port: 25565,
  username: 'AFK_Bot_247',
  version: false
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);

  bot.on('login', () => {
    console.log(`[BOT] Connected to server as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('[BOT] Spawned into server!');
    // Jump every 45s to avoid AFK kicks
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 45000);
  });

  bot.on('error', (err) => {
    console.error('[BOT ERROR]', err);
  });

  bot.on('end', (reason) => {
    console.log(`[BOT] Disconnected (${reason}). Reconnecting in 15s...`);
    setTimeout(createBot, 15000);
  });
}

createBot();
