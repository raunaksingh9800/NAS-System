
const userFileManager = require('../FileManger/filemanger');


const sendResp = (req, res) => {
    const UID = req.body.uid;
    const FAuth = req.body.fuid;
    const data = userFileManager.loadSessions('./Json/SearchIndex.json');
    const FUI = data[UID];
    const FUI2 = data[UID].files;
    const ResData  = {
        "Data" : FUI, 
        "name" : Object.keys(FUI2)
    }
    res.send(ResData);
}


module.exports = sendResp;