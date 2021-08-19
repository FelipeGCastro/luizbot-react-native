// import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { callGetApi, callUptadeApi } from '../services/helpers'
import { listenAccountPrimaryUpdate } from '../services/sockets'
import { useAuth } from './auth'
import { useTrades } from './trades'

const AccountPrimaryContext = createContext([])

function AccountPrimaryProvider ({ children }) {
  const { signOut } = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  const [accountData, setAccountData] = useState({})
  const [strategies, setStrategies] = useState({})
  const { refreshTrades } = useTrades()
  useEffect(() => {
    let isSubscribe = true
    async function getAccountData () {
      const data = await callGetApi('/account/primary', null, signOut)
      if (isSubscribe) {
        setAccountData(data)
        setLoadingData(false)
      }
    }

    getAccountData()
    return () => { isSubscribe = false }
  }, [])

  useEffect(() => {
    listenAccountPrimaryUpdate(setSocketData)
  }, [])

  function setSocketData (data) {
    setAccountData(data)
  }

  useEffect(() => {
    let isSubscribe = true
    async function getAccountData () {
      const data = await callGetApi('/account/primary/strategies', null, signOut)
      if (isSubscribe) {
        setStrategies(data)
      }
    }
    getAccountData()
    return () => { isSubscribe = false }
  }, [])

  async function refresh () {
    setLoadingData(true)
    const data = await callGetApi('/account/primary', null, signOut)
    setAccountData(data)
    refreshTrades()
    setLoadingData(false)
  }

  async function setAccountApi (path, params) {
    setLoadingData(true)
    const data = await callUptadeApi(path, params, signOut)
    setAccountData(data)
    setLoadingData(false)
  }
  return (
    <AccountPrimaryContext.Provider value={{ loadingData, refresh, setAccountApi, accountData, strategies }}>
      {children}
    </AccountPrimaryContext.Provider>
  )
}

function useAccountPrimary () {
  const context = useContext(AccountPrimaryContext)
  return context
}

export {
  AccountPrimaryProvider,
  useAccountPrimary
}
