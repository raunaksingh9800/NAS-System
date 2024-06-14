
const chalk = require('chalk')
const inquirer = require('inquirer');
const open = require('open')
const crypto = require('crypto')
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


async function main() {
    const AUTHKEY = generateUID()
    nasjsArt()
    print(chalk.greenBright.bold("Welcome to NAS Js Backend! 😄 "))
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
        print(chalk.whiteBright("\t IPv4 : " + chalk.bold(ip.address())))
        print(chalk.whiteBright("\t Auth Key : " + chalk.bold(AUTHKEY)))
        linespace()
        if(await askYorN("Do you want to Open Your Default Browser")=="Yes"){
            await open(`http://localhost:3000/admin/1?ip=${ip.address()}&authkey=${AUTHKEY}`);
        }
    }
    else process.exit(0);
    
}


 main();