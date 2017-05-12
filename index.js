#!/usr/bin/env node

const fs = require('fs')
const h = require('./helpers.js')
const os = require('os')
const db = `${os.tmpdir()}/storeDB.json`
const args = process.argv.slice(2)
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

/*
test for key in storageObject
If no combo matches a case, argsTest() will be called.
*/
const keyTest = () => {
  h.read()
  switch (true) {
    case method === ('--add' || '-a') && key in storageObject && storageObject[key] === value:
      console.log(`\nYour database already includes the key-value pair:\n\n\t\t   ${key}  :  ${value}\n\nTry changing the key or the value to something else.\n`)
      process.exit()
    case method === ('--get' || '-g' || '--remove' || '-r') && !(key in storageObject):
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
    case method === ('--add' || '-a') && argLength === 3:
      break
    case method === ('--list' || '-l' || '--help' || '-h' || '--clean' || '-c') && argLength === 1:
      break
    case method === ('--get' || '-g' || '--remove' || '-r') && argLength === 2:
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
      add(key, value)
      break
    case '--list':
    case '-l':
      list(storageObject)
      break
    case '--get':
    case '-g':
      get(key)
      break
    case '--remove':
    case '-r':
      remove(key)
      break
    case '--help':
    case '-h':
      h.help()
      break
    case '--clean':
    case '-c':
      h.clean()
      break
    default:
      console.log('\nInvalid command.\n\t Use `$ store --help`.\n')
  }
}

exists()
argsTest()
keyTest()
controller(method)
