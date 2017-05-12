const exec = require('child_process')
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
  exec.execSync(`echo "{}">>${db}`) // try using fs.open()
  console.log('Database initialized.')
}

// Read function for use when initializing database.
const readSync = () => fs.readFileSync(db, 'utf8')

exports.write = write
exports.read = read
exports.createDB = createDB
exports.readSync = readSync
