// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: {
    resultsDir: 'reports/allure-results'
  }
}