
const R = require('ramda')

const configure = require('./src/configure')
const shuffle = require('./src/shuffle')
const logObject = require('./src/util')

let initState = {
numCards: 16,
players: [
    {name:'Beethoven', strategy: 'popCard'},
    {name:'Chopin', strategy: 'popCard'},
    {name:'Mozart', strategy: 'popCard'}
]
};

const state = configure(initState)

logObject('state', state)

