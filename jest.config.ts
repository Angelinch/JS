import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports/html',
      filename: 'report.html',
      expand: true,
      pageTitle: 'Bookstore Demo Tests'
    }]
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  }
};

export default config;
