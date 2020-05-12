module.exports = {
    src_folders: ["test/e2e"],

    test_settings: {
      default: {
        launch_url: 'http://localhost:3000'
      },

      selenium: {
        selenium: {
          start_process: true,
          port: 4444,
          server_path: require('selenium-server').path,
          cli_args: {
            'webdriver.gecko.driver': require('geckodriver').path,
            'webdriver.chrome.driver': require('chromedriver').path,
          }
        },
        webdriver: {
          start_process: false,
        }
      },

      'chrome': {
        extends: 'selenium',
        desiredCapabilities: {
          browserName: 'chrome',
          chromeOptions : {
            w3c: false
          }
        }
      },

      'firefox': {
        extends: 'selenium',
        desiredCapabilities: {
          browserName: 'firefox'
        }
      }
    }
  };
