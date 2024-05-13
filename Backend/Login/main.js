const fs = require('fs');



let LoginDetatil = loadSessions('logindetails.json')

let pwd = loadSessions('users.json')


function loadSessions(Filename) {
  try {
    const data = fs.readFileSync(Filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}






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
