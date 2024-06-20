const fs = require('fs');
const userFileManager = require('../../JsonFileManger/filemanger');
const jwt = require('jsonwebtoken')
require('dotenv').config()

let UserData = userFileManager.loadSessions('./Json/users.json')

const LoginHandler = (req, res) => {
    const { payload } = req.body;
    const clientIp = getClientIp(req);
    if (isValidIP(clientIp)) {

        if (UserData[payload]!=undefined) {

              const userSecret = { name: payload }

              const accessToken = generateAccessToken(userSecret)
              const refreshToken = jwt.sign(userSecret, process.env.REFRESH_TOKEN_SECRET)
                
                UserData[payload].ip = clientIp;
                UserData[payload].refreshToken = refreshToken
                userFileManager.writeData('./Json/users.json', UserData);
                UserData = null;
              res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } 
        else {
            res.status(404).send('User not found');
        }
  
    } 
    else {
        console.log('Invalid IP address detected');
    }
}

const isValidIP = (ip) => {
    if(ip=="::1") return true;
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ips = xForwardedFor.split(',').map(ip => ip.trim());
        return ips[0]; // the first IP is usually the client IP
    }
    return req.socket.remoteAddress;
}

const generateAccessToken = (userSecret) => {
  return jwt.sign(userSecret, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })
}

module.exports = {

  LoginHandler
}
