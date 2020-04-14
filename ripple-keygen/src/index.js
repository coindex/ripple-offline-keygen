const inquirer = require("inquirer")
const {
    generateSeed,
    deriveKeypair,
    deriveAddress
} = require('ripple-keypairs')
const readline = require('readline');
const fs = require('fs');
const cliProgress = require('cli-progress');
const _colors = require('colors');

//GenerateKeypairs generate ripple keypair
const GenerateKeypairs = (seed) => {
    const ripple = deriveKeypair(seed);
    const address = deriveAddress(ripple.publicKey);

    return {
        ripple,
        address
    }
}

//PrintKeypairs logs keypair data on console
const PrintKeypairs = (seed, data) => {
    const {
        ripple,
        address
    } = data
    console.log("Seed : ", seed)
    console.log("Private Key : ", ripple.privateKey)
    console.log("Public Key : ", ripple.publicKey)
    console.log("Address : ", address)
}

//inquirer is used to set options on the console
inquirer
    .prompt([{
        type: 'list',
        message: "How do you want to generate :",
        name: 'keypairs',
        choices: ['1. Generate Random Keypair', '2. Generate Using Seed', '3. Generate Multiple Random Keys']
    }])
    .then(({
        keypairs
    }) => {
        //use user feedback
        if (keypairs === '1. Generate Random Keypair') {
            const seed = generateSeed();
            const data = GenerateKeypairs(seed)
            PrintKeypairs(seed, data)
        } else if (keypairs === '2. Generate Using Seed') {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Enter a valid seed/secret key: ', (seed) => {
                // TODO: Log the answer in a database
                try {
                    const data = GenerateKeypairs(seed)
                    PrintKeypairs(seed, data)
                } catch (e) {
                    console.log(e.message)
                }
                rl.close();
            });
        } else {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Enter Number of Keys to be generated : ', (nok) => {
                rl.question('Do you want the output inside a file? [y/n] : ', (ans) => {

                    switch (ans) {
                        case 'y': {
                            // create new progress bar
                            const b1 = new cliProgress.SingleBar({
                                format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}%',
                                barCompleteChar: '\u2588',
                                barIncompleteChar: '\u2591',
                                hideCursor: true
                            });

                            // initialize the bar - defining payload token "speed" with the default value "N/A"
                            b1.start(parseInt(nok), 0, {
                                speed: "N/A"
                            });
                            for (let i = 0; i < nok; i++) {
                                const seed = generateSeed()
                                const {
                                    ripple,
                                    address
                                } = GenerateKeypairs(seed)
                                fs.writeFile('keypairs.txt', '', function () {})
                                fs.appendFile('keypairs.txt',
                                    'Seed : ' + seed + '\n' +
                                    'Private Key : ' + ripple.privateKey + '\n' +
                                    'Public Key : ' + ripple.publicKey + '\n' +
                                    'Address : ' + address + '\n' +
                                    '---------------------------------------------------' + '\n',
                                    function (err) {
                                        if (err) return console.log(err);
                                    });
                                    b1.increment();
                            }
                            b1.stop();
                            break
                        }
                        case 'n': {
                            for (let i = 0; i < nok; i++) {
                                rl.line
                                const seed = generateSeed()
                                const data = GenerateKeypairs(seed)
                                PrintKeypairs(seed, data)
                                rl.line
                                console.log('---------------------------------------------------')
                                rl.line
                            }
                            break
                        }
                        default: {
                            console.log("invalid response")
                            break
                        }
                    }
                    rl.close();
                });
            });
        }
    })