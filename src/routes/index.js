import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Login } from '../screens/Login'
import PrivateStack from './bottomMenu'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'

export default function Routes () {
  const { user } = useAuth()

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar translucent />
        {user.email ? <PrivateStack /> : <Login />}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
