const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/jest/fileMock.js',
    '^next/image$': '<rootDir>/__mocks__/next/image.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-icons|@emotion)/)',
  ],
});