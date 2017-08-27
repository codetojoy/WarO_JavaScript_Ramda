
const R = require('ramda')

function bidAndNewHand(bid, hand) {
    const newHand = R.without([bid], hand) 
    return R.pair(bid, newHand)
}

const popCard = (prizeCard, hand) => bidAndNewHand(R.head(hand), hand)
const maxCard = (prizeCard, hand) => bidAndNewHand(Math.max(...hand), hand)
const minCard = (prizeCard, hand) => bidAndNewHand(Math.min(...hand), hand)

const nearestCard = (prizeCard, hand) => {
    const distance = (x,y) => Math.abs(x - y)
    const distanceFromPrize = R.curry(distance)(prizeCard)
    const bid = R.reduce(R.minBy(distanceFromPrize), Infinity, hand)
    return bidAndNewHand(bid, hand)
}

function applyStrategy(strategy, prizeCard, hand) {
    let result = popCard(prizeCard, hand)

    // TODO: use R.cond here ?
    if (strategy == 'popCard') {
        result = popCard(prizeCard, hand)
    } else if (strategy == 'maxCard') {
        result = maxCard(prizeCard, hand)
    } else if (strategy == 'minCard') {
        result = minCard(prizeCard, hand)
    } else if (strategy == 'nearestCard') {
        result = nearestCard(prizeCard, hand)
    }

    return result
}

module.exports.applyStrategy = applyStrategy 
