const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: 'e2eTests/*_test.js',
  output: 'e2eTests/',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000',
      show: false,
      windowSize: '1200x900',
      chrome: {
        args: [
          '--disable-web-security',
        ],
      },
    },
    // MockRequestHelper: {
    //   require: '@codeceptjs/mock-request',
    //   mode: 'record',
    //   recordIfMissing: true,
    //   recordFailedRequests: false,
    //   expiresIn: null,
    //   // persisterOptions: {
    //   //   keepUnusedRequests: false,
    //   //   fs: {
    //   //     recordingsDir: './data/requests',
    //   //   },
    //   // },
    // }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'web-app',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}