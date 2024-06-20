const express = require('express')

const crypto = require('crypto');

const app = express();
app.use(express.json());

const userFileManager = require('../../JsonFileManger/filemanger');



const CreateUser = (req, res) => {

  const fileUid = '';
  const fileData = {
      filename: '',
      url: '',
      folder: ''
  };


  const { username, password } = req.body;
  console.log(req.body.username)

  const uid = hashCredentials(username , password);

  userFileManager.initializeFile('./Json/userFile.json');
  userFileManager.addUserFile('./Json/userFile.json', uid, fileUid, fileData);


  const fileAuthKey = generateFileAuthKey();


  const userData = {
      username : `${username}` ,
      fileAuthKey : `${fileAuthKey}` ,
      ip : '',
      refreshToken : '',
    }


  const SearchIndex = {
    "files": {
    }
  }

  userFileManager.initializeFile('./Json/users.json');
  userFileManager.addUser('./Json/users.json', uid, userData);
  userFileManager.initializeFile('./Json/SearchIndex.json');
  userFileManager.addUser('./Json/SearchIndex.json', uid, SearchIndex);
  res.send("ceated")


};



const hashCredentials = (username, password) => {
    const hash = crypto.createHash('sha256');
    hash.update(username + password);
    return hash.digest('hex');
}




// Function to generate file auth key
const generateFileAuthKey = ()  => {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = CreateUser
