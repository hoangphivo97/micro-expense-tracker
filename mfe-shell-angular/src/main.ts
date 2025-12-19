// Chỉ cần dòng này, Nx/Webpack sẽ tự đọc config ở Bước 1 và nạp remote trước khi bootstrap
import('./bootstrap').catch((err) => console.error(err));