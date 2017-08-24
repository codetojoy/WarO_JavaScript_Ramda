
const R = require('ramda')
const shuffle = require('./src/shuffle')
const logObject = require('./src/util')

let state = {
numCards: 16,
kitty: [],
players: [
    {name:'Beethoven', strategy: 'popCard', roundsWon: 0, total: 0, hand: []},
    {name:'Chopin', strategy: 'popCard', roundsWon: 0, total: 0, hand: []},
    {name:'Mozart', strategy: 'popCard', roundsWon: 0, total: 0, hand: []}
]
};

const numPlayers = state.players.length
const numCardsPerHand = R.divide(state.numCards, R.inc(numPlayers))

logObject('state', state)

