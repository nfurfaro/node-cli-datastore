#Store

##Overview

Store is a simple Node.js CLI for working with data in the form of key-value pairs. It provides basic Create / Update / Delete functionality, and will persist your data to a local file automatically.

##Objectives

Allow the user to:

- Add a key-value pair.

- Update a key-value pair.

- List all key-value pairs.

- Get a value by entering its corresponding key.

- Remove a key-value pair.


##Getting Started

###Installation
These instructions assume that you already have Node installed globally on your system, and are familiar with using the command line.

####Git
Clone the repo using `$ git clone https://github.com/nfurfaro/node-cli-datastore.git`

or

####Zip Archive

Download  the zip archive from https://github.com/nfurfaro/node-cli-datastore

From inside the `node-cli-datastore` directory, run `$ npm install` to install project dependencies, followed by `$ npm link` to set up the executable command "store".

###Usage
`$ store help `
View the store documentation.

`$ store add <myKey> <myValue>`
Add a key-value pair.
example: `$ store add goesTo 11`

`$ store list `
View all key-value pairs

`$ store get <myKey> `
Get a value by its key.
example:`$ store get Company` returns `$ Tesera`

`$ store remove <myKey>`
Remove a key-value pair by its key.
example:`$ store remove Company` removes both the key and its value.

###Testing

`$ npm test`
More unit tests are needed.

