module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFiles: [
    "<rootDir>/src/__mocks__/client.js"
  ]
}
