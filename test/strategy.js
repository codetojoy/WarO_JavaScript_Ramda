
const assert = require('assert')

const {applyStrategy} = require('../src/strategy')

describe('strategies', function() {
    const hand = [19,69,11,18]

    it('popCard basic', function() {
        const prizeCard = 7

        // test
        let bid, newHand
        [bid, newHand] = applyStrategy(prizeCard, 'popCard', hand)

        assert.equal(19, bid)
        assert.equal(3, newHand.length)
    })
})
