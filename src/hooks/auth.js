import React, { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext([])

function AuthProvider ({ children }) {
  const [user, setUser] = useState(false)

  async function signIn (email, password) {
    try {
      console.log('sign in')
      const result = await api.post('/user/authenticate', { email, password })
      if (result) {
        setUser(result.data)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
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
