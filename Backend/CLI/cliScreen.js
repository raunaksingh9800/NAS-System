
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
    print(chalk.whiteBright(" > Please Follow the Steps Given Below: 👇 "))
    print(chalk.white.bold("\t 1. After You Finish Reading this you will be taken to your default broswer"))
    print(chalk.white.bold("\t 2. Over there you will be asked to enter two Things You Home IP address and Auth Key " + chalk.green("(The Details will given below)")))
    linespace()
    if(await askYorN("Do you want to continue?") == "Yes") {
        linespace()
        print(chalk.yellowBright("👍 OK Lets Start"))
        linespace()
        print(chalk.white(" > YOUR CRED ARE:"))
        print(chalk.whiteBright("\t IPv4 : " + chalk.bold(IP)))
        print(chalk.whiteBright("\t Auth Key : " + chalk.bold(AUTHKEY)))
        print(chalk.redBright.bold("\t DONT SHARE THEM WIHT ANYONE"))
        linespace()
        if(await askYorN("Do you want to Open Your Default Browser")=="Yes"){
            await open(`http://localhost:3000/admin/1?ip=${IP}&authkey=${AUTHKEY}`);
        }
        linespace()
        print(chalk.white(" > If The Link did not open automatically Copy the Link given below into your browser 👇"))
        print(chalk.white("LINK : " + chalk.bold.blueBright(`http://localhost:3000/admin/1?ip=${IP}&authkey=${AUTHKEY}`)))
        linespace()

        print(chalk.greenBright("Congratulations The NAS Js Backend Has been initiated"))
        linespace();
        print(chalk.white("After This Program Quits Run " + chalk.green.bold(" node index.js ") + chalk.white("In Your Terminal/Command Line") ))
        print(chalk.white("This is the final Step"))
        linespace()
        print(chalk.white(" > Status : " + chalk.bold.green("SUCCESS 🎉")))
        linespace();
        print(chalk.greenBright("Thanks For using NAS Js"))
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
        print(chalk.whiteBright("Seems Like The Backend is already Initiated"))
        if(await askYorN("Do You Want to reinitiate it?")=="Yes") {initForCred()} else {process.exit(0);}
    }

    
}


main()