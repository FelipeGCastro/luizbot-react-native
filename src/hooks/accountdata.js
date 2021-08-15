// import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { callGetApi, callUptadeApi } from '../services/helpers'
import { useAuth } from './auth'

const AccountContext = createContext([])

function AccountProvider ({ children }) {
  const { signOut } = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  const [accountData, setAccountData] = useState({})
  const [strategies, setStrategies] = useState({})
  const [loadingTrades, setLoadingTrades] = useState(true)
  const [trades, setTrades] = useState([])

  useEffect(() => {
    let isSubscribe = true
    async function getAccountData () {
      const data = await callGetApi('/account/', null, signOut)
      if (isSubscribe) {
        setAccountData(data)
        setLoadingData(false)
      }
    }

    getAccountData()
    return () => { isSubscribe = false }
  }, [])
  useEffect(() => {
    let isSubscribe = true
    const interval = setInterval(async () => {
      const data = await callGetApi('/account/', null, signOut)
      if (isSubscribe) {
        setAccountData(data)
      }
    }, 30000)

    return () => {
      clearInterval(interval)
      isSubscribe = false
    }
  }, [])

  useEffect(() => {
    let isSubscribe = true
    async function getTradeHistory () {
      setLoadingTrades(true)
      const data = await callGetApi('/trade/')
      if (isSubscribe) {
        setTrades(data)
        setLoadingTrades(false)
      }
    }
    getTradeHistory()
    return () => { isSubscribe = false }
  }, [])

  useEffect(() => {
    let isSubscribe = true
    async function getAccountData () {
      const data = await callGetApi('/account/strategies')
      if (isSubscribe) {
        setStrategies(data)
      }
    }
    getAccountData()
    return () => { isSubscribe = false }
  }, [])

  async function setAccountApi (path, params) {
    setLoadingData(true)
    const data = await callUptadeApi(path, params, signOut)
    setAccountData(data)
    setLoadingData(false)
  }
  return (
    <AccountContext.Provider value={{ loadingData, trades, loadingTrades, setAccountApi, accountData, strategies }}>
      {children}
    </AccountContext.Provider>
  )
}

function useAccountData () {
  const context = useContext(AccountContext)
  return context
}

export {
  AccountProvider,
  useAccountData
}
