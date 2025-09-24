// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  reporters: [
    'default',
    [
      'jest-allure2',
      {
        resultsDir: 'reports/allure-results'
      }
    ]
  ]
}
