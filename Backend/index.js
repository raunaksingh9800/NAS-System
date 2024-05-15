const express = require('express')
const cors = require('cors')
const path = require('path');
const serveIndex = require('serve-index')
const CreateUser = require('./Newuser/main')
const { LoginHandler} = require('./Login/main')
const {uploadhandler , uploadhandlerMiddlerwear} = require('./uploadApi/uploadhandler')
const DeleteFileAPI = require('./DeleteFile/main')
const upload = require('./uploadApi/main')
const compression = require('compression')
const sendResp = require('./Search/main')
const app = express()
app.use(compression())
app.use(cors())
app.use(express.json())   


app.get('/', function(req, res) {
  res.status(201).sendFile(path.join(__dirname, '/index.html'));
});

app.post('/upload', uploadhandlerMiddlerwear , upload.any() , (req, res) => {
  uploadhandler(req, res)
})

app.post('/newuser', (req, res) => {
  CreateUser(req , res);
})

app.post('/login', (req , res) => {
  LoginHandler(req , res)
})

app.post('/deleteFile', (req , res) => {
  DeleteFileAPI(req  , res)
})

app.post('/search' , (req, res) => {
  sendResp(req, res);
})


const checkAccessToken = (req, res, next) => {
  const accessToken = req.query.token;
  const UserName = req.query.name;
  const unauth = {
    res : "UnAuth",
    cause : "Wront Cred bro try somthiin new",
    code : 403,
  }
  if (accessToken == '12' && UserName == "admin") {
    next(); 
  } else {
    res.status(403).send(unauth) 
  }
};

app.use('/ftp', checkAccessToken, express.static('bucket'), serveIndex('bucket', {icons: true}));

app.get("/*" , (req , res) => {
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
})

app.listen(3001, () => {
  console.log("Server is running")
})