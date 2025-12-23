import { defineConfig } from 'cypress';
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../backend/.env') });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const projectId = process.env['FIREBASE_PROJECT_ID'];
      const clientEmail = process.env['FIREBASE_CLIENT_EMAIL'];
      let privateKey = process.env['FIREBASE_PRIVATE_KEY'];

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase env vars');
      }

      privateKey = privateKey.replace(/\\n/g, '\n');

      const sa = { projectId, clientEmail, privateKey };

      if (!admin.apps.length)
        admin.initializeApp({ credential: admin.credential.cert(sa) });

      on('task', {
        async mintCustomToken(uid: string) {
          return admin.auth().createCustomToken(uid);
        },
      });
      return config;
    },
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
  },
});
