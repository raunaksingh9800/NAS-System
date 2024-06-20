const fs = require('fs');
const userFileManager = require('../../JsonFileManger/filemanger');
const checkforUId =  userFileManager.loadSessions('./Json/users.json')

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
      const SearchIndex = {

            [req.files[i].originalname] : fileUid
  
        }
      userFileManager.initializeFile('./Json/userFile.json');
      userFileManager.addUserFile('./Json/userFile.json', UIDToken, fileUid, fileData);
      userFileManager.initializeFile('./Json/SearchIndex.json');
      userFileManager.addUserSearchIndex('./Json/SearchIndex.json', UIDToken, SearchIndex);
    }


    res.send("DONE")

}

const uploadhandlerMiddlerwear = (req, res , next) => {
     const UIDToken = req.query.uid;
     const FileAuthToken = req.query.fat;
     if(checkforUId[UIDToken] != undefined && checkforUId[UIDToken].fileAuthKey == FileAuthToken){
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