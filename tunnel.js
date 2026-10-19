import { startTunnel } from 'untun';

async function run() {
  console.log('🚀 Cloudflare Tunnel ishga tushirilmoqda...');
  try {
    const tunnel = await startTunnel({ port: 5000 });
    const url = await tunnel.getURL();
    console.log('\n======================================================');
    console.log(`🌐 CLOUDFLARE LIVE HAVOLA: ${url}`);
    console.log('======================================================\n');
  } catch (err) {
    console.error('Tunnel xatoligi:', err.message);
  }
}

run();
