const fs = require('fs');

// Read the JSON file


  const DeleteFileAPI = (req , res) => {
    const UID = req.body.uid;
    const FileUID = req.body.fuid;
    const FileName = req.body.fname
    fs.readFile('./userFile.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        let jsonData;
        try {
          jsonData = JSON.parse(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return;
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
            return;
          }
          console.log('JSON data has been modified and saved.');
        });
      });

    res.send("DELETED")

  }






module.exports = DeleteFileAPI;
