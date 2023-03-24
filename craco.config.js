const path = require('path')
const cracoLessPlugin = require('craco-less')
const addPath = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [
    {
      plugin: cracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      '@': addPath('src')
    }
  }
}
