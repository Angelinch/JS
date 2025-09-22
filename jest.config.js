// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  reporters: [
    'default',
    [
      'jest-allure',
      {
        outputDirectory: 'allure-results',
      },
    ],
  ],
};
