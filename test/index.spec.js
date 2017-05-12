const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon')
const stdin = require('mock-stdin').stdin()
const i = require('../index.js')

describe('controller', function () {
  it('should call the correct function for the method used.', function (done) {
    const addSpy = sinon.spy(i.add)
    // console.log(addSpy)
    stdin.send('/usr/local/Cellar/node/7.9.0/bin/node',
  '/usr/local/bin/store', 'store --add 1 2')
    assert.equal(1, addSpy.callCount)
    done()
  })
})

describe('add', function () {
  it('adds a key-value pair to the database', function (done) {
    i.add('number', '42')
  })
})
