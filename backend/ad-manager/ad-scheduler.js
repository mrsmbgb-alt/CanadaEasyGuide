const cron = require('node-cron');
const { updateAdPlacements } = require('./ad-routes');

// প্রতিদিন সকাল ১০টায় অ্যাড আপডেট (Render-এ চলবে)
cron.schedule('0 10 * * *', async () => {
  await updateAdPlacements();
  console.log('Ad placements refreshed');
});
