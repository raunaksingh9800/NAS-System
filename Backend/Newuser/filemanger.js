const fs = require('fs');


function initializeFile(filename) {
    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, '{}');
    }
}

function readData(filename) {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
}


function writeData(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}


function addUserFile(filename, uid, fileUid, fileData) {
    const existingData = readData(filename);
    if (!existingData[uid]) {
        existingData[uid] = {};
    }
    existingData[uid][fileUid] = fileData;

    writeData(filename, existingData);
}

function addUser(filename, uid, fileData) {
  
    const existingData = readData(filename);

   
    if (!existingData[uid]) {
        existingData[uid] = {};
    }
t
    existingData[uid] = fileData;
    writeData(filename, existingData);
}


module.exports = {
    initializeFile,
    readData,
    writeData,
    addUser,
    addUserFile
};
