import React, { createContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAccountPrimary } from './accountPrimary'
import { useAccountSecondary } from './accountSecondary'

const socketio = io('https://luiz-binance-bot.herokuapp.com')
// const socketio = io('http://192.168.1.81:3333')

const SocketContext = createContext()
const SocketProvider = ({ children }) => {
  const [socketUp, setSocketUp] = useState(false)
  const { setAccountData } = useAccountPrimary()
  const { setAccountData: setSecondaryAccountData } = useAccountSecondary()

  useEffect(() => {
    socketio.on('connect', () => {
      console.log('connected', socketio.connected) // true
      setSocketUp(true)
    })

    socketio.on('disconnect', () => {
      console.log('disconnected', socketio.connected)
      setSocketUp(socketio.connected) // false
    })

    socketio.on('primaryAccount', (data) => {
      console.log(data)
      setAccountData(data)
    })

    socketio.on('secondaryAccount', setSecondaryAccountData)
  }, [])

  return (
    <SocketContext.Provider value={{ socketUp }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
