
const assert = require('assert')

const {shuffleDeck,partition,helloKitty,
        dealToPlayers,deal} = require('../src/deal')

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

describe('helloKitty', function() {
    const numCards = 16
    const numPlayers = 3
    const numActors = numPlayers + 1
    const numCardsPerPlayer = numCards / numActors

    it('basic', function() {
        const deck = shuffleDeck(numCards) 
        const hands = partition(deck, numCardsPerPlayer)

        assert.equal(numActors, hands.length)
        hands.forEach((hand) => assert.equal(numCardsPerPlayer, hand.length)) 

        // test
        let kitty, otherHands
        [kitty, otherHands] = helloKitty(hands)

        assert.equal(numCardsPerPlayer, kitty.length)
        assert.equal(numPlayers, otherHands.length)
        otherHands.forEach((hand) => assert.equal(numCardsPerPlayer, hand.length)) 
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
        let kitty, otherHands
        [kitty, otherHands] = helloKitty(hands, numCardsPerHand) 
        
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
