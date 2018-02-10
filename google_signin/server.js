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
  res.redirect(url)
  // res.send(`
  //     <h1>Authentication using google oAuth</h1>
  //     <a href="${url}">Login</a>
  //   `)
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
      res.redirect('/details')
      // res.send(`
      //   <h3>Login Successful!!</h3>
      //   <a href="/details">Go to details page...</a>
      // `)
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

app.get('/drive', (req, res, next)=>{
  const drive = google.drive({
    version: 'v2',
    auth: getOAuthClient(),
  })
  drive.files.list({
    spaces: 'appDataFolder',
    fields: 'nextPageToken, items(id, title)',
    pageSize: 100
  }, function (err, res) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      res.items.forEach(function (file) {
        console.log('Found file: ', file.name, file.id);
      });
    }
  });
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
    'openid',
    'email',
    'https://www.googleapis.com/auth/drive.appfolder'
  ]
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })
  return url
}






var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
}




