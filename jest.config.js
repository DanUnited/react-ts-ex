module.exports = {
  testEnvironment: 'jsdom',
  preset: "ts-jest",
  transformIgnorePatterns: [
    '/node_modules/(?!@babel\/runtime)'
  ],
}