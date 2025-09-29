// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  reporters: [
    'default',
    ['allure-jest', {
      outputDirectory: 'reports/allure-results'
    }]
  ]
};
