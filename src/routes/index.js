import React from 'react'
import { StatusBar } from 'react-native'
import { Login } from '../screens/Login'
import PrivateStack from './account'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'

export default function Routes () {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      <StatusBar translucent />
      {user.email ? <PrivateStack /> : <Login />}
    </NavigationContainer>
  )
}
