/***
 *  
 *  NAS Js
 *  v 1.0
 * 
 *  Author : Raunak Singh
 *  Date 📅 : 21 Jun 2024
 * 
 *  Use: Return List of Files a user has
 * 
 *  Documentation 📄 : 
 *    The sendResp function is an Express.js route handler designed to handle HTTP POST requests. It processes user 
 *    data by loading session information from a JSON file, retrieves specific user-related data, and responds with 
 *    this data in JSON format.
 *  
 *    > Dependencies 🛠️ : 
 *          - Express
 *          - userFileManger(internal)
 *  
 *    > Working ⚙️ :   
            The client sends a POST request to /search endpoint and then we store the Data Shared by him
            Then we just laod the SearchIndex.js into data(const) and then check if data is undefined which 
            means the uid is wrong or any error and retunr a code of 404.
            if the user exists then we return the file name and thier UID/
*/



const userFileManager = require('../JsonFileManger/filemanger');
const sendResp = (req, res) => {
    const UID = req.body.uid;
    const FAuth = req.body.fuid;
    const data = userFileManager.loadSessions('./Database/Json/SearchIndex.json');
    const FUI = data[UID];
    if (!FUI){
        res.status(404).send("error")
    }
    else{
        const FUI2 = data[UID].files;
        res.json({
            "Data" : FUI, 
            "name" : Object.keys(FUI2)
        })
    }

}


module.exports = sendResp;