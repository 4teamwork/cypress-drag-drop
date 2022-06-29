const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'tests/fixtures',
  video: false,
  viewportWidth: 1600,
  viewportHeight: 1200,
  defaultCommandTimeout: 1000,
  numTestsKeptInMemory: 1,
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/support/index.js',
  },
})
