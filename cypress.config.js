const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'tests/fixtures',
  video: false,
  viewportWidth: 1600,
  viewportHeight: 1200,
  defaultCommandTimeout: 1000,
  numTestsKeptInMemory: 1,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/support/index.js',
  },
})
