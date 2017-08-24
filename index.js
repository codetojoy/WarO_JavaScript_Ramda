
const R = require('ramda')

const configure = require('./src/configure')
const shuffle = require('./src/shuffle')
const logObject = require('./src/util')
const {deal} = require('./src/deal')

let initState = {
numCards: 16,
players: [
    {name:'Beethoven', strategy: 'popCard'},
    {name:'Chopin', strategy: 'popCard'},
    {name:'Mozart', strategy: 'popCard'}
]
};

let state = configure(initState)

state = deal(state)

logObject('state', state)

