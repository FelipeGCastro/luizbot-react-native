import React, { createContext, useContext, useState, useEffect } from 'react'
import { callGetApi } from '../services/helpers'

const TradesContext = createContext([])

function TradesProvider ({ children }) {
  const [loadingTrades, setLoadingTrades] = useState(true)
  const [trades, setTrades] = useState([])

  useEffect(() => {
    let isSubscribe = true
    async function getTradeHistory () {
      setLoadingTrades(true)
      const data = await callGetApi('/trade/')
      if (isSubscribe && data) {
        setTrades(data.reverse())
        setLoadingTrades(false)
      }
    }
    getTradeHistory()
    return () => { isSubscribe = false }
  }, [])

  async function refreshTrades () {
    setLoadingTrades(true)
    const data = await callGetApi('/trade/')
    setTrades(data.reverse())
    setLoadingTrades(false)
  }

  return (
    <TradesContext.Provider value={{ loadingTrades, trades, refreshTrades }}>
      {children}
    </TradesContext.Provider>
  )
}

function useTrades () {
  const context = useContext(TradesContext)
  return context
}

export {
  TradesProvider,
  useTrades
}
