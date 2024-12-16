module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', 
  },
  transformIgnorePatterns: ['node_modules/(?!your-module-to-transform)'], 
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleDirectories: [
    'node_modules',
    'src', 
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], 
};
