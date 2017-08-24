
const R = require('ramda')
const shuffle = require('./src/shuffle')
const logObject = require('./src/util')

let initState = {
numCards: 16,
players: [
    {name:'Beethoven', strategy: 'popCard'},
    {name:'Chopin', strategy: 'popCard'},
    {name:'Mozart', strategy: 'popCard'}
]
};

const newPlayers = R.map(R.compose(
    R.assoc('hand', []),
    R.assoc('roundsWon', 0),
    R.assoc('total', 0)
    ), initState.players)

const state = R.compose(
        R.assoc('kitty', []),
        R.assoc('players', newPlayers)
    )(initState)

const numPlayers = state.players.length
const numCardsPerHand = R.divide(state.numCards, R.inc(numPlayers))

logObject('state', state)

