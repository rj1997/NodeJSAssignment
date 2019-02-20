const chai = require('chai')
const chaiHTTP = require('chai-http')
const should = chai.should()

var app = require('../routes/userroutes.js')
chai.use(chaiHTTP)

describe('Mocha tests for all three endpoints', () => {
  /**
   * @swagger test
   * Mocha test for login API
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
  it('should return token on login of arbitary user /Post request', function (done) {
    const testUser = {
      username: 'rj1997',
      password: 'HakunaMatata'
    }
    chai.request(app)
      .post('/api/v1/login')
      .send(testUser)
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('secretToken')
        done()
      })
  })
  /**
   * @swagger test
   * Mocha test for jsonpatch
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
  it('should return patched JSON on /Post request', function (done) {
    const testObject = {
      inputJSON: {
        'baz': 'qux',
        'foo': 'bar'
      },
      patchFunction: [
        { 'op': 'replace', 'path': '/baz', 'value': 'boo' },
        { 'op': 'add', 'path': '/hello', 'value': ['world'] },
        { 'op': 'remove', 'path': '/foo' }
      ]
    }
    const resultJSON = {
      'baz': 'boo',
      'hello': ['world']
    }
    chai.request(app)
      .post('/api/v1/jsonpatch')
      .send(testObject)
      .set('authorization',
        'bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhcmJpdGFyeVVzZXIiOnsidXNlcm5hbWUiOiJyajE5OTciLCJwYXNzd29yZCI6Imhha3VuYW1hdGF0YSJ9LCJpYXQiOjE1NTA2ODQzMTUsImV4cCI6MTU1OTMyNDMxNX0.ngSwdQg1gyTfNZAHN3t_qiQhfu9mlTv1gpWziB4R-kht6eRltKECG-j8IaLz6iAij6dNRdQgKETSM4bvU7Lf6g'
      )
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.be.eql(resultJSON)
        done()
      })
  })
  /**
   * @swagger test
   * Mocha test for resizing PNG image
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
  it('should return resized image of 50*50 given a url /Post request PNG Image', function (done) {
    this.timeout(15000)
    
    const testURL = {
      imageURL: 'https://purepng.com/public/uploads/large/purepng.com-mario-runningmariofictional-charactervideo-gamefranchisenintendodesigner-1701528632710brm3o.png'
    }
    chai.request(app)
      .post('/api/v1/resizeimage')
      .send(testURL)
      .set('authorization',
        'bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhcmJpdGFyeVVzZXIiOnsidXNlcm5hbWUiOiJyajE5OTciLCJwYXNzd29yZCI6Imhha3VuYW1hdGF0YSJ9LCJpYXQiOjE1NTA2ODQzMTUsImV4cCI6MTU1OTMyNDMxNX0.ngSwdQg1gyTfNZAHN3t_qiQhfu9mlTv1gpWziB4R-kht6eRltKECG-j8IaLz6iAij6dNRdQgKETSM4bvU7Lf6g'
      )
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
  /**
   * @swagger test
   * Mocha test for resizing JPEG image
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
  it('should return resized image of 50*50 given a url /Post request JPEG Image', function (done) {
    this.timeout(15000)

    const testURL = {
      imageURL: 'https://www.salford.ac.uk/__data/assets/image/0008/890072/varieties/lightbox.jpg'
    }
    chai.request(app)
      .post('/api/v1/resizeimage')
      .send(testURL)
      .set('authorization',
        'bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhcmJpdGFyeVVzZXIiOnsidXNlcm5hbWUiOiJyajE5OTciLCJwYXNzd29yZCI6Imhha3VuYW1hdGF0YSJ9LCJpYXQiOjE1NTA2ODQzMTUsImV4cCI6MTU1OTMyNDMxNX0.ngSwdQg1gyTfNZAHN3t_qiQhfu9mlTv1gpWziB4R-kht6eRltKECG-j8IaLz6iAij6dNRdQgKETSM4bvU7Lf6g'
      )
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
})
