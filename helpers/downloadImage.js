const fs = require('fs')
const request = require('request')
const logger = require('../logging')

/**
 * Downloads the image and saves it.
 * @constructor
 */

let download = function (uri, filename, callback) {
  logger.info('Filename : ' + filename)
  request.head(uri, function (err, res, body) {
    if (err) {
      logger.error(err)
    } else {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
    }
  })
}

module.exports.download = download
