const express = require('express')
const cors = require('cors')
const path = require('path');
const serveIndex = require('serve-index')
const CreateUser = require('./Newuser/main')
const { LoginHandler} = require('./Login/main')
const {uploadhandler , uploadhandlerMiddlerwear} = require('./uploadApi/uploadhandler')
const app = express()



const upload = require('./uploadApi/main')


app.use(cors())
app.use(express.json())   


app.post('/upload', uploadhandlerMiddlerwear , upload.any() , (req, res) => {

  uploadhandler(req, res)

})


app.post('/newuser', (req, res) => {
  CreateUser(req , res);
})

app.post('/login', (req , res) => {
  LoginHandler(req , res)
})




const unauth = {
  res : "UnAuth",
  cause : "Wront Cred bro try somthiin new",
  code : 403,
}



const checkAccessToken = (req, res, next) => {
  const accessToken = req.query.token;
  const UserName = req.query.name;
  if (accessToken === '12' && UserName=="admin") {
    next(); 
  } else {
    res.status(403).send(unauth) 
  }
};


app.use('/ftp', checkAccessToken, express.static('bucket'), serveIndex('bucket', {icons: true}));





app.get('/said', function(req, res) {
  
  res.sendFile(path.join(__dirname, '/index.html'));
  
});

app.listen(3001, () => {
  console.log("Server is running")
})