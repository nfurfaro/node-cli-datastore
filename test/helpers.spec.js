const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon')
const stdin = require('mock-stdin').stdin()
const h = require('../helpers.js')

describe('help', function () {
  it('logs the help documentation to the console', function () {
    const helpSpy = sinon.spy(h.help)
    stdin.send('/usr/local/Cellar/node/7.9.0/bin/node',
  '/usr/local/bin/store',
  '--help')
    helpSpy()
    const argsTestSpy = sinon.spy(h.argsTest)
    // console.log(helpSpy.returnValues)
    assert.equal(1, argsTestSpy.callCount)
    assert.equal(helpSpy.returnValues, "\nWelcome to the Store documentation.\n\nTo use Store, enter one of the Store commands.\n\nQuotation marks are optional (because Store is here to make your life simpler),\nbut if you wish to add a key or value which includes spaces, you must use quotes.\n\texample: `$ store --add 'I want to work for' Tesera` \n\n\n\t`$ store --help (-h) `\t\t\t==========> View the store documentation. \n\t`$ store --add (-a) <myKey> <myValue>` \t==========> example:`$ store --add goesTo 11` \n\t`$ store --list (-l) `\t\t\t==========> View all key-value pairs \n\t`$ store --get (-g) <myKey> `\t\t==========> example:`$ store --get Company` returns `$ Tesera`\n\t`$ store --remove (-r) <myKey>`\t\t==========> example:`$ store --remove Company` removes both the key and its value.\n\t`$ store --clean (-c) `\t\t\t==========> Removes the database file from your system.")
  })
})
