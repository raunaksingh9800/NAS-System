/***
 *    ███╗   ██╗ █████╗ ███████╗         ██╗███████╗
 *    ████╗  ██║██╔══██╗██╔════╝         ██║██╔════╝
 *    ██╔██╗ ██║███████║███████╗         ██║███████╗
 *    ██║╚██╗██║██╔══██║╚════██║    ██   ██║╚════██║
 *    ██║ ╚████║██║  ██║███████║    ╚█████╔╝███████║
 *    ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝     ╚════╝ ╚══════╝
 * 
 *    ██    ██     ██           ██████  
 *    ██    ██    ███          ██  ████ 
 *    ██    ██     ██          ██ ██ ██ 
 *     ██  ██      ██          ████  ██ 
 *      ████       ██    ██     ██████  
 * 
 *  Author : Raunak Singh
 *  Date 📅 : 20 Jun 2024
 * 
 *  Use: Backend Entry Point
 * 
 *  Documentation 📄 : 
        This is the backend of NAS Js written in Node.js application that uses the Express 
        framework to create a web server that handles various HTTP requests. It includes middleware 
        like cors, compression, and express.json() for handling CORS, compression, and JSON parsing, 
        respectively. The server supports uploading files, JWT token management, user creation, file deletion, 
        and file searching functionalities.
 *  
 *    > Dependencies 🛠️ : 
          - express
          - cors
          - path
          - serve-index
          - compression
          - multer
 *  
 *    > Working ⚙️ :
          This is a basic Node.js server built using the Express framework. It defines routes to handle various 
          functionalities.

          Routes: These are URL endpoints that map to specific functions within your application. Each route handles a 
          particular type of HTTP request (GET, POST, PUT, DELETE, etc.). By pressing ⌘ (Mac) or ctrl (Windows/Linux) 
          and hovering over a function name in your IDE, you can easily navigate to the corresponding file where it's defined. 
          This modular approach promotes code organization and simplifies maintenance.

          Function Imports: Functions used in the routes are imported from separate files. This modularity enhances 
          code readability, reusability, and manageability.

          Middleware Usage:
          Middleware is used specifically for the /upload and /ftp endpoints. In the /upload endpoint, middleware 
          verifies the user's permission to upload files before processing the request. Similarly, for the /ftp endpoint, 
          middleware ensures that the requesting client has authorized access to the requested file and isn't attempting 
          unauthorized access to other users' files. This demonstrates a security-conscious approach to handling file 
          uploads and access control.
*
*/



//External Imports
const cors = require('cors')
const path = require('path');
const compression = require('compression')
const serveIndex = require('serve-index')
const express = require('express')

//Internal Imports
const CreateUser = require('./Authentication/Newuser/main.js')
const { LoginHandler } = require('./Authentication/Login/main')
const { uploadhandler, uploadhandlerMiddlerwear } = require('./FileHandling/UploadFile/uploadhandler')
const DeleteFileAPI = require('./FileHandling/DeleteFile/main')
const { TokenHandler } = require('./JWT/GetToken/main')
const upload = require('./FileHandling/UploadFile/main')
const sendResp = require('./Search/main');

//init
const app = express()
app.use(compression())
app.use(cors())
app.use(express.json())


// END POINT - start
app.get('/', function (req, res) {
  res.status(201).sendFile(path.join(__dirname, '/index.html'));
});

app.post('/upload', uploadhandlerMiddlerwear, upload.any(), (req, res) => {
  uploadhandler(req, res)
})

app.post('/getToken', (req, res) => {
  TokenHandler(req, res)
})

app.post('/newuser', (req, res) => {
  CreateUser(req, res);
})

app.post('/login', (req, res) => {
  LoginHandler(req, res)
})

app.post('/deleteFile', (req, res) => {
  DeleteFileAPI(req, res)
})

app.post('/search', (req, res) => {
  sendResp(req, res);
})

// Demo Only
const checkAccessToken = (req, res, next) => {
  const accessToken = req.query.token;
  const UserName = req.query.name;
  const unauth = {
    res: "UnAuth",
    cause: "Wront Cred bro try somthiin new",
    code: 403,
  }
  if (accessToken == '12' && UserName == "admin") {
    next();
  } else {
    res.status(403).send(unauth)
  }
};

app.use('/ftp', checkAccessToken, express.static('bucket'), serveIndex('bucket', { icons: true }));

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
})

// END POINT - end



app.listen(3001, () => {
  console.log("Server is running")
})

