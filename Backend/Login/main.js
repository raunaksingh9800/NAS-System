const fs = require('fs');
const userFileManager = require('../FileManger/filemanger');


let LoginDetatil = userFileManager.loadSessions('./Json/logindetails.json')

let pwd = userFileManager.loadSessions('./Json/users.json')

const LoginHandler = (req, res) => {
    const { username, password } = req.body;


    
    if (Object.keys(LoginDetatil).includes(username)) {

        if (pwd[LoginDetatil[username].uid].password === password) {
    
        res.status(200).json({ uid: LoginDetatil[username].uid });
        
        } else {

        res.status(401).send('Incorrect password');
        }
    } else {

        res.status(404).send('User not found');
    }
  


}




module.exports = {

  LoginHandler
}
