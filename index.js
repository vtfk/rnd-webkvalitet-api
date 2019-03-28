// Packages
const Router = require('router')
const cors = require('cors')
const finalhandler = require('finalhandler')

// Utilities
const handlers = require('./handlers')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// ROUTES
router.get('/docs', handlers.frontpage)
router.get('/', handlers.getLatestStats)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
