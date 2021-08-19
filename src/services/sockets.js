import { io } from 'socket.io-client'
// const socketio = io('https://luiz-binance-bot.herokuapp.com')
const socketio = io('http://192.168.1.81:3333')

socketio.on('connect', () => {
  console.log('connected', socketio.connected) // true
})

socketio.on('disconnect', () => {
  console.log('disconnected', socketio.connected) // false
})
// accountPrimary
// accountSecondary
function listenAccountPrimaryUpdate (callback) {
  socketio.on('primaryAccount', callback)
}

function listenAccountSecondaryUpdate (callback) {
  socketio.on('secondaryAccount', callback)
}

export {
  listenAccountPrimaryUpdate,
  listenAccountSecondaryUpdate
}
