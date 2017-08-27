
const R = require('ramda');

const flip = (x) => Math.floor(Math.random() * x)
const coinFlip = x => R.equals(0, R.mathMod(flip(x), 2))
const coinFlipInt = R.ifElse(coinFlip, R.always(1), R.always(-1))
const mixEmUp = R.ifElse(R.equals(0), R.always(0), coinFlipInt)

function shuffle(list) {
    return R.sort(mixEmUp, list)
}

module.exports = shuffle 
