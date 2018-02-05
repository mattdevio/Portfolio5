const http = require('http')
const express = require('express')
const Session = require('express-session')
const google = require('googleapis')
const morgan = require('morgan')
const OAuth2 = google.auth.OAuth2
const plus = google.plus('v1')
const ClientId =  process.env.TEST_CLIENT_ID
const ClientSecret = process.env.TEST_SECRET
const PORT = 3000
const RedirectURL = "http://localhost:3000/oauthCallback"

const app = express()
const server = http.createServer(app)

app.use(Session({
  secret: 'somerandomesecretkeyornah',
  resave: true,
  saveUninitialized: true
}))

app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  const url = getAuthUrl()
  console.dir(req.session)
  res.send(`
      <h1>Authentication using google oAuth</h1>
      <a href="${url}">Login</a>
    `)
})

app.get('/oauthCallback', (req, res, next) => {
  const oauth2Client = getOAuthClient()
  const session = req.session
  const code = req.query.code
  console.log(`\n\nYour Authentication code: ${code}`)
  oauth2Client.getToken(code, (err, tokens) => {
    if(!err){
      session["tokens"] = tokens
      console.log(JSON.stringify(tokens, null, 2))
      res.send(`
        <h3>Login Successful!!</h3>
        <a href="/details">Go to details page...</a>
      `)
    } else {
      res.send(`
        <h3>Login Failed!</h3>
      `)
    }
  })
})

app.get('/details', (req, res, next) => {
  const oauth2Client = getOAuthClient()
  oauth2Client.setCredentials(req.session["tokens"])
  const p = new Promise((resolve, reject) => {
    plus.people.get({
      userId: 'me',
      auth: oauth2Client
    }, (err, res) => {
      if(err){
        reject(err)
      } else {
        resolve(res.data)
      }
    })
  }).then((data) => {
    res.send(`
      <img src="${data.image.url}"/>
      <h3>Hello ${data.displayName}</h3>
    `)
  }).catch((err) => {
    res.status(500).send(JSON.stringify(err, null, 2))
  })
})

server.listen(PORT, ()=>{
  console.log(`Listeneing on http://localhost:${PORT}`)
})

function getOAuthClient() {
  return new OAuth2(ClientId, ClientSecret, RedirectURL)
}

function getAuthUrl() {
  const oauth2Client = getOAuthClient()
  const scopes = [
    'https://www.googleapis.com/auth/plus.me'
  ]
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })
  return url
}


