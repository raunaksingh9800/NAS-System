const fs = require('fs');
const userFileManager = require('../FileManger/filemanger');



let UserData = userFileManager.loadSessions('./Json/users.json')

const LoginHandler = (req, res) => {
    const { payload } = req.body;


    
    if (UserData[payload]!=undefined) {
        res.send(UserData[payload].username);
    } else {

        res.status(404).send('User not found');
    }
  


}




module.exports = {

  LoginHandler
}
