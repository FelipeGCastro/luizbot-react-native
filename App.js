import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Routes from './src/routes'
import { AuthProvider } from './src/hooks/auth'

export default function App () {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaProvider>

  )
}
