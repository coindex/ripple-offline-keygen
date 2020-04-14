const inquirer = require("inquirer")
const { generateSeed, deriveKeypair , deriveAddress} = require('ripple-keypairs')
var readline = require('readline');

inquirer
    .prompt([
        { 
            type:'list', 
            message: "How do you want to generate :",
            name: 'keypairs',
            choices: ['1. Generate Random Keypair', '2. Generate Using Seed']
        }
    ])
    .then( ({ keypairs})=> {
        //use user feedback
        if( keypairs === '1. Generate Random Keypair') {
            const seed = generateSeed();
            console.log("Seed : ",seed)
            const ripple = deriveKeypair(seed);
            console.log("Private Key : ",ripple.privateKey)
            console.log("Public Key : ",ripple.publicKey)
            const address = deriveAddress(ripple.publicKey);
            console.log("Address : ",address)
        } else  {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            rl.question('Please enter a valid seed/secret key: ', (seed) => {
            // TODO: Log the answer in a database
            try {
                const ripple = deriveKeypair(seed);
                console.log("Private Key : ",ripple.privateKey)
                console.log("Public Key : ",ripple.publicKey)
                const address = deriveAddress(ripple.publicKey);
                console.log("Address : ",address)
            } catch (e) {
                console.log(e.message)
            }
            rl.close();
            });
        }
    })