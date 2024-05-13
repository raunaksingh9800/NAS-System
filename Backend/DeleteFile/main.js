const fs = require('fs');

const DeleteFileAPI = (req , res) => {
    const UID = req.body.uid;
    const FileUID = req.body.fuid;
    const FileName = req.body.fname;
    let Err = [true , true , true];
    fs.readFile('./userFile.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          Err[0] = false;
        }
        let jsonData;
        try {
          jsonData = JSON.parse(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          Err[1] = false;
        }

        fs.unlink(`./bucket/${FileUID}_${FileName}`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
          
        delete jsonData[UID][FileUID];
        const modifiedJson = JSON.stringify(jsonData, null, 2);
        fs.writeFile('./userFile.json', modifiedJson, 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
            Err[3] = false;
          }
          console.log('JSON data has been modified and saved');
        });
      });
    
      if(Err[0] && Err[1] && Err[2])  {
        res.send(`Deleted - ${FileName}`)
      }
      else {
        res.status(500).send('Internal Server Error');
      }
    

  }

module.exports = DeleteFileAPI;
