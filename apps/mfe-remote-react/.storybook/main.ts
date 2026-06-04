import { dirname, resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@nx/react/plugins/storybook'],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    if (webpackConfig.resolve) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        // Ép Storybook dùng đúng bản React tại node_modules gốc của Workspace
        react: resolve(__dirname, '../../../node_modules/react'),
        'react-dom': resolve(__dirname, '../../node_modules/react-dom'),
      };
    }
    return webpackConfig;
  },
};

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(`${value}/package.json`));
}

export default config;