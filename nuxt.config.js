const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {

  dev: (process.env.NODE_ENV !== 'production'),
  head: {
    title: 'cosmicapp-tutorials',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#585858' },
  build: {
    vendor: ['axios', 'vue-notification']
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    '~/api'
  ],
  env: {
    bucketSlug: process.env.BUCKET_SLUG || 'tutorials',
    readKey: process.env.READ_KEY || 'anyI1DP1bxB5ivjCaJSRC0ZFxB5SJDpfYgrDfR47fw7HIlWYAX',
    writeKey: process.env.WRITE_KEY || 'J72v1YeK8zZF6n0dI8yhiVTzQy75JASppAQe8XPykiJHW9ARfz'
  }
}
