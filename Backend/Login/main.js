
const crypto = require('crypto');
const fs = require('fs');




//================================
let sessions = loadSessions('sessions.json');



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
function saveSessions() {
  fs.writeFileSync('sessions.json', JSON.stringify(sessions, null, 2));
}
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}
function addSessionData(sessionId, data) {
  sessions[sessionId] = data;
  saveSessions();
}
function deleteOldestSession() {
  const sessionIds = Object.keys(sessions);
  if (sessionIds.length === 0) {
    return; // No sessions to delete
  }
  const oldestSessionId = sessionIds.reduce((oldestId, sessionId) => {
    if (!oldestId || sessions[sessionId].timestamp < sessions[oldestId].timestamp) {
      return sessionId;
    }
    return oldestId;
  }, null);
  delete sessions[oldestSessionId];
  saveSessions();
}
function sessionExists(sessionId) {
  return Object.keys(sessions).includes(sessionId);
}
function deleteSessionByKey(sessionKey) {
  delete sessions[sessionKey];
  saveSessions();
}
//================================


setInterval(deleteOldestSession, 5 * 60 * 1000);



const ssIDHander =  (req, res) => {
    const TempVar = generateSessionId();
    addSessionData(TempVar, { username: `${req.query.dev}`, timestamp: Date.now() });
    res.status(200).send(TempVar);
}



const LoginHandler = (req, res) => {
    const { username, password } = req.body;
    const sessionKey = req.headers['session-key'];
    console.log(sessionKey);


  if(sessionExists(sessionKey)){
    
    if (Object.keys(LoginDetatil).includes(username)) {

        if (pwd[LoginDetatil[username].uid].password === password) {
    
        res.status(200).json({ uid: LoginDetatil[username].uid });
        deleteSessionByKey(sessionKey)
        } else {

        res.status(401).send('Incorrect password');
        }
    } else {

        res.status(404).send('User not found');
    }
  }
  else {
    res.status(401).send("Wrong SSID")
  }

}




module.exports = {
  ssIDHander , 
  LoginHandler
}
