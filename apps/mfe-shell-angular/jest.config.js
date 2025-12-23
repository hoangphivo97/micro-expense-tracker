module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!@angular|rxjs|@datorama/akita|@ng-bootstrap|@fortawesome)',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
};
