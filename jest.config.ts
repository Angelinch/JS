import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000, // на случай асинхронных тестов
  reporters: [
    'default',
    ['jest-allure', { outputDirectory: './allure-results' }]
  ],
  // globals больше не используем, ts-jest берёт настройки из tsconfig.json
};

export default config;
