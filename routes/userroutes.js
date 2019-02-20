const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const jsonPatch = require('jsonpatch')
const fs = require('fs')

const downloadHelper = require('../helpers/downloadImage')
const tellImageExt = require('../helpers/imageExt')
const resize = require('../helpers/resize')
const validURL = require('../helpers/validURL')
const logger = require('../logging')

const secretKeyString = 'secretKeyString'

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send('Test: If you see this, the useroutes file is properly configured.')
})

// A standard command from https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty: ReadMe
const isEmpty = obj => {
  return (obj ? [Object, Array].includes(obj.constructor) &&
  !Object.entries(obj).length : true)
}

function isExist (item) {
  if (
    typeof item === 'undefined' ||
    item === undefined ||
    item === null ||
    item === '' ||
    (typeof item === 'object' && Object.keys(item).length === 0)
  ) {
    return false
  }
  return true
}

function tokenVerifier (req, res, next) {
  const headerauth = req.headers['authorization']
  if (isExist(headerauth)) {
    req.secretToken = headerauth.split(' ')[1] // What are the other params?
    next()
  } else {
    res.status(403).send('Header authorization is empty')
  }
}

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Login
 *     description: Returns a JWT token
 *     produces:
 *       - application/json
 *     parameters:
 *       - username: string
 *         description: username of the user
 *         in: body
 *         required: true
 *       - password: string
 *         description: password for the user
 *         in: body
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Lack of parameters in request body
 *       500:
 *         description: Failed to generate token
 */
app.post('/api/v1/login', (req, res) => {
  let arbitaryUser = {}
  if (!isEmpty(req.body)) {
    if (!isExist(req.body.username) || !isExist(req.body.password)) {
      res.status(400).send({
        error: 'The post request does not have all the parameters required. Make sure that you are sending username as well as password'
      })
    } else {
      arbitaryUser.username = req.body.username
      arbitaryUser.password = req.body.password
      jwt.sign(
        { arbitaryUser },
        secretKeyString,
        { algorithm: 'HS512', expiresIn: '100d' },
        (err, token) => {
          if (err) {
            logger.error(err)
            res.status(500).send('An error occured while generating token.')
          } else {
            res.status(200).send({
              secretToken: token
            })
          }
        }
      )
    }
  } else {
    res.status(400).send({
      error: 'req.body is empty'
    })
  }
})

/**
 * @swagger
 * /api/v1/jsonpatch:
 *   post:
 *     tags:
 *       - JsonPatch
 *     description: Returns a patched json value
 *     produces:
 *       - application/json
 *     parameters:
 *       - inputJSON: json
 *         description: json object
 *         in: body
 *         required: true
 *       - patchFunction: json
 *         description: patch function, consisting of array of steps
 *         in: body
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Lack of parameters in request body
 *       500:
 *         description: Failed to generate token
 */
app.post('/api/v1/jsonpatch', tokenVerifier, (req, res) => {
  if (!isEmpty(req.body)) {
    if (!isExist(req.body.inputJSON) || !isExist(req.body.patchFunction)) {
      res.status(400).send({
        error: 'The post request does not have all the parameters required. Make sure that you are sending json as well as patch'
      })
    } else {
      const inputJSON = req.body.inputJSON
      const patchFunction = req.body.patchFunction
      jwt.verify(
        req.secretToken,
        secretKeyString,
        (err, data) => {
          if (err) {
            logger.error(err)
            res.status(500).send(err)
          } else {
            res.status(200).send(jsonPatch.apply_patch(inputJSON, patchFunction))
          }
        }
      )
    }
  } else {
    res.status(400).send({
      error: 'req.body is empty'
    })
  }
})

/**
 * @swagger
 * /api/v1/resizeimage:
 *   post:
 *     tags:
 *       - Resizing image to 50*50 dimensions
 *     description: Returns a 50*50 image given a url of the image from the web
 *     produces:
 *       - image stream
 *     parameters:
 *       - imageURL: URL
 *         description: image URL from the web
 *         in: body
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Lack of parameters in request body
 *       500:
 *         description: Failed to generate token
 */
app.post('/api/v1/resizeimage', tokenVerifier, (req, res) => {
  if (!isEmpty(req.body)) {
    if (!isExist(req.body.imageURL)) {
      res.status(400).send({
        error: 'The post request does not have the imageURL'
      })
    } else if (!validURL.isURL(req.body.imageURL)) {
      res.status(400).send({
        error: 'The URL supplied is not a valid URL'
      })
    } else {
      jwt.verify(
        req.secretToken,
        secretKeyString,
        (err, data) => {
          if (err) {
            logger.error(err)
            res.status(500).send(err)
          } else {
            // Mend this somehow
            let imageExtension = 'kiki'
            tellImageExt.tellImageExt(req.body.imageURL, (imageExtError, data) => {
              if (imageExtError) {
                logger.error(imageExtError)
                res.status(400).send('imageExtError')
              } else {
                imageExtension = data
                logger.info("The extension of the image is : " + imageExtension)
                downloadHelper.download(req.body.imageURL, 'orgImg.'+imageExtension,
                  () => {
                    logger.info('Image downloaded : ' + 'orgImg.'+imageExtension)
                    resize('orgImg.'+imageExtension, imageExtension, parseInt(50), parseInt(50))
                      .toFile('resizedImg.' + imageExtension, (resizeErr, data) => {
                        if (resizeErr) {
                          logger.error(resizeErr)
                          res.status(500).send(resizeErr)
                        } else {
                          logger.info("Image after resize command")
                          let modifiedImage = fs.readFileSync('resizedImg.' + imageExtension)
                          res.writeHead(200, { 'Content-Type': 'image/' + imageExtension })
                          res.end(modifiedImage, 'binary')
                        }
                      })
                  })
                // res.send(data)
              }
            })
            // What if already dimensions are less than 50, 50?

          }
        }
      )
    }
  } else {
    res.status(400).send({
      error: 'req.body is empty'
    })
  }
})

module.exports = app
