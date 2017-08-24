
const assert = require('assert');
const shuffle = require('../src/shuffle');

describe('shuffle', function() {
    it('basic', function() {
        // test
        const result = shuffle([1,2,3,4,5,6])

        assert.equal(6, result.length)
        
    })
})
