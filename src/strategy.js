
const R = require('ramda')

function bidAndNewHand(bid, hand) {
    const newHand = R.without([bid], hand) 
    return R.pair(bid, newHand)
}

function popCard(prizeCard, hand) {
    const bid = R.head(hand)
    return bidAndNewHand(bid, hand)
    // const newHand = R.drop(1, hand)
    // return R.pair(bid, newHand)
}

function maxCard(prizeCard, hand) {
    const bid = Math.max(...hand)
    return bidAndNewHand(bid, hand)
}

function minCard(prizeCard, hand) {
    const bid = Math.min(...hand)
    return bidAndNewHand(bid, hand)
}

function applyStrategy(strategy, prizeCard, hand) {
    let result = popCard(prizeCard, hand)

    if (strategy == 'popCard') {
        result = popCard(prizeCard, hand)
    } else if (strategy == 'maxCard') {
        result = maxCard(prizeCard, hand)
    } else if (strategy == 'minCard') {
        result = minCard(prizeCard, hand)
    } 

    return result
}

module.exports.applyStrategy = applyStrategy 
