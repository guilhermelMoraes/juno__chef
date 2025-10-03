/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!(@faker-js)/)'],
  extensionsToTreatAsEsm: ['.ts'],
};
