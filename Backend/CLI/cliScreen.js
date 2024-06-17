
const chalk = require('chalk')
const inquirer = require('inquirer');
const open = require('open')
const crypto = require('crypto')


const userFileManager = require('../FileManger/filemanger')

const print = console.log;
var ip = require("ip");


function generateUID() {
    return crypto.randomBytes(8).toString('hex');
  }
function nasjsArt() {
    console.log(chalk.blueBright(` 
        ███╗   ██╗ █████╗ ███████╗         ██╗███████╗
        ████╗  ██║██╔══██╗██╔════╝         ██║██╔════╝
        ██╔██╗ ██║███████║███████╗         ██║███████╗
        ██║╚██╗██║██╔══██║╚════██║    ██   ██║╚════██║
        ██║ ╚████║██║  ██║███████║    ╚█████╔╝███████║
        ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝     ╚════╝ ╚══════╝ 
            `,))
}

function linespace(){
    print('\n')
}



async function askYorN(question) {
    const ans =  await inquirer.prompt({
        name : "answer",
        type : 'list',
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

let CredFile = userFileManager.loadSessions('./Json/admincred.json')
async function initForCred() {
    const AUTHKEY = generateUID()
    const IP = ip.address()
    CredFile["IP"].val = IP;
    CredFile["AUTHKEY"].val = AUTHKEY;
    userFileManager.writeData('./Json/admincred.json', CredFile)
    linespace()
    print(chalk.whiteBright(" > Please follow the steps given below: 👇 "))
    print(chalk.white.bold("\t 1. After you finish reading this you will be taken to your default broswer."))
    print(chalk.white.bold("\t 2. Over there you will be asked to enter two things you home IP Address and Authentication key " + chalk.green("(The details will given below)")))
    linespace()
    if(await askYorN("Do you want to continue?") == "Yes") {
        linespace()
        print(chalk.yellowBright("👍 OK lets start"))
        linespace()
        print(chalk.white(" > YOUR CREDENTIALS ARE:"))
        print(chalk.whiteBright("\t IPv4 : " + chalk.bold(IP)))
        print(chalk.whiteBright("\t Auth Key : " + chalk.bold(AUTHKEY)))
        print(chalk.redBright.bold("\t DO NOT SHARE IT WITH ANYONE"))
        linespace()
        if(await askYorN("Do you want to open your default browser?")=="Yes"){
            await open(`http://localhost:3000/admin/1?ip=${IP}&authkey=${AUTHKEY}`);
        }
        linespace()
        print(chalk.white(" > If the link did not open automatically copy the link given below into your browser 👇"))
        print(chalk.white("LINK : " + chalk.bold.blueBright(`http://localhost:3000/admin/1?ip=${IP}&authkey=${AUTHKEY}`)))
        linespace()

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
