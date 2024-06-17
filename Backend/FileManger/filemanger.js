const fs = require('fs');

function loadSessions(Filename) {
    try {
      const data = fs.readFileSync(Filename, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

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

    existingData[uid] = fileData;
    writeData(filename, existingData);
}

function addUserSearchIndex(filename, uid, fileData) {
    const existingData = readData(filename);

   
    if (!existingData[uid]) {
        existingData[uid] = {};
    }
    Object.assign(existingData[uid].files, fileData)
    writeData(filename, existingData);
}

function addUserSearchIndexDelete(filename, uid, fname) {
    const existingData = readData(filename);

   
    if (!existingData[uid]) {
        existingData[uid] = {};
    }
    delete existingData[uid].files[fname]
    writeData(filename, existingData);
}

function deleteUserFile(filename, uid, FileUID) {
    const existingData = readData(filename);
    if (!existingData[uid]) {
        existingData[uid] = {};
    }
    if (!existingData[uid][FileUID]) {
        existingData[uid][FileUID] = {};
    }
    delete existingData[uid][FileUID]
    writeData(filename, existingData);
}

module.exports = {
    initializeFile,
    readData,
    writeData,
    addUser,
    addUserFile,
    addUserSearchIndex,
    addUserSearchIndexDelete,
    deleteUserFile,
    loadSessions
};
