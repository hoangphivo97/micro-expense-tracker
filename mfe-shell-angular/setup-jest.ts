import 'jest-preset-angular/setup-jest';

// Nếu app dùng i18n của Angular thì thêm dòng này:
// /// <reference types="@angular/localize" />

// Có thể thêm global mock cho window, localStorage, hoặc Angular Material nếu cần
// ví dụ:
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });
