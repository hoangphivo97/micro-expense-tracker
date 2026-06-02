import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithCustomToken,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-your-real-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456',
};

let app: FirebaseApp | null = null;
function ensureAuth() {
  if (!app) app = initializeApp(firebaseConfig);
  return getAuth(app);
}

Cypress.Commands.add(
  'firebaseLoginWithCustomToken',
  (uid = 'qa-user-001'): Cypress.Chainable<void> => {
    return cy.task<string>('mintCustomToken', uid).then((token) => {
      const auth = ensureAuth();
      // Trả về Chainable<void> bằng cách map sang undefined
      return cy.wrap(
        setPersistence(auth, browserLocalPersistence)
          .then(() => signInWithCustomToken(auth, token))
          .then(() => undefined), // <-- quan trọng
      );
    });
  },
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      firebaseLoginWithCustomToken(uid?: string): Chainable<void>;
    }
  }
}
export {};
