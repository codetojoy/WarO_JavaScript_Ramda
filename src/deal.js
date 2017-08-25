
const R = require('ramda');

const shuffle = require('../src/shuffle');

const shuffleDeck = (numCards) => 
    shuffle(R.times(R.pipe(R.inc, R.identity), numCards))

function helloKitty(deck, numCardsPerHand) {
    const kitty = R.take(numCardsPerHand, deck)
    const newDeck = R.difference(deck, kitty)
    return R.pair(kitty, newDeck);
}

function dealToPlayers(state, deck) {
    return R.reduce( (players, player) => {
            const hand = R.take(state.numCardsPerHand, deck)
            deck = R.difference(deck, hand)
            const newPlayer = R.assoc('hand', hand, player)
            return R.append(newPlayer, players)
        }, [], state.players)
}

// This doesn't feel very 'functional', but rather 'imperative'..
function deal(state) {
    const deck = shuffleDeck(state.numCards)
    const numCardsPerHand = state.numCardsPerHand

    let kitty, newDeck
    [kitty, newDeck] = helloKitty(deck, numCardsPerHand)

    const newPlayers = dealToPlayers(state, newDeck)

    const newState = R.compose(
        R.assoc('kitty', kitty),
        R.assoc('players', newPlayers)
    )(state)

    return newState;
}

module.exports.shuffleDeck = shuffleDeck 
module.exports.helloKitty = helloKitty
module.exports.dealToPlayers = dealToPlayers
module.exports.deal = deal
