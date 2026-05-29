import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

export default async function (webpackConfig: any) {
  const federationConfig = await withModuleFederation(config, { dts: false });
  const updatedConfig = federationConfig(webpackConfig);

  updatedConfig.output = {
    ...updatedConfig.output,
    scriptType: 'text/javascript', // Giữ an toàn để styles.js không bị crash
  };

  // Cấu hình hỗ trợ Webpack phân giải import.meta trong môi trường classic script
  if (!updatedConfig.module) {
    updatedConfig.module = { rules: [] };
  }

  updatedConfig.module.rules.push({
    test: /\.js$/,
    parser: {
      importMeta: false, // Tắt parser nghiêm ngặt để Webpack tự động inject polyfill thay vì để nguyên import.meta ra trình duyệt
    },
  });

  return updatedConfig;
}