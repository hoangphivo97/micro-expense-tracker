import { waitForPortOpen } from '@nx/node/utils';

// 1. GLOBAL DECLARATION: Augments the globalThis type definition contract safely
declare global {
  // eslint-disable-next-line no-var
  var __TEARDOWN_MESSAGE__: string | undefined;
}

module.exports = async function () {
  // Start services that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await waitForPortOpen(port, { host });

  // 2. TYPE-SAFE ASSIGNMENT: TypeScript now correctly recognizes this global property
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};