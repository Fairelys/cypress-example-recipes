/* eslint-disable no-console */
module.exports = function (on, config) {
  // configure plugins here
  on('task', {
    log ({ message, o }) {
      console.log(message)
      if (o) {
        console.log(JSON.stringify(o, null, 2))
      }

      return null
    },
  })

  // let's increase the browser window size when running headlessly
  // this will produce higher resolution images and videos
  // https://glebbahmutov.com/blog/cypress-tips-and-tricks/#produce-high-quality-video-recording
  // https://on.cypress.io/browser-launch-api
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // the browser width and height we want to get
    // our screenshots and videos will be of that resolution
    const width = 1920
    const height = 1080

    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push(`--window-size=${width},${height}`)

      // force screen to be non-retina and just use our given resolution
      launchOptions.args.push('--force-device-scale-factor=1')
    }

    if (browser.name === 'electron' && browser.isHeadless) {
      launchOptions.preferences.width = width
      launchOptions.preferences.height = height
    }

    if (browser.name === 'firefox' && browser.isHeadless) {
      launchOptions.args.push(`--width=${width}`)
      launchOptions.args.push(`--height=${height}`)
    }

    return launchOptions
  })
}