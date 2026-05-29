import { withModuleFederation } from '@nx/module-federation/angular'; //
import config from './module-federation.config'; //

export default async function (webpackConfig: any) {
  // 1. Chạy hàm build cấu hình Module Federation mặc định của Nx
  const federationConfig = await withModuleFederation(config, { dts: false }); //
  const updatedConfig = federationConfig(webpackConfig);

  // 2. Bổ sung các tùy chỉnh custom Webpack của bạn vào đây
  updatedConfig.output = {
    ...updatedConfig.output,
    scriptType: 'text/javascript', // Giúp Module Federation load script chính xác
  };

  updatedConfig.experiments = {
    ...updatedConfig.experiments,
    outputModule: true, // Kích hoạt output dạng module để sửa lỗi 'import.meta'
  };

  return updatedConfig;
}