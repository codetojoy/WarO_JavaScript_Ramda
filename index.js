
const R = require('ramda')

const configure = require('./src/configure')
const logObject = require('./src/util')
const {deal} = require('./src/deal')
const {play, verifyEndState} = require('./src/game') 

const initState = {
    numCards: 16,
    players: [
        {name:'Beethoven', strategy: 'popCard'},
        {name:'Chopin', strategy: 'popCard'},
        {name:'Mozart', strategy: 'popCard'}
    ]
}

const log = R.curry(logObject)('state')

R.compose(
    verifyEndState,
    log,
    play,
    log,
    deal,
    configure
)(initState)

