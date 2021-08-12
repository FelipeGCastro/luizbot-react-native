import React from 'react'
import { Login } from './src/screens/Login'
import Dashboard from './src/screens/Dashboard'
import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from './src/hooks/auth'

// const Stack = createNativeStackNavigator()

export default function App () {
  const { user } = useAuth()
  return (
    <NavigationContainer>
      <AuthProvider>
        {user ? <Dashboard /> : <Login />}
      </AuthProvider>
    </NavigationContainer>
  )
}
