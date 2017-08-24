
const R = require('ramda');

const flip = (x) => Math.floor(Math.random() * x)
const coinFlip = x => R.equals(0, R.mathMod(flip(x), 2))
const coinFlipInt = R.ifElse(coinFlip, x => 1, x => -1)
const mixEmUp = R.ifElse(R.equals(0), x => 0, coinFlipInt)

function shuffle(list) {
    return R.sort(mixEmUp, list)
}

module.exports = shuffle 
