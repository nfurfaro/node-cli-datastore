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

##Known Deficiencies & Uncertainties

- Incomplete understanding around usage of promises.

While I can often 'get it to work', I haven't had that 'Aha!' moment of true comprehension around using promises fluently. I feel that , along with tdd, this is where I need to focus my continued learning & practice.

- Usage of the global object to share values between modules.

I feel like this may not be the best/cleanest way to deal with giving both index.js and helpers.js the access they need, but I'm not sure how else to solve this issue.

- TDD

I discovered 2 things the hard way:

 1.) Trying to write tests after the fact is much more difficult than following the actual tdd process.
 2.) Trying to write tests for functions which use promises is somewhat frustrating without having a deep understanding of promises in the first place.

 Upon realizing this, I did some extra reading up on tdd and had an important realization. One of the books that influenced my building design work the most is 'A Pattern Language' by C. Alexander. It turns out that this book had a large influence on Kent Beck as he was developing the tdd method. This has given me a clearer understanding of what tdd is really about, and I'm committed to learning to use it well.

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

