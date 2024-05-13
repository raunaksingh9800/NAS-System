const fs = require('fs');

/* 
    BUG
        ->  Deletes the whole json file data when request sent for a file which
            is already deleted or even Wrong Cred

*/



const DeleteFileAPI = (req , res) => {
    const UID = req.body.uid;
    const FileUID = req.body.fuid;
    const FileName = req.body.fname;
    var Err = [true , true , true];
    jsonData = {};

    try {
        const data = fs.readFileSync(Filename, 'utf8');
        jsonData = JSON.parse(data);
      } catch (error) {
        Err[0] = false;
        jsonData =  {};
      }
    fs.unlink(`./bucket/${FileUID}_${FileName}`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
    });
          
        try {  delete jsonData[UID][FileUID] } 
        catch(error) { res.status(404).send("Wrong Cred")  }

        const modifiedJson = JSON.stringify(jsonData, null, 2);
        fs.writeFile('./userFile.json', modifiedJson, 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
            Err[3] = false;
          }
          console.log('JSON data has been modified and saved');
        });
      
    
      if(Err[0] && Err[1] && Err[2])  {
        res.send(`Deleted - ${FileName}`)
      }
      else {
        res.status(500).send('Internal Server Error');
      }
    

  }

module.exports = DeleteFileAPI;
