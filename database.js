// Database operations module.

const fs = require('fs')
const os = require('os')
const childProcess = require('child_process')
const db = `${os.tmpdir()}/storeDB.json`

// Create the database file
const createDB = (file) => {
  childProcess.exec(`echo "{}">>${db}`)
  console.log('Database initialized.')
}

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

// Read function for use when initializing database.
const readSync = () => fs.readFileSync(db, 'utf8')

// Remove the database from your system.
const clean = () => {
  fs.unlink(`${os.tmpdir()}/storeDB.json`, (err) => {
    if (err) console.log('Error:' + err)
    else console.log('Database removed.')
  })
}

exports.clean = clean
exports.createDB = createDB
exports.readSync = readSync
exports.write = write
exports.read = read
