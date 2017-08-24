
const assert = require('assert');
const configure = require('../src/configure');

describe('configure', function() {
    const state = {
        numCards: 16,
        players: [
            {name:'Beethoven', strategy: 'popCard'},
            {name:'Chopin', strategy: 'popCard'},
            {name:'Mozart', strategy: 'popCard'}
        ]
    }

    it('adds kitty', function() {
        // test
        const result = configure(state)

        assert.equal(0, result.kitty.length)
    })

    it('adds player.hand', function() {
        // test
        const result = configure(state)

        assert.equal(0, result.players[0].hand.length)
        assert.equal(0, result.players[1].hand.length)
        assert.equal(0, result.players[2].hand.length)
    })

    it('adds player.roundsWon', function() {
        // test
        const result = configure(state)

        assert.equal(0, result.players[0].roundsWon)
        assert.equal(0, result.players[1].roundsWon)
        assert.equal(0, result.players[2].roundsWon)
    })

    it('adds player.total', function() {
        // test
        const result = configure(state)

        assert.equal(0, result.players[0].total)
        assert.equal(0, result.players[1].total)
        assert.equal(0, result.players[2].total)
    })

    it('adds numPlayers', function() {
        // test
        const result = configure(state)

        assert.equal(3, result.numPlayers)
    })
})
