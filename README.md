
# NodeJSAssignment
Assignment done as a task for SocialCops internship.

## Summary
**Public Endpoint : Login** -> Created using JWT token <br/>
**Protected Endpoint : Apply JSON Patch** -> JWT token required <br/>
**Protected Endpoint : Create Thumbnail** -> JWT token required <br/>

## Code considerations
 - Mocha & Chai used for testing purposes.
 - Edge cases implemented. Though, some scope of tests is still in updation.
 - Promises are not used, because the callbacks weren't very deep and there was no problem of callback hell.

## Bonus Task Performance
- 83.73%  overall code coverage in Istanbul Report. Testing suite has 90.91 % code coverage. With new commits, this is going to rise for sure.
- JSdoc & Swagger styled explanatory comments are used. The requests were checked by Postman.
- No use of console.log(). Instead, winston logging tool used to handle errors, debug, info etc.
- StandardJS  linting is used. Code passes nearly all the linting specifications. See more at https://standardjs.com/rules.html
```
Check from terminal : standard  "routes/userroutes.js"
```
Similarly, check all the paths.
- Dockerize : In progress.
## Running via Docker image

```console
Nothing yet
```
Node server started at port 3000

## API endpoints
### Public Endpoints
#### Login
```
localhost:3000/api/v1/login
```
Body
```javascript
{
  username: 'rj1997',
  password: 'HakunaMatata'
}
```
### Protected Endpoints
#### Apply Json Patch
```
localhost:3000/api/v1/jsonpatch
```
Header
```javascript
Content-Type:application/json
authorization:bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhcmJpdGFyeVVzZXIiOnsidXNlcm5hbWUiOiJyajE5OTciLCJwYXNzd29yZCI6Imhha3VuYW1hdGF0YSJ9LCJpYXQiOjE1NTA2ODQzMTUsImV4cCI6MTU1OTMyNDMxNX0.ngSwdQg1gyTfNZAHN3t_qiQhfu9mlTv1gpWziB4R-kht6eRltKECG-j8IaLz6iAij6dNRdQgKETSM4bvU7Lf6g
```
Body
```javascript
{
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

```
#### Create Thumbnail
```
localhost:3000/api/v1/resizeimage
```
Header
```javascript
Content-Type:application/json
authorization:bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhcmJpdGFyeVVzZXIiOnsidXNlcm5hbWUiOiJyajE5OTciLCJwYXNzd29yZCI6Imhha3VuYW1hdGF0YSJ9LCJpYXQiOjE1NTA2ODQzMTUsImV4cCI6MTU1OTMyNDMxNX0.ngSwdQg1gyTfNZAHN3t_qiQhfu9mlTv1gpWziB4R-kht6eRltKECG-j8IaLz6iAij6dNRdQgKETSM4bvU7Lf6g
```
Body
```javascript
{
  imageURL: 'https://purepng.com/public/uploads/large/purepng.com-mario-runningmariofictional-charactervideo-gamefranchisenintendodesigner-1701528632710brm3o.png'
}

```
## Running natively
Install dependencies.
```console
npm install
```
To start server
```console
npm start
```
To run test suite
```console
npm test
```
OR If Mocha permissions are not present?
```
chmod 0777 ./node_modules/.bin/mocha
npm test
```
This will also publish the code-coverage report (Istanbul)
Currently the code coverage, given by Istanbul is around 83.73%
