const chalk = require('chalk')
const inquirer = require('inquirer');
const open = require('open')
const crypto = require('crypto')
const http = require('http');
const https = require('https');
const userFileManager = require('../JsonFileManger/filemanger')
const print = console.log;
var ip = require("ip");



const pingUrl = (url) => {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const req = protocol.get(url, (res) => {
            // If the status code is in the 200 range, the URL is alive
            if (res.statusCode >= 200 && res.statusCode < 300) {
                resolve(true);
            } else {
                resolve(false);
            }
        });

        req.on('error', (err) => {
            // Any error indicates the URL is not alive
            resolve(false);
        });

        req.end();
    });
}
const  generateUID = () => {
    return crypto.randomBytes(8).toString('hex');
  }
const  nasjsArt = () => {
    console.log(chalk.blueBright(` 
        ███╗   ██╗ █████╗ ███████╗         ██╗███████╗
        ████╗  ██║██╔══██╗██╔════╝         ██║██╔════╝
        ██╔██╗ ██║███████║███████╗         ██║███████╗
        ██║╚██╗██║██╔══██║╚════██║    ██   ██║╚════██║
        ██║ ╚████║██║  ██║███████║    ╚█████╔╝███████║
        ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝     ╚════╝ ╚══════╝ 
            `,))
}

const linespace = () =>{
    print('\n')
}

const askForPing = async (question) => {
    const ans =  await inquirer.prompt({
        name : "answer",
        type : "input",
        message : question,
        default() {
            return "https://localhost:3000"
        }
    }).then((answer)=>{
        return answer
    })
    return ans.answer
} 

const askYorN  = async (question) => {
    const ans =  await inquirer.prompt({
        name : "answer",
        type : "list",
        message : question,
        choices:['Yes', 'No'],
        default() {
            return "Yes"
        }
    }).then((answer)=>{
        return answer
    })
    return ans.answer
} 

let CredFile = userFileManager.loadSessions('./Database/Json/admincred.json')
const initForCred = async () => {
    const AUTHKEY = generateUID()
    const IP = ip.address()
    CredFile["IP"].val = IP;
    CredFile["AUTHKEY"].val = AUTHKEY;
    var cliIP;
    linespace()
    print(chalk.whiteBright(" > Please follow the steps given below: 👇 "))
    print(chalk.white.bold("\t 1. After you finish reading this you will be taken to your default broswer."))
    print(chalk.white.bold("\t 2. Over there you will be asked to enter two things you home IP Address and Authentication key " + chalk.green("(The details will given below)")))
    linespace()
    if(await askYorN("Do you want to continue?") == "Yes") {
        linespace()
        print(chalk.yellowBright("👍 OK lets start"))
        linespace()
        const isFrontEndOnSameServer = await pingUrl("http://localhost:3000")
        linespace()
        print(chalk.white(" > YOUR CREDENTIALS ARE:"))
        print(chalk.whiteBright("\t IPv4 : " + chalk.bold(IP)))
        print(chalk.whiteBright("\t Auth Key : " + chalk.bold(AUTHKEY)))
        print(chalk.redBright.bold("\t DO NOT SHARE IT WITH ANYONE"))
        linespace()
        if(!isFrontEndOnSameServer) {
            print(chalk.red(" > Seems like the frontend is on a different machine or there's some error on our side"))
            cliIP = await askForPing("Can You Please Give us the IP address of the frontend")
            print(cliIP);
            CredFile["FRONTENDIP"].val = cliIP;
        }
        if(await askYorN("Do you want to open your default browser?")=="Yes"){
            await open(`http://${cliIP}/admin/1?ip=${IP}&authkey=${AUTHKEY}`);
        }
        linespace()
        print(chalk.white(" > If the link did not open automatically copy the link given below into your browser 👇"))
        print(chalk.white("LINK : " + chalk.bold.blueBright(`http://${cliIP}/admin/1?ip=${IP}&authkey=${AUTHKEY}`)))
        linespace()
        userFileManager.writeData('./Json/admincred.json', CredFile)
        print(chalk.greenBright("Congratulations the NAS JS backend has been initiated successfully! 😄"))
        linespace();
        print(chalk.white("Almost there, the next step is the final step 👇"))
        print(chalk.white("After this program terminates run the following command 👉 " + chalk.green.bold(" node index.js ") + chalk.white("in your terminal") ))
        linespace()
        print(chalk.white(" > Status : " + chalk.bold.green("SUCCESS 🎉")))
        linespace();
        print(chalk.greenBright("Thanks for using NAS JS 😎"))
        linespace();
    

    }
    else process.exit(0);
}

async function main() {
    nasjsArt()
    print(chalk.greenBright.bold("Welcome to NAS Js Backend! 😄 "))
    
    if(CredFile["IP"].val== null || CredFile["AUTHKEY"].val == null ){
        initForCred()
    }
    else if (CredFile["IP"].val != null || CredFile["AUTHKEY"].val != null) {
        linespace()
        print(chalk.whiteBright("Looks like the backend has already been initiated."))
        if(await askYorN("Do you want to reinitiate it?")=="Yes") {initForCred()} else {process.exit(0);}
    }

    
}


main()
