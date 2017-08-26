
const assert = require('assert')

const {applyStrategy} = require('../src/strategy')

/*
describe('specific strategies', function() {
    const hand = [19,69,11,18]
    const prizeCard = 7

    it('maxCard basic', function() {
        // test
        const result = maxCard(prizeCard, hand)

        assert.equal(69, result)
    })

    it('minCard basic', function() {
        // test
        const result = minCard(prizeCard, hand)

        assert.equal(11, result)
    })
})
*/

describe('strategies', function() {
    const hand = [19,69,11,18]
    const prizeCard = 7

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
})
