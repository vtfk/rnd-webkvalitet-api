'use strict'

const mongojs = require('mongojs')
const readFileSync = require('fs').readFileSync
const md = require('markdown-it')()
const { send } = require('micro')
const repackStats = require('./lib/repack-stats')
const logger = require('./lib/logger')

exports.frontpage = (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = readFileSync(`${__dirname}/README.md`, 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getLatestStats = async (request, response) => {
  return new Promise((resolve, reject) => {
    logger('info', ['handlers', 'getLatestStats'])
    const db = mongojs(process.env.MONGODB_CONNECTION)
    const stats = db.collection(process.env.MONGODB_COLLECTION)
    stats.find({ domain: 'webquality', category: { '$in': ['lighthouse', 'observatory'] } }).sort({ date: -1 }, (error, documents) => {
      db.close()
      if (error) {
        logger('error', ['handlers', 'getLatestStats', error])
        send(response, 500, error)
      } else {
        logger('info', ['handlers', 'getLatestStats', documents.length, 'success'])
        send(response, 200, repackStats(documents))
      }
    })
  })
}
