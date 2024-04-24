const fs = require('fs');
const userFileManager = require('../Newuser/filemanger');
const checkforUId = loadSessions('users.json')
let FileSystem = loadSessions('userFile.json')
function loadSessions(Filename) {
    try {
      const data = fs.readFileSync(Filename, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

const uploadhandler = (req, res) => {
    const UIDToken = req.query.uid;
    const size = req.query.size;
    const folderdata = req.query.folder;

    for(var i = 0 ; i<size ; i++){
      const fileUid = `${req.files[i].filename.split("_")[0]}`
      const fileData = {
            filename: `${req.files[i].originalname}`,
            url: `ftp/${req.files[i].filename}`,
            folder: `${folderdata}`
        };
      userFileManager.initializeFile('userFile.json');
      userFileManager.addUserFile('userFile.json', UIDToken, fileUid, fileData);
  
    }


    res.send("DONE")

}

const uploadhandlerMiddlerwear = (req, res , next) => {
     const UIDToken = req.query.uid;
     const FileAuthToken = req.query.fat;
     if(Object.keys(checkforUId).includes(UIDToken) && checkforUId[UIDToken].fileAuthKey == FileAuthToken){
        next()
     }
     else {
        res.status(401).send("wrong UID")
     }


}


module.exports = {
    uploadhandler,
    uploadhandlerMiddlerwear
}