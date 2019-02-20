# NodeJSAssignment


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
```console
npm install
```
To start server
```console
npm start
```
To run test suit  
```console
npm test
```
This will also publish the code-coverage report (Istanbul)
Currently the code coverage, given by Istanbul is around 83.73%
