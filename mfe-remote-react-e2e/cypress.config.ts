import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run mfe-remote-react:serve',
        production: 'npx nx run mfe-remote-react:serve-static',
      },
      ciWebServerCommand: 'npx nx run mfe-remote-react:serve-static',
      ciBaseUrl: 'http://localhost:5000',
    }),
    baseUrl: 'http://localhost:5000',
  },
});
