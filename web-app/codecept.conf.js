exports.config = {
  output: 'e2eTests/',
  helpers: {
    Puppeteer: {
      // see more config options:
      // https://github.com/codecept-js/CodeceptJS/blob/master/docs/helpers/Puppeteer.md
      url: 'http://localhost:3000',
      // url: 'https://xyz-todo.web.app', for test on real site...
      show: true,
      windowSize: '1200x900',
      chrome: {
        args: ['--disable-web-security']
      }
    },
    MockRequestHelper: {
      require: '@codeceptjs/mock-request',
      mode: 'record',
      recordIfMissing: true,
      recordFailedRequests: false,
      expiresIn: null,
      persisterOptions: {
        keepUnusedRequests: false,
        fs: {
          recordingsDir: './data/requests'
        }
      }
    }
  },
  include: {
    I: './e2eTests/pages/steps_file.js',
    SignupPage: './e2eTests/pages/SignupPage.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    }
  },
  tests: 'e2eTests/*_test.js',
  name: 'web-app'
}