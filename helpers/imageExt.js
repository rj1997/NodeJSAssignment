const request = require('request')
const logger = require('../logging')

/**
 * Returns the extension of the image, by knowing its url.
 * @constructor
 */
const tellImageExt = function (uri, callback) {
  request.head(uri, function (err, res, body) {
    if (err) {
      logger.error('Error occured in getting imageExtension')
    }
    return callback(null, res.headers['content-type'].split('/')[1])
  })
}

module.exports.tellImageExt = tellImageExt
