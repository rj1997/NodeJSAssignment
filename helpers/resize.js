const fs = require('fs')
const sharp = require('sharp')
const logger = require('../logging')

/**
 * Resizes the image and saves it.
 * @constructor
 */
module.exports = function resize (path, format, width, height) {
  const readStream = fs.createReadStream(path)
  let transform = sharp()

  if (format) {
    transform = transform.toFormat(format)
    logger.info('Image has been formatted')
  }

  if (width || height) {
    transform = transform.resize(width, height)
    logger.info('Image has been resized')
  }

  return readStream.pipe(transform)
}
