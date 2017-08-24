
const assert = require('assert')

const {shuffleDeck, removeCards, 
       helloKitty, dealToPlayers, deal} = require('../src/deal')

const configure = require('../src/configure') 

describe('shuffleDeck', function() {
    const numCards = 6

    it('basic', function() {
        // test
        const result = shuffleDeck(numCards) 

        assert.equal(numCards, result.length)
    })
})

describe('removeCards', function() {
    const numCards = 6

    it('basic', function() {
        const deck = shuffleDeck(numCards) 

        // test
        const result = removeCards([1,2], deck)

        assert.equal(4, result.length)
    })
})

describe('helloKitty', function() {
    const numCards = 16
    const numPlayers = 3
    const numCardsPerHand = numCards / (numPlayers + 1) 

    it('basic', function() {
        const deck = shuffleDeck(numCards) 

        // test
        let kitty, remainingDeck
        [kitty, remainingDeck] = helloKitty(deck, numCardsPerHand) 

        assert.equal(numCardsPerHand, kitty.length)
        assert.equal(numCards - numCardsPerHand, remainingDeck.length)
    })
})

describe('dealToPlayers', function() {
    const initState  = {
        numCards: 16,
        players: [
            {name:'Beethoven', strategy: 'popCard'},
            {name:'Chopin', strategy: 'popCard'},
            {name:'Mozart', strategy: 'popCard'}
        ]
    }

    it('basic', function() {
        const state = configure(initState)
        const numCards = state.numCards
        const numCardsPerHand = state.numCardsPerHand
        const deck = shuffleDeck(numCards) 
        let kitty, remainingDeck
        [kitty, remainingDeck] = helloKitty(deck, numCardsPerHand) 

        // test
        newPlayers = dealToPlayers(state, remainingDeck) 

        assert.equal(numCardsPerHand, newPlayers[0].hand.length)
        assert.equal(numCardsPerHand, newPlayers[1].hand.length)
        assert.equal(numCardsPerHand, newPlayers[2].hand.length)
    })
})

describe('deal', function() {
    const initState  = {
        numCards: 16,
        players: [
            {name:'Beethoven', strategy: 'popCard'},
            {name:'Chopin', strategy: 'popCard'},
            {name:'Mozart', strategy: 'popCard'}
        ]
    }

    it('basic', function() {
        let state = configure(initState)
        const numCardsPerHand = state.numCardsPerHand

        // test
        state = deal(state)

        assert.equal(numCardsPerHand, state.kitty.length)
        assert.equal(numCardsPerHand, state.players[0].hand.length)
        assert.equal(numCardsPerHand, state.players[1].hand.length)
        assert.equal(numCardsPerHand, state.players[2].hand.length)
    })
})
