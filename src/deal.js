
const R = require('ramda');

const shuffle = require('../src/shuffle');

const shuffleDeck = (numCards) => 
    shuffle(R.times(R.pipe(R.inc, R.identity), numCards))

const removeCards = (cards, deck) => 
    R.filter(R.complement(R.contains(R.__, cards)), deck)

function helloKitty(deck, numCardsPerHand) {
    const kitty = R.take(numCardsPerHand, deck)
    const newDeck = removeCards(kitty, deck)
    return R.pair(kitty, newDeck);
}

function dealToPlayers(state, deck) {
    let newPlayers = []
    const numCardsPerHand = state.numCardsPerHand

    R.times(function (playerIndex) {
        const hand = R.take(numCardsPerHand, deck)
        deck = removeCards(hand, deck)
        const player = state.players[playerIndex]
        const newPlayer = R.assoc('hand', hand, player)
        newPlayers.push(newPlayer)
    }, state.numPlayers)

    return newPlayers
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
module.exports.removeCards = removeCards 
module.exports.helloKitty = helloKitty
module.exports.dealToPlayers = dealToPlayers
module.exports.deal = deal
