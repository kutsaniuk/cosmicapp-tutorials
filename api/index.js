const express = require('express')

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

router.post('/saveSession', (req, res) => {
    req.session.authUser = { user: req.body.metafields, _id: req.body._id }
    return res.json({ user: req.body.metafields, _id: req.body._id })
})

router.post('/logout', (req, res) => {
    delete req.session.authUser
    res.json({ ok: true })
})

module.exports = {
    path: '/api',
    handler: router
}