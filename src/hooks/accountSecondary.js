// import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { callGetApi, callUptadeApi } from '../services/helpers'
import { useAuth } from './auth'

const AccountSecondaryContext = createContext([])

function AccountSecondaryProvider ({ children }) {
  const { signOut } = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  const [accountData, setAccountData] = useState({})
  const [strategies, setStrategies] = useState({})

  useEffect(() => {
    let isSubscribe = true
    async function getAccountData () {
      const data = await callGetApi('/account/secondary', null, signOut)
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
    async function getAccountData () {
      const data = await callGetApi('/account/secondary/strategies')
      if (isSubscribe) {
        setStrategies(data)
      }
    }
    getAccountData()
    return () => { isSubscribe = false }
  }, [])

  async function refresh () {
    setLoadingData(true)
    const data = await callGetApi('/account/secondary', null, signOut)
    setAccountData(data)
    setLoadingData(false)
  }

  async function setAccountApi (path, params) {
    setLoadingData(true)
    const data = await callUptadeApi(path, params, signOut)
    setAccountData(data)
    setLoadingData(false)
  }
  return (
    <AccountSecondaryContext.Provider value={{ loadingData, refresh, setAccountApi, accountData, strategies }}>
      {children}
    </AccountSecondaryContext.Provider>
  )
}

function useAccountSecondary () {
  const context = useContext(AccountSecondaryContext)
  return context
}

export {
  AccountSecondaryProvider,
  useAccountSecondary
}
