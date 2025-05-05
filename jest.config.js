module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/config/',
      '/migrations/',
      '/seeders/',
      '/tests/setup.js'
    ],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testTimeout: 10000
};