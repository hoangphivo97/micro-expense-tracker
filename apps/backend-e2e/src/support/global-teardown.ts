import { killPort } from '@nx/node/utils';

// 1. GLOBAL DECLARATION: Matches the setup configuration to avoid implicit 'any' anomalies
declare global {
  // eslint-disable-next-line no-var
  var __TEARDOWN_MESSAGE__: string | undefined;
}

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await killPort(port);
  
  // 2. TYPE-SAFE CONSUMPTION: Safely logs the shared state from global scope orchestration
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};