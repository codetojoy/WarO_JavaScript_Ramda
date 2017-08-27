
const assert = require('assert')

const {shuffleDeck,partition,dealToPlayers,deal} = require('../src/deal')

const configure = require('../src/configure') 

describe('shuffleDeck', function() {
    const numCards = 6

    it('basic', function() {
        // test
        const result = shuffleDeck(numCards) 

        assert.equal(numCards, result.length)
    })
})

describe('partition', function() {
    const numCards = 60
    const numPlayers = 4
    const numActors = numPlayers + 1 // include kitty
    const numCardsPerHand = numCards / numActors

    it('basic', function() {
        const deck = shuffleDeck(numCards) 

        // test
        const hands = partition(deck, numCardsPerHand) 

        assert.equal(numActors, hands.length)
        hands.forEach((hand) => assert.equal(numCardsPerHand, hand.length)) 
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
        const hands = partition(deck, numCardsPerHand)
        const otherHands = hands.slice(1,Infinity)
        
        // test
        const newPlayers = dealToPlayers(state, otherHands) 

        assert.equal(3, newPlayers.length)
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
