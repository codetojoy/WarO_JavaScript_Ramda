
const R = require('ramda')

function popCard(prizeCard, hand) {
    const bid = R.head(hand)
    const newHand = R.drop(1, hand)
    return R.pair(bid, newHand)
}

function applyStrategy(strategy, prizeCard, hand) {
    let result = popCard(prizeCard, hand)

    if (strategy == 'popCard') {
        result = popCard(prizeCard, hand)
    } 

    return result
}

module.exports.applyStrategy  = applyStrategy 
