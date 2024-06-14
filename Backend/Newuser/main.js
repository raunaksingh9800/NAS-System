const express = require('express')

const crypto = require('crypto');

const app = express();
app.use(express.json());

const userFileManager = require('../FileManger/filemanger');



const CreateUser = (req, res) => {

  const fileUid = '';
  const fileData = {
      filename: '',
      url: '',
      folder: ''
  };


  const { username, password } = req.body;
  console.log(req.body.username)

  const uid = generateUID();

  userFileManager.initializeFile('./Json/userFile.json');
  userFileManager.addUserFile('./Json/userFile.json', uid, fileUid, fileData);

  const hashKey = generateHashKey(password);


  const fileAuthKey = generateFileAuthKey();


  const userData = {
      username : `${username}` ,
      password : `${password}`,
      hashKey : `${hashKey}` ,
      fileAuthKey : `${fileAuthKey}` 
    }

  const LoginDe = {
    uid : `${uid}` ,
  }
  const SearchIndex = {
    "files": {
    }
  }

  userFileManager.initializeFile('./Json/users.json');
  userFileManager.addUser('./Json/users.json', uid, userData);
  userFileManager.initializeFile('./Json/logindetails.json');
  userFileManager.addUser('./Json/logindetails.json', username, LoginDe);
  userFileManager.initializeFile('./Json/SearchIndex.json');
  userFileManager.addUser('./Json/SearchIndex.json', uid, SearchIndex);
  res.send("ceated")


};


function generateUID() {
  return crypto.randomBytes(16).toString('hex');
}


function generateHashKey(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
}

// Function to generate file auth key
function generateFileAuthKey() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = CreateUser
