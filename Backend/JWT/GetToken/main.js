const fs = require('fs');
const userFileManager = require('../../JsonFileManger/filemanger');
const jwt = require('jsonwebtoken')
require('dotenv').config()

let UserData = userFileManager.loadSessions('./Json/users.json')

const TokenHandler = (req, res) => {
    const refreshToken = req.body.token;
    const UID = req.body.UID;
    if (refreshToken == null) return res.sendStatus(401)
    if (UserData[UID].refreshToken != refreshToken) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: data.payload })
        res.json({ accessToken: accessToken })
    })
    UserData = null;
}

const generateAccessToken = (userSecret) => {
  return jwt.sign(userSecret, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })
}

module.exports = {
  TokenHandler
}
