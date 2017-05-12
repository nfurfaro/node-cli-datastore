#!/usr/bin/env node

const fs = require('fs')
const h = require('./helpers.js')
const os = require('os')
const db = `${os.tmpdir()}/storeDB.json`
const args = process.argv.slice(2) // const args could be set by a gui instead of a cli.
const argLength = args.length
const method = args[0]
const key = args[1]
const value = args[2]
let storageObject = {}

// Check if db exists.
const exists = () => {
  (!fs.existsSync(db)) ? h.createDB(db)
    : storageObject = JSON.parse(h.readSync())
}

// Remove the database from your system.
const clean = () => {
  fs.unlink(`${os.tmpdir()}/storeDB.json`, (err) => {
    if (err) console.log('Error:' + err)
    else console.log('Database removed.')
  })
}

// List all key-value pairs.
const list = () => {
  // console.log(storageObject)
  h.read().then((data) => {
    console.log('\nYour current entries are:\n')
    for (let k in data) {
      console.log('\t\t' + k + ' : ' + data[k])
    }
    console.log('\n')
  })
}

// Get a value by entering it's corresponding key.
const get = key => {
  console.log(storageObject[key])
}

// Add a key-value pair.
const add = (key, value) => {
  storageObject[key] = value
  h.write(storageObject).then(console.log('Entry saved to Database.'))
}

// Remove a key-value pair.
const remove = key => {
  delete storageObject[key]
  h.write(storageObject)
  console.log(`"${key}" is no longer in your database.`)
}

// Show user the help manual.
const help = () => {
  console.log("\nWelcome to the Store documentation.\n\nTo use Store, enter one of the Store commands.\n\nQuotation marks are optional (because Store is here to make your life simpler),\nbut if you wish to add a key or value which includes spaces, you must use quotes.\n\texample: `$ store --add 'I want to work for' Tesera` \n\n\n\t`$ store --help (-h) `\t\t\t==========> View the store documentation. \n\t`$ store --add (-a) <myKey> <myValue>` \t==========> example:`$ store --add goesTo 11` \n\t`$ store --list (-l) `\t\t\t==========> View all key-value pairs \n\t`$ store --get (-g) <myKey> `\t\t==========> example:`$ store --get Company` returns `$ Tesera`\n\t`$ store --remove (-r) <myKey>`\t\t==========> example:`$ store --remove Company` removes key/value pair.\n\t`$ store --clean (-c) `\t\t\t==========> Removes the database file from your system.\n")
}

/*
test for key in storageObject
If no combo matches a case, control is returned back to the calling function.
*/
const keyTest = () => {
  h.read()
  switch (true) {
    case method === '--add' && key in storageObject && storageObject[key] === value:
    case method === '-a' && key in storageObject && storageObject[key] === value:
      console.log(`\nYour database already includes the key-value pair:\n\n\t\t   ${key}  :  ${value}\n\nTry changing the key or the value to something else.\n`)
      process.exit()
    case method === '--get' && !(key in storageObject):
    case method === '-g' && !(key in storageObject):
    case method === '--remove' && !(key in storageObject):
    case method === '-r' && !(key in storageObject):
      console.log("Unfortunately, you've selected a key which does not exist. Run the `$ store --list` command to see all database entries.")
      process.exit()
    default:
      return null
  }
}

/*
test for correct number of arguments to corresponding method.
If any combo of method && argLength matches a case, control is returned back to the calling function.
*/

// method argument?
const argsTest = () => {
  switch (true) {
    case method === '--add' && argLength === 3:
    case method === '-a' && argLength === 3:
      break
    case method === '--list' && argLength === 1:
    case method === '-l' && argLength === 1:
      break
    case method === '--get' && argLength === 2:
    case method === '-g' && argLength === 2:
      break
    case method === '--remove' && argLength === 2:
    case method === '-r' && argLength === 2:
      break
    case method === '--help' && argLength === 1:
    case method === '-h' && argLength === 1:
      break
    case method === '--clean' && argLength === 1:
    case method === '-c' && argLength === 1:
      break
    default:
      console.log('\nWrong number of args.\nUse `$ store --help`.\n')
      process.exit()
  }
}

// CLI-Args Controller.
const controller = (method) => {
  switch (method) {
    case '--add':
    case '-a':
      exists()
      argsTest()
      keyTest()
      add(key, value)
      break
    case '--list':
    case '-l':
      exists()
      argsTest()
      list(storageObject)
      break
    case '--get':
    case '-g':
      exists()
      argsTest()
      keyTest()
      get(key)
      break
    case '--remove':
    case '-r':
      exists()
      argsTest()
      keyTest()
      remove(key)
      break
    case '--help':
    case '-h':
      argsTest()
      help()
      break
    case '--clean':
    case '-c':
      clean()
      break
    default:
      console.log('\nInvalid command.\n\t Use `$ store --help`.\n')
  }
}
controller(method)

exports.keyTest = keyTest
exports.argsTest = argsTest
exports.clean = clean
exports.list = list
exports.get = get
exports.remove = remove
exports.add = add
