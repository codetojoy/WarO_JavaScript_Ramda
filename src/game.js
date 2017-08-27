
const R = require('ramda')

const {applyStrategy} = require('../src/strategy')

const bidLens = R.lensProp('bid')
const handLens = R.lensProp('hand')
const kittyLens = R.lensProp('kitty')

function popCard(prizeCard, hand) {
    const bid = R.head(hand)
    const newHand = R.drop(1, hand)
    return R.pair(bid, newHand)
}

function getBid(prizeCard, player) {
    const hand = R.view(handLens, player)

    let bid, newHand
    [bid, newHand] = applyStrategy(player.strategy, prizeCard, hand)

    const newPlayer = R.compose(
        R.set(handLens, newHand),
        R.set(bidLens, bid)
    )(player)

    return newPlayer
}

function getBids(prizeCard, state) {
    const getBidForPrize = R.curry(getBid)(prizeCard) 
    const newPlayers = R.map(getBidForPrize, state.players)
    return R.assoc('players', newPlayers, state)
}

function findWinner(state) {
    const sortedByBid = R.sortBy(R.prop('bid'), state.players)
    const winningBid = R.last(sortedByBid).bid

    const newPlayers = R.map(function (player) {
        return R.assoc('isWinner', (player.bid == winningBid), player)
    }, state.players)
    const newState = R.assoc('players', newPlayers, state)

    return newState
}

function adjustWinnerAndLosers(prizeCard, state) {
    const newPlayers = R.map(function (player) {
        return R.ifElse( (p) => p.isWinner ,
                         R.compose(
                             R.assoc('roundsWon', player.roundsWon + 1),
                             R.assoc('total', player.total + prizeCard),
                             R.dissoc('bid'),
                             R.dissoc('isWinner')),
                         R.compose( R.dissoc('bid'), R.dissoc('isWinner'))
               )(player)
    }, state.players)
    const newState = R.assoc('players', newPlayers, state)

    return newState
}

function playRound(prizeCard, state) {
    return R.compose(
        R.curry(adjustWinnerAndLosers)(prizeCard),
        findWinner,
        R.curry(getBids)(prizeCard)
    )(state)
}

function play(state) {
    const kitty = R.view(kittyLens, state)

    const newState = R.reduce(
        (state, prizeCard) => playRound(prizeCard, state)
    , state, kitty)

    return newState
}

function isEndStateOK(players, kitty, numCardsPerHand) {
    return R.and(
               R.equals(R.sum(kitty), R.sum(R.map(p => p.total, players))), 
               R.equals(numCardsPerHand, R.sum(R.map(p => p.roundsWon, players)))
           )
}

function verifyEndState(state) {
    R.ifElse(
        () => isEndStateOK(state.players, state.kitty, state.numCardsPerHand),
        () => console.log('verified.'),
        () => console.log('VERIFY FAILED') 
    )(state)

    return state
}

module.exports.getBid = getBid
module.exports.getBids = getBids
module.exports.findWinner = findWinner
module.exports.adjustWinnerAndLosers = adjustWinnerAndLosers
module.exports.playRound = playRound
module.exports.play = play
module.exports.verifyEndState = verifyEndState
module.exports.isEndStateOK = isEndStateOK
