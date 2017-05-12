#!/usr/bin/env node
// Input validation module.

const fs = require('fs')
const s = require('./store.js')
const d = require('./database.js')
const cliArguments = process.argv.slice(2)
const method = cliArguments[0]
const key = cliArguments[1]
const value = cliArguments[2]
const args = cliArguments.length
const os = require('os')
const db = `${os.tmpdir()}/storeDB.json`
let storageObject = {}

// Check if db exists.
const exists = () => {
  (!fs.existsSync(db)) ? d.createDB(db)
    : storageObject = JSON.parse(d.readSync())
}

/*
test for key in storageObject
If no combo matches a case, argsTest() will be called.
*/
const keyTest = () => {
  d.read()
  switch (true) {
    case (method === '--add' || method === '-a') && (key in storageObject) && (storageObject[key] === value):
      console.log(`\nYour database already includes the key-value pair:\n\n\t\t   ${key}  :  ${value}\n\nTry changing the key or the value to something else.\n`)
      process.exit()
    case (method === '--get' || method === '-g' || method === '--remove' || method === '-r') && (!(key in storageObject)):
      console.log("Unfortunately, you've selected a key which does not exist. Run the `$ store --list` command to see all database entries.")
      process.exit()
    default:
      return null
  }
}

/*
test for correct number of arguments to corresponding method.
If any combo of method && argLength matches a case, controller() will be called.
*/
const argsTest = () => {
  switch (true) {
    case (method === '--add' || '-a') && args === 3:
      break
    case (method === '--list' || '-l' || '--help' || '-h' || '--clean' || '-c') && args === 1:
      break
    case (method === '--get' || '-g' || '--remove' || '-r') && args === 2:
      break
    default:
      console.log('\nWrong number of args.\nUse `$ store --help`.\n')
      process.exit()
  }
}

// CLI-Args Controller routes the CLI command to the correct method call.
const controller = (method) => {
  switch (method) {
    case '--add':
    case '-a':
      s.add(storageObject, key, value)
      break
    case '--list':
    case '-l':
      s.list(storageObject)
      break
    case '--get':
    case '-g':
      s.get(storageObject, key)
      break
    case '--remove':
    case '-r':
      s.remove(storageObject, key)
      break
    case '--help':
    case '-h':
      s.help()
      break
    case '--clean':
    case '-c':
      d.clean()
      break
    default:
      console.log('\nInvalid command.\n\t Use `$ store --help`.\n')
  }
}

exists()
argsTest()
keyTest()
controller(method)
