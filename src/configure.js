
const R = require('ramda')

function configure(state) {
    const newPlayers = R.map(R.compose(
            R.assoc('hand', []),
            R.assoc('roundsWon', 0),
            R.assoc('total', 0)
        ), state.players)

    const numPlayers = newPlayers.length 

    const newState = R.compose(
            R.assoc('kitty', []),
            R.assoc('numPlayers', numPlayers),
            R.assoc('numCardsPerHand', R.divide(state.numCards, R.inc(numPlayers))),
            R.assoc('players', newPlayers)
        )(state)

    return newState
}

module.exports = configure 
