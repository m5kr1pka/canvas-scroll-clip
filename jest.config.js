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
  setupFiles: [
    "<rootDir>/src/__mocks__/canvas.ts",
    "<rootDir>/src/__mocks__/client.ts",
    "<rootDir>/src/__mocks__/image.ts"
  ]
}
