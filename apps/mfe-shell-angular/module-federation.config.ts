import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe-shell-angular',
  remotes: [
    ['mfe-remote-react', 'http://localhost:5000/remoteEntry.js'], // Khai báo trực tiếp tại đây
  ],
};

export default config;
