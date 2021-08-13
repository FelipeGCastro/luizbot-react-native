import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useState, useEffect } from 'react'
import api, { setClientToken } from '../services/api'

const AuthContext = createContext([])

function AuthProvider ({ children }) {
  const [user, setUser] = useState(false)
  const [userStoragedLoading, setUserStoragedLoading] = useState(true)
  const userStorageKey = '@luizbot:user'

  useEffect(() => {
    async function loadUserStorageData (params) {
      const userStoraged = await AsyncStorage.getItem(userStorageKey)
      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged)
        setUser(userLogged)
        setClientToken(userLogged.token)
      }
      setUserStoragedLoading(false)
    }
    loadUserStorageData()
  }, [])

  async function signOut () {
    setUser(false)
    await AsyncStorage.removeItem(userStorageKey)
  }

  async function signIn (email, password) {
    try {
      const result = await api.post('/user/authenticate', { email, password })
      if (result) {
        const newUser = { ...result.data.user, token: result.data.token }
        setUser(newUser)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(newUser))
        setClientToken(newUser.token)
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, userStoragedLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth () {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthProvider,
  useAuth
}
