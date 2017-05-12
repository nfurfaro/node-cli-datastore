// Core functionality module.

const d = require('./database.js')

// List all key-value pairs.
const list = () => {
  d.read().then((data) => {
    console.log('\nYour current entries are:\n')
    for (let k in data) {
      console.log('\t\t' + k + ' : ' + data[k])
    }
    console.log('\n')
  })
}

// Get a value by entering it's corresponding key.
const get = (storageObject, key) => {
  console.log(storageObject[key])
}

// Add a key-value pair.
const add = (storageObject, key, value) => {
  storageObject[key] = value
  d.write(storageObject).then(console.log('Entry saved to Database.'))
}

// Remove a key-value pair.
const remove = (storageObject, key) => {
  delete storageObject[key]
  d.write(storageObject)
  console.log(`"${key}" is no longer in your database.`)
}

// Show user the help manual.
const help = () => {
  console.log("\nWelcome to the Store documentation.\n\nTo use Store, enter one of the Store commands.\n\nQuotation marks are optional (because Store is here to make your life simpler),\nbut if you wish to add a key or value which includes spaces, you must use quotes.\n\texample: `$ store --add 'number' 42` \n\n\n\t`$ store --help (-h) `\t\t\t==========> View the store documentation. \n\t`$ store --add (-a) <myKey> <myValue>` \t==========> example:`$ store --add goesTo 11` \n\t`$ store --list (-l) `\t\t\t==========> View all key-value pairs \n\t`$ store --get (-g) <myKey> `\t\t==========> example:`$ store --get number` returns `$ 42`\n\t`$ store --remove (-r) <myKey>`\t\t==========> example:`$ store --remove Company` removes key/value pair.\n\t`$ store --clean (-c) `\t\t\t==========> Removes the database file from your system.\n")
}

exports.add = add
exports.get = get
exports.list = list
exports.help = help
exports.remove = remove
