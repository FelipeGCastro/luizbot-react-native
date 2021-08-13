import React from 'react'
import { StatusBar } from 'react-native'
import { Login } from '../screens/Login'
import Dashboard from '../screens/Dashboard'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'

export default function Routes () {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      <StatusBar translucent />
      {user.email ? <Dashboard /> : <Login />}
    </NavigationContainer>
  )
}
