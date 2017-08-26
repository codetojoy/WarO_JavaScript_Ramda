
const assert = require('assert')

const {getBid, getBids, findWinner,
       adjustWinnerAndLosers, playRound, play} = require('../src/game')

const mockState = {
numCards: 16,
players: [
{name:'Beethoven',strategy:'popCard',hand:[10,5,12],total:0,roundsWon:0},
{name:'Chopin',   strategy:'popCard',hand:[3,2,1],  total:0,roundsWon:0},
{name:'Mozart',   strategy:'popCard',hand:[4,5,6],  total:0,roundsWon:0}
]}

const mockState2 = {
numCards: 16,
players: [
{name:'Mozart',   strategy:'popCard',hand:[4,5,6],  total:0,roundsWon:0},
{name:'Beethoven',strategy:'popCard',hand:[10,5,12],total:0,roundsWon:0},
{name:'Chopin',   strategy:'popCard',hand:[3,2,1],  total:0,roundsWon:0}
]}

const mockState3 = {
numCards: 12,
numCardsPerHand: 3,
numPlayers: 3,
kitty: [5,6,7],
players: [
{name:'Alice',strategy:'popCard',hand:[2,3,9],total:0,roundsWon:0},
{name:'Bob',  strategy:'popCard',hand:[1,4,8],total:0,roundsWon:0}
]}

describe('getBid', function() {
    it('basic', function() {
        const prizeCard = 5
        const player = mockState.players[0]

        // test
        const newPlayer = getBid(prizeCard, player)        
    
        assert.equal(10, newPlayer.bid)
        assert.equal(2, newPlayer.hand.length)
    })
})

describe('getBids', function() {
    it('should request bids and alter hands', function() {
        const prizeCard = 5

        // test
        const newState = getBids(prizeCard, mockState)        
    
        // TODO: gah!
        assert.equal(10, newState.players[0].bid)
        assert.equal(3, newState.players[1].bid)
        assert.equal(4, newState.players[2].bid)
        assert.equal(2, newState.players[0].hand.length)
        assert.equal(2, newState.players[1].hand.length)
        assert.equal(2, newState.players[2].hand.length)
    })
})

describe('findWinner', function() {
    it('should identify the highest bidder', function() {
        const prizeCard = 5
        const state = getBids(prizeCard, mockState)        

        // test
        const newState = findWinner(state)        
    
        assert.equal(true, newState.players[0].isWinner)
        assert.equal(false, newState.players[1].isWinner)
        assert.equal(false, newState.players[2].isWinner)
    })
})

describe('adjustWinnerAndLosers', function() {
    it('should award points to winner', function() {
        const prizeCard = 5
        let state = getBids(prizeCard, mockState)        
        state = findWinner(state)        

        // test
        const newState = adjustWinnerAndLosers(prizeCard, state)
    
        // TODO: gah!
        assert.equal(5, newState.players[0].total)
        assert.equal(0, newState.players[1].total)
        assert.equal(0, newState.players[2].total)
        assert.equal(1, newState.players[0].roundsWon)
        assert.equal(0, newState.players[1].roundsWon)
        assert.equal(0, newState.players[2].roundsWon)
    })
})

describe('playRound', function() {
    it('should play a round of the game', function() {
        const prizeCard = 5

        // test
        const newState = playRound(prizeCard, mockState2)
    
        // TODO: gah!
        assert.equal(0, newState.players[0].total)
        assert.equal(5, newState.players[1].total)
        assert.equal(0, newState.players[2].total)
        assert.equal(0, newState.players[0].roundsWon)
        assert.equal(1, newState.players[1].roundsWon)
        assert.equal(0, newState.players[2].roundsWon)
    })
})

describe('play', function() {
    it('should play a full game', function() {
        // test
        const newState = play(mockState3)
    
        assert.equal(12, newState.players[0].total)
        assert.equal(6, newState.players[1].total)
        assert.equal(2, newState.players[0].roundsWon)
        assert.equal(1, newState.players[1].roundsWon)
        assert.equal(0, newState.players[0].hand.length)
        assert.equal(0, newState.players[1].hand.length)
    })
})


