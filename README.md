# ripple-offline-keygen

## build binaries (linux, macos, windows)

- install npm / node lts
- run `npm run package`

## Usage

1. Interactive

To start interactive shell use the flag -i or --interactive and follow the steps.

2. Non-Interactive

By default the binary runs in this mode and generates a random keypair if no flag is passed

<<<<<<< HEAD
<<<<<<< HEAD
# Example: 
=======
## Example: 
>>>>>>> ed9a5acb3e922cb4190a9af9223eee8e43d25617

=======
## Example: 
>>>>>>> origin/coindex-keypair

To generate key from a seed:
<code>
./bin/ripple-keygen-macos -s { Seed }
</code>

To generate multiple keypair:
<code>
./ripple-keygen-macos -m {number of keys to be generated}
</code>

To generate copy all the keys generated in the file:
Note: this only works with -m flag by default keypairs.txt is stored in the same directory , command is executed
<code>
./ripple-keygen-macos -m -f {number of keys to be generated} {file path: optional}
</code>