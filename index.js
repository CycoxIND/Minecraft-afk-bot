const mineflayer = require('mineflayer');
const express = require('express');

// Express server to keep Render web service active
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot is running continuous!');
});

app.listen(PORT, () => {
  console.log(`Web server active on port ${PORT}`);
});

// Server Configuration
const botArgs = {
  host: 'thegoatedone.mcsh.gg', // Your MCServerHost address
  port: 25565,
  username: 'Modi',
  version: false
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);

  bot.on('login', () => {
    console.log(`[BOT] Connected to server as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('[BOT] Spawned into server!');
    
    // 1. Send periodic chat to simulate human activity (Every 7 minutes)
    setInterval(() => {
      if (bot && bot.chat) {
        bot.chat('AFK Bot active');
      }
    }, 420000);

    // 2. Dynamic Movement Loop (Every 12 seconds)
    setInterval(() => {
      if (!bot || !bot.entity) return;

      const actions = ['jump', 'forward', 'back', 'left', 'right', 'sneak'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      // Random head rotation
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * (Math.PI / 2);
      bot.look(yaw, pitch, true);

      // Perform physical action briefly
      bot.setControlState(randomAction, true);
      setTimeout(() => {
        bot.setControlState(randomAction, false);
      }, 1200);
    }, 12000);
  });

  // Handle Unexpected Errors
  bot.on('error', (err) => {
    console.error('[BOT ERROR]', err.message || err);
  });

  // Immediate Auto-Reconnect when kicked or disconnected
  bot.on('end', (reason) => {
    console.log(`[BOT] Disconnected (${reason}). Reconnecting in 10 seconds...`);
    setTimeout(createBot, 10000);
  });
}

// Initial Bot Startup
createBot();
