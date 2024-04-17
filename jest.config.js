/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  maxWorkers: 1,
  transform: {
    '^.+\\.ts$': [ 'ts-jest', {
      tsconfig: 'tests/tsconfig.tests.json'
    } ],
  },
};
