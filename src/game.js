
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

function getBids(state, prizeCard) {
    const newPlayers = R.map(function (player) {
        return getBid(prizeCard, player)
    }, state.players)
    const newState = R.assoc('players', newPlayers, state)
    return newState    
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

function adjustWinnerAndLosers(state, prizeCard) {
    const newPlayers = R.map(function (player) {
        let newPlayer = player 
        if (player.isWinner) {
            const roundsWon = player.roundsWon
            const total = player.total
            newPlayer = R.compose(
                            R.assoc('roundsWon', roundsWon + 1),
                            R.assoc('total', total + prizeCard)
                        )(player) 
        } 
        let newPlayer2 = R.compose(
                            R.dissoc('bid'),
                            R.dissoc('isWinner')
                         )(newPlayer) 
        return newPlayer2
    }, state.players)
    const newState = R.assoc('players', newPlayers, state)

    return newState
}

function playRound(state, prizeCard) {
    let newState = getBids(state, prizeCard)
    newState = findWinner(newState)
    newState = adjustWinnerAndLosers(newState, prizeCard)
    return newState
}

function play(state) {
    const kitty = R.view(kittyLens, state)

    const newState = R.reduce(function (state, prizeCard) {
        return playRound(state, prizeCard)
    }, state, kitty)

    return newState
}

module.exports.getBid = getBid
module.exports.getBids = getBids
module.exports.findWinner = findWinner
module.exports.adjustWinnerAndLosers = adjustWinnerAndLosers
module.exports.playRound = playRound
module.exports.play = play

