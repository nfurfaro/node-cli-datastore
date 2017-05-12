const childProcess = require('child_process')
const fs = require('fs')
const os = require('os')
const db = `${os.tmpdir()}/storeDB.json`

// Read the database.
const read = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          if (err) {
            reject(err)
          }
        }
      }
    })
  })
}

// Write to the database.
const write = (storageObject) => {
  return new Promise((resolve, reject) => {
    let json = JSON.stringify(storageObject)
    fs.writeFile(db, json, 'utf8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  }
  )
}

// Create the database file
const createDB = (file) => {
  childProcess.exec(`echo "{}">>${db}`) // try using fs.open()
  console.log('Database initialized.')
}

// Read function for use when initializing database.
const readSync = () => fs.readFileSync(db, 'utf8')

// Show user the help manual.
const help = () => {
  console.log("\nWelcome to the Store documentation.\n\nTo use Store, enter one of the Store commands.\n\nQuotation marks are optional (because Store is here to make your life simpler),\nbut if you wish to add a key or value which includes spaces, you must use quotes.\n\texample: `$ store --add 'I want to work for' Tesera` \n\n\n\t`$ store --help (-h) `\t\t\t==========> View the store documentation. \n\t`$ store --add (-a) <myKey> <myValue>` \t==========> example:`$ store --add goesTo 11` \n\t`$ store --list (-l) `\t\t\t==========> View all key-value pairs \n\t`$ store --get (-g) <myKey> `\t\t==========> example:`$ store --get Company` returns `$ Tesera`\n\t`$ store --remove (-r) <myKey>`\t\t==========> example:`$ store --remove Company` removes key/value pair.\n\t`$ store --clean (-c) `\t\t\t==========> Removes the database file from your system.\n")
}

// Remove the database from your system.
const clean = () => {
  fs.unlink(`${os.tmpdir()}/storeDB.json`, (err) => {
    if (err) console.log('Error:' + err)
    else console.log('Database removed.')
  })
}

exports.write = write
exports.read = read
exports.createDB = createDB
exports.readSync = readSync
exports.help = help
exports.clean = clean
