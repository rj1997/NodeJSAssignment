const logger = require('../logging')

/**
 * Checks whether the url is a valid image or not.
 * TODO : Make this function better
 * @constructor
 */
const isURL = function (url) {
  if (url.includes('png') || url.includes('jpg') || url.includes('jpeg')) {
    logger.info('The url given is of an image')
  }
  return url.includes('png') || url.includes('jpg') || url.includes('jpeg')
}

module.exports.isURL = isURL
