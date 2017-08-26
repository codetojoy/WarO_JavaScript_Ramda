
const assert = require('assert')

const {applyStrategy} = require('../src/strategy')

describe('strategies', function() {
    const hand = [19,69,11,18]
    let prizeCard = 7

    it('popCard basic', function() {
        // test
        let bid, newHand
        [bid, newHand] = applyStrategy('popCard', prizeCard, hand)

        assert.equal(19, bid)
        assert.equal(3, newHand.length)
    })

    it('maxCard basic', function() {
        // test
        let bid, newHand
        [bid, newHand] = applyStrategy('maxCard', prizeCard, hand)

        assert.equal(69, bid)
        assert.equal(3, newHand.length)
    })

    it('minCard basic', function() {
        // test
        let bid, newHand
        [bid, newHand] = applyStrategy('minCard', prizeCard, hand)

        assert.equal(11, bid)
        assert.equal(3, newHand.length)
    })

    it('nearestCard basic', function() {
        const p = 17

        // test
        let bid, newHand
        [bid, newHand] = applyStrategy('nearestCard', p, hand)

        assert.equal(18, bid)
        assert.equal(3, newHand.length)
    })
})
