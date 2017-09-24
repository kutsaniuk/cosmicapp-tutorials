const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var http = require('http').Server(app)

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)
app.use(express.static(__dirname))
app.set('port', process.env.PORT || 3000)

// Build only in dev mode
if (config.dev) {
    new Builder(nuxt).build()
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
}

http.listen(app.get('port'), () => {
    nuxt.showOpen()
})

