const fs = require('fs');
const userFileManager = require('../../JsonFileManger/filemanger');
/* 
    BUG
        ->  Deletes the whole json file data when request sent for a file which
            is already deleted or even Wrong Cred - FIXED

*/



const DeleteFileAPI = (req , res) => {
    const UID = req.body.uid;
    const FileUID = req.body.fuid;
    const FileName = req.body.fname;
    userFileManager.initializeFile('./Database/Json/userFile.json')
    userFileManager.deleteUserFile('./Database/Json/userFile.json' , UID, FileUID)
    userFileManager.initializeFile('./Database/Json/SearchIndex.json')
    userFileManager.addUserSearchIndexDelete('./Database/Json/SearchIndex.json', UID, FileName)

    fs.unlink(`./bucket/${FileUID}_${FileName}`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
    });
    res.status(200).send("Deleted");
    

  }

module.exports = DeleteFileAPI;
