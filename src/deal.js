
const R = require('ramda')

const shuffle = require('../src/shuffle')

const shuffleDeck = (numCards) => 
    shuffle(R.times(R.pipe(R.inc, R.identity), numCards))

function partition(deck, numCardsPerPlayer) {
    return R.values(R.groupBy(card => {
        const index = R.indexOf(card, deck)
        return R.toString(Math.floor(index / numCardsPerPlayer))
    }, deck))
}

const helloKitty = (hands) => 
    R.pair(R.head(hands), R.slice(1, Infinity, hands))

const dealToPlayers = (state, hands) => 
    R.zipWith((player, hand) => 
        R.assoc('hand', hand, player)
    , state.players, hands)

function deal(state) {
    const hands = partition(shuffleDeck(state.numCards), state.numCardsPerHand) 

    let kitty, otherHands
    [kitty, otherHands] = helloKitty(hands)

    const newPlayers = dealToPlayers(state, otherHands)

    const newState = R.compose(
        R.assoc('kitty', kitty),
        R.assoc('players', newPlayers)
    )(state)

    return newState
}

module.exports.shuffleDeck = shuffleDeck 
module.exports.partition = partition 
module.exports.helloKitty = helloKitty
module.exports.dealToPlayers = dealToPlayers
module.exports.deal = deal
