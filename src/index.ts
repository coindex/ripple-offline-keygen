const inquirer = require('inquirer');
const {
  generateSeed,
  deriveKeypair,
  deriveAddress,
} = require('ripple-keypairs');
const readline = require('readline');
const fs = require('fs');
const cliProgress = require('cli-progress');
const _colors = require('colors');
import {getopt} from "stdio";

//GenerateKeypairs generate ripple keypair
const GenerateKeypairs = (seed: string) => {
  const ripple = deriveKeypair(seed);
  const address = deriveAddress(ripple.publicKey);

  return {
    ripple,
    address,
  };
};

//PrintKeypairs logs keypair data on console
const PrintKeypairs = (seed: string, data: any) => {
  const { ripple, address } = data;
  console.log('Seed : ', seed);
  console.log('Private Key : ', ripple.privateKey);
  console.log('Public Key : ', ripple.publicKey);
  console.log('Address : ', address);
};

const GenerateRandomKeypairs = () => {
  const seed=generateSeed()
  const data = GenerateKeypairs(seed);
  PrintKeypairs(seed, data);
}


const GenerateMultipleKeypairs = (ans:string, nok:number,path:string) => {
  switch (ans) {
    case 'y': {
      // create new progress bar
      const b1 = new cliProgress.SingleBar({
        format:
          'CLI Progress |' +
          _colors.cyan('{bar}') +
          '| {percentage}%',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
      });

      // initialize the bar - defining payload token "speed" with the default value "N/A"
      b1.start(nok, 0, {
        speed: 'N/A',
      });
      for (let i = 0; i < nok; i++) {
        const seed = generateSeed();
        const { ripple, address } = GenerateKeypairs(seed);
        fs.writeFile(path, '', function() {});
        fs.appendFile(
            path,
          'Seed : ' +
            seed +
            '\n' +
            'Private Key : ' +
            ripple.privateKey +
            '\n' +
            'Public Key : ' +
            ripple.publicKey +
            '\n' +
            'Address : ' +
            address +
            '\n' +
            '---------------------------------------------------' +
            '\n',
          function(err: any) {
            if (err) return console.log(err);
          },
        );
        b1.increment();
      }
      b1.stop();
      break;
    }
    case 'n': {
      for (let i = 0; i < nok; i++) {
        console.log('\n')
        const seed = generateSeed();
        const data = GenerateKeypairs(seed);
        PrintKeypairs(seed, data);
        console.log('\n')
        console.log(
          '---------------------------------------------------',
        );
        console.log('\n')
      }
      break;
    }
    default: {
      console.log('invalid response');
      break;
    }
  }
}

const interactive_cmd = () => {
//inquirer is used to set options on the console
inquirer
  .prompt([
    {
      type: 'list',
      message: 'How do you want to generate :',
      name: 'keypairs',
      choices: [
        '1. Generate Random Keypair',
        '2. Generate Using Seed',
        '3. Generate Multiple Random Keys',
      ],
    },
  ])
  .then(({ keypairs }: { keypairs: string }) => {
    //use user feedback
    if (keypairs === '1. Generate Random Keypair') {
      GenerateRandomKeypairs();
    } else if (keypairs === '2. Generate Using Seed') {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('Enter a valid seed/secret key: ', (seed: string) => {
        // TODO: Log the answer in a database
        try {
          const data = GenerateKeypairs(seed);
          PrintKeypairs(seed, data);
        } catch (e) {
          console.log(e.message);
        }
        rl.close();
      });
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('Enter Number of Keys to be generated : ', (nok: number) => {
        rl.question(
          'Do you want the output inside a file? [y/n] : ',
          (ans: string) => {
            GenerateMultipleKeypairs(ans, nok,'')
            rl.close();
          },
        );
      });
    }
  });
}

const cmd = (seed:string, multiple:boolean,file:boolean, keyArgs:any[]) => {
  if(seed) {
    const data = GenerateKeypairs(seed);
    PrintKeypairs(seed, data);
  } else if(multiple){
    const ans = file?'y':'n'
    const path = keyArgs[1]?keyArgs[1]+'/keypairs.txt':'keypairs.txt'
    GenerateMultipleKeypairs(ans,keyArgs[0],path)
  } else {
    GenerateRandomKeypairs()
  }
}

const init = () => {
  const { interactive,seed, multiple, file, args } = getopt({
    'interactive': {key: 'i',description: 'interactive shell'},
    'multiple': {key: 'm',description: 'generate multiple keypairs'},
    'file': {key:'f', description:'generate file for multiple keypairs'},
    'seed': {key: 's', description: 'seed for key generation', args: '*', multiple: true},
  });
  if(interactive) {
    interactive_cmd()
  } else {
    cmd(<string>seed,<boolean>multiple,<boolean>file, <any[]>args)
  }
}

init()